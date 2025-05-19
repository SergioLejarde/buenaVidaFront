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
import { modeloFavoritos } from "../favoritos/modelo.js";
import { modeloCarrito } from "../carrito/modelo.js";
const controladorVitrina = (() => {
    let paginaActual = 1;
    let totalPaginas = 3;
    const limite = 12;
    const buscador = document.getElementById("buscador");
    const btnBuscar = document.getElementById("btn-buscar");
    const paginacion = document.getElementById("paginacion");
    const contenedor = document.getElementById("contenedor-productos");
    const inputMin = document.getElementById("precio-min");
    const inputMax = document.getElementById("precio-max");
    function cargarProductos() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = buscador.value.trim();
            const min = parseFloat((inputMin === null || inputMin === void 0 ? void 0 : inputMin.value) || "0");
            const max = parseFloat((inputMax === null || inputMax === void 0 ? void 0 : inputMax.value) || "99999");
            const filtros = {
                page: paginaActual,
                limit: limite,
                q,
                min,
                max
            };
            try {
                const { productos, totalPaginas: total } = yield modeloVitrina.obtenerProductos(filtros);
                console.log("🟢 totalPaginas desde backend:", total);
                totalPaginas = total;
                vistaVitrina.renderProductos(productos);
                vistaVitrina.renderPaginacion(totalPaginas, paginaActual);
            }
            catch (error) {
                console.error("❌ Error cargando productos:", error);
                vistaVitrina.renderProductos([]);
                vistaVitrina.renderPaginacion(1, 1);
            }
        });
    }
    function configurarEventos() {
        btnBuscar.addEventListener("click", () => {
            paginaActual = 1;
            cargarProductos();
        });
        paginacion.addEventListener("click", (e) => {
            const btn = e.target.closest("button[data-pagina]");
            if (btn) {
                paginaActual = parseInt(btn.dataset.pagina || "1");
                cargarProductos();
            }
        });
        contenedor.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
            const target = e.target;
            const favBtn = target.closest("button[data-fav]");
            const cartBtn = target.closest("button[data-carrito]");
            const token = localStorage.getItem("token");
            const usuarioIdRaw = localStorage.getItem("usuarioId");
            const usuarioId = usuarioIdRaw ? parseInt(usuarioIdRaw) : null;
            if (!token || !usuarioId) {
                alert("Debes iniciar sesión para usar esta función.");
                return;
            }
            if (favBtn) {
                const productoId = parseInt(favBtn.dataset.id || "0");
                try {
                    yield modeloFavoritos.agregarAFavoritos(usuarioId, productoId, token);
                    favBtn.classList.remove("btn-outline-danger");
                    favBtn.classList.add("btn-danger");
                    favBtn.innerText = "❤️";
                    favBtn.disabled = true;
                }
                catch (err) {
                    console.error("❌ Error al agregar a favoritos:", err);
                    alert("No se pudo agregar a favoritos.");
                }
            }
            if (cartBtn) {
                const productoId = parseInt(cartBtn.dataset.id || "0");
                try {
                    yield modeloCarrito.agregarAlCarrito(usuarioId, productoId, 1, token);
                    cartBtn.classList.remove("btn-outline-success");
                    cartBtn.classList.add("btn-success");
                    cartBtn.innerText = "✔️";
                    cartBtn.disabled = true;
                }
                catch (err) {
                    console.error("❌ Error al agregar al carrito:", err);
                    alert("No se pudo agregar al carrito.");
                }
            }
        }));
    }
    function init() {
        configurarEventos();
        cargarProductos();
    }
    return { init };
})();
document.addEventListener("DOMContentLoaded", controladorVitrina.init);
