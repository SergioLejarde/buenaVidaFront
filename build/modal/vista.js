const vistaModal = (() => {
    function crearEstructuraModal() {
        if (document.getElementById("modalProducto"))
            return;
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
              <img id="modalImagen" class="img-fluid mb-3 rounded shadow-sm" alt="" />
              <p id="modalDescripcion" class="text-muted small"></p>
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
        const img = document.getElementById("modalImagen");
        img.src = `assets/${producto.id}.jpg`;
        img.alt = producto.nombre;
        document.getElementById("modalDescripcion").textContent = producto.descripcion;
        document.getElementById("modalPrecio").textContent = producto.precio.toString();
        document.getElementById("modalCantidad").value = "1";
        const agregarBtn = document.getElementById("modalAgregarCarrito");
        const favBtn = document.getElementById("modalFavorito");
        agregarBtn.disabled = false;
        agregarBtn.textContent = "Agregar 🛒";
        favBtn.disabled = false;
        favBtn.textContent = "♥";
        favBtn.classList.remove("btn-danger");
        favBtn.classList.add("btn-outline-danger");
        agregarBtn.setAttribute("data-id", producto.id.toString());
        favBtn.setAttribute("data-id", producto.id.toString());
        const modal = new bootstrap.Modal(document.getElementById("modalProducto"));
        modal.show();
    }
    return {
        mostrarModal
    };
})();
export { vistaModal };
