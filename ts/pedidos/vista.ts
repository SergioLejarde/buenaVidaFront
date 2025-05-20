const vistaPedidos = (() => {
  function render(pedidos: any[]): void {
    const contenedor = document.getElementById("lista-pedidos");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    if (pedidos.length === 0) {
      contenedor.innerHTML = "<div class='text-center text-muted'>Aún no tienes pedidos.</div>";
      return;
    }

    pedidos.forEach((pedido) => {
      const div = document.createElement("div");
      div.className = "list-group-item";
      div.innerHTML = `
        <h5 class="mb-1">Pedido #${pedido.id}</h5>
        <p class="mb-1">Total: $${pedido.total}</p>
        <small>Fecha: ${new Date(pedido.fecha).toLocaleDateString()}</small>
      `;
      contenedor.appendChild(div);
    });
  }

  return { render };
})();

export { vistaPedidos };
