const modeloCarrito = (() => {
  const BASE_URL = "http://localhost:3000/api/carrito";

  // Agrega un producto al carrito
  async function agregarAlCarrito(usuarioId, productoId, cantidad = 1, token) {
    token = token || localStorage.getItem("token");

    if (!usuarioId || !productoId || !token) throw new Error("Faltan datos para agregar al carrito");

    const response = await fetch(`${BASE_URL}/agregar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ usuarioId, productoId, cantidad })
    });

    if (!response.ok) throw new Error("No se pudo agregar al carrito");
  }

  // Obtiene los productos del carrito
  async function obtenerCarrito(usuarioId, token) {
    token = token || localStorage.getItem("token");

    if (!usuarioId || !token) throw new Error("No autorizado");

    const response = await fetch(BASE_URL, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error("Error al obtener carrito");
    return await response.json();
  }

  // Actualiza la cantidad de un producto
  async function actualizarCantidad(usuarioId, productoId, cantidad, token) {
    token = token || localStorage.getItem("token");

    if (!usuarioId || !productoId || cantidad < 1 || !token) throw new Error("Datos inválidos");

    const response = await fetch(`${BASE_URL}/actualizar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ usuarioId, productoId, cantidad })
    });

    if (!response.ok) throw new Error("No se pudo actualizar la cantidad");
  }

  // Elimina un producto del carrito
  async function eliminarProducto(usuarioId, productoId, token) {
    token = token || localStorage.getItem("token");

    if (!usuarioId || !productoId || !token) throw new Error("Datos inválidos para eliminar producto");

    const response = await fetch(`${BASE_URL}/eliminar`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ usuarioId, productoId })
    });

    if (!response.ok) throw new Error("No se pudo eliminar el producto del carrito");
  }

  return {
    agregarAlCarrito,
    obtenerCarrito,
    actualizarCantidad,
    eliminarProducto
  };
})();
