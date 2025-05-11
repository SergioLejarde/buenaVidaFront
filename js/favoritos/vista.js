const vistaFavoritos = (() => {
  const contenedor = document.getElementById("contenedor-favoritos");

  function renderFavoritos(productos) {
    contenedor.innerHTML = "";

    if (productos.length === 0) {
      contenedor.innerHTML = `<div class="text-center text-muted">No tienes productos favoritos aún.</div>`;
      return;
    }

    productos.forEach((producto) => {
      const col = document.createElement("div");
      col.className = "col-md-3";

      const tarjeta = document.createElement("div");
      tarjeta.className = "card h-100 shadow-sm position-relative";

      if (producto.promocion) {
        const promoBadge = document.createElement("span");
        promoBadge.className = "position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger";
        promoBadge.style.zIndex = "1";
        promoBadge.innerText = "🔥";
        tarjeta.appendChild(promoBadge);
      }

      tarjeta.innerHTML += `
        <img src="assets/${producto.id}.jpg" class="card-img-top" alt="${producto.nombre}" />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text small">${producto.descripcion.slice(0, 100)}...</p>
          <p class="fw-bold mb-1">$${producto.precio}</p>
          <button class="btn btn-outline-success mt-auto" data-id="${producto.id}" data-carrito>🛒 Agregar</button>
        </div>
      `;

      col.appendChild(tarjeta);
      contenedor.appendChild(col);
    });
  }

  return {
    renderFavoritos
  };
})();
