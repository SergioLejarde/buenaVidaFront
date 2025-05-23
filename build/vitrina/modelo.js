var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Módulo modeloVitrina: maneja obtención de productos, favoritos y carrito
const modeloVitrina = (() => {
    // URL base del backend
    const URL_BASE = "http://localhost:3000";
    // Función para recuperar el token JWT del usuario actual
    function obtenerToken() {
        return localStorage.getItem("token");
    }
    // 🔄 Función asincrónica para obtener productos desde el backend con filtros
    function obtenerProductos() {
        return __awaiter(this, arguments, void 0, function* ({ page = 1, limit = 12, q = "", min, max, promo } = {}) {
            try {
                // Construir los parámetros de la URL para la solicitud GET
                const params = new URLSearchParams({
                    page: String(page),
                    limit: String(limit),
                    q
                });
                // Solo se agregan si vienen definidos
                if (typeof min === "number")
                    params.append("min", String(min));
                if (typeof max === "number")
                    params.append("max", String(max));
                if (typeof promo === "boolean")
                    params.append("promo", String(promo));
                // Hacer la solicitud al backend
                const response = yield fetch(`${URL_BASE}/api/productos?${params.toString()}`);
                if (!response.ok)
                    throw new Error("Error al obtener productos");
                // Convertir la respuesta a JSON
                const data = yield response.json();
                // Retornar productos y total de páginas
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
    // ⭐ Función para agregar un producto a favoritos del usuario actual
    function agregarAFavoritos(usuarioId, productoId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = obtenerToken(); // Obtener token para autorización
                // Realizar la petición POST al backend
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
    // 🛒 Función para agregar un producto al carrito de compras del usuario
    function agregarAlCarrito(usuarioId, productoId, cantidad) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = obtenerToken(); // Token del usuario actual
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
    // Retornar funciones públicas del modelo para uso externo
    return {
        obtenerProductos,
        agregarAFavoritos,
        agregarAlCarrito
    };
})();
// Exportar el módulo como modeloVitrina para su uso en el controlador
export { modeloVitrina };
