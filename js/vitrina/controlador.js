const controladorVitrina = (() => {
  let paginaActual = 1;
  let totalPaginas = 3;
  const limite = 12;

  // Elementos del DOM
  const buscador = document.getElementById("buscador");
  const btnBuscar = document.getElementById("btn-buscar");
  const paginacion = document.getElementById("paginacion");

  // Cargar productos desde el backend con filtros
  async function cargarProductos() {
    const q = buscador.value.trim();

    const filtros = {
      page: paginaActual,
      limit: limite,
      q,
      min: 0,
      max: 99999,
      promo: false
    };

    const productos = await modeloVitrina.obtenerProductos(filtros);
    vistaVitrina.renderProductos(productos);
    vistaVitrina.renderPaginacion(totalPaginas, paginaActual);
  }

  // Configurar eventos de búsqueda y paginación
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
  }

  function init() {
    configurarEventos();
    cargarProductos();
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", controladorVitrina.init);
