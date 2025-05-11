const modeloFavoritos = (() => {
  const URL = "http://localhost:3000/favoritos";

  async function agregarAFavoritos(usuarioId, productoId) {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
