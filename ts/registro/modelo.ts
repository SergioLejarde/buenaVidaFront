const registroModelo = (() => {
  const URL_REGISTRO = "http://localhost:3000/api/usuarios/registrar";

  async function registrar(nombre: string, apellido: string, email: string, password: string): Promise<any> {
    try {
      const response = await fetch(URL_REGISTRO, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido, email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || "Error al registrar");
      }

      const datos = await response.json();
      return datos;
    } catch (error: any) {
      console.error("❌ Error en registro:", error);
      throw error;
    }
  }

  return { registrar };
})();
export { registroModelo };
