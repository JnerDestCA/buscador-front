# Documentación del Proyecto: Buscador de Documentos

## Índice
- [Descripción General](#descripción-general)
- [Stack Tecnológico](#stack-tecnológico)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Arquitectura y Flujo](#arquitectura-y-flujo)
- [Casos de Uso](#casos-de-uso)
- [Componentes Principales](#componentes-principales)
- [Hooks Personalizados](#hooks-personalizados)
- [API y Contrato](#api-y-contrato)
- [Mocks (MSW)](#mocks-msw)
- [Rutas y Navegación](#rutas-y-navegación)
- [Estado y Sincronización con URL](#estado-y-sincronización-con-url)
- [Responsive y Accesibilidad](#responsive-y-accesibilidad)
- [Guía para Adaptarte al Proyecto](#guía-para-adaptarte-al-proyecto)
- [Comandos Útiles](#comandos-útiles)

## Descripción General

El Buscador de Documentos es una aplicación web React + TypeScript + Tailwind CSS para buscar, filtrar y previsualizar documentos PDF. La URL es la fuente de verdad para todo el estado.

Características principales:
- Búsqueda con debounce de 300ms
- Filtrado por área, año y tipo de documento
- Ordenamiento por relevancia, fecha de modificación o nombre
- Paginación
- Vista previa en drawer lateral con iframe
- Copia de ruta de documento
- Sincronización con backend
- Soporte responsive
- Mocks con MSW para desarrollo

## Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 19.3.1 | Framework UI |
| TypeScript | ~6.0.3 | Tipado estático |
| Vite | 8.3.4 | Build tool |
| Tailwind CSS | 4.3.3 | Estilos |
| React Router DOM | 7.18.4 | Navegación |
| TanStack Query | 5.105.0 | Gestión de estado servidor |
| MSW | 3.0.3 | Mocks |
| Radix UI | Varios | Componentes accesibles |
| Lucide React | 1.61.0 | Iconos |
| Sonner | 2.0.8 | Toasts |
| date-fns | 4.4.0 | Fechas |

## Estructura del Proyecto

```
src/
├── App.tsx              # Componente principal
├── AppRouter.tsx        # Rutas con providers
├── main.tsx             # Entrada, MSW en dev
├── components/          # Componentes UI
│   ├── ui/              # Componentes base
│   ├── FiltersPanel.tsx
│   ├── Pagination.tsx
│   ├── PreviewDrawer.tsx
│   ├── ResultsTable.tsx
│   ├── SearchBar.tsx
│   └── SyncButton.tsx
├── hooks/               # Hooks personalizados
│   ├── useBuscarParams.ts
│   ├── useDebouncedValue.ts
│   ├── useDocumentos.ts
│   └── useFiltroOpciones.ts
├── lib/                 # Utilidades
│   ├── api.ts
│   ├── clipboard.ts
│   ├── highlight.tsx
│   └── utils.ts
├── mocks/               # MSW
└── types/               # Tipos
```

## Arquitectura y Flujo

1. Usuario interactúa → Componentes actualizan URL vía useBuscarParams
2. Hooks leen URL → Ejecutan queries con TanStack Query
3. MSW/API responde → Datos se renderizan
4. placeholderData mantiene datos anteriores mientras carga

Principios: URL como fuente de verdad, debounce 300ms, separación lógica/UI

## Casos de Uso

- **Buscar**: Debounce 300ms, actualiza URL con replace, resetea página
- **Filtrar/Ordenar**: Actualiza URL con push, resetea página
- **Paginar**: Actualiza URL con push
- **Previsualizar**: Abre drawer, iframe con #page=1, maneja 404/410
- **Copiar ruta**: clipboard API con fallback
- **Sincronizar**: POST /indexer/sync con toasts según status
- **Estados**: Skeletons, tabla anterior visible, empty/error states

## Componentes Principales

| Componente | Responsabilidad |
|------------|-----------------|
| App.tsx | Layout y orquestación |
| SearchBar.tsx | Búsqueda con debounce |
| FiltersPanel.tsx | Filtros (sidebar / Sheet móvil) |
| ResultsTable.tsx | Tabla desktop / tarjetas móvil |
| Pagination.tsx | Paginación |
| PreviewDrawer.tsx | Vista previa PDF |
| SyncButton.tsx | Sincronización |

## Hooks Personalizados

| Hook | Propósito |
|------|-----------|
| useBuscarParams() | Sincroniza con URL, defaults, setters |
| useDebouncedValue() | Debounce genérico |
| useDocumentos() | Query documentos (placeholderData, staleTime 30s) |
| useFiltroOpciones() | Query filtros (staleTime 10min) |

## API y Contrato

Base: `/api/v1`

- `GET /documentos/search?q&area&anio&tipo&page&limit&sort_by` → `{total,page,limit,data:[]}`
- `GET /filtros/opciones` → `{areas,anios,tipos}`
- `POST /indexer/sync` → 202/409/429
- `GET /documentos/{id}/preview` → PDF (404/410)

Highlights con `**` se renderizan con `<mark>` sin dangerouslySetInnerHTML.

## Mocks (MSW)

En `src/mocks/handlers.ts`. Inicializado en dev. Cubre filtros, paginación, highlights, nulls, SIN_CLASIFICAR/OTRO, errores.

## Rutas

`/` → `/buscar` | `/buscar` → App | `/*` → `/buscar`

## Responsive y Accesibilidad

- < lg: Filtros en Sheet
- < md: Tabla → tarjetas
- Labels, focus-visible, aria-live, keyboard nav, Escape para cerrar

## Guía Rápida

1. Entender flujo: leer App.tsx + useBuscarParams.ts
2. Probar con mocks: `pnpm dev`
3. Seguir patrones: componentes ui/, cn(), TanStack Query
4. URL siempre fuente de verdad

## Comandos

```bash
pnpm dev
pnpm build
pnpm lint
pnpm preview
```

## ANEXO: Puntos clave para pasar de mocks a backend real y responder observaciones

### 1. Archivos clave a tener en cuenta

| Archivo | ¿Para qué? | Notas |
|---|---|---|
| `src/main.tsx` | Inicialización de la app | Aquí se levanta MSW únicamente en `import.meta.env.DEV`. |
| `src/lib/api.ts` | Cliente HTTP | Todas las llamadas usan `API_BASE = "/api/v1"`. Ahí se centralizan los endpoints. |
| `src/mocks/handlers.ts` | Datos de ejemplo | Aquí están los documentos, filtros, `sync`, `preview` con sus códigos 404/410. |
| `src/hooks/useBuscarParams.ts` | Estado sincronizado con URL | La URL es la **fuente de verdad**. Controla `q`, filtros, `sort_by`, `page`. |
| `src/lib/highlight.tsx` | Renderizado de coincidencias | Convierte `**texto**` a `<mark>`. **NO** usa `dangerouslySetInnerHTML`. |
| `src/types/documento.ts` | Contrato estricto | Si el backend difiere en nombres/estructura, aquí verás qué espera la app. |

### 2. Cómo quitar los mocks y usar backend real

#### Paso 1: Quitar MSW de `src/main.tsx`

Eliminar o comentar este bloque completo:

```tsx
// src/main.tsx
if (import.meta.env.DEV) {
  import('./mocks/browser').then(({ worker }) => {
    worker.start()
  })
}
Con esto, las peticiones dejarán de interceptarse y saldrán al backend.
Paso 2: Apuntar al backend desde src/lib/api.ts
Actualmente usa ruta relativa:
// src/lib/api.ts
const API_BASE = "/api/v1";
Tienes dos opciones válidas:
- Opción A: Proxy con Vite (recomendado para desarrollo)  
Mantén API_BASE = "/api/v1". En vite.config.ts añade un proxy:
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://TU_BACKEND:PUERTO',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
- Opción B: URL completa (si está en otro origen)  
Cambia directamente por la URL del backend. Requiere CORS habilitado en el backend.
// src/lib/api.ts
const API_BASE = "http://TU_BACKEND:PUERTO/api/v1";
Paso 3: (Opcional) Eliminar mocks
Si ya no se usarán, se puede borrar src/mocks/ por completo. No rompe componentes, hooks ni lib/api.ts.
3. Lógica clave para entender rápido
A) URL como fuente de verdad (src/hooks/useBuscarParams.ts)
Este hook lee/escribe directamente los query params. Puntos importantes:
- Defaults: Si hay q -> sort_by = "relevancia". Si no hay q -> sort_by = "fecha_modificacion". page = 1, limit = 10.
- Cambio de búsqueda/filtros/orden: Resetea page a 1 para evitar inconsistencias.
- q con debounce: SearchBar usa useDebouncedValue (300ms). Al actualizar q, se hace con replace: true para no ensuciar el historial.
- Filtros/paginación: Usan replace: false (push) para permitir navegar con "Atrás/Adelante".
- Limpieza de params: Cuando un valor queda vacío, se elimina del query string.
B) Renderizado de highlights sin HTML peligroso (src/lib/highlight.tsx)
// src/lib/highlight.tsx
export function highlightText(text: string): ReactNode[] {
  if (!text) return [];
  
  const parts = text.split("**");
  const result: ReactNode[] = [];
  
  parts.forEach((part, index) => {
    if (index % 2 === 1) {
      result.push(
        <mark key={index} className="bg-yellow-200 text-gray-900">
          {part}
        </mark>
      );
    } else if (part) {
      result.push(<span key={index}>{part}</span>);
    }
  });
  
  return result;
}
- Se parte por "**". Los tramos impares son los que vienen entre ** ... ** y se envuelven en <mark>.
- Nunca se usa dangerouslySetInnerHTML. Esto es intencional por seguridad.
- El backend debe enviar el campo highlight con ese formato para que funcione correctamente.
C) Peticiones y caché (src/hooks/useDocumentos.ts / src/hooks/useFiltroOpciones.ts)
- useDocumentos: placeholderData: (prev) => prev + staleTime: 30000. Esto evita parpadeo al cambiar página/filtros manteniendo la tabla anterior visible.
- useFiltroOpciones: staleTime: 600000 (10 min). Al pulsar "Sincronizar", se invalidan con queryClient.invalidateQueries para refrescar listas.
- Keys: Se usan arrays con los parámetros (["documentos", params]) para cachear correctamente por búsqueda/filtros.
4. Contrato que DEBE cumplir el backend
Para que la app funcione sin cambios, revisa esto punto por punto.
Endpoint	Método	Requisito
/api/v1/documentos/search	GET	Acepta q, area, anio, tipo, page, limit, sort_by. sort_by debe aceptar relevancia | fecha_modificacion | nombre_archivo. limit por defecto 10, máx 50. Si page * limit > 10000 debe responder 400.
/api/v1/documentos/search	GET	Respuesta exacta: { total, page, limit, data: [...] }. Cada item con id, nombre_archivo, ruta_compartida, origen_texto (NATIVO | OCR), metadatos: { area, anio, codigo, tipo_documento }, fecha_modificacion (ISO 8601), tamano_bytes, highlight (con **). anio/codigo pueden ser null. area puede ser SIN_CLASIFICAR, tipo_documento puede ser OTRO.
/api/v1/filtros/opciones	GET	Respuesta: { areas: string[], anios: number[], tipos: string[] }
/api/v1/indexer/sync	POST	Debe devolver 202 con { estado: "INICIADA" }, 409 con { estado: "EN_CURSO" } o 429. La UI ya está preparada para esos 3 casos.
/api/v1/documentos/{id}/preview	GET	Debe devolver Content-Type: application/pdf. 404 si no existe. 410 si el archivo ya no está disponible. El drawer muestra "El archivo ya no está disponible" para ambos.
5. Checklist rápido para responder observaciones
Posible observación	Respuesta clara
"¿Por qué la URL es la fuente de verdad?"	Para compartir búsquedas/filtros por enlace, mantener historial con back/forward y que recargar la página restaure el mismo estado. Todo va por useBuscarParams.
"¿Por qué usar placeholders?"	placeholderData evita parpadeo al paginar/filtrar: se muestra la tabla anterior mientras llega la nueva petición.
"¿Por qué debounce 300ms?"	Evita llamadas innecesarias al escribir. Se aplica al q tanto para la petición como para actualizar la URL con replace.
"¿Por qué no usar dangerouslySetInnerHTML?"	Se usa split("**") + <mark> para renderizar solo los tramos marcados por el backend, sin inyectar HTML arbitrario.
"¿Cómo cambiar de mocks a backend?"	Quitar el worker.start() de main.tsx, apuntar API_BASE a backend (proxy o URL directa) y asegurar que cumpla el contrato de types/documento.ts.
"¿Cómo probar rápido?"	Levantar backend con el contrato, quitar MSW, configurar proxy/URL y recargar. Los filtros, paginación, preview y sync deben funcionar tal como están.
```	 