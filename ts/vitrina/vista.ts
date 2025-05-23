// Módulo vistaVitrina: se encarga de renderizar los productos y la paginación en la vitrina
const vistaVitrina = (() => {
  // Referencias a elementos HTML principales
  const contenedor = document.getElementById("contenedor-productos") as HTMLElement;
  const paginacion = document.getElementById("paginacion") as HTMLElement;

  // Función para renderizar visualmente una lista de productos
  function renderProductos(productos: any[]): void {
    // Limpiar el contenedor antes de renderizar nuevos productos
    contenedor.innerHTML = "";

    // Si no hay productos, mostrar mensaje de "no encontrados"
    if (productos.length === 0) {
      contenedor.innerHTML = `<div class="text-center text-muted">No se encontraron productos.</div>`;
      return;
    }

    // Por cada producto recibido, construir una "card" visual
    productos.forEach((producto) => {
      const col = document.createElement("div");
      col.className = "col-md-3"; // 4 columnas por fila

      const tarjeta = document.createElement("div");
      tarjeta.className = "card h-100 shadow-sm position-relative border-0 overflow-hidden";
      tarjeta.dataset.id = producto.id.toString();
      tarjeta.style.cursor = "pointer";

      // 🔲 IU-05: Botones de acción (ocultos por defecto)
      const botones = document.createElement("div");
      botones.className = "d-flex justify-content-between px-3 pb-3 gap-2 invisible";

      // ✨ IU-04: Efecto de relieve al hacer hover en la tarjeta
      tarjeta.addEventListener("mouseenter", () => {
        tarjeta.classList.add("shadow-lg");
        botones.classList.remove("invisible");
      });
      tarjeta.addEventListener("mouseleave", () => {
        tarjeta.classList.remove("shadow-lg");
        botones.classList.add("invisible");
      });

      // 🔴 IU-03: Mostrar badge de promoción si aplica
      if (producto.promocion) {
        const promoBadge = document.createElement("div");
        promoBadge.className = "badge-promocion";
        promoBadge.innerText = "-50%\n2ªund."; // texto fijo como ejemplo
        tarjeta.appendChild(promoBadge);
      }

      // 🖼️ Agregar imagen, nombre, descripción y precio al contenido de la tarjeta
      tarjeta.innerHTML += `
        <img src="assets/${producto.id}.jpg" class="card-img-top" alt="${producto.nombre}" />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text small">${producto.descripcion.slice(0, 100)}...</p>
          <p class="fw-bold mb-2">$${producto.precio}</p>
        </div>
      `;

      // ❤️ Botón para agregar a favoritos
      const btnFav = document.createElement("button");
      btnFav.className = "btn btn-outline-danger flex-fill";
      btnFav.innerHTML = "♥";
      btnFav.setAttribute("data-id", producto.id.toString());
      btnFav.setAttribute("data-fav", "");

      // 🛒 Botón para agregar al carrito
      const btnCarrito = document.createElement("button");
      btnCarrito.className = "btn btn-outline-success flex-fill";
      btnCarrito.innerHTML = "🛒";
      btnCarrito.setAttribute("data-id", producto.id.toString());
      btnCarrito.setAttribute("data-carrito", "");

      // Agrega ambos botones al contenedor y la tarjeta
      botones.appendChild(btnFav);
      botones.appendChild(btnCarrito);
      tarjeta.appendChild(botones);

      // Agrega la tarjeta completa a la columna y esta al contenedor
      col.appendChild(tarjeta);
      contenedor.appendChild(col);
    });
  }

  // Función para renderizar la barra de paginación en la parte inferior
  function renderPaginacion(totalPaginas: number, paginaActual: number): void {
    paginacion.innerHTML = ""; // Limpia cualquier paginación anterior

    if (totalPaginas <= 1) return; // No mostrar si solo hay una página

    const ul = document.createElement("ul");
    ul.className = "pagination justify-content-end mt-4"; // IU-02: Alineado a la derecha

    // Crear un botón por cada página
    for (let i = 1; i <= totalPaginas; i++) {
      const li = document.createElement("li");
      li.className = `page-item ${i === paginaActual ? "active" : ""}`; // Resalta la actual

      const button = document.createElement("button");
      button.className = "page-link";
      button.textContent = i.toString();
      button.setAttribute("data-pagina", i.toString()); // Usado por el controlador

      li.appendChild(button);
      ul.appendChild(li);
    }

    paginacion.appendChild(ul); // Agrega toda la paginación al DOM
  }

  // Se exportan las funciones que el controlador puede usar
  return {
    renderProductos,
    renderPaginacion
  };
})();

// Exportar el módulo para que el controlador lo pueda usar
export { vistaVitrina };
