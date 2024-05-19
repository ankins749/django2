// Función para agregar un juego a la tabla de juegos comprados
function agregarJuegoATabla(juego) {
    console.log('Agregando juego a la tabla:', juego);
    const tablaJuegosComprados = document.getElementById("tabla-juegos-comprados");


    const newRow = tablaJuegosComprados.insertRow();


    const cellImagen = newRow.insertCell(0);
    const cellNombre = newRow.insertCell(1);
    const cellPrecio = newRow.insertCell(2);
    const cellOferta = newRow.insertCell(3);
    const cellEliminar = newRow.insertCell(4);


    cellImagen.innerHTML = `<img src="${juego.img}" alt="${juego.nombre}" style="max-width: 100px;">`;
    cellNombre.textContent = juego.nombre;
    cellPrecio.textContent = `$${juego.precio.toFixed(2)}`;

    if (juego.oferta) {
        cellOferta.textContent = `$${juego.oferta.toFixed(2)}`;
    } else {
        cellOferta.textContent = "N/A";
    }

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("btn", "btn-danger");
    botonEliminar.addEventListener("click", function() {
        tablaJuegosComprados.deleteRow(newRow.rowIndex);
        actualizarPrecioTotal();
    });
    cellEliminar.appendChild(botonEliminar);


    actualizarPrecioTotal();
}



function actualizarPrecioTotal() {
    const tablaJuegosComprados = document.getElementById("tabla-juegos-comprados");
    const filas = tablaJuegosComprados.getElementsByTagName("tr");
    let precioTotal = 0;

    for (let i = 1; i < filas.length; i++) { 
        const precioTexto = filas[i].cells[2].textContent.slice(1); 
        precioTotal += parseFloat(precioTexto);
    }


    document.getElementById("precio-total").textContent = `$${precioTotal.toFixed(2)}`;
}


function calcularPrecioTotal() {
    const tablaJuegos = document.getElementById('tabla-juegos-comprados');
    const filas = tablaJuegos.getElementsByTagName('tr');
    let precioTotal = 0;


    for (let i = 1; i < filas.length; i++) {
        const fila = filas[i];
        const precio = parseFloat(fila.cells[2].textContent.replace('$', '')); 
        precioTotal += precio;
    }


    const precioTotalElement = document.getElementById('precio-total');
    precioTotalElement.textContent = '$' + precioTotal.toFixed(2);
}


calcularPrecioTotal();
