import { modeloVitrina } from "./modelo.js";
import { vistaVitrina } from "./vista.js";
import { modeloFavoritos } from "../favoritos/modelo.js";
import { modeloCarrito } from "../carrito/modelo.js";

const controladorVitrina = (() => {
  let paginaActual = 1;
  let totalPaginas = 3;
  const limite = 12;

  const buscador = document.getElementById("buscador") as HTMLInputElement;
  const btnBuscar = document.getElementById("btn-buscar") as HTMLButtonElement;
  const paginacion = document.getElementById("paginacion") as HTMLElement;
  const contenedor = document.getElementById("contenedor-productos") as HTMLElement;
  const inputMin = document.getElementById("precio-min") as HTMLInputElement;
  const inputMax = document.getElementById("precio-max") as HTMLInputElement;

  async function cargarProductos(): Promise<void> {
    const q = buscador.value.trim();
    const min = parseFloat(inputMin?.value || "0");
    const max = parseFloat(inputMax?.value || "99999");

    const filtros = {
      page: paginaActual,
      limit: limite,
      q,
      min,
      max
    };

    try {
      const { productos, totalPaginas: total } = await modeloVitrina.obtenerProductos(filtros);
      console.log("🟢 totalPaginas desde backend:", total);
      totalPaginas = total;
      vistaVitrina.renderProductos(productos);
      vistaVitrina.renderPaginacion(totalPaginas, paginaActual);
    } catch (error) {
      console.error("❌ Error cargando productos:", error);
      vistaVitrina.renderProductos([]);
      vistaVitrina.renderPaginacion(1, 1);
    }
  }

  function configurarEventos(): void {
    btnBuscar.addEventListener("click", () => {
      paginaActual = 1;
      cargarProductos();
    });

    paginacion.addEventListener("click", (e: Event) => {
      const btn = (e.target as HTMLElement).closest("button[data-pagina]") as HTMLButtonElement;
      if (btn) {
        paginaActual = parseInt(btn.dataset.pagina || "1");
        cargarProductos();
      }
    });

    contenedor.addEventListener("click", async (e: Event) => {
      const target = e.target as HTMLElement;
      const favBtn = target.closest("button[data-fav]") as HTMLButtonElement | null;
      const cartBtn = target.closest("button[data-carrito]") as HTMLButtonElement | null;

      const token = localStorage.getItem("token");
      const usuarioIdRaw = localStorage.getItem("usuarioId");
      const usuarioId = usuarioIdRaw ? parseInt(usuarioIdRaw) : null;

      if (!token || !usuarioId) {
        alert("Debes iniciar sesión para usar esta función.");
        return;
      }

      if (favBtn) {
        const productoId = parseInt(favBtn.dataset.id || "0");
        try {
          await modeloFavoritos.agregarAFavoritos(usuarioId, productoId, token);
          favBtn.classList.remove("btn-outline-danger");
          favBtn.classList.add("btn-danger");
          favBtn.innerText = "❤️";
          favBtn.disabled = true;
        } catch (err) {
          console.error("❌ Error al agregar a favoritos:", err);
          alert("No se pudo agregar a favoritos.");
        }
      }

      if (cartBtn) {
        const productoId = parseInt(cartBtn.dataset.id || "0");
        try {
          await modeloCarrito.agregarAlCarrito(usuarioId, productoId, 1, token);
          cartBtn.classList.remove("btn-outline-success");
          cartBtn.classList.add("btn-success");
          cartBtn.innerText = "✔️";
          cartBtn.disabled = true;
        } catch (err) {
          console.error("❌ Error al agregar al carrito:", err);
          alert("No se pudo agregar al carrito.");
        }
      }
    });
  }

  function init(): void {
    configurarEventos();
    cargarProductos();
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", controladorVitrina.init);
