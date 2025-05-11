const loginModelo = (() => {
  const URL_LOGIN = "http://localhost:3000/api/usuarios/login";

  async function login(correo, contrasena) {
    try {
      const response = await fetch(URL_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: correo, password: contrasena })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || "Error en el inicio de sesión");
      }

      const datos = await response.json();
      return datos;
    } catch (error) {
      console.error("❌ Error al iniciar sesión:", error);
      throw error;
    }
  }

  return {
    login
  };
})();
