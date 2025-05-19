import { modeloModal } from "./modelo.js";
import { vistaModal } from "./vista.js";
import { modeloVitrina } from "../vitrina/modelo.js"; // ✅



const controladorModal = (() => {
  function configurarEventos(): void {
    // Mostrar modal
    document.addEventListener("click", async (e: Event) => {
      const target = e.target as HTMLElement;
      const tarjeta = target.closest(".card[data-id]") as HTMLElement | null;
      if (!tarjeta) return;

      const id = parseInt(tarjeta.dataset.id || "");
      if (isNaN(id)) return;

      try {
        const producto = await modeloModal.obtenerProductoPorId(id);
        vistaModal.mostrarModal(producto);
      } catch {
        alert("❌ No se pudo cargar el producto.");
      }
    });

    // Acciones desde modal
    document.addEventListener("click", async (e: Event) => {
      const target = e.target as HTMLElement;

      // Agregar al carrito
      if (target.id === "modalAgregarCarrito") {
        const token = localStorage.getItem("token");
        const usuarioId = parseInt(localStorage.getItem("usuarioId") || "");

        if (!token || !usuarioId) {
          alert("Debes iniciar sesión para agregar al carrito.");
          return;
        }

        const productoId = parseInt(target.dataset.id || "");
        const cantidad = parseInt((document.getElementById("modalCantidad") as HTMLInputElement).value);

        if (isNaN(cantidad) || cantidad < 1) {
          alert("Cantidad inválida.");
          return;
        }

        try {
          await modeloVitrina.agregarAlCarrito(usuarioId, productoId, cantidad);
          target.textContent = "✔️ Agregado";
          target.setAttribute("disabled", "true");
        } catch {
          alert("❌ No se pudo agregar al carrito.");
        }
      }

      // Agregar a favoritos
      if (target.id === "modalFavorito") {
        const token = localStorage.getItem("token");
        const usuarioId = parseInt(localStorage.getItem("usuarioId") || "");

        if (!token || !usuarioId) {
          alert("Debes iniciar sesión para agregar a favoritos.");
          return;
        }

        const productoId = parseInt(target.dataset.id || "");

        try {
          await modeloVitrina.agregarAFavoritos(usuarioId, productoId);
          target.classList.remove("btn-outline-danger");
          target.classList.add("btn-danger");
          target.textContent = "❤️";
          target.setAttribute("disabled", "true");
        } catch {
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
