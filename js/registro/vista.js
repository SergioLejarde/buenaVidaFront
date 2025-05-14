const registroVista = (() => {
  const mensaje = document.createElement("div");
  mensaje.className = "mt-3 text-center";
  document.getElementById("form-registro").appendChild(mensaje);

  function mostrarMensaje(texto, tipo = "success") {
    mensaje.textContent = texto;
    mensaje.className = `mt-3 text-center text-${tipo}`;
  }

  function limpiar() {
    mensaje.textContent = "";
  }

  return {
    mostrarMensaje,
    limpiar
  };
})();
