const controladorModal = (() => {
  function configurarEventos() {
    // Mostrar modal al hacer clic sobre una tarjeta de producto
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

    // Agregar al carrito desde el modal
    document.addEventListener("click", async (e) => {
      if (e.target.id === "modalAgregarCarrito") {
        const token = localStorage.getItem("token");
        const usuarioId = parseInt(localStorage.getItem("usuarioId"));

        if (!token || !usuarioId) {
          alert("Debes iniciar sesión para agregar al carrito.");
          return;
        }

        const productoId = parseInt(e.target.dataset.id);
        const cantidad = parseInt(document.getElementById("modalCantidad").value);

        if (isNaN(cantidad) || cantidad < 1) {
          alert("Cantidad inválida.");
          return;
        }

        try {
          await modeloVitrina.agregarAlCarrito(usuarioId, productoId, cantidad);
          e.target.textContent = "✔️ Agregado";
          e.target.disabled = true;
        } catch (error) {
          console.error(error);
          alert("❌ No se pudo agregar al carrito.");
        }
      }

      // Agregar a favoritos desde el modal
      if (e.target.id === "modalFavorito") {
        const token = localStorage.getItem("token");
        const usuarioId = parseInt(localStorage.getItem("usuarioId"));

        if (!token || !usuarioId) {
          alert("Debes iniciar sesión para agregar a favoritos.");
          return;
        }

        const productoId = parseInt(e.target.dataset.id);

        try {
          await modeloVitrina.agregarAFavoritos(usuarioId, productoId);
          e.target.classList.remove("btn-outline-danger");
          e.target.classList.add("btn-danger");
          e.target.textContent = "❤️";
          e.target.disabled = true;
        } catch (error) {
          console.error(error);
          alert("❌ No se pudo agregar a favoritos.");
        }
      }
    });
  }

  return {
    configurarEventos
  };
})();

document.addEventListener("DOMContentLoaded", controladorModal.configurarEventos);
