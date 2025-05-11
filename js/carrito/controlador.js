const controladorCarrito = (() => {
  function configurarEventos() {
    document.addEventListener("click", (e) => {
      const cartBtn = e.target.closest("button[data-carrito]");
      if (!cartBtn) return;

      const usuarioId = parseInt(localStorage.getItem("usuarioId"));
      if (!usuarioId) {
        alert("Debes iniciar sesión para agregar al carrito.");
        return;
      }

      const productoId = parseInt(cartBtn.dataset.id);
      modeloCarrito.agregarAlCarrito(usuarioId, productoId, 1);
      cartBtn.classList.replace("btn-outline-success", "btn-success");
      cartBtn.innerText = "✔️";
      cartBtn.disabled = true;
    });
  }

  return { configurarEventos };
})();

document.addEventListener("DOMContentLoaded", controladorCarrito.configurarEventos);
