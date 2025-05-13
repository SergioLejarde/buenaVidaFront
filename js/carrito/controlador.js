const controladorCarrito = (() => {
  const contenedor = document.getElementById("contenedor-carrito");
  const btnFinalizar = document.getElementById("btn-finalizar");

  // Agregar producto desde la vitrina (cuando el botón tiene data-carrito)
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

  // Mostrar productos del carrito (para carrito.html)
  async function mostrarCarrito() {
    const usuarioId = parseInt(localStorage.getItem("usuarioId"));
    const token = localStorage.getItem("token");

    if (!contenedor || !usuarioId || !token) return;

    const productos = await modeloCarrito.obtenerCarrito(usuarioId, token);

    if (productos.length === 0) {
      contenedor.innerHTML = `<div class="alert alert-info text-center">Tu carrito está vacío.</div>`;
      return;
    }

    contenedor.innerHTML = productos.map((item) => `
      <div class="card mb-3">
        <div class="row g-0 align-items-center">
          <div class="col-4">
            <img src="assets/${item.producto.id}.jpg" class="img-fluid" alt="${item.producto.nombre}">
          </div>
          <div class="col-8">
            <div class="card-body">
              <h5 class="card-title">${item.producto.nombre}</h5>
              <p class="card-text">Cantidad: ${item.cantidad}</p>
              <p class="card-text"><strong>Precio:</strong> $${item.producto.precio}</p>
            </div>
          </div>
        </div>
      </div>
    `).join("");
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
