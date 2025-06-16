// Cargar el carrito de LocalStorage si existe
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para guardar el carrito en LocalStorage
function guardarCarrito(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para actualizar el carrito en pantalla
function actualizarCarrito(){
    const lista = document.querySelector("#lista-carrito");

    // Limpia
    lista.innerHTML = "";

    let total = 0;

    carrito.forEach((item) => {
        const li = document.createElement("li");

        li.textContent = `${item.nombre} - $${item.precio.toLocaleString()} `;
        lista.appendChild(li);
        total += item.precio;
    });

    document.querySelector("#total").innerHTML = total.toLocaleString();

    guardarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
    // Agregar event listeners a los botones de "Agregar al carrito"
    document.querySelectorAll(".carrito-btn").forEach((boton) => {
        boton.addEventListener("click", (e) => {
            // Busca el producto
            const producto = boton.closest('.producto');
            const nombre = producto.querySelector("h3").innerHTML.trim();

            // Busca el precio
            let precio = producto.querySelector(".precio-descuento").innerHTML.trim().replace('$', '');
            precio = parseInt(precio.split('.').join(''), 10);

            // Agregar el producto al carrito
            carrito.push({ nombre, precio });

            guardarCarrito();
            actualizarCarrito();

            alert(`Agregar ${nombre} al carrito.`);
        });
    });

    // Actualizar el carrito al inicio
    actualizarCarrito();
});
