const registroVista = (() => {
  const form = document.getElementById("form-registro") as HTMLFormElement;
  const mensaje = document.createElement("div");
  mensaje.className = "mt-3 text-center";
  form.appendChild(mensaje);

  function mostrarMensaje(texto: string, tipo: "success" | "danger" = "success"): void {
    mensaje.textContent = texto;
    mensaje.className = `mt-3 text-center text-${tipo}`;
  }

  function limpiar(): void {
    mensaje.textContent = "";
  }

  return {
    mostrarMensaje,
    limpiar
  };
})();
export { registroVista };
