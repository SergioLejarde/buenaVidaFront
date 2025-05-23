import { modeloVitrina } from "./modelo.js";
import { vistaVitrina } from "./vista.js";

const vitrinaControlador = (() => {
  let paginaActual = 1;

  function configurarEventos(): void {
    document.getElementById("btn-buscar")?.addEventListener("click", () => {
      paginaActual = 1;
      cargarProductos();
    });

    document.getElementById("paginacion")?.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("page-link")) {
        const nuevaPagina = parseInt(target.dataset.pagina || "1");
        if (!isNaN(nuevaPagina)) {
          paginaActual = nuevaPagina;
          cargarProductos();
        }
      }
    });
  }

  async function cargarProductos(): Promise<void> {
    const q = (document.getElementById("buscador") as HTMLInputElement)?.value.trim();
    const min = parseFloat((document.getElementById("precio-min") as HTMLInputElement)?.value);
    const max = parseFloat((document.getElementById("precio-max") as HTMLInputElement)?.value);

    const filtros: any = {
      q,
      page: paginaActual,
      limit: 12,
    };

    if (!isNaN(min)) filtros.min = min;
    if (!isNaN(max)) filtros.max = max;

    try {
      const { productos, totalPaginas } = await modeloVitrina.obtenerProductos(filtros);
      vistaVitrina.renderProductos(productos);
      vistaVitrina.renderPaginacion(totalPaginas, paginaActual);
    } catch (error) {
      console.error("❌ Error al cargar productos:", error);
    }
  }

  function init(): void {
    configurarEventos();
    cargarProductos();
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", vitrinaControlador.init);
