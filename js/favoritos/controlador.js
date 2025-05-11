const controladorFavoritos = (() => {
  function configurarEventos() {
    document.addEventListener("click", (e) => {
      const favBtn = e.target.closest("button[data-fav]");
      if (!favBtn) return;

      const usuarioId = parseInt(localStorage.getItem("usuarioId"));
      if (!usuarioId) {
        alert("Debes iniciar sesión para agregar a favoritos.");
        return;
      }

      const productoId = parseInt(favBtn.dataset.id);
      modeloFavoritos.agregarAFavoritos(usuarioId, productoId);
      favBtn.classList.replace("btn-outline-danger", "btn-danger");
      favBtn.innerText = "❤️";
      favBtn.disabled = true;
    });
  }

  return { configurarEventos };
})();

document.addEventListener("DOMContentLoaded", controladorFavoritos.configurarEventos);
