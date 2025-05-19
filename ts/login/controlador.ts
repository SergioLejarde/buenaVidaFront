interface LoginResponse {
  usuarioId: string;
  token: string;
}

const loginControlador = (() => {
  const form = document.getElementById("form-login") as HTMLFormElement;

  function configurarEventos(): void {
    form.addEventListener("submit", async (e: Event) => {
      e.preventDefault();
      loginVista.limpiar();

      const correoInput = document.getElementById("correo") as HTMLInputElement;
      const contrasenaInput = document.getElementById("contrasena") as HTMLInputElement;
      const correo = correoInput.value.trim();
      const contrasena = contrasenaInput.value.trim();

      try {
        const datos: LoginResponse = await loginModelo.login(correo, contrasena);

        localStorage.setItem("usuarioId", datos.usuarioId);
        localStorage.setItem("token", datos.token);

        loginVista.mostrarExito("Inicio de sesión exitoso");

        setTimeout(() => {
          window.location.href = "index.html";
        }, 1500);
      } catch (error: any) {
        loginVista.mostrarError(error.message);
      }
    });
  }

  function init(): void {
    configurarEventos();
  }

  return {
    init
  };
})();

document.addEventListener("DOMContentLoaded", loginControlador.init);
