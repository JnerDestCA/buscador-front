import { useState } from "react"
import { ExternalLink, Copy, FileText } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { Badge } from "./ui/badge"
import { api } from "../lib/api"
import { copyToClipboard, showManualCopyDialog } from "../lib/clipboard"
import { toast } from "sonner"
import { type Documento } from "../types/documento"

interface PreviewDrawerProps {
  documento: Documento | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PreviewDrawer({ documento, open, onOpenChange }: PreviewDrawerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleCopyRuta = async () => {
    if (!documento) return
    
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

  const handleOpenInNewTab = () => {
    if (!documento) return
    window.open(api.obtenerPreview(documento.id), "_blank", "noopener,noreferrer")
  }

  const handleIframeLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  const getAreaLabel = (area: string) => {
    if (area === "SIN_CLASIFICAR") return "Sin clasificar"
    return area
  }

  const getTipoLabel = (tipo: string) => {
    if (tipo === "OTRO") return "Otro"
    return tipo
  }

  if (!documento) return null

  const previewUrl = api.obtenerPreview(documento.id) + "#page=1"

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 pb-4 border-b">
            <SheetTitle className="text-lg font-semibold text-gray-900 pr-8">
              {documento.nombre_archivo}
            </SheetTitle>
          </SheetHeader>
          
          <div className="p-6 pb-4 border-b">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Área:</span>
                <div className="mt-1">
                  <Badge variant={documento.metadatos.area === "SIN_CLASIFICAR" ? "secondary" : "default"}>
                    {getAreaLabel(documento.metadatos.area)}
                  </Badge>
                </div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Año:</span>
                <p className="mt-1 text-gray-900">{documento.metadatos.anio || "-"}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Código:</span>
                <p className="mt-1 text-gray-900">{documento.metadatos.codigo || "-"}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Tipo:</span>
                <p className="mt-1 text-gray-900">{getTipoLabel(documento.metadatos.tipo_documento)}</p>
              </div>
              <div className="col-span-2">
                <span className="font-medium text-gray-700">Origen de texto:</span>
                <p className="mt-1 text-gray-900">{documento.origen_texto}</p>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button onClick={handleCopyRuta} variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Copiar ruta
              </Button>
              <Button onClick={handleOpenInNewTab} variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Abrir documento completo
              </Button>
            </div>
          </div>
          
          <div className="flex-1 p-6 pt-4 overflow-hidden">
            <div className="w-full h-full border border-gray-200 rounded-lg overflow-hidden relative">
              {isLoading && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div>
                </div>
              )}
              {hasError ? (
                <div className="flex items-center justify-center h-full bg-gray-50">
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">El archivo ya no está disponible</p>
                  </div>
                </div>
              ) : (
                <iframe
                  src={previewUrl}
                  className="w-full h-full"
                  title={`Vista previa de ${documento.nombre_archivo}`}
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                />
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
