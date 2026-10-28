import { Filter } from "lucide-react"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { useFiltroOpciones } from "../hooks/useFiltroOpciones"
import { type SortBy } from "../types/documento"

interface FiltersPanelProps {
  area: string
  anio: string
  tipo: string
  sort_by: SortBy
  onFiltersChange: (filters: { area?: string; anio?: string; tipo?: string }) => void
  onSortChange: (sort: SortBy) => void
  isMobile?: boolean
}

function FiltersContent({ area, anio, tipo, sort_by, onFiltersChange, onSortChange }: FiltersPanelProps) {
  const { data: filtros, isLoading } = useFiltroOpciones()

  const getAreaLabel = (a: string) => {
    if (a === "SIN_CLASIFICAR") return "Sin clasificar"
    return a
  }

  const getTipoLabel = (t: string) => {
    if (t === "OTRO") return "Otro"
    return t
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="sort-by" className="text-xs font-medium text-gray-700">
          Ordenar por
        </Label>
        <Select value={sort_by} onValueChange={(value) => onSortChange(value as SortBy)}>
          <SelectTrigger className="mt-1" id="sort-by">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevancia">Relevancia</SelectItem>
            <SelectItem value="fecha_modificacion">Fecha de modificación</SelectItem>
            <SelectItem value="nombre_archivo">Nombre de archivo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <fieldset className="border-t border-gray-200 pt-6">
        <legend className="text-xs font-medium text-gray-700">Área</legend>
        <div className="mt-3 space-y-2">
          {isLoading ? (
            <div className="text-sm text-gray-500">Cargando...</div>
          ) : (
            <>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="area"
                  value=""
                  checked={area === ""}
                  onChange={(e) => onFiltersChange({ area: e.target.value || undefined })}
                  className="size-4 border-gray-300 text-emerald-700 focus:ring-emerald-600"
                />
                <span className="text-sm text-gray-700">Todas</span>
              </label>
              {filtros?.areas.map((a) => (
                <label key={a} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="area"
                    value={a}
                    checked={area === a}
                    onChange={(e) => onFiltersChange({ area: e.target.value })}
                    className="size-4 border-gray-300 text-emerald-700 focus:ring-emerald-600"
                  />
                  <span className="text-sm text-gray-700">{getAreaLabel(a)}</span>
                </label>
              ))}
            </>
          )}
        </div>
      </fieldset>

      <fieldset className="border-t border-gray-200 pt-6">
        <legend className="text-xs font-medium text-gray-700">Año</legend>
        <div className="mt-3">
          <Select value={anio || "all"} onValueChange={(value) => onFiltersChange({ anio: value === "all" ? undefined : value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {filtros?.anios.map((a) => (
                <SelectItem key={a} value={String(a)}>
                  {a}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </fieldset>

      <fieldset className="border-t border-gray-200 pt-6">
        <legend className="text-xs font-medium text-gray-700">Tipo de documento</legend>
        <div className="mt-3">
          <Select value={tipo || "all"} onValueChange={(value) => onFiltersChange({ tipo: value === "all" ? undefined : value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {filtros?.tipos.map((t) => (
                <SelectItem key={t} value={t}>
                  {getTipoLabel(t)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </fieldset>
    </div>
  )
}

export function FiltersPanel(props: FiltersPanelProps) {
  if (props.isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[350px]">
          <SheetHeader>
            <SheetTitle>Filtros</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FiltersContent {...props} />
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className="space-y-6">
      <FiltersContent {...props} />
    </div>
  )
}
