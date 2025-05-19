const modeloFavoritos = (() => {
  const URL_BASE = "http://localhost:3000/api/favoritos";

  async function agregarAFavoritos(usuarioId: number, productoId: number, token: string): Promise<void> {
    try {
      const response = await fetch(URL_BASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ usuarioId, productoId })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData?.error || "No se pudo agregar a favoritos");
      }
    } catch (error) {
      console.error("❌ Error al agregar favorito:", error);
    }
  }

  async function obtenerFavoritos(usuarioId: number, token: string): Promise<any[]> {
    try {
      const response = await fetch(`${URL_BASE}/${usuarioId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData?.error || "No se pudieron obtener favoritos");
      }

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
export { modeloFavoritos };
