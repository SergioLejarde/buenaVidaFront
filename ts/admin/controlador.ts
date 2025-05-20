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

      const usuarios = await modeloAdmin.obtenerUsuarios(token);
      console.log("👥 Usuarios recibidos:", usuarios);

      vistaAdmin.renderUsuarios(usuarios);
    } catch (err) {
      console.error("❌ Error cargando usuarios:", err);
      alert("No se pudieron cargar los usuarios.");
    }
  }

  return { cargarPanel };
})();

document.addEventListener("DOMContentLoaded", controladorAdmin.cargarPanel);
