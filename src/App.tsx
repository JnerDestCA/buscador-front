import { useState } from "react"
import { FileText } from "lucide-react"
import { SearchBar } from "./components/SearchBar"
import { SyncButton } from "./components/SyncButton"
import { FiltersPanel } from "./components/FiltersPanel"
import { ResultsTable } from "./components/ResultsTable"
import { Pagination } from "./components/Pagination"
import { PreviewDrawer } from "./components/PreviewDrawer"
import { useBuscarParams } from "./hooks/useBuscarParams"
import { useDocumentos } from "./hooks/useDocumentos"
import { useDebouncedValue } from "./hooks/useDebouncedValue"
import { type Documento } from "./types/documento"

function App() {
  const {
    q,
    area,
    anio,
    tipo,
    sort_by,
    page,
    limit,
    setQ,
    setFilters,
    setSortBy,
    setPage,
    clearFilters,
  } = useBuscarParams()

  const debouncedQ = useDebouncedValue(q, 300)
  
  const { data, isLoading, isFetching, error, refetch } = useDocumentos({
    q: debouncedQ || undefined,
    area: area || undefined,
    anio: anio || undefined,
    tipo: tipo || undefined,
    sort_by,
    page,
    limit,
  })

  const [previewDoc, setPreviewDoc] = useState<Documento | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  const handlePreview = (documento: Documento) => {
    setPreviewDoc(documento)
    setPreviewOpen(true)
  }

  const hasFilters = !!(area || anio || tipo)

  const totalPages = data ? Math.ceil(data.total / data.limit) : 0

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-emerald-700" />
                <span className="text-lg font-semibold text-gray-900">Buscador de Documentos</span>
              </div>
              <SyncButton />
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">Error al cargar los documentos</div>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-emerald-700 text-white rounded-md hover:bg-emerald-800"
            >
              Reintentar
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <div className="flex items-center gap-2 flex-shrink-0">
              <FileText className="h-6 w-6 text-emerald-700" />
              <span className="text-lg font-semibold text-gray-900 hidden sm:block">Buscador de Documentos</span>
            </div>
            <SearchBar value={q} onChange={setQ} />
            <div className="flex items-center gap-2">
              <FiltersPanel
                area={area}
                anio={anio}
                tipo={tipo}
                sort_by={sort_by}
                onFiltersChange={setFilters}
                onSortChange={setSortBy}
                isMobile={true}
              />
              <SyncButton />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="lg:grid lg:grid-cols-4 lg:gap-6">
          {/* Desktop Filters */}
          <aside className="hidden lg:block">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h2 className="text-sm font-medium text-gray-900 mb-4">Filtros</h2>
              <FiltersPanel
                area={area}
                anio={anio}
                tipo={tipo}
                sort_by={sort_by}
                onFiltersChange={setFilters}
                onSortChange={setSortBy}
                isMobile={false}
              />
            </div>
          </aside>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4">
                <ResultsTable
                  documentos={data?.data || []}
                  isLoading={isLoading}
                  isFetching={isFetching}
                  total={data?.total || 0}
                  page={page}
                  limit={limit}
                  sort_by={sort_by}
                  onSortChange={setSortBy}
                  onPreview={handlePreview}
                  onClearFilters={clearFilters}
                  hasFilters={hasFilters}
                />
                {data && data.total > 0 && (
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <PreviewDrawer
        documento={previewDoc}
        open={previewOpen}
        onOpenChange={setPreviewOpen}
      />
    </div>
  )
}

export default App
