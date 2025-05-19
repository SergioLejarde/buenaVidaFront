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
const controladorPedidos = (() => {
    function cargarPedidos() {
        return __awaiter(this, void 0, void 0, function* () {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Debes iniciar sesión para ver tus pedidos.");
                window.location.href = "login.html";
                return;
            }
            try {
                const pedidos = yield modeloPedidos.obtenerPedidos(token);
                vistaPedidos.render(pedidos);
            }
            catch (error) {
                console.error("❌ Error cargando pedidos:", error);
                alert("Error al cargar pedidos.");
            }
        });
    }
    return {
        cargarPedidos
    };
})();
document.addEventListener("DOMContentLoaded", controladorPedidos.cargarPedidos);
