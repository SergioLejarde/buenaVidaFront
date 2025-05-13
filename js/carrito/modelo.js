// modelo del carrito
const modeloCarrito = (() => {
  const BASE_URL = "http://localhost:3000/api/carrito";

  // Agregar producto al carrito
  async function agregarAlCarrito(usuarioId, productoId, cantidad = 1, token) {
    try {
      if (!token) token = localStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/agregar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ usuarioId, productoId, cantidad })
      });

      if (!response.ok) throw new Error("No se pudo agregar al carrito");
      console.log(`🛒 Producto ${productoId} x${cantidad} agregado al carrito del usuario ${usuarioId}`);
    } catch (error) {
      console.error("❌ Error al agregar al carrito:", error);
    }
  }

  // Obtener productos del carrito
  async function obtenerCarrito(usuarioId, token) {
    try {
      if (!token) token = localStorage.getItem("token");

      const response = await fetch(BASE_URL, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Error al obtener carrito");
      return await response.json();
    } catch (error) {
      console.error("❌ Error al obtener carrito:", error);
      return [];
    }
  }

  return {
    agregarAlCarrito,
    obtenerCarrito
  };
})();
