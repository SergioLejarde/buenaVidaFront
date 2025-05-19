var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const registroModelo = (() => {
    const URL_REGISTRO = "http://localhost:3000/api/usuarios/registrar";
    function registrar(nombre, apellido, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(URL_REGISTRO, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nombre, apellido, email, password })
                });
                if (!response.ok) {
                    const errorData = yield response.json();
                    throw new Error(errorData.mensaje || "Error al registrar");
                }
                const datos = yield response.json();
                return datos;
            }
            catch (error) {
                console.error("❌ Error en registro:", error);
                throw error;
            }
        });
    }
    return { registrar };
})();
export { registroModelo };
