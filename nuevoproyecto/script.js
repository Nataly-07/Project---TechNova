
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


function guardarCarrito(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


function actualizarCarrito(){
    const lista = document.querySelector("#lista-carrito");

   
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
   
    document.querySelectorAll(".carrito-btn").forEach((boton) => {
        boton.addEventListener("click", (e) => {
            
            const producto = boton.closest('.producto');
            const nombre = producto.querySelector("h3").innerHTML.trim();

            
            let precio = producto.querySelector(".precio-descuento").innerHTML.trim().replace('$', '');
            precio = parseInt(precio.split('.').join(''), 10);

          
            carrito.push({ nombre, precio });

            guardarCarrito();
            actualizarCarrito();

            alert(`Agregar ${nombre} al carrito.`);
        });
    });

    
    actualizarCarrito();
});
