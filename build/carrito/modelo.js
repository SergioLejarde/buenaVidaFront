var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const modeloCarrito = (() => {
    const URL_BASE = "http://localhost:3000/api/carrito";
    function obtenerToken() {
        return localStorage.getItem("token");
    }
    function agregarAlCarrito(usuarioId_1, productoId_1) {
        return __awaiter(this, arguments, void 0, function* (usuarioId, productoId, cantidad = 1, token = obtenerToken()) {
            try {
                const response = yield fetch(`${URL_BASE}/agregar`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ usuarioId, productoId, cantidad })
                });
                if (!response.ok)
                    throw new Error("Error al agregar al carrito");
                return yield response.json();
            }
            catch (err) {
                console.error("❌ Error agregarAlCarrito:", err);
                throw err;
            }
        });
    }
    function obtenerCarrito(usuarioId_1) {
        return __awaiter(this, arguments, void 0, function* (usuarioId, token = obtenerToken()) {
            try {
                const response = yield fetch(`${URL_BASE}?usuarioId=${usuarioId}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (!response.ok)
                    throw new Error("Error al obtener carrito");
                return yield response.json();
            }
            catch (err) {
                console.error("❌ Error obtenerCarrito:", err);
                return [];
            }
        });
    }
    function eliminarProducto(usuarioId_1, productoId_1) {
        return __awaiter(this, arguments, void 0, function* (usuarioId, productoId, token = obtenerToken()) {
            try {
                const response = yield fetch(`${URL_BASE}/eliminar`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ usuarioId, productoId })
                });
                if (!response.ok)
                    throw new Error("Error al eliminar producto del carrito");
            }
            catch (err) {
                console.error("❌ Error eliminarProducto:", err);
            }
        });
    }
    function actualizarCantidad(usuarioId_1, productoId_1, cantidad_1) {
        return __awaiter(this, arguments, void 0, function* (usuarioId, productoId, cantidad, token = obtenerToken()) {
            try {
                const response = yield fetch(`${URL_BASE}/actualizar`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ usuarioId, productoId, cantidad })
                });
                if (!response.ok)
                    throw new Error("Error al actualizar cantidad");
            }
            catch (err) {
                console.error("❌ Error actualizarCantidad:", err);
            }
        });
    }
    function vaciarCarrito(usuarioId_1) {
        return __awaiter(this, arguments, void 0, function* (usuarioId, token = obtenerToken()) {
            try {
                const response = yield fetch(`${URL_BASE}/vaciar`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ usuarioId })
                });
                if (!response.ok)
                    throw new Error("Error al vaciar carrito");
            }
            catch (err) {
                console.error("❌ Error vaciarCarrito:", err);
            }
        });
    }
    return {
        agregarAlCarrito,
        obtenerCarrito,
        eliminarProducto,
        actualizarCantidad,
        vaciarCarrito
    };
})();
export { modeloCarrito };
