// Módulo modeloVitrina: maneja obtención de productos, favoritos y carrito
const modeloVitrina = (() => {
  // URL base del backend
  const URL_BASE = "http://localhost:3000";

  // Función para recuperar el token JWT del usuario actual
  function obtenerToken(): string | null {
    return localStorage.getItem("token");
  }

  // Tipado para los filtros disponibles al consultar productos
  interface FiltrosProducto {
    page?: number;     // número de página para paginación
    limit?: number;    // cantidad de productos por página
    q?: string;        // búsqueda por palabra clave
    min?: number;      // precio mínimo
    max?: number;      // precio máximo
    promo?: boolean;   // si se quiere solo productos en promoción
  }

  // Tipado del objeto Producto (como viene del backend)
  interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoria: string;
    promocion?: boolean;
  }

  // Tipado de la respuesta completa esperada desde el backend
  interface RespuestaProductos {
    productos: Producto[];
    totalPaginas: number;
  }

  // 🔄 Función asincrónica para obtener productos desde el backend con filtros
  async function obtenerProductos({
    page = 1,
    limit = 12,
    q = "",
    min,
    max,
    promo
  }: FiltrosProducto = {}): Promise<RespuestaProductos> {
    try {
      // Construir los parámetros de la URL para la solicitud GET
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        q
      });

      // Solo se agregan si vienen definidos
      if (typeof min === "number") params.append("min", String(min));
      if (typeof max === "number") params.append("max", String(max));
      if (typeof promo === "boolean") params.append("promo", String(promo));

      // Hacer la solicitud al backend
      const response = await fetch(`${URL_BASE}/api/productos?${params.toString()}`);
      if (!response.ok) throw new Error("Error al obtener productos");

      // Convertir la respuesta a JSON
      const data = await response.json();

      // Retornar productos y total de páginas
      return {
        productos: data.productos || [],
        totalPaginas: data.totalPaginas || 1
      };
    } catch (error) {
      console.error("❌ Error en obtenerProductos:", error);
      return { productos: [], totalPaginas: 1 };
    }
  }

  // ⭐ Función para agregar un producto a favoritos del usuario actual
  async function agregarAFavoritos(usuarioId: number, productoId: number): Promise<void> {
    try {
      const token = obtenerToken(); // Obtener token para autorización

      // Realizar la petición POST al backend
      const response = await fetch(`${URL_BASE}/api/favoritos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ usuarioId, productoId })
      });

      if (!response.ok) throw new Error("No se pudo agregar a favoritos");
      console.log(`✔ Producto ${productoId} agregado a favoritos del usuario ${usuarioId}`);
    } catch (error) {
      console.error("❌ Error al agregar favorito:", error);
    }
  }

  // 🛒 Función para agregar un producto al carrito de compras del usuario
  async function agregarAlCarrito(usuarioId: number, productoId: number, cantidad: number): Promise<void> {
    try {
      const token = obtenerToken(); // Token del usuario actual

      const response = await fetch(`${URL_BASE}/api/carrito/agregar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ usuarioId, productoId, cantidad })
      });

      if (!response.ok) throw new Error("No se pudo agregar al carrito");
      console.log(`🛒 Producto ${productoId} x${cantidad} agregado al carrito del usuario ${usuarioId}`);
    } catch (error) {
      console.error("❌ Error al agregar al carrito:", error);
    }
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
