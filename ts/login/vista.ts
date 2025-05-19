const loginVista = (() => {
  const mensaje = document.getElementById("mensaje-login") as HTMLElement;

  function mostrarError(texto: string): void {
    mensaje.textContent = texto;
    mensaje.classList.remove("text-success");
    mensaje.classList.add("text-danger");
  }

  function mostrarExito(texto: string): void {
    mensaje.textContent = texto;
    mensaje.classList.remove("text-danger");
    mensaje.classList.add("text-success");
  }

  function limpiar(): void {
    mensaje.textContent = "";
  }

  return {
    mostrarError,
    mostrarExito,
    limpiar
  };
})();
