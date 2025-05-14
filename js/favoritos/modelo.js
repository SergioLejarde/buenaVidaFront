const modeloFavoritos = (() => {
  const URL = "http://localhost:3000/api/favoritos";

  async function agregarAFavoritos(usuarioId, productoId, token) {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ usuarioId, productoId })
      });

      if (!response.ok) throw new Error("No se pudo agregar a favoritos");
    } catch (error) {
      console.error("❌ Error al agregar favorito:", error);
    }
  }

  async function obtenerFavoritos(usuarioId, token) {
    try {
      const response = await fetch(`${URL}?usuarioId=${usuarioId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) throw new Error("No se pudieron obtener favoritos");
      return await response.json();
    } catch (error) {
      console.error("❌ Error al obtener favoritos:", error);
      return [];
    }
  }

  return {
    agregarAFavoritos,
    obtenerFavoritos
  };
})();
