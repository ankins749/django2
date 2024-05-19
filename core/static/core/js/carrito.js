// Variables para elementos del DOM
const contenedorTarjetas = document.getElementById("cart-container");
const cantidadElement = document.getElementById("cantidad");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesContainer = document.getElementById("totales");


function crearTarjetasProductosCarrito() {
    contenedorTarjetas.innerHTML = "";
    const juegosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

    juegosEnCarrito.forEach((juego) => {
        const precio = juego.oferta > 0 ? juego.oferta : juego.precio; 

        const nuevaTarjeta = document.createElement("div");
        nuevaTarjeta.classList = "tarjeta-producto";
        nuevaTarjeta.innerHTML = `
            <img src="${'img/' + juego.img + '.jpg'}" class="img-fluid rounded-start">
            <h3>${juego.nombre}</h3>
            <span>$${precio}</span>
        `;
        contenedorTarjetas.appendChild(nuevaTarjeta);
    });

    actualizarTotales();
    revisarMensajeVacio();
}


function actualizarTotales() {
    const juegosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let cantidadTotal = juegosEnCarrito.length; 
    let precioTotal = 0;

    juegosEnCarrito.forEach((juego) => {
        const precio = juego.oferta > 0 ? juego.oferta : juego.precio; 
        precioTotal += precio; 
    });

    cantidadElement.innerText = cantidadTotal;
    precioElement.innerText = precioTotal.toFixed(2);

    if (precioTotal === 0) {
        reiniciarCarrito();
        revisarMensajeVacio();
    }
}


function reiniciarCarrito() {
    localStorage.removeItem("carrito");
    crearTarjetasProductosCarrito();
}

function revisarMensajeVacio() {
    const juegosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoVacioElement.classList.toggle("escondido", juegosEnCarrito.length > 0);
    totalesContainer.classList.toggle("escondido", juegosEnCarrito.length === 0);
}


crearTarjetasProductosCarrito();


function vaciarCarrito() {
    reiniciarCarrito();

}
