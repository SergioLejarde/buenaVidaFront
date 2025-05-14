const controladorVitrina = (() => {
  let paginaActual = 1;
  let totalPaginas = 1;
  const limite = 12;

  // Elementos del DOM
  const buscador = document.getElementById("buscador");
  const btnBuscar = document.getElementById("btn-buscar");
  const paginacion = document.getElementById("paginacion");
  const contenedor = document.getElementById("contenedor-productos");

  // Nuevos elementos para filtro por precio
  const filtroMin = document.getElementById("filtro-min");
  const filtroMax = document.getElementById("filtro-max");

  // Cargar productos desde el backend con filtros
  async function cargarProductos() {
    const q = buscador.value.trim();
    const min = filtroMin?.value ? parseFloat(filtroMin.value) : 0;
    const max = filtroMax?.value ? parseFloat(filtroMax.value) : 99999;

    const filtros = {
      page: paginaActual,
      limit: limite,
      q,
      min,
      max,
      promo: false // si más adelante quieres incluir checkbox de promociones
    };

    const { productos, totalPaginas: total } = await modeloVitrina.obtenerProductos(filtros);
    totalPaginas = total;

    vistaVitrina.renderProductos(productos);
    vistaVitrina.renderPaginacion(totalPaginas, paginaActual);
  }

  function configurarEventos() {
    btnBuscar.addEventListener("click", () => {
      paginaActual = 1;
      cargarProductos();
    });

    paginacion.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-pagina]");
      if (btn) {
        paginaActual = parseInt(btn.dataset.pagina);
        cargarProductos();
      }
    });

    contenedor.addEventListener("click", async (e) => {
      const favBtn = e.target.closest("button[data-fav]");
      const cartBtn = e.target.closest("button[data-carrito]");
      const token = localStorage.getItem("token");
      const usuarioIdRaw = localStorage.getItem("usuarioId");
      const usuarioId = usuarioIdRaw ? parseInt(usuarioIdRaw) : null;

      if (!token || !usuarioId) {
        alert("Debes iniciar sesión para usar esta función.");
        return;
      }

      if (favBtn) {
        const productoId = parseInt(favBtn.dataset.id);
        try {
          await modeloVitrina.agregarAFavoritos(usuarioId, productoId);
          favBtn.classList.remove("btn-outline-danger");
          favBtn.classList.add("btn-danger");
          favBtn.innerText = "❤️";
          favBtn.disabled = true;
        } catch (err) {
          alert("No se pudo agregar a favoritos.");
        }
      }

      if (cartBtn) {
        const productoId = parseInt(cartBtn.dataset.id);
        try {
          await modeloVitrina.agregarAlCarrito(usuarioId, productoId, 1);
          cartBtn.classList.remove("btn-outline-success");
          cartBtn.classList.add("btn-success");
          cartBtn.innerText = "✔️";
          cartBtn.disabled = true;
        } catch (err) {
          alert("No se pudo agregar al carrito.");
        }
      }
    });
  }

  function init() {
    configurarEventos();
    cargarProductos();
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", controladorVitrina.init);
