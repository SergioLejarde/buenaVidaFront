const modeloFavoritos = (() => {
  const URL = "http://localhost:3000/favoritos";

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
      console.log(`❤️ Producto ${productoId} agregado a favoritos del usuario ${usuarioId}`);
    } catch (error) {
      console.error("❌ Error al agregar favorito:", error);
    }
  }

  return {
    agregarAFavoritos
  };
})();
