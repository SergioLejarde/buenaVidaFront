interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

interface ItemCarrito {
  productoId: number;
  cantidad: number;
  precio?: number;
  producto?: Producto;
}

const vistaCarrito = (() => {
  const contenedor = document.getElementById("contenedor-carrito") as HTMLElement;
  const totalSpan = document.getElementById("total-carrito") as HTMLElement;

  function renderCarrito(productos: ItemCarrito[]): void {
    contenedor.innerHTML = "";
    let total = 0;

    if (!Array.isArray(productos) || productos.length === 0) {
      contenedor.innerHTML = `<div class="text-center text-muted">Tu carrito está vacío.</div>`;
      totalSpan.textContent = "0";
      return;
    }

    productos.forEach((item) => {
      const producto = item.producto || {
        id: item.productoId,
        nombre: `Producto ${item.productoId}`,
        precio: item.precio || 0
      };

      const subtotal = producto.precio * item.cantidad;
      total += subtotal;

      const fila = document.createElement("div");
      fila.className = "row align-items-center border-bottom py-2";

      fila.innerHTML = `
        <div class="col-3">
          <img src="assets/${producto.id}.jpg" class="img-fluid" alt="${producto.nombre}" />
        </div>
        <div class="col-5">
          <h6 class="mb-1">${producto.nombre}</h6>
          <p class="fw-bold">$${producto.precio}</p>
        </div>
        <div class="col-2">
          <input type="number" min="1" value="${item.cantidad}" class="form-control cantidad-input" data-id="${producto.id}" />
        </div>
        <div class="col-2 text-end">
          <button class="btn btn-sm btn-danger eliminar-carrito" data-id="${producto.id}">🗑️</button>
        </div>
      `;

      contenedor.appendChild(fila);
    });

    totalSpan.textContent = total.toFixed(2);
  }

  return {
    renderCarrito
  };
})();
export { vistaCarrito };
