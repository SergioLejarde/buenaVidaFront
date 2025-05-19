import { modeloCarrito } from "./modelo.js";
import { vistaCarrito } from "./vista.js";

const controladorCarrito = (() => {
  const contenedor = document.getElementById("contenedor-carrito") as HTMLElement;
  const totalSpan = document.getElementById("total-carrito") as HTMLElement;
  const btnFinalizar = document.getElementById("btn-finalizar") as HTMLButtonElement;

  const usuarioId = parseInt(localStorage.getItem("usuarioId") || "0");
  const token = localStorage.getItem("token") || "";

  async function cargarCarrito(): Promise<void> {
    if (!usuarioId || !token) {
      alert("Debes iniciar sesión para ver tu carrito.");
      return;
    }

    const respuesta = await modeloCarrito.obtenerCarrito(usuarioId, token);
    const productos = respuesta.productos || [];
    vistaCarrito.renderCarrito(productos);
  }

  function configurarEventos(): void {
    contenedor.addEventListener("click", async (e: Event) => {
      const target = e.target as HTMLElement;
      const eliminarBtn = target.closest(".eliminar-carrito") as HTMLButtonElement;

      if (eliminarBtn) {
        const productoId = parseInt(eliminarBtn.dataset.id || "0");
        await modeloCarrito.eliminarProducto(usuarioId, productoId, token);
        await cargarCarrito();
      }
    });

    contenedor.addEventListener("change", async (e: Event) => {
      const inputCantidad = e.target as HTMLInputElement;
      if (inputCantidad && inputCantidad.classList.contains("cantidad-input")) {
        const nuevaCantidad = parseInt(inputCantidad.value);
        const productoId = parseInt(inputCantidad.dataset.id || "0");

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

  function init(): void {
    cargarCarrito();
    configurarEventos();
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", controladorCarrito.init);
