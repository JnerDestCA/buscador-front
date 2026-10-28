import { http, HttpResponse } from "msw";
import { type BuscarDocumentosResponse, type FiltrosOpciones } from "../types/documento";

const mockDocumentos = [
  {
    id: "doc-001",
    nombre_archivo: "Informe_Anual_2023.pdf",
    ruta_compartida: "\\\\servidor\\documentos\\2023\\Informe_Anual_2023.pdf",
    origen_texto: "NATIVO" as const,
    metadatos: {
      area: "LOGISTICA",
      anio: 2023,
      codigo: "INF-2023-001",
      tipo_documento: "INFORME",
    },
    fecha_modificacion: "2023-12-15T10:30:00Z",
    tamano_bytes: 2457600,
    highlight: "Este documento trata sobre la gestión de **LOGISTICA** y distribución de productos durante el año 2023.",
  },
  {
    id: "doc-002",
    nombre_archivo: "Acta_Reunion_2024.pdf",
    ruta_compartida: "\\\\servidor\\documentos\\2024\\Acta_Reunion_2024.pdf",
    origen_texto: "OCR" as const,
    metadatos: {
      area: "SIN_CLASIFICAR",
      anio: null,
      codigo: null,
      tipo_documento: "OTRO",
    },
    fecha_modificacion: "2024-03-20T14:15:00Z",
    tamano_bytes: 1024000,
    highlight: "Se discutieron temas relacionados con las operaciones de la empresa.",
  },
  {
    id: "doc-003",
    nombre_archivo: "Presupuesto_2024.pdf",
    ruta_compartida: "\\\\servidor\\documentos\\2024\\Presupuesto_2024.pdf",
    origen_texto: "NATIVO" as const,
    metadatos: {
      area: "FINANZAS",
      anio: 2024,
      codigo: "PRE-2024-001",
      tipo_documento: "PRESUPUESTO",
    },
    fecha_modificacion: "2024-01-10T09:00:00Z",
    tamano_bytes: 1536000,
    highlight: "Presupuesto asignado para el departamento de **FINANZAS** con incremento del 15%.",
  },
];

export const handlers = [
  http.get("/api/v1/documentos/search", ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q") || "";
    const area = url.searchParams.get("area");
    const anio = url.searchParams.get("anio");
    const tipo = url.searchParams.get("tipo");
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const sort_by = url.searchParams.get("sort_by") || "relevancia";

    // Check if page * limit > 10000
    if (page * limit > 10000) {
      return HttpResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    let filtered = [...mockDocumentos];

    if (q) {
      filtered = filtered.filter(
        (doc) =>
          doc.nombre_archivo.toLowerCase().includes(q.toLowerCase()) ||
          doc.highlight.toLowerCase().includes(q.toLowerCase())
      );
    }

    if (area) {
      filtered = filtered.filter((doc) => doc.metadatos.area === area);
    }

    if (anio) {
      filtered = filtered.filter((doc) => doc.metadatos.anio === parseInt(anio));
    }

    if (tipo) {
      filtered = filtered.filter((doc) => doc.metadatos.tipo_documento === tipo);
    }

    // Sorting
    if (sort_by === "fecha_modificacion") {
      filtered.sort((a, b) => new Date(b.fecha_modificacion).getTime() - new Date(a.fecha_modificacion).getTime());
    } else if (sort_by === "nombre_archivo") {
      filtered.sort((a, b) => a.nombre_archivo.localeCompare(b.nombre_archivo));
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filtered.slice(startIndex, endIndex);

    const response: BuscarDocumentosResponse = {
      total: filtered.length,
      page,
      limit,
      data: paginatedData,
    };

    return HttpResponse.json(response);
  }),

  http.get("/api/v1/filtros/opciones", () => {
    const response: FiltrosOpciones = {
      areas: ["LOGISTICA", "FINANZAS", "SIN_CLASIFICAR"],
      anios: [2023, 2024],
      tipos: ["INFORME", "PRESUPUESTO", "OTRO"],
    };
    return HttpResponse.json(response);
  }),

  http.post("/api/v1/indexer/sync", () => {
    // Simulate different responses - can be randomized or based on logic
    const random = Math.random();
    if (random < 0.7) {
      return HttpResponse.json({ estado: "INICIADA" }, { status: 202 });
    } else if (random < 0.9) {
      return HttpResponse.json({ estado: "EN_CURSO" }, { status: 409 });
    } else {
      return HttpResponse.json({ error: "Too Many Requests" }, { status: 429 });
    }
  }),

  http.get("/api/v1/documentos/:id/preview", ({ params }) => {
    const { id } = params;
    if (id === "doc-404") {
      return HttpResponse.json({ error: "Not Found" }, { status: 404 });
    }
    if (id === "doc-410") {
      return HttpResponse.json({ error: "Gone" }, { status: 410 });
    }
    // Return a PDF blob for successful preview
    const pdfBlob = new Blob(["%PDF-1.4\nmock pdf content"], { type: "application/pdf" });
    return new HttpResponse(pdfBlob, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
      },
    });
  }),
];
