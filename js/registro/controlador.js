const registroControlador = (() => {
  const form = document.getElementById("form-registro");

  function configurarEventos() {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      registroVista.limpiar();

      const nombre = document.getElementById("nombre").value.trim();
      const apellido = document.getElementById("apellido").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      try {
        await registroModelo.registrar(nombre, apellido, email, password);
        registroVista.mostrarMensaje("Registro exitoso. Redirigiendo...", "success");

        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      } catch (error) {
        registroVista.mostrarMensaje(error.message, "danger");
      }
    });
  }

  return { configurarEventos };
})();

document.addEventListener("DOMContentLoaded", registroControlador.configurarEventos);
