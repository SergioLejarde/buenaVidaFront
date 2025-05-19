const modeloVitrina = (() => {
  const URL_BASE = "http://localhost:3000";

  function obtenerToken(): string | null {
    return localStorage.getItem("token");
  }

  interface FiltrosProducto {
    page?: number;
    limit?: number;
    q?: string;
    min?: number;
    max?: number;
    promo?: boolean;
  }

  interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoria: string;
    promocion?: boolean;
  }

  interface RespuestaProductos {
    productos: Producto[];
    totalPaginas: number;
  }

  async function obtenerProductos({
    page = 1,
    limit = 12,
    q = "",
    min = 0,
    max = 99999,
    promo
  }: FiltrosProducto = {}): Promise<RespuestaProductos> {
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        q,
        min: String(min),
        max: String(max)
      });

      if (promo !== undefined) {
        params.append("promo", String(promo));
      }

      const response = await fetch(`${URL_BASE}/api/productos?${params.toString()}`);
      if (!response.ok) throw new Error("Error al obtener productos");

      const data = await response.json();
      return {
        productos: data.productos || [],
        totalPaginas: data.totalPaginas || 1
      };
    } catch (error) {
      console.error("❌ Error en obtenerProductos:", error);
      return { productos: [], totalPaginas: 1 };
    }
  }

  async function agregarAFavoritos(usuarioId: number, productoId: number): Promise<void> {
    try {
      const token = obtenerToken();
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

  async function agregarAlCarrito(usuarioId: number, productoId: number, cantidad: number): Promise<void> {
    try {
      const token = obtenerToken();
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

  return {
    obtenerProductos,
    agregarAFavoritos,
    agregarAlCarrito
  };
})();
export { modeloVitrina };
