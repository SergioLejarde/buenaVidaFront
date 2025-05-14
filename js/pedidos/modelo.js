const modeloPedidos = (() => {
  const URL = "http://localhost:3000/api/pedidos";

  async function obtenerPedidos(token) {
    try {
      const response = await fetch(URL, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) throw new Error("No se pudieron obtener pedidos");
      return await response.json();
    } catch (error) {
      console.error("❌ Error al obtener pedidos:", error);
      return [];
    }
  }

  return { obtenerPedidos };
})();
