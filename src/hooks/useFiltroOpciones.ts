import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { type FiltrosOpciones } from "../types/documento";

export function useFiltroOpciones() {
  return useQuery<FiltrosOpciones>({
    queryKey: ["filtros-opciones"],
    queryFn: api.obtenerFiltrosOpciones,
    staleTime: 600000, // 10 minutes
  });
}
