var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { modeloAdmin } from "./modelo.js";
import { vistaAdmin } from "./vista.js";
const controladorAdmin = (() => {
    function cargarPanel() {
        return __awaiter(this, void 0, void 0, function* () {
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
                const usuarios = yield modeloAdmin.obtenerUsuarios(token);
                console.log("👥 Usuarios recibidos:", usuarios);
                vistaAdmin.renderUsuarios(usuarios);
                // Pedidos
                const pedidos = yield modeloAdmin.obtenerPedidos(token);
                console.log("📦 Pedidos recibidos:", pedidos);
                vistaAdmin.renderPedidos(pedidos);
            }
            catch (err) {
                console.error("❌ Error cargando panel:", err);
                alert("No se pudo cargar la información del panel.");
            }
        });
    }
    return { cargarPanel };
})();
document.addEventListener("DOMContentLoaded", controladorAdmin.cargarPanel);
