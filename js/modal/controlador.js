const controladorModal = (() => {
  function configurarEventos() {
    // Al hacer clic sobre la tarjeta, mostrar modal
    document.addEventListener("click", async (e) => {
      const tarjeta = e.target.closest(".card[data-id]");
      if (!tarjeta) return;

      const id = parseInt(tarjeta.dataset.id);
      try {
        const producto = await modeloModal.obtenerProductoPorId(id);
        vistaModal.mostrarModal(producto);
      } catch (err) {
        alert("❌ No se pudo cargar el producto.");
      }
    });

    // Al hacer clic en el botón "Agregar al carrito" dentro del modal
    document.addEventListener("click", (e) => {
      if (e.target.id === "modalAgregarCarrito") {
        const usuarioId = parseInt(localStorage.getItem("usuarioId"));
        if (!usuarioId) {
          alert("Debes iniciar sesión para agregar al carrito.");
          return;
        }

        const productoId = parseInt(e.target.dataset.id);
        const cantidad = parseInt(document.getElementById("modalCantidad").value);
        modeloCarrito.agregarAlCarrito(usuarioId, productoId, cantidad);
        e.target.textContent = "✔️ Agregado";
        e.target.disabled = true;
      }
    });
  }

  return {
    configurarEventos
  };
})();

document.addEventListener("DOMContentLoaded", controladorModal.configurarEventos);
