const loginControlador = (() => {
  const form = document.getElementById("form-login");

  function configurarEventos() {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      loginVista.limpiar();

      const correo = document.getElementById("correo").value.trim();
      const contrasena = document.getElementById("contrasena").value.trim();

      try {
        const datos = await loginModelo.login(correo, contrasena);

        // Guardar usuarioId en localStorage
        localStorage.setItem("usuarioId", datos.usuarioId);

        loginVista.mostrarExito("Inicio de sesión exitoso");

        // Redirigir a la vitrina (index.html)
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1500);
      } catch (error) {
        loginVista.mostrarError(error.message);
      }
    });
  }

  function init() {
    configurarEventos();
  }

  return {
    init
  };
})();

document.addEventListener("DOMContentLoaded", loginControlador.init);
