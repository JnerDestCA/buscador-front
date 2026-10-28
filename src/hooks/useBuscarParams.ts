import { useSearchParams } from "react-router-dom";
import { type SortBy } from "../types/documento";

export function useBuscarParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") || "";
  const area = searchParams.get("area") || "";
  const anio = searchParams.get("anio") || "";
  const tipo = searchParams.get("tipo") || "";
  const sort_by_param = searchParams.get("sort_by");
  const page_param = searchParams.get("page");

  // Determine default sort_by
  const defaultSortBy: SortBy = q ? "relevancia" : "fecha_modificacion";
  const sort_by: SortBy = (sort_by_param as SortBy) || defaultSortBy;

  const page = page_param ? parseInt(page_param) : 1;

  const updateParams = (updates: Record<string, string | number | undefined>, options: { replace?: boolean } = {}) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });

    setSearchParams(newParams, { replace: options.replace });
  };

  const setQ = (value: string) => {
    // Reset page to 1 when q changes
    updateParams({ q: value || undefined, page: 1 }, { replace: true });
  };

  const setFilters = (filters: { area?: string; anio?: string; tipo?: string }) => {
    // Reset page to 1 when filters change
    updateParams({ ...filters, page: 1 }, { replace: false });
  };

  const setSortBy = (value: SortBy) => {
    // Reset page to 1 when sort changes
    updateParams({ sort_by: value, page: 1 }, { replace: false });
  };

  const setPage = (value: number) => {
    updateParams({ page: value === 1 ? undefined : value }, { replace: false });
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams(q ? { q } : {}));
  };

  return {
    q,
    area,
    anio,
    tipo,
    sort_by,
    page,
    limit: 10,
    setQ,
    setFilters,
    setSortBy,
    setPage,
    clearFilters,
  };
}
