const modeloCarrito = (() => {
  const URL = "http://localhost:3000/api/carrito/agregar";

  async function agregarAlCarrito(usuarioId, productoId, cantidad = 1) {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuarioId, productoId, cantidad })
      });

      if (!response.ok) throw new Error("No se pudo agregar al carrito");
      console.log(`🛒 Producto ${productoId} x${cantidad} agregado al carrito del usuario ${usuarioId}`);
    } catch (error) {
      console.error("❌ Error al agregar al carrito:", error);
    }
  }

  return {
    agregarAlCarrito
  };
})();
