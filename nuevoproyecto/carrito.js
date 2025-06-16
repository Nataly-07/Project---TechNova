// Carga el carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

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
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarCarrito();

    document.querySelector("#form-compra").addEventListener("submit", (e) => {
        e.preventDefault();

        const direccion = document.querySelector("#direccion").value.trim();
        const medioPago = document.querySelector("#medioPago").value.trim();
        const fecha = document.querySelector("#fechaEntrega").value.trim();

        if (direccion && medioPago && fecha) {
            // Limpia el carrito
            localStorage.removeItem('carrito');
            carrito = [];

            // Muestra el mensaje de confirmacion
            document.querySelector("#msg-confirmacion").style.display = "block";

            // Limpia el form
            e.target.reset();

            // Limpia el listado de productos
            document.querySelector("#lista-carrito").innerHTML = '';
            document.querySelector("#total").innerHTML = '0';
        }
    });
});
