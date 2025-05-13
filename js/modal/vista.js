// vista del modal
const vistaModal = (() => {
  function crearEstructuraModal() {
    const existente = document.getElementById("modalProducto");
    if (existente) return;

    const modalHTML = document.createElement("div");
    modalHTML.innerHTML = `
      <div class="modal fade" id="modalProducto" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalTitulo"></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">
              <img id="modalImagen" class="img-fluid mb-3" alt="" />
              <p id="modalDescripcion"></p>
              <p><strong>Precio:</strong> $<span id="modalPrecio"></span></p>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <input type="number" id="modalCantidad" class="form-control me-2" value="1" min="1" style="max-width: 100px;" />
                <button class="btn btn-success" id="modalAgregarCarrito">Agregar 🛒</button>
                <button class="btn btn-outline-danger" id="modalFavorito">♥</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modalHTML);
  }

  function mostrarModal(producto) {
    crearEstructuraModal();

    document.getElementById("modalTitulo").textContent = producto.nombre;
    document.getElementById("modalImagen").src = `assets/${producto.id}.jpg`;
    document.getElementById("modalImagen").alt = producto.nombre;
    document.getElementById("modalDescripcion").textContent = producto.descripcion;
    document.getElementById("modalPrecio").textContent = producto.precio;
    document.getElementById("modalCantidad").value = 1;
    document.getElementById("modalAgregarCarrito").setAttribute("data-id", producto.id);
    document.getElementById("modalFavorito").setAttribute("data-id", producto.id);

    const modal = new bootstrap.Modal(document.getElementById("modalProducto"));
    modal.show();
  }

  return {
    mostrarModal
  };
})();
