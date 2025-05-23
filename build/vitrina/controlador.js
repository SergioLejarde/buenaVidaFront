var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { modeloVitrina } from "./modelo.js";
import { vistaVitrina } from "./vista.js";
const vitrinaControlador = (() => {
    let paginaActual = 1;
    function configurarEventos() {
        var _a, _b;
        (_a = document.getElementById("btn-buscar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            paginaActual = 1;
            cargarProductos();
        });
        (_b = document.getElementById("paginacion")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (e) => {
            const target = e.target;
            if (target.classList.contains("page-link")) {
                const nuevaPagina = parseInt(target.dataset.pagina || "1");
                if (!isNaN(nuevaPagina)) {
                    paginaActual = nuevaPagina;
                    cargarProductos();
                }
            }
        });
    }
    function cargarProductos() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const q = (_a = document.getElementById("buscador")) === null || _a === void 0 ? void 0 : _a.value.trim();
            const min = parseFloat((_b = document.getElementById("precio-min")) === null || _b === void 0 ? void 0 : _b.value);
            const max = parseFloat((_c = document.getElementById("precio-max")) === null || _c === void 0 ? void 0 : _c.value);
            const filtros = {
                q,
                page: paginaActual,
                limit: 12,
            };
            if (!isNaN(min))
                filtros.min = min;
            if (!isNaN(max))
                filtros.max = max;
            try {
                const { productos, totalPaginas } = yield modeloVitrina.obtenerProductos(filtros);
                vistaVitrina.renderProductos(productos);
                vistaVitrina.renderPaginacion(totalPaginas, paginaActual);
            }
            catch (error) {
                console.error("❌ Error al cargar productos:", error);
            }
        });
    }
    function init() {
        configurarEventos();
        cargarProductos();
    }
    return { init };
})();
document.addEventListener("DOMContentLoaded", vitrinaControlador.init);
