const cuentaCarritoElement = document.getElementById("cuenta-carrito");

function agregarAlCarrito(juego) {
    let juegosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const indiceJuego = juegosEnCarrito.findIndex(item => item.id === juego.id);

    if (indiceJuego === -1) {
        juego.cantidad = 1;
        juegosEnCarrito.push(juego);
    } else {
        juegosEnCarrito[indiceJuego].cantidad++;
    }

    localStorage.setItem("carrito", JSON.stringify(juegosEnCarrito));
    actualizarNumeroCarrito();
}

function restarAlCarrito(juego) {
    let juegosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const indiceJuego = juegosEnCarrito.findIndex(item => item.id === juego.id);

    if (indiceJuego !== -1) {
        juegosEnCarrito[indiceJuego].cantidad--;

        if (juegosEnCarrito[indiceJuego].cantidad === 0) {
            juegosEnCarrito.splice(indiceJuego, 1);
        }
    }

    localStorage.setItem("carrito", JSON.stringify(juegosEnCarrito));
    actualizarNumeroCarrito();
}

function actualizarNumeroCarrito() {
    let cuenta = 0;
    const juegosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (juegosEnCarrito.length > 0) {
        cuenta = juegosEnCarrito.reduce((acum, current) => acum + current.cantidad, 0);
    }

    cuentaCarritoElement.innerText = cuenta;
}

function reiniciarCarrito() {

    localStorage.removeItem("carrito");
    localStorage.removeItem("historialCompras");
    actualizarNumeroCarrito();

}

document.getElementById("vaciar-carrito").addEventListener("click", () => {
    reiniciarCarrito();
    actualizarBoleta();
});


function mostrarMensajeJuegosComprados() {
    sendToast("¡Juegos comprados con éxito! ¡Gracias por tu compra!");

}

// Botón de comprar
document.getElementById("comprar").addEventListener("click", () => {
    mostrarMensajeJuegosComprados();
    reiniciarCarrito(); 
});

actualizarNumeroCarrito();
