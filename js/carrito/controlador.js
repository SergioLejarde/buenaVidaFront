const controladorCarrito = (() => {
  const contenedor = document.getElementById("contenedor-carrito");
  const totalSpan = document.getElementById("total-carrito");
  const btnFinalizar = document.getElementById("btn-finalizar");

  const usuarioId = parseInt(localStorage.getItem("usuarioId") || "0");
  const token = localStorage.getItem("token");

  async function cargarCarrito() {
    if (!usuarioId || !token) {
      alert("Debes iniciar sesión para ver tu carrito.");
      return;
    }

    const respuesta = await modeloCarrito.obtenerCarrito(usuarioId, token);
    const productos = respuesta.productos || [];
    vistaCarrito.renderCarrito(productos);
  }

  function configurarEventos() {
    contenedor.addEventListener("click", async (e) => {
      const eliminarBtn = e.target.closest(".eliminar-carrito");

      if (eliminarBtn) {
        const productoId = parseInt(eliminarBtn.dataset.id);
        await modeloCarrito.eliminarProducto(usuarioId, productoId, token);
        await cargarCarrito();
      }
    });

    contenedor.addEventListener("change", async (e) => {
      const inputCantidad = e.target.closest(".cantidad-input");
      if (inputCantidad) {
        const nuevaCantidad = parseInt(inputCantidad.value);
        const productoId = parseInt(inputCantidad.dataset.id);
        if (nuevaCantidad > 0) {
          await modeloCarrito.actualizarCantidad(usuarioId, productoId, nuevaCantidad, token);
          await cargarCarrito();
        }
      }
    });

    btnFinalizar.addEventListener("click", async () => {
      if (confirm("¿Deseas realizar el pedido?")) {
        try {
          const response = await fetch("http://localhost:3000/api/pedidos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ usuarioId })
          });

          if (!response.ok) throw new Error("Error al realizar el pedido");

          alert("✅ Pedido realizado con éxito");
          await modeloCarrito.vaciarCarrito(usuarioId, token);
          await cargarCarrito();
        } catch (err) {
          console.error("❌ Error al finalizar pedido:", err);
          alert("Hubo un error al procesar tu pedido.");
        }
      }
    });
  }

  function init() {
    cargarCarrito();
    configurarEventos();
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", controladorCarrito.init);
