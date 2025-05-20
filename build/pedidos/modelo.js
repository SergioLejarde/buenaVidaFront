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
    function obtenerPedidos(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch("http://localhost:3000/api/pedidos", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` // ✅ Aquí estaba el problema
                    }
                });
                if (response.status === 404)
                    return []; // 🛡️ fallback defensivo
                if (!response.ok)
                    throw new Error("Error al obtener pedidos");
                return yield response.json();
            }
            catch (error) {
                console.error("❌ Error en fetch de pedidos:", error);
                throw error;
            }
        });
    }
    return { obtenerPedidos };
})();
export { modeloPedidos };
