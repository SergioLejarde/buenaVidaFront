"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const loginControlador = (() => {
    const form = document.getElementById("form-login");
    function configurarEventos() {
        form.addEventListener("submit", (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            loginVista.limpiar();
            const correoInput = document.getElementById("correo");
            const contrasenaInput = document.getElementById("contrasena");
            const correo = correoInput.value.trim();
            const contrasena = contrasenaInput.value.trim();
            try {
                const datos = yield loginModelo.login(correo, contrasena);
                localStorage.setItem("usuarioId", datos.usuarioId);
                localStorage.setItem("token", datos.token);
                localStorage.setItem("rol", datos.rol);
                loginVista.mostrarExito("Inicio de sesión exitoso");
                setTimeout(() => {
                    if (datos.rol === "admin") {
                        window.location.href = "admin.html";
                    }
                    else {
                        window.location.href = "index.html";
                    }
                }, 1500);
            }
            catch (error) {
                loginVista.mostrarError(error.message || "Error al iniciar sesión.");
            }
        }));
    }
    function init() {
        configurarEventos();
    }
    return { init };
})();
document.addEventListener("DOMContentLoaded", loginControlador.init);
