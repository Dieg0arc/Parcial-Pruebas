const API = 'http://localhost:3000/api/products';

document.getElementById('addProductForm').addEventListener('submit', async e => {
  e.preventDefault();
  const data = {
    name: document.getElementById('name').value,
    price: parseFloat(document.getElementById('price').value),
    stock: parseInt(document.getElementById('stock').value),
    category: document.getElementById('category').value
  };

  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    alert('Producto agregado');
    loadProducts();
  } else {
    alert('Error al agregar producto');
  }
});

async function loadProducts() {
  const filter = document.getElementById('categoryFilter').value.trim();
  const res = await fetch(API);
  const products = await res.json();
  const list = document.getElementById('productList');
  list.innerHTML = '';
  products
    .filter(p => !filter || p.category.toLowerCase().includes(filter.toLowerCase()))
    .forEach(p => {
      const item = document.createElement('li');
      item.textContent = `${p.name} - ${p.category} - $${p.price} - stock: ${p.stock}`;
      list.appendChild(item);
    });
}

document.getElementById('stockForm').addEventListener('submit', async e => {
  e.preventDefault();
  const id = document.getElementById('stockId').value;
  const amount = parseInt(document.getElementById('stockAmount').value);
  const action = document.getElementById('stockAction').value;

  const endpoint = `${API}/${id}/stock-${action}`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount })
  });

  if (res.ok) {
    alert('Stock actualizado');
    loadProducts();
  } else {
    alert('Error al actualizar stock');
  }
});

async function loadLowStock() {
  const res = await fetch(`${API}/low-stock`);
  const products = await res.json();
  const list = document.getElementById('lowStockList');
  list.innerHTML = '';
  products.forEach(p => {
    const item = document.createElement('li');
    item.textContent = `${p.name} - Stock: ${p.stock}`;
    list.appendChild(item);
  });
}

// Carga inicial
loadProducts();
