document.addEventListener('DOMContentLoaded', () => {
  const productContainer = document.getElementById('product-container');

  // Carga el JSON
  fetch('productos.json')
      .then(response => response.json())
      .then(data => {
          // Itera a través de los productos y crea elementos para mostrarlos
          data.productos.forEach(product => {
              const productElement = document.createElement('div');
              productElement.classList.add('product');
              productElement.innerHTML = `
              <div class="foto">
              <img src="${product.img}" alt="${product.nombre}">
              </div>
              <div class="info">
                  <h3>${product.nombre}</h3>
                  <p>Medidas: ${product.medidas}</p>
                  <p>Precio de alquiler: $${product.precio_alquiler}</p>
                  <p>Precio de venta (Acrílico): $${product.precio_venta_acrilico} INCLUYE IVA</p>
                  <p>Precio de venta (MDF): $${product.precio_venta_mdf} INCLUYE IVA</p>
              </div>
              `;
              productContainer.appendChild(productElement);
          });
      })
      .catch(error => {
          console.error('Error al cargar el JSON:', error);
      });
});
