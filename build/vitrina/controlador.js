var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Importamos el modelo y la vista de la vitrina
import { modeloVitrina } from "./modelo.js";
import { vistaVitrina } from "./vista.js";
// Módulo controlador: coordina los eventos de la interfaz y gestiona la lógica de la vitrina
const vitrinaControlador = (() => {
    // Variable interna para llevar el seguimiento de la página actual
    let paginaActual = 1;
    // Configura los eventos del DOM relacionados con búsqueda y paginación
    function configurarEventos() {
        var _a, _b;
        // Evento del botón "Aplicar filtros"
        (_a = document.getElementById("btn-buscar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            paginaActual = 1; // Resetea la página al inicio al buscar
            cargarProductos(); // Carga productos filtrados
        });
        // Evento de clic en la barra de paginación
        (_b = document.getElementById("paginacion")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (e) => {
            const target = e.target;
            // Verifica que se haya hecho clic en un botón de página
            if (target.classList.contains("page-link")) {
                const nuevaPagina = parseInt(target.dataset.pagina || "1");
                if (!isNaN(nuevaPagina)) {
                    paginaActual = nuevaPagina; // Actualiza la página actual
                    cargarProductos(); // Carga productos de esa página
                }
            }
        });
    }
    // Función central para solicitar los productos al modelo y renderizarlos en la vista
    function cargarProductos() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            // Lee los filtros desde los inputs del HTML
            const q = (_a = document.getElementById("buscador")) === null || _a === void 0 ? void 0 : _a.value.trim();
            const min = parseFloat((_b = document.getElementById("precio-min")) === null || _b === void 0 ? void 0 : _b.value);
            const max = parseFloat((_c = document.getElementById("precio-max")) === null || _c === void 0 ? void 0 : _c.value);
            // Prepara el objeto de filtros para enviar al backend
            const filtros = {
                q,
                page: paginaActual,
                limit: 12, // Se muestran 12 productos por página
            };
            // Añade filtros de precio si son válidos numéricamente
            if (!isNaN(min))
                filtros.min = min;
            if (!isNaN(max))
                filtros.max = max;
            try {
                // Llama al modelo para obtener los productos desde el backend
                const { productos, totalPaginas } = yield modeloVitrina.obtenerProductos(filtros);
                // Pasa los datos a la vista para renderizar los productos y la paginación
                vistaVitrina.renderProductos(productos);
                vistaVitrina.renderPaginacion(totalPaginas, paginaActual);
            }
            catch (error) {
                console.error("❌ Error al cargar productos:", error);
            }
        });
    }
    // Función inicial: configura eventos y carga productos iniciales
    function init() {
        configurarEventos(); // Activa listeners
        cargarProductos(); // Carga la primera tanda de productos
    }
    // Exporta solo la función init
    return { init };
})();
// Ejecuta la función init cuando se carga el DOM
document.addEventListener("DOMContentLoaded", vitrinaControlador.init);
