import { modeloAdmin } from "./modelo.js";
import { vistaAdmin } from "./vista.js";

const controladorAdmin = (() => {
  async function cargarPanel(): Promise<void> {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");

    if (!token || rol !== "admin") {
      alert("Acceso denegado. No eres administrador.");
      window.location.href = "index.html";
      return;
    }

    try {
      console.log("🔐 TOKEN:", token);

      // Usuarios
      const usuarios = await modeloAdmin.obtenerUsuarios(token);
      console.log("👥 Usuarios recibidos:", usuarios);
      vistaAdmin.renderUsuarios(usuarios);

      // Pedidos
      const pedidos = await modeloAdmin.obtenerPedidos(token);
      console.log("📦 Pedidos recibidos:", pedidos);
      vistaAdmin.renderPedidos(pedidos);

    } catch (err) {
      console.error("❌ Error cargando panel:", err);
      alert("No se pudo cargar la información del panel.");
    }
  }

  return { cargarPanel };
})();

document.addEventListener("DOMContentLoaded", controladorAdmin.cargarPanel);