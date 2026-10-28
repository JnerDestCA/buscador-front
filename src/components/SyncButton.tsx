import { useMutation, useQueryClient } from "@tanstack/react-query"
import { RefreshCw } from "lucide-react"
import { Button } from "./ui/button"
import { api } from "../lib/api"
import { toast } from "sonner"

export function SyncButton() {
  const queryClient = useQueryClient()

  const syncMutation = useMutation({
    mutationFn: api.sincronizar,
    onSuccess: (result) => {
      if (result.status === 202) {
        toast.info("Sincronización iniciada")
      } else if (result.status === 409) {
        toast.warning("Sincronización ya en curso")
      }
      // Invalidate filters after sync
      queryClient.invalidateQueries({ queryKey: ["filtros-opciones"] })
      queryClient.invalidateQueries({ queryKey: ["documentos"] })
    },
    onError: (error: any) => {
      if (error.status === 429) {
        toast.error("Demasiadas solicitudes. Intente más tarde.")
      } else {
        toast.error("Error al sincronizar")
      }
    },
  })

  return (
    <Button
      onClick={() => syncMutation.mutate()}
      disabled={syncMutation.isPending}
      variant="outline"
      size="sm"
    >
      <RefreshCw className={`h-4 w-4 ${syncMutation.isPending ? "animate-spin" : ""}`} />
      Sincronizar
    </Button>
  )
}
