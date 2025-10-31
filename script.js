document.addEventListener('DOMContentLoaded', () => {
  const productContainer = document.getElementById('product-container');

  fetch('productos.json')
    .then(response => response.json())
    .then(data => {
      const productosOrdenados = data.productos.sort((a, b) => {
        const precioA = parseFloat(a.precio_venta_acrilico) || 0;
        const precioB = parseFloat(b.precio_venta_acrilico) || 0;
        return precioA - precioB;
      });

      productosOrdenados.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        const precioAlquilerHTML = product.precio_alquiler
          ? `<p>Precio de alquiler: $${product.precio_alquiler}</p>`
          : '';

        const precioMdfHTML = product.precio_venta_mdf
          ? `<p>Precio de venta (MDF): $${product.precio_venta_mdf}</p>`
          : '';

        productElement.innerHTML = `
          <div class="foto">
            <img src="${product.img}" alt="${product.nombre}">
          </div>
          <div class="info">
            <h3>${product.nombre}</h3>
            <p>Medidas: ${product.medidas}</p>
            ${precioAlquilerHTML}
            <p>Precio de venta (Acrílico): $${product.precio_venta_acrilico}</p>
            ${precioMdfHTML}
          </div>
        `;
        productContainer.appendChild(productElement);
      });
    })
    .catch(error => {
      console.error('Error al cargar el JSON:', error);
    });
});
