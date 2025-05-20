import { modeloPedidos } from "./modelo.js";
import { vistaPedidos } from "./vista.js";

const controladorPedidos = (() => {
  async function cargarPedidos(): Promise<void> {
    const token: string | null = localStorage.getItem("token");

    if (!token) {
      alert("Debes iniciar sesión para ver tus pedidos.");
      window.location.href = "login.html";
      return;
    }

    try {
      const pedidos = await modeloPedidos.obtenerPedidos(token);
      vistaPedidos.render(pedidos);
    } catch (error) {
      console.error("❌ Error cargando pedidos:", error);
      alert("Error al cargar pedidos.");
    }
  }

  return {
    cargarPedidos
  };
})();

document.addEventListener("DOMContentLoaded", controladorPedidos.cargarPedidos);
