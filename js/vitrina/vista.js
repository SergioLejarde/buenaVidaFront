const vistaVitrina = (() => {
  const contenedor = document.getElementById("contenedor-productos");
  const paginacion = document.getElementById("paginacion");

  function renderProductos(productos) {
    contenedor.innerHTML = "";

    if (productos.length === 0) {
      contenedor.innerHTML = `<div class="text-center text-muted">No se encontraron productos.</div>`;
      return;
    }

    productos.forEach((producto) => {
      const col = document.createElement("div");
      col.className = "col-md-3";

      const tarjeta = document.createElement("div");
      tarjeta.className = "card h-100 shadow-sm position-relative";
      tarjeta.dataset.id = producto.id;
      tarjeta.style.cursor = "pointer";

      // Resalte al pasar mouse (IU-04)
      tarjeta.addEventListener("mouseenter", () => {
        tarjeta.classList.add("shadow", "border-primary");
      });
      tarjeta.addEventListener("mouseleave", () => {
        tarjeta.classList.remove("shadow", "border-primary");
      });

      // Promoción (IU-03)
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
          <div class="d-flex justify-content-between mt-auto">
            <button class="btn btn-outline-danger" data-id="${producto.id}" data-fav>♥</button>
            <button class="btn btn-outline-success" data-id="${producto.id}" data-carrito>🛒</button>
          </div>
        </div>
      `;

      col.appendChild(tarjeta);
      contenedor.appendChild(col);
    });
  }

  function renderPaginacion(totalPaginas, paginaActual) {
    paginacion.innerHTML = "";

    for (let i = 1; i <= totalPaginas; i++) {
      const li = document.createElement("li");
      li.className = `page-item ${i === paginaActual ? "active" : ""}`;
      li.innerHTML = `<button class="page-link" data-pagina="${i}">${i}</button>`;
      paginacion.appendChild(li);
    }
  }

  return {
    renderProductos,
    renderPaginacion
  };
})();
