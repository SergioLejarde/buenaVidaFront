var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { vistaCarrito } from "./vista";
import { modeloCarrito } from "./modelo";
export const controladorCarrito = (() => {
    const contenedor = document.getElementById("contenedor-carrito");
    const totalSpan = document.getElementById("total-carrito");
    const btnFinalizar = document.getElementById("btn-finalizar");
    const usuarioId = parseInt(localStorage.getItem("usuarioId") || "0");
    const token = localStorage.getItem("token");
    function cargarCarrito() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!usuarioId || !token) {
                alert("Debes iniciar sesión para ver tu carrito.");
                return;
            }
            const respuesta = yield modeloCarrito.obtenerCarrito(usuarioId, token);
            const productos = respuesta.productos || [];
            const productosConDescripcion = productos.map(item => (Object.assign(Object.assign({}, item), { producto: item.producto
                    ? Object.assign(Object.assign({}, item.producto), { descripcion: item.producto.descripcion || "" }) : undefined })));
            vistaCarrito.renderCarrito(productosConDescripcion);
        });
    }
    function configurarEventos() {
        contenedor.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
            const target = e.target;
            const eliminarBtn = target.closest(".eliminar-carrito");
            if (eliminarBtn) {
                const productoId = parseInt(eliminarBtn.dataset.id || "0");
                yield modeloCarrito.eliminarProducto(usuarioId, productoId, token);
                yield cargarCarrito();
            }
        }));
        contenedor.addEventListener("change", (e) => __awaiter(this, void 0, void 0, function* () {
            const target = e.target;
            const inputCantidad = target.closest(".cantidad-input");
            if (inputCantidad) {
                const nuevaCantidad = parseInt(inputCantidad.value);
                const productoId = parseInt(inputCantidad.dataset.id || "0");
                if (nuevaCantidad > 0) {
                    yield modeloCarrito.actualizarCantidad(usuarioId, productoId, nuevaCantidad, token);
                    yield cargarCarrito();
                }
            }
        }));
        btnFinalizar.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            if (confirm("¿Deseas realizar el pedido?")) {
                try {
                    const response = yield fetch("http://localhost:3000/api/pedidos", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({ usuarioId })
                    });
                    if (!response.ok)
                        throw new Error("Error al realizar el pedido");
                    alert("✅ Pedido realizado con éxito");
                    yield modeloCarrito.vaciarCarrito(usuarioId, token);
                    yield cargarCarrito();
                }
                catch (err) {
                    console.error("❌ Error al finalizar pedido:", err);
                    alert("Hubo un error al procesar tu pedido.");
                }
            }
        }));
    }
    function init() {
        cargarCarrito();
        configurarEventos();
    }
    return { init };
})();
document.addEventListener("DOMContentLoaded", controladorCarrito.init);
