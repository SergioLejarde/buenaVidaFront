const modeloModal = (() => {
  const URL = "http://localhost:3000/api/productos";

  async function obtenerProductoPorId(id) {
    try {
      const response = await fetch(`${URL}?page=1&limit=100`);
      if (!response.ok) throw new Error("Error al obtener productos");

      const productos = await response.json();
      const encontrado = productos.find((p) => p.id === id);
      if (!encontrado) throw new Error("Producto no encontrado");

      return encontrado;
    } catch (error) {
      console.error("❌ Error al obtener producto por ID:", error);
      throw error;
    }
  }

  return {
    obtenerProductoPorId
  };
})();
