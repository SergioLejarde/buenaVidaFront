// Importamos el modelo y la vista de la vitrina
import { modeloVitrina } from "./modelo.js";
import { vistaVitrina } from "./vista.js";

// Módulo controlador: coordina los eventos de la interfaz y gestiona la lógica de la vitrina
const vitrinaControlador = (() => {
  // Variable interna para llevar el seguimiento de la página actual
  let paginaActual = 1;

  // Configura los eventos del DOM relacionados con búsqueda y paginación
  function configurarEventos(): void {
    // Evento del botón "Aplicar filtros"
    document.getElementById("btn-buscar")?.addEventListener("click", () => {
      paginaActual = 1;           // Resetea la página al inicio al buscar
      cargarProductos();          // Carga productos filtrados
    });

    // Evento de clic en la barra de paginación
    document.getElementById("paginacion")?.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;

      // Verifica que se haya hecho clic en un botón de página
      if (target.classList.contains("page-link")) {
        const nuevaPagina = parseInt(target.dataset.pagina || "1");

        if (!isNaN(nuevaPagina)) {
          paginaActual = nuevaPagina; // Actualiza la página actual
          cargarProductos();          // Carga productos de esa página
        }
      }
    });
  }

  // Función central para solicitar los productos al modelo y renderizarlos en la vista
  async function cargarProductos(): Promise<void> {
    // Lee los filtros desde los inputs del HTML
    const q = (document.getElementById("buscador") as HTMLInputElement)?.value.trim();
    const min = parseFloat((document.getElementById("precio-min") as HTMLInputElement)?.value);
    const max = parseFloat((document.getElementById("precio-max") as HTMLInputElement)?.value);

    // Prepara el objeto de filtros para enviar al backend
    const filtros: any = {
      q,
      page: paginaActual,
      limit: 12, // Se muestran 12 productos por página
    };

    // Añade filtros de precio si son válidos numéricamente
    if (!isNaN(min)) filtros.min = min;
    if (!isNaN(max)) filtros.max = max;

    try {
      // Llama al modelo para obtener los productos desde el backend
      const { productos, totalPaginas } = await modeloVitrina.obtenerProductos(filtros);

      // Pasa los datos a la vista para renderizar los productos y la paginación
      vistaVitrina.renderProductos(productos);
      vistaVitrina.renderPaginacion(totalPaginas, paginaActual);
    } catch (error) {
      console.error("❌ Error al cargar productos:", error);
    }
  }

  // Función inicial: configura eventos y carga productos iniciales
  function init(): void {
    configurarEventos(); // Activa listeners
    cargarProductos();   // Carga la primera tanda de productos
  }

  // Exporta solo la función init
  return { init };
})();

// Ejecuta la función init cuando se carga el DOM
document.addEventListener("DOMContentLoaded", vitrinaControlador.init);
