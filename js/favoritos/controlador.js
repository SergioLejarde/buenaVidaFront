const controladorFavoritos = (() => {
  async function cargarFavoritos() {
    const usuarioId = parseInt(localStorage.getItem("usuarioId"));
    const token = localStorage.getItem("token");

    if (!usuarioId || !token) {
      alert("Debes iniciar sesión para ver tus favoritos.");
      window.location.href = "login.html";
      return;
    }

    const productos = await modeloFavoritos.obtenerFavoritos(usuarioId, token);
    vistaFavoritos.renderFavoritos(productos);
  }

  return {
    init: cargarFavoritos
  };
})();

document.addEventListener("DOMContentLoaded", controladorFavoritos.init);
