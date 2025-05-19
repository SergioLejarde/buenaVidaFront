var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { modeloFavoritos } from "./modelo.js";
import { vistaFavoritos } from "./vista.js";
const controladorFavoritos = (() => {
    function cargarFavoritos() {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioId = parseInt(localStorage.getItem("usuarioId") || "");
            const token = localStorage.getItem("token");
            if (!usuarioId || !token) {
                alert("Debes iniciar sesión para ver tus favoritos.");
                window.location.href = "login.html";
                return;
            }
            const productos = yield modeloFavoritos.obtenerFavoritos(usuarioId, token);
            vistaFavoritos.renderFavoritos(productos);
        });
    }
    return {
        init: cargarFavoritos
    };
})();
document.addEventListener("DOMContentLoaded", controladorFavoritos.init);
