const modeloVitrina = (() => {
  const URL_BASE = "http://localhost:3000";

  function obtenerToken() {
    return localStorage.getItem("token");
  }

  // Obtener productos con filtros
  async function obtenerProductos({ page = 1, limit = 12, q = "", min = 0, max = 99999, promo = false } = {}) {
    try {
      const params = new URLSearchParams({
        page,
        limit,
        q,
        min,
        max,
        promo
      });

      const response = await fetch(`${URL_BASE}/api/productos?${params.toString()}`);
      if (!response.ok) throw new Error("Error al obtener productos");

      const data = await response.json();

      // ⚠️ Asegurarse de devolver exactamente lo que espera el controlador
      return {
        productos: data.productos || [],
        totalPaginas: data.totalPaginas || 1
      };
    } catch (error) {
      console.error("❌ Error en obtenerProductos:", error);
      return { productos: [], totalPaginas: 1 };
    }
  }

  // Agregar producto a favoritos
  async function agregarAFavoritos(usuarioId, productoId) {
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

  // Agregar producto al carrito
  async function agregarAlCarrito(usuarioId, productoId, cantidad) {
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
