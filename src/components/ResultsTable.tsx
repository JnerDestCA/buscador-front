import { Eye, ExternalLink, Copy, ArrowUpDown, ArrowUp } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Skeleton } from "./ui/skeleton"
import { copyToClipboard, showManualCopyDialog } from "../lib/clipboard"
import { highlightText } from "../lib/highlight"
import { toast } from "sonner"
import { type Documento, type SortBy } from "../types/documento"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface ResultsTableProps {
  documentos: Documento[]
  isLoading: boolean
  isFetching: boolean
  total: number
  page: number
  limit: number
  sort_by: SortBy
  onSortChange: (sort: SortBy) => void
  onPreview: (documento: Documento) => void
  onClearFilters: () => void
  hasFilters: boolean
}

export function ResultsTable({
  documentos,
  isLoading,
  isFetching,
  total,
  page,
  limit,
  sort_by,
  onSortChange,
  onPreview,
  onClearFilters,
  hasFilters,
}: ResultsTableProps) {
  const handleCopyRuta = async (documento: Documento) => {
    const result = await copyToClipboard(documento.ruta_compartida)
    if (result.success) {
      toast.success("Ruta copiada")
    } else if (result.needsManualCopy) {
      showManualCopyDialog(documento.ruta_compartida)
      toast.info("Pulsa Ctrl+C para copiar")
    } else {
      showManualCopyDialog(documento.ruta_compartida)
      toast.info("Pulsa Ctrl+C para copiar")
    }
  }

  const handleOpenInNewTab = (documento: Documento) => {
    window.open(`/api/v1/documentos/${documento.id}/preview`, "_blank", "noopener,noreferrer")
  }

  const getAreaLabel = (area: string) => {
    if (area === "SIN_CLASIFICAR") return "Sin clasificar"
    return area
  }

  const getTipoLabel = (tipo: string) => {
    if (tipo === "OTRO") return "Otro"
    return tipo
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: es })
    } catch {
      return dateString
    }
  }

  const handleSort = (field: SortBy) => {
    if (field === "relevancia" && sort_by === "relevancia") {
      // Keep relevancia or could toggle
    }
    onSortChange(field)
  }

  const getSortIcon = (field: SortBy) => {
    if (sort_by !== field) return <ArrowUpDown className="h-4 w-4" />
    // For simplicity, show arrow up when active
    return <ArrowUp className="h-4 w-4" />
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <div className="flex gap-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (total === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">No se encontraron documentos</div>
        {hasFilters && (
          <Button onClick={onClearFilters} variant="outline">
            Limpiar filtros
          </Button>
        )}
      </div>
    )
  }

  const startIndex = (page - 1) * limit + 1
  const endIndex = Math.min(page * limit, total)

  return (
    <div className={isFetching ? "opacity-60" : ""}>
      <div className="mb-4 text-sm text-gray-600" aria-live="polite">
        Mostrando {startIndex}-{endIndex} de {total} resultados
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-700">
                <button
                  onClick={() => handleSort("nombre_archivo")}
                  className="flex items-center gap-1 hover:text-gray-900"
                >
                  Documento
                  {getSortIcon("nombre_archivo")}
                </button>
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-700">Tipo</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-700">Código</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-700">Área</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-700">Año</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-700">
                <button
                  onClick={() => handleSort("fecha_modificacion")}
                  className="flex items-center gap-1 hover:text-gray-900"
                >
                  Modificado
                  {getSortIcon("fecha_modificacion")}
                </button>
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {documentos.map((doc) => (
              <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900">{doc.nombre_archivo}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {highlightText(doc.highlight)}
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">
                  {getTipoLabel(doc.metadatos.tipo_documento)}
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">
                  {doc.metadatos.codigo || "-"}
                </td>
                <td className="py-3 px-4">
                  <Badge variant={doc.metadatos.area === "SIN_CLASIFICAR" ? "secondary" : "default"}>
                    {getAreaLabel(doc.metadatos.area)}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">
                  {doc.metadatos.anio || "-"}
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">
                  {formatDate(doc.fecha_modificacion)}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <Button
                      onClick={() => onPreview(doc)}
                      variant="ghost"
                      size="sm"
                      aria-label="Ver previa"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleOpenInNewTab(doc)}
                      variant="ghost"
                      size="sm"
                      aria-label="Abrir en nueva pestaña"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleCopyRuta(doc)}
                      variant="ghost"
                      size="sm"
                      aria-label="Copiar ruta"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {documentos.map((doc) => (
          <div key={doc.id} className="border border-gray-200 rounded-lg p-4">
            <div className="font-medium text-gray-900 mb-2">{doc.nombre_archivo}</div>
            <div className="text-sm text-gray-600 mb-3">{highlightText(doc.highlight)}</div>
            
            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div>
                <span className="text-gray-500">Tipo:</span> {getTipoLabel(doc.metadatos.tipo_documento)}
              </div>
              <div>
                <span className="text-gray-500">Código:</span> {doc.metadatos.codigo || "-"}
              </div>
              <div>
                <span className="text-gray-500">Área:</span>{" "}
                <Badge variant={doc.metadatos.area === "SIN_CLASIFICAR" ? "secondary" : "default"} className="text-xs">
                  {getAreaLabel(doc.metadatos.area)}
                </Badge>
              </div>
              <div>
                <span className="text-gray-500">Año:</span> {doc.metadatos.anio || "-"}
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">Modificado:</span> {formatDate(doc.fecha_modificacion)}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button onClick={() => onPreview(doc)} variant="outline" size="sm" className="flex-1">
                <Eye className="h-4 w-4 mr-1" />
                Ver previa
              </Button>
              <Button onClick={() => handleOpenInNewTab(doc)} variant="outline" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button onClick={() => handleCopyRuta(doc)} variant="outline" size="sm">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
