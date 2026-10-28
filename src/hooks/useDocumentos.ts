import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { type BuscarDocumentosResponse } from "../types/documento";

interface UseDocumentosParams {
  q?: string;
  area?: string;
  anio?: string;
  tipo?: string;
  sort_by?: string;
  page?: number;
  limit?: number;
}

export function useDocumentos(params: UseDocumentosParams) {
  return useQuery<BuscarDocumentosResponse>({
    queryKey: ["documentos", params],
    queryFn: () => api.buscarDocumentos(params as any),
    placeholderData: (previousData) => previousData,
    staleTime: 30000, // 30 seconds
  });
}
