const modeloPedidos = (() => {
  async function obtenerPedidos(token: string): Promise<any[]> {
    try {
      const response = await fetch("http://localhost:3000/api/pedidos", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` //  Aquí estaba el problema
        }
      });

      if (response.status === 404) return []; //  fallback defensivo

      if (!response.ok) throw new Error("Error al obtener pedidos");

      return await response.json();
    } catch (error) {
      console.error("❌ Error en fetch de pedidos:", error);
      throw error;
    }
  }

  return { obtenerPedidos };
})();

export { modeloPedidos };
