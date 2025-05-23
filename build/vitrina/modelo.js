var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const modeloVitrina = (() => {
    const URL_BASE = "http://localhost:3000";
    function obtenerToken() {
        return localStorage.getItem("token");
    }
    function obtenerProductos() {
        return __awaiter(this, arguments, void 0, function* ({ page = 1, limit = 12, q = "", min, max, promo } = {}) {
            try {
                const params = new URLSearchParams({
                    page: String(page),
                    limit: String(limit),
                    q
                });
                if (typeof min === "number")
                    params.append("min", String(min));
                if (typeof max === "number")
                    params.append("max", String(max));
                if (typeof promo === "boolean")
                    params.append("promo", String(promo));
                const response = yield fetch(`${URL_BASE}/api/productos?${params.toString()}`);
                if (!response.ok)
                    throw new Error("Error al obtener productos");
                const data = yield response.json();
                return {
                    productos: data.productos || [],
                    totalPaginas: data.totalPaginas || 1
                };
            }
            catch (error) {
                console.error("❌ Error en obtenerProductos:", error);
                return { productos: [], totalPaginas: 1 };
            }
        });
    }
    function agregarAFavoritos(usuarioId, productoId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = obtenerToken();
                const response = yield fetch(`${URL_BASE}/api/favoritos`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ usuarioId, productoId })
                });
                if (!response.ok)
                    throw new Error("No se pudo agregar a favoritos");
                console.log(`✔ Producto ${productoId} agregado a favoritos del usuario ${usuarioId}`);
            }
            catch (error) {
                console.error("❌ Error al agregar favorito:", error);
            }
        });
    }
    function agregarAlCarrito(usuarioId, productoId, cantidad) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = obtenerToken();
                const response = yield fetch(`${URL_BASE}/api/carrito/agregar`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ usuarioId, productoId, cantidad })
                });
                if (!response.ok)
                    throw new Error("No se pudo agregar al carrito");
                console.log(`🛒 Producto ${productoId} x${cantidad} agregado al carrito del usuario ${usuarioId}`);
            }
            catch (error) {
                console.error("❌ Error al agregar al carrito:", error);
            }
        });
    }
    return {
        obtenerProductos,
        agregarAFavoritos,
        agregarAlCarrito
    };
})();
export { modeloVitrina };
