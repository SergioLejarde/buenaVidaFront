interface ProductoRequest {
  usuarioId: number;
  productoId?: number;
  cantidad?: number;
}

export const modeloCarrito = (() => {
  const URL_BASE = "http://localhost:3000/api/carrito";

  function obtenerToken(): string | null {
    return localStorage.getItem("token");
  }

  async function agregarAlCarrito(
    usuarioId: number,
    productoId: number,
    cantidad: number = 1,
    token: string | null = obtenerToken()
  ): Promise<any> {
    try {
      const response = await fetch(`${URL_BASE}/agregar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ usuarioId, productoId, cantidad })
      });

      if (!response.ok) throw new Error("Error al agregar al carrito");
      return await response.json();
    } catch (err) {
      console.error("❌ Error agregarAlCarrito:", err);
      throw err;
    }
  }

  async function obtenerCarrito(
    usuarioId: number,
    token: string | null = obtenerToken()
  ): Promise<any> {
    try {
      const response = await fetch(`${URL_BASE}?usuarioId=${usuarioId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!response.ok) throw new Error("Error al obtener carrito");
      return await response.json();
    } catch (err) {
      console.error("❌ Error obtenerCarrito:", err);
      return [];
    }
  }

  async function eliminarProducto(
    usuarioId: number,
    productoId: number,
    token: string | null = obtenerToken()
  ): Promise<void> {
    try {
      const response = await fetch(`${URL_BASE}/eliminar`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ usuarioId, productoId })
      });

      if (!response.ok) throw new Error("Error al eliminar producto del carrito");
    } catch (err) {
      console.error("❌ Error eliminarProducto:", err);
    }
  }

  async function actualizarCantidad(
    usuarioId: number,
    productoId: number,
    cantidad: number,
    token: string | null = obtenerToken()
  ): Promise<void> {
    try {
      const response = await fetch(`${URL_BASE}/actualizar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ usuarioId, productoId, cantidad })
      });

      if (!response.ok) throw new Error("Error al actualizar cantidad");
    } catch (err) {
      console.error("❌ Error actualizarCantidad:", err);
    }
  }

  async function vaciarCarrito(
    usuarioId: number,
    token: string | null = obtenerToken()
  ): Promise<void> {
    try {
      const response = await fetch(`${URL_BASE}/vaciar`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ usuarioId })
      });

      if (!response.ok) throw new Error("Error al vaciar carrito");
    } catch (err) {
      console.error("❌ Error vaciarCarrito:", err);
    }
  }

  return {
    agregarAlCarrito,
    obtenerCarrito,
    eliminarProducto,
    actualizarCantidad,
    vaciarCarrito
  };
})();
