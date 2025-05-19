"use strict";
const loginVista = (() => {
    const mensaje = document.getElementById("mensaje-login");
    function mostrarError(texto) {
        mensaje.textContent = texto;
        mensaje.classList.remove("text-success");
        mensaje.classList.add("text-danger");
    }
    function mostrarExito(texto) {
        mensaje.textContent = texto;
        mensaje.classList.remove("text-danger");
        mensaje.classList.add("text-success");
    }
    function limpiar() {
        mensaje.textContent = "";
    }
    return {
        mostrarError,
        mostrarExito,
        limpiar
    };
})();
