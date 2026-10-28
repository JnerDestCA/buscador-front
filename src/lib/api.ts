const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api/v1";

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = new Error(`API Error: ${response.status}`);
    (error as any).status = response.status;
    throw error;
  }

  // For preview endpoint that returns PDF
  if (endpoint.includes('/preview')) {
    return response as unknown as T;
  }

  return response.json();
}

export const api = {
  buscarDocumentos: async (params: Record<string, string | number | undefined>) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, String(value));
      }
    });
    
    const queryString = searchParams.toString();
    const endpoint = queryString ? `/documentos/search?${queryString}` : `/documentos/search`;
    
    const response = await fetchAPI<any>(endpoint);
    return response;
  },

  obtenerFiltrosOpciones: async () => {
    return fetchAPI<any>("/filtros/opciones");
  },

  sincronizar: async () => {
    const response = await fetch(`${API_BASE}/indexer/sync`, {
      method: "POST",
    });
    
    if (response.status === 202) {
      return { status: 202, data: await response.json() };
    } else if (response.status === 409) {
      return { status: 409, data: await response.json() };
    } else if (response.status === 429) {
      const error = new Error("Too Many Requests");
      (error as any).status = 429;
      throw error;
    }
    
    if (!response.ok) {
      const error = new Error(`API Error: ${response.status}`);
      (error as any).status = response.status;
      throw error;
    }
    
    return { status: response.status, data: await response.json() };
  },

  obtenerPreview: (id: string) => {
    return `${API_BASE}/documentos/${id}/preview`;
  },
};
