const controladorVitrina = (() => {
  let paginaActual = 1;
  let totalPaginas = 3;
  const limite = 12;

  // Elementos del DOM
  const buscador = document.getElementById("buscador");
  const btnBuscar = document.getElementById("btn-buscar");
  const paginacion = document.getElementById("paginacion");
  const contenedor = document.getElementById("contenedor-productos");

  // Cargar productos desde el backend con filtros
  async function cargarProductos() {
    const q = buscador.value.trim();

    const filtros = {
      page: paginaActual,
      limit: limite,
      q,
      min: 0,
      max: 99999
      // promo: false ← eliminado para evitar filtrar por error
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

  // Configurar eventos de búsqueda, paginación y botones ♥ 🛒
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
          await modeloFavoritos.agregarAFavoritos(usuarioId, productoId, token);
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
          await modeloCarrito.agregarAlCarrito(usuarioId, productoId, 1, token);
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
