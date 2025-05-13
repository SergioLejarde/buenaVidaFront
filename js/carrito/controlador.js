const controladorCarrito = (() => {
  const contenedor = document.getElementById("contenedor-carrito");
  const btnFinalizar = document.getElementById("btn-finalizar");

  async function mostrarCarrito() {
    const usuarioId = parseInt(localStorage.getItem("usuarioId"));
    const token = localStorage.getItem("token");

    if (!usuarioId || !token) {
      contenedor.innerHTML = `<div class="alert alert-warning text-center">Debes iniciar sesión para ver el carrito.</div>`;
      return;
    }

    try {
      const datos = await modeloCarrito.obtenerCarrito(usuarioId, token);
      const productos = datos.productos || [];
      vistaCarrito.renderCarrito(productos);
    } catch (err) {
      console.error("❌ Error mostrando carrito:", err);
      contenedor.innerHTML = `<div class="alert alert-danger text-center">Error al cargar el carrito.</div>`;
    }
  }

  function configurarEventos() {
    // Actualizar cantidad
    contenedor.addEventListener("input", async (e) => {
      if (e.target.classList.contains("cantidad-input")) {
        const productoId = parseInt(e.target.dataset.id);
        const nuevaCantidad = parseInt(e.target.value);
        const usuarioId = parseInt(localStorage.getItem("usuarioId"));
        const token = localStorage.getItem("token");

        if (nuevaCantidad < 1) return;

        try {
          await modeloCarrito.actualizarCantidad(usuarioId, productoId, nuevaCantidad, token);
          mostrarCarrito();
        } catch (err) {
          alert("No se pudo actualizar la cantidad.");
        }
      }
    });

    // Eliminar producto
    contenedor.addEventListener("click", async (e) => {
      if (e.target.classList.contains("eliminar-carrito")) {
        const productoId = parseInt(e.target.dataset.id);
        const usuarioId = parseInt(localStorage.getItem("usuarioId"));
        const token = localStorage.getItem("token");

        try {
          await modeloCarrito.eliminarProducto(usuarioId, productoId, token);
          mostrarCarrito();
        } catch (err) {
          alert("No se pudo eliminar el producto.");
        }
      }
    });

    // Finalizar pedido
    if (btnFinalizar) {
      btnFinalizar.addEventListener("click", () => {
        alert("✅ Pedido realizado (simulado)");
      });
    }
  }

  function init() {
    mostrarCarrito();
    configurarEventos();
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", controladorCarrito.init);
