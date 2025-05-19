var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const modeloFavoritos = (() => {
    const URL_BASE = "http://localhost:3000/api/favoritos";
    function agregarAFavoritos(usuarioId, productoId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(URL_BASE, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ usuarioId, productoId })
                });
                if (!response.ok) {
                    const errData = yield response.json();
                    throw new Error((errData === null || errData === void 0 ? void 0 : errData.error) || "No se pudo agregar a favoritos");
                }
            }
            catch (error) {
                console.error("❌ Error al agregar favorito:", error);
            }
        });
    }
    function obtenerFavoritos(usuarioId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${URL_BASE}/${usuarioId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    const errData = yield response.json();
                    throw new Error((errData === null || errData === void 0 ? void 0 : errData.error) || "No se pudieron obtener favoritos");
                }
                return yield response.json();
            }
            catch (error) {
                console.error("❌ Error al obtener favoritos:", error);
                return [];
            }
        });
    }
    return {
        agregarAFavoritos,
        obtenerFavoritos
    };
})();
export { modeloFavoritos };
