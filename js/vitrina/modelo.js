const modeloVitrina = (() => {
  const URL_BASE = "http://localhost:3000";

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
      return await response.json();
    } catch (error) {
      console.error("❌ Error en obtenerProductos:", error);
      return [];
    }
  }

  return {
    obtenerProductos
  };
})();
