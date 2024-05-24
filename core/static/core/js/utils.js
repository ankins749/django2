const btnCarritoCompras = document.getElementById("btnCarritoCompras")
const contadorCarritoCompras = document.getElementById("contadorCarritoCompras")

//Mostrar menú para buscar juegos
document.addEventListener("keydown", function(event) {
	if ((event.ctrlKey || event.metaKey) && (event.key === "k" || event.key === "K")) {
		event.preventDefault()
		var modalHTML = document.getElementById("modalBusqueda")
		var modalHTMLFicha = document.getElementById("modalFichaProducto")
		if (!modalHTML.classList.contains("show") && !modalHTMLFicha.classList.contains("show")) {
			var modalInstance = new bootstrap.Modal(modalHTML)
			modalInstance.show()
		}
	}
})

//Carrito de compras
export function agregarAlCarrito(juego) {
    // 1. Obtener el carrito del localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

	const juegoEnCarrito = carrito.find(o_jogo => juego.nombre === o_jogo.nombre)
	if (juegoEnCarrito) {
		juegoEnCarrito.cantidad++
	} else {
		juego.cantidad = 1
		// 2. Agregar el juego al carrito
		carrito.push(juego);
	}


    // 3. Guardar el carrito actualizado en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // 4. Actualizar la interfaz de usuario (opcional)
    /* actualizarInterfazUsuario(); */
	actualizarBotonCarrito()
}

export function getCantidadItemsCarrito() {
	const carrito = JSON.parse(localStorage.getItem("carrito")) || []
	return carrito.length
}

export function hayItemsEnCarro() {
	const carrito = JSON.parse(localStorage.getItem("carrito")) || []
	return carrito.length > 0
}

export function actualizarBotonCarrito() {
	if (btnCarritoCompras != null && contadorCarritoCompras != null) {
		if (hayItemsEnCarro()) {
			btnCarritoCompras.style.display = "block"
			contadorCarritoCompras.style.display = "block"
		} else {
			btnCarritoCompras.style.display = "none"
			contadorCarritoCompras.style.display = "none"
		}
		contadorCarritoCompras.textContent = getCantidadItemsCarrito()
	}
}

/* function actualizarInterfazUsuario() {
    // Actualizar el contador de elementos en el carrito en el navbar, por ejemplo
    const carritoCount = document.getElementById('cuenta-carrito');
    let cantidad = JSON.parse(localStorage.getItem('carrito')).length || 0;
    carritoCount.textContent = cantidad;
} */
//Carrito de compras

//Mostrar toasts
export function sendToast(titulo, cuerpo, tipo = "success") {
	var toastElement = document.createElement("div")
	toastElement.classList.add("toast")
	toastElement.classList.add("toast-fadeout")
	toastElement.setAttribute("role", "alert")
	toastElement.setAttribute("aria-live", "assertive")
	toastElement.setAttribute("aria-atomic", "true")
	toastElement.classList.add("bg-" + tipo)
	toastElement.innerHTML = `
		<div class="toast-header">
			<strong class="me-auto">${titulo}</strong>
			<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
		</div>
		<div class="toast-body">
			${cuerpo}
		</div>
	`
	document.getElementById("toastContainer").appendChild(toastElement)
	var toast = new bootstrap.Toast(toastElement)
	toast.show()
	toastElement.addEventListener("hidden.bs.toast", function() {
		toastElement.remove()
	})
}

//Obtener los datos de los juegos.
export async function getJuegosData() {
	try {
		const respuesta = await fetch("/static/core/data/juegos.json")
		if (!respuesta.ok) {
			throw new Error(`HTTP Error Status: ${respuesta.status}`)
		}
		const datos = await respuesta.json()
		return datos
	} catch (error) {
		console.error("No se pueden obtener los datos de los juegos: ", error)
		return []
	}
}

//=================================================================================