const modeloModal = (() => {
  const URL = "http://localhost:3000/api/productos";

  async function obtenerProductoPorId(id) {
    try {
      const response = await fetch(`${URL}/${id}`);
      if (!response.ok) throw new Error("Producto no encontrado");
      return await response.json();
    } catch (error) {
      console.error("❌ Error al obtener producto por ID:", error);
      throw error;
    }
  }

  return {
    obtenerProductoPorId
  };
})();
