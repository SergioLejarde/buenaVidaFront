const vistaAdmin = (() => {
  function renderUsuarios(usuarios: any[]): void {
    const contenedor = document.getElementById("lista-usuarios");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    if (usuarios.length === 0) {
      contenedor.innerHTML = "<div class='text-muted text-center'>No hay usuarios registrados.</div>";
      return;
    }

    usuarios.forEach((usuario) => {
      const div = document.createElement("div");
      div.className = "list-group-item";
      div.innerHTML = `
        <h6 class="mb-1">${usuario.nombre}</h6>
        <p class="mb-0">${usuario.email} <span class="badge bg-info text-dark">${usuario.rol}</span></p>
      `;
      contenedor.appendChild(div);
    });
  }

  function renderPedidos(pedidos: any[]): void {
    const contenedor = document.getElementById("lista-pedidos");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    if (pedidos.length === 0) {
      contenedor.innerHTML = "<div class='text-muted text-center'>No hay pedidos registrados.</div>";
      return;
    }

    pedidos.forEach((pedido) => {
      const div = document.createElement("div");
      div.className = "list-group-item";
      div.innerHTML = `
        <h6 class="mb-1">Pedido #${pedido.id}</h6>
        <p class="mb-0">Usuario ID: ${pedido.usuarioId} | Total: $${pedido.total}</p>
        <small>Fecha: ${new Date(pedido.fecha).toLocaleDateString()}</small>
      `;
      contenedor.appendChild(div);
    });
  }

  return {
    renderUsuarios,
    renderPedidos
  };
})();

export { vistaAdmin };
