// Obtener elementos
const form = document.getElementById('formInventario');
const tbody = document.getElementById('tbodyInventario');

// Obtener o inicializar inventario
let inventario = JSON.parse(localStorage.getItem('inventarioTech'));

if (!inventario || inventario.length === 0) {
  inventario = [
    {
      codigo: "CEL-101",
      nombre: "iPhone 16 Pro Max 256 GB",
      imagen: "imagenes/iphonre16promaxgris.webp",
      precioCompra: 6000000,
      precioVenta: 6699010,
      unidades: 12
    },
    {
      codigo: "LAP-305",
      nombre: "Lenovo IdeaPad 3",
      imagen: "imagenes/LENOVO IdeaPad.webp",
      precioCompra: 1800000,
      precioVenta: 2350000,
      unidades: 8
    },
    {
      codigo: "TAB-204",
      nombre: "Galaxy S24 FE 256 GB",
      imagen: "imagenes/samsunggalaxys24fe.webp",
      precioCompra: 2000000,
      precioVenta: 2499900 ,
      unidades: 5
    },
    {
      codigo: "CEL-229",
      nombre: "Redmi Note 14 Pro 256 GB",
      imagen: "imagenes/redminote14pro.webp",
      precioCompra: 1100000,
      precioVenta: 1449010,
      unidades: 0
    }
  ];
  localStorage.setItem('inventarioTech', JSON.stringify(inventario));
}

// Renderizar productos
function renderInventario() {
  tbody.innerHTML = "";
  inventario.forEach((prod, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td class="codigo">${prod.codigo}</td>
      <td class="nombre">${prod.nombre}</td>
      <td class="imagen">
        <img src="${prod.imagen || 'imagenes/default.png'}" class="img-inventario" alt="${prod.nombre}">
      </td>
      <td>$${Number(prod.precioCompra).toLocaleString()}</td>
      <td>$${Number(prod.precioVenta).toLocaleString()}</td>
      <td>${prod.unidades}</td>
      <td>
        <span class="estado ${prod.unidades > 0 ? 'disponible' : 'agotado'}">
          ${prod.unidades > 0 ? 'Disponible' : 'Agotado'}
        </span>
      </td>
      <td class="acciones">
        <button class="accion editar" onclick="editarProducto(${index})">Editar✏️</button>
        <button class="accion eliminar" onclick="eliminarProducto(${index})">Eliminar🗑️</button>
      </td>
    `;
    tbody.appendChild(fila);
  });
}

// Agregar producto desde formulario
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nuevo = {
    codigo: form.codigo.value.trim(),
    nombre: form.nombre.value.trim(),
    imagen: form.imagen.value.trim(),
    precioCompra: Number(form.precioCompra.value),
    precioVenta: Number(form.precioVenta.value),
    unidades: Number(form.unidades.value)
  };
  inventario.push(nuevo);
  localStorage.setItem('inventarioTech', JSON.stringify(inventario));
  renderInventario();
  form.reset();
});

// Eliminar producto con confirmación
function eliminarProducto(index) {
  Swal.fire({
    title: "¿Eliminar producto?",
    text: "No podrás deshacer esta acción.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar"
  }).then(result => {
    if (result.isConfirmed) {
      inventario.splice(index, 1);
      localStorage.setItem('inventarioTech', JSON.stringify(inventario));
      renderInventario();
    }
  });
}

// Función de edición pendiente
function editarProducto(index) {
  const prod = inventario[index];
  Swal.fire({
    title: "Función en desarrollo",
    text: `Pronto podrás editar ${prod.nombre}.`,
    icon: "info"
  });
}

// Mostrar datos al cargar
renderInventario();
