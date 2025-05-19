var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const modeloModal = (() => {
    const URL = "http://localhost:3000/api/productos";
    function obtenerProductoPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${URL}/${id}`);
                if (!response.ok)
                    throw new Error("Producto no encontrado");
                return yield response.json();
            }
            catch (error) {
                console.error("❌ Error al obtener producto por ID:", error);
                throw error;
            }
        });
    }
    return {
        obtenerProductoPorId
    };
})();
export { modeloModal };
