import { registroModelo } from "./modelo.js"; // ✅ Correcto
import { registroVista } from "./vista.js";   // ✅ Correcto


const registroControlador = (() => {
  const form = document.getElementById("form-registro") as HTMLFormElement;

  function configurarEventos(): void {
    form.addEventListener("submit", async (e: Event) => {
      e.preventDefault();
      registroVista.limpiar();

      const nombre = (document.getElementById("nombre") as HTMLInputElement).value.trim();
      const apellido = (document.getElementById("apellido") as HTMLInputElement).value.trim();
      const email = (document.getElementById("email") as HTMLInputElement).value.trim();
      const password = (document.getElementById("password") as HTMLInputElement).value.trim();

      try {
        await registroModelo.registrar(nombre, apellido, email, password);
        registroVista.mostrarMensaje("Registro exitoso. Redirigiendo...", "success");

        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      } catch (error: any) {
        registroVista.mostrarMensaje(error.message, "danger");
      }
    });
  }

  return { configurarEventos };
})();

document.addEventListener("DOMContentLoaded", registroControlador.configurarEventos);
