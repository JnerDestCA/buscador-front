export interface DocumentoMetadatos {
  area: string;
  anio: number | null;
  codigo: string | null;
  tipo_documento: string;
}

export interface Documento {
  id: string;
  nombre_archivo: string;
  ruta_compartida: string;
  origen_texto: "NATIVO" | "OCR";
  metadatos: DocumentoMetadatos;
  fecha_modificacion: string;
  tamano_bytes: number;
  highlight: string;
}

export interface BuscarDocumentosResponse {
  total: number;
  page: number;
  limit: number;
  data: Documento[];
}

export interface FiltrosOpciones {
  areas: string[];
  anios: number[];
  tipos: string[];
}

export type SortBy = "relevancia" | "fecha_modificacion" | "nombre_archivo";

export interface BuscarParams {
  q?: string;
  area?: string;
  anio?: string;
  tipo?: string;
  sort_by?: SortBy;
  page?: number;
  limit?: number;
}
