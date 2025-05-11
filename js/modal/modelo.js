// modelo del modal
const modeloModal = (() => {
  const URL = "http://localhost:3000/api/productos";

  async function obtenerProductoPorId(id) {
    const response = await fetch(`${URL}/${id}`);
    if (!response.ok) throw new Error("Error al obtener producto");
    return await response.json();
  }

  return {
    obtenerProductoPorId
  };
})();
