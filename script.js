document.addEventListener('DOMContentLoaded', () => {
  const productContainer = document.getElementById('product-container');

  fetch('productos.json')
    .then(response => response.json())
    .then(data => {
      // Ordenar por precio de venta acrílico (menor a mayor)
      const productosOrdenados = data.productos.sort((a, b) => {
        const precioA = parseFloat(a.precio_venta_acrilico) || 0;
        const precioB = parseFloat(b.precio_venta_acrilico) || 0;
        return precioA - precioB;
      });

      // Crear elementos del DOM
      productosOrdenados.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        // Ocultar precio de alquiler si no existe
        const precioAlquilerHTML = product.precio_alquiler
          ? `<p>Precio de alquiler: $${product.precio_alquiler}</p>`
          : '';

        productElement.innerHTML = `
          <div class="foto">
            <img src="${product.img}" alt="${product.nombre}">
          </div>
          <div class="info">
            <h3>${product.nombre}</h3>
            <p>Medidas: ${product.medidas}</p>
            ${precioAlquilerHTML}
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
