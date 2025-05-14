const controladorPedidos = (() => {
  async function cargarPedidos() {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para ver tus pedidos.");
      window.location.href = "login.html";
      return;
    }

    try {
      const pedidos = await modeloPedidos.obtenerPedidos(token);
      vistaPedidos.render(pedidos);
    } catch {
      alert("Error al cargar pedidos.");
    }
  }

  return {
    cargarPedidos
  };
})();

document.addEventListener("DOMContentLoaded", controladorPedidos.cargarPedidos);
