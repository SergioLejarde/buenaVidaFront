const vistaVitrina = (() => {
  const contenedor = document.getElementById("contenedor-productos") as HTMLElement;
  const paginacion = document.getElementById("paginacion") as HTMLElement;

  function renderProductos(productos: any[]): void {
    contenedor.innerHTML = "";

    if (productos.length === 0) {
      contenedor.innerHTML = `<div class="text-center text-muted">No se encontraron productos.</div>`;
      return;
    }

    productos.forEach((producto) => {
      const col = document.createElement("div");
      col.className = "col-md-3";

      const tarjeta = document.createElement("div");
      tarjeta.className = "card h-100 shadow-sm position-relative border-0 overflow-hidden";
      tarjeta.dataset.id = producto.id.toString();
      tarjeta.style.cursor = "pointer";

      // IU-05: Botones ocultos hasta hover
      const botones = document.createElement("div");
      botones.className = "d-flex justify-content-between px-3 pb-3 gap-2 invisible";

      // IU-04 Relieve con hover
      tarjeta.addEventListener("mouseenter", () => {
        tarjeta.classList.add("shadow-lg");
        botones.classList.remove("invisible");
      });
      tarjeta.addEventListener("mouseleave", () => {
        tarjeta.classList.remove("shadow-lg");
        botones.classList.add("invisible");
      });

      // IU-03 Promoción
      if (producto.promocion) {
        const promoBadge = document.createElement("div");
        promoBadge.className = "badge-promocion";
        promoBadge.innerText = "-50%\n2ªund.";
        tarjeta.appendChild(promoBadge);
      }

      // Imagen y contenido
      tarjeta.innerHTML += `
        <img src="assets/${producto.id}.jpg" class="card-img-top" alt="${producto.nombre}" />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text small">${producto.descripcion.slice(0, 100)}...</p>
          <p class="fw-bold mb-2">$${producto.precio}</p>
        </div>
      `;

      // Botones de acción
      const btnFav = document.createElement("button");
      btnFav.className = "btn btn-outline-danger flex-fill";
      btnFav.innerHTML = "♥";
      btnFav.setAttribute("data-id", producto.id.toString());
      btnFav.setAttribute("data-fav", "");

      const btnCarrito = document.createElement("button");
      btnCarrito.className = "btn btn-outline-success flex-fill";
      btnCarrito.innerHTML = "🛒";
      btnCarrito.setAttribute("data-id", producto.id.toString());
      btnCarrito.setAttribute("data-carrito", "");

      botones.appendChild(btnFav);
      botones.appendChild(btnCarrito);
      tarjeta.appendChild(botones);

      col.appendChild(tarjeta);
      contenedor.appendChild(col);
    });
  }

  function renderPaginacion(totalPaginas: number, paginaActual: number): void {
    paginacion.innerHTML = "";
    if (totalPaginas <= 1) return;

    const ul = document.createElement("ul");
    ul.className = "pagination justify-content-center mt-4";

    for (let i = 1; i <= totalPaginas; i++) {
      const li = document.createElement("li");
      li.className = `page-item ${i === paginaActual ? "active" : ""}`;

      const button = document.createElement("button");
      button.className = "page-link";
      button.textContent = i.toString();
      button.setAttribute("data-pagina", i.toString());

      li.appendChild(button);
      ul.appendChild(li);
    }

    paginacion.appendChild(ul);
  }

  return {
    renderProductos,
    renderPaginacion
  };
})();

export { vistaVitrina };
