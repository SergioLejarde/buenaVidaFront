var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { modeloModal } from "./modelo.js";
import { vistaModal } from "./vista.js";
import { modeloVitrina } from "../vitrina/modelo.js"; // ✅
const controladorModal = (() => {
    function configurarEventos() {
        // Mostrar modal
        document.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
            const target = e.target;
            const tarjeta = target.closest(".card[data-id]");
            if (!tarjeta)
                return;
            const id = parseInt(tarjeta.dataset.id || "");
            if (isNaN(id))
                return;
            try {
                const producto = yield modeloModal.obtenerProductoPorId(id);
                vistaModal.mostrarModal(producto);
            }
            catch (_a) {
                alert("❌ No se pudo cargar el producto.");
            }
        }));
        // Acciones desde modal
        document.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
            const target = e.target;
            // Agregar al carrito
            if (target.id === "modalAgregarCarrito") {
                const token = localStorage.getItem("token");
                const usuarioId = parseInt(localStorage.getItem("usuarioId") || "");
                if (!token || !usuarioId) {
                    alert("Debes iniciar sesión para agregar al carrito.");
                    return;
                }
                const productoId = parseInt(target.dataset.id || "");
                const cantidad = parseInt(document.getElementById("modalCantidad").value);
                if (isNaN(cantidad) || cantidad < 1) {
                    alert("Cantidad inválida.");
                    return;
                }
                try {
                    yield modeloVitrina.agregarAlCarrito(usuarioId, productoId, cantidad);
                    target.textContent = "✔️ Agregado";
                    target.setAttribute("disabled", "true");
                }
                catch (_a) {
                    alert("❌ No se pudo agregar al carrito.");
                }
            }
            // Agregar a favoritos
            if (target.id === "modalFavorito") {
                const token = localStorage.getItem("token");
                const usuarioId = parseInt(localStorage.getItem("usuarioId") || "");
                if (!token || !usuarioId) {
                    alert("Debes iniciar sesión para agregar a favoritos.");
                    return;
                }
                const productoId = parseInt(target.dataset.id || "");
                try {
                    yield modeloVitrina.agregarAFavoritos(usuarioId, productoId);
                    target.classList.remove("btn-outline-danger");
                    target.classList.add("btn-danger");
                    target.textContent = "❤️";
                    target.setAttribute("disabled", "true");
                }
                catch (_b) {
                    alert("❌ No se pudo agregar a favoritos.");
                }
            }
        }));
    }
    return {
        configurarEventos
    };
})();
document.addEventListener("DOMContentLoaded", controladorModal.configurarEventos);
