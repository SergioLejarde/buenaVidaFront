const vistaCarrito = (() => {
  const contenedor = document.getElementById("contenedor-carrito");

  function renderCarrito(productos) {
    contenedor.innerHTML = "";

    if (productos.length === 0) {
      contenedor.innerHTML = `<div class="text-center text-muted">Tu carrito está vacío.</div>`;
      return;
    }

    productos.forEach((item) => {
      const fila = document.createElement("div");
      fila.className = "row align-items-center border-bottom py-2";

      fila.innerHTML = `
        <div class="col-3">
          <img src="assets/${item.producto.id}.jpg" class="img-fluid" alt="${item.producto.nombre}" />
        </div>
        <div class="col-5">
          <h6 class="mb-1">${item.producto.nombre}</h6>
          <p class="mb-0 small">${item.producto.descripcion.slice(0, 60)}...</p>
          <p class="fw-bold">$${item.producto.precio}</p>
        </div>
        <div class="col-2">
          <input type="number" min="1" value="${item.cantidad}" class="form-control cantidad-input" data-id="${item.producto.id}" />
        </div>
        <div class="col-2 text-end">
          <button class="btn btn-sm btn-danger eliminar-carrito" data-id="${item.producto.id}">🗑️</button>
        </div>
      `;

      contenedor.appendChild(fila);
    });
  }

  return {
    renderCarrito
  };
})();
