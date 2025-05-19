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
const modeloPedidos = (() => {
    const URL = "http://localhost:3000/api/pedidos";
    function obtenerPedidos(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(URL, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!response.ok)
                    throw new Error("No se pudieron obtener pedidos");
                return yield response.json();
            }
            catch (error) {
                console.error("❌ Error al obtener pedidos:", error);
                return [];
            }
        });
    }
    return { obtenerPedidos };
})();
