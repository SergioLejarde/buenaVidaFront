var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { registroModelo } from "./modelo.js"; // ✅ Correcto
import { registroVista } from "./vista.js"; // ✅ Correcto
const registroControlador = (() => {
    const form = document.getElementById("form-registro");
    function configurarEventos() {
        form.addEventListener("submit", (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            registroVista.limpiar();
            const nombre = document.getElementById("nombre").value.trim();
            const apellido = document.getElementById("apellido").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            try {
                yield registroModelo.registrar(nombre, apellido, email, password);
                registroVista.mostrarMensaje("Registro exitoso. Redirigiendo...", "success");
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2000);
            }
            catch (error) {
                registroVista.mostrarMensaje(error.message, "danger");
            }
        }));
    }
    return { configurarEventos };
})();
document.addEventListener("DOMContentLoaded", registroControlador.configurarEventos);
