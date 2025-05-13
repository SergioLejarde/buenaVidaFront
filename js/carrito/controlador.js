const controladorCarrito = (() => {
  const contenedor = document.getElementById("contenedor-carrito");
  const btnFinalizar = document.getElementById("btn-finalizar");

  // Agregar producto desde la vitrina
  function configurarEventosGlobales() {
    document.addEventListener("click", (e) => {
      const cartBtn = e.target.closest("button[data-carrito]");
      if (!cartBtn) return;

      const usuarioId = parseInt(localStorage.getItem("usuarioId"));
      const token = localStorage.getItem("token");

      if (!usuarioId || !token) {
        alert("Debes iniciar sesión para agregar al carrito.");
        return;
      }

      const productoId = parseInt(cartBtn.dataset.id);
      modeloCarrito.agregarAlCarrito(usuarioId, productoId, 1, token);
      cartBtn.classList.replace("btn-outline-success", "btn-success");
      cartBtn.innerText = "✔️";
      cartBtn.disabled = true;
    });
  }

  // Mostrar productos del carrito
  async function mostrarCarrito() {
    const usuarioId = parseInt(localStorage.getItem("usuarioId"));
    const token = localStorage.getItem("token");

    if (!contenedor || !usuarioId || !token) return;

    try {
      const respuesta = await modeloCarrito.obtenerCarrito(usuarioId, token);
      const productos = respuesta.productos || [];

      if (productos.length === 0) {
        contenedor.innerHTML = `<div class="alert alert-info text-center">Tu carrito está vacío.</div>`;
        return;
      }

      contenedor.innerHTML = productos.map((item) => `
        <div class="card mb-3">
          <div class="row g-0 align-items-center">
            <div class="col-4">
              <img src="assets/${item.productoId}.jpg" class="img-fluid" alt="Producto ${item.productoId}">
            </div>
            <div class="col-8">
              <div class="card-body">
                <h5 class="card-title">Producto ${item.productoId}</h5>
                <p class="card-text">Cantidad: ${item.cantidad}</p>
              </div>
            </div>
          </div>
        </div>
      `).join("");
    } catch (error) {
      console.error("❌ Error al mostrar el carrito:", error);
      contenedor.innerHTML = `<div class="alert alert-danger text-center">Error al cargar el carrito.</div>`;
    }
  }

  function init() {
    configurarEventosGlobales();
    mostrarCarrito();

    if (btnFinalizar) {
      btnFinalizar.addEventListener("click", () => {
        alert("✅ Pedido realizado (simulado)");
      });
    }
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", controladorCarrito.init);
