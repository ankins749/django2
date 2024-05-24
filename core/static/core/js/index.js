//=================================================================================
import { getJuegosData, sendToast, agregarAlCarrito, actualizarBotonCarrito } from "./utils.js"
//=================================================================================
const juegos = await getJuegosData()
const juegosPorPagina = 6
let paginaActual = 1
//=================================================================================

//Buscador de juegos.
var buscador = document.getElementById("buscadorDeJuegos")
var contenedorJuegos = document.getElementById("resultadosBusqueda")
buscador.addEventListener("input", function() {
	const listaJuegos = Object.values(juegos)
	var búsqueda = this.value.toLowerCase()
	if (búsqueda.length > 0) {
		var juegosFiltrados = listaJuegos.filter(function (juego) {
			return juego.nombre.toLowerCase().includes(búsqueda)
		})
	
		contenedorJuegos.innerHTML = ""
	
		juegosFiltrados.forEach(function (juego, i) {
			let precioOfertaHTML = ""
			let precioAnteriorHTML = "<span id='juego-precio-anterior'>   </span>"
			let porcentajeDescuentoHTML = ""

			if (juego.en_descuento) {
				/* let porcentaje = ((juego.precio - juego.oferta) / juego.precio) * 100 */
				porcentajeDescuentoHTML = `<span id="juego-descuento">(-${juego.porc_descuento}%)</span>`
				precioOfertaHTML = `<span id="juego-precio-anterior">$${juego.precio}</span>`
				precioAnteriorHTML = `<span id="juego-oferta">$${Math.trunc(juego.precio * (1 - (juego.porc_descuento / 100)))}</span>` 
			}
			let tarjetaJuego = `
			<div class="card mb-3 h-100" style="max-width: 100%;">
				<div class="row g-0">
					<div class="col-md-4">
						<img src="${'/static/core/img/juegos/' + juego.img + '.jpg'}" class="img-fluid rounded-start">
					</div>
					<div class="col-md-8 d-flex flex-column">
						<div class="card-body">
							<h5 class="card-title">${juego.nombre}</h5>
							<p class="card-text"><small class="text-body-secondary" id="datosJuego${i}"><b>Precio:</b> <span id="juego-precio-actual">$${juego.precio}</span> • <b>Oferta:</b> ${precioAnteriorHTML} ${precioOfertaHTML} ${porcentajeDescuentoHTML} • <b>Stock:</b> <span id="juego-stock-actual">${juego.stock}</span></small></p>
							<p class="card-text">${juego.descripcion}</p>
						</div>
						<div class="card-footer text-center mt-auto">
							<button class="btn btn-success mx-2" type="submit" id="searchVerFicha${i}"><i class="bi bi-file-earmark-text"></i> Ver ficha</button>
							<button class="btn btn-warning mx-2" type="submit" id="searchFavorito${i}"><i class="bi bi-bookmark-star"></i> Favoritos</button>
						</div>
					</div>
				</div>
			</div>
			`
			
			//contenedorJuegos.innerHTML += tarjetaJuego

			let tempContainer = document.createElement("div")
			tempContainer.innerHTML = tarjetaJuego
			contenedorJuegos.appendChild(tempContainer.children[0])

			let btnVerFicha = document.getElementById(`searchVerFicha${i}`)
			let btnFavorito = document.getElementById(`searchFavorito${i}`)

			btnVerFicha.addEventListener("click", function() {
				mostrarFichaProducto(juegosFiltrados, i)
			})
		
			btnFavorito.addEventListener("click", function() {
				sendToast("Añadido a favoritos", "¡Añadiste " + juego.nombre + " a tus favoritos!", "warning-subtle")
			})

		})
	} else {
		contenedorJuegos.innerHTML = ""
	}
})

//Añadir las cartas de los juegos a la página.
window.mostrarJuegos = function(pagina) {
	const listaJuegos = Object.values(juegos);
	const inicio = (pagina - 1) * juegosPorPagina;
	const final = inicio + juegosPorPagina;
	const juegosEnPagina = listaJuegos.slice(inicio, final);
	
	if (pagina < 1 || pagina > Math.ceil(listaJuegos.length / juegosPorPagina)) {
		throw new Error(`Número de página inválido. Se esperaba un valor entre 1 y ${Math.ceil(listaJuegos.length / juegosPorPagina)}, se obtuvo: ${pagina}.`);
	}

	const contenedorJuegos = document.getElementById("row-contenedor-juegos");
	contenedorJuegos.innerHTML = "";

	juegosEnPagina.forEach((juego, i) => {
		let precioOfertaHTML = "";
		let precioAnteriorHTML = "<span id='juego-precio-anterior'>   </span>";
		let porcentajeDescuentoHTML = "";
		let badge;

		if (juego.stock > 0) {
			badge = `<span class="badge text-bg-success">Disponible</span>`;
			if (juego.en_descuento) {
				badge += ` <span class="badge text-bg-info">Oferta</span>`;
			}
		} else if (juego.stock === 0 & juego.en_restock) {
			badge = `<span class="badge text-bg-warning">Re-Stock en curso</span>`;
		} else {
			badge = `<span class="badge text-bg-danger">Agotado</span>`;
		}

		if (juego.en_descuento) {
			/* var porcentaje = ((juego.precio - juego.oferta) / juego.precio) * 100; */
			porcentajeDescuentoHTML = `<span id="juego-descuento">(-${juego.porc_descuento}%)</span>`;
			precioOfertaHTML = `<span id="juego-precio-anterior">$${juego.precio}</span>`;
			precioAnteriorHTML = `<span id="juego-oferta">$${Math.trunc(juego.precio * (1 - (juego.porc_descuento / 100)))}</span>`; 
		}

		var tarjetaJuego = `
			<div class="col m-4 col-sm-12 col-md-6 col-lg-4 col-xl-3">
				<div class="card" id="carta-juego">
					<img src="${'/static/core/img/juegos/' + juego.img + '.jpg'}">
					<div class="card-body">
						<h5 class="card-title text-center">${juego.nombre}</h5>
						<h5>
							<p class="card-text text-center">
								${badge}
							</p>
						</h5>
						<p>
							<b>Precio:</b> <span id="juego-precio-actual">$${juego.precio}</span><br>
							<b>Oferta:</b> ${precioAnteriorHTML} ${porcentajeDescuentoHTML}<br>
							<b>Stock:</b> <span id="juego-stock-actual">${juego.stock}</span><br>
							<hr>
							${juego.descripcion}
						</p>
					</div>
					<div class="card-footer text-center">
						<button class="btn btn-success mx-2" type="button" id="verFicha${i}"><i class="bi bi-file-earmark-text"></i> Ver ficha</button>
						<button class="btn btn-warning mx-2" type="button" id="favorito${i}"><i class="bi bi-bookmark-star"></i> Favoritos</button>
					</div>
				</div>
			</div>
			`;

		var tempContainer = document.createElement("div");
		tempContainer.innerHTML = tarjetaJuego;
		contenedorJuegos.appendChild(tempContainer.children[0]);
	
		var btnVerFicha = document.getElementById(`verFicha${i}`);
		var btnFavorito = document.getElementById(`favorito${i}`);

		btnVerFicha.addEventListener("click", function() {
			mostrarFichaProducto(juegosEnPagina, i)
		})
	
		btnFavorito.addEventListener("click", function() {
			sendToast("Añadido a favoritos", `¡Añadiste ${juego.nombre} a tus favoritos!`, "warning-subtle");
		});

	});
}

//Paginación
function inicializarPaginación() {
	const cantidadJuegos = Object.values(juegos).length
	const paginaMax = Math.ceil(cantidadJuegos / juegosPorPagina)
	let paginacion = document.getElementById("paginacion")

	function generarPaginacion() {
		paginacion.innerHTML = ""
		
		let btnAnterior = document.createElement("li")
		btnAnterior.className = "page-item"
		btnAnterior.innerHTML = '<a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>'
		btnAnterior.addEventListener("click", function() {
			if (paginaActual > 1) {
				paginaActual--
				mostrarJuegos(paginaActual)
				actualizarComponente(paginaActual)
			}
		})
		paginacion.appendChild(btnAnterior)

		for(let i = 1; i <= paginaMax; i++) {
			let btnPagina = document.createElement("li")
			btnPagina.className = "page-item"
			btnPagina.innerHTML = `<a class="page-link" href="#" onclick="mostrarJuegos(${i})">` + i + '</a>'
			btnPagina.addEventListener("click", function() {
				let btnActivo = document.querySelector(".pagination .page-item.active")
				let numeroPagina = btnActivo.querySelector(".page-link").innerText
				paginaActual = parseInt(this.textContent)
				//mostrarJuegos(paginaActual)
				if (parseInt(numeroPagina) != paginaActual) {
					btnPagina.classList.add("active")
					btnActivo.classList.remove("active")
				} 
			})
			paginacion.appendChild(btnPagina)
			actualizarComponente(paginaActual)
		}

		let btnSiguiente = document.createElement("li")
		btnSiguiente.className = "page-item"
		btnSiguiente.innerHTML = '<a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>'
		btnSiguiente.addEventListener("click", function() {
			if (paginaActual < paginaMax) {
				paginaActual++
				mostrarJuegos(paginaActual)
				actualizarComponente(paginaActual)
			}
		})
		paginacion.appendChild(btnSiguiente)
	}

	function actualizarComponente(pagina) {
		let btnsPagina = paginacion.querySelectorAll(".page-item");
		btnsPagina.forEach(function(button, index) {
			if (index === pagina) {
				button.classList.add("active");
			} else {
				button.classList.remove("active");
			}
		});
		mostrarJuegos(paginaActual)
	}

	generarPaginacion()
}

//Mostrar ficha producto
function mostrarFichaProducto(juegosEnPagina, i) {
	var modalHTML = document.getElementById("modalFichaProducto")
	if (!modalHTML.classList.contains("show")) {
		var modalInstance = new bootstrap.Modal(modalHTML)
		var juego = juegosEnPagina[i] 
		let precioOfertaHTML = ""
		let precioAnteriorHTML = "<span id='juego-precio-anterior'>   </span>"
		let porcentajeDescuentoHTML = ""
		let badge;

		if (juego.stock > 0) {
			badge = `<span class="badge text-bg-success">Disponible</span>`;
			if (juego.en_descuento) {
				badge += ` <span class="badge text-bg-info">Oferta</span>`;
			}
		} else if (juego.stock === 0 & juego.en_restock) {
			badge = `<span class="badge text-bg-warning">Re-Stock en curso</span>`;
		} else {
			badge = `<span class="badge text-bg-danger">Agotado</span>`;
		}

		if (juego.en_descuento) {
			let porcentaje = ((juego.precio - juego.oferta) / juego.precio) * 100
			porcentajeDescuentoHTML = `<span id="juego-descuento">(-${juego.porc_descuento}%)</span>`
			precioOfertaHTML = `<span id="juego-precio-anterior">$${juego.precio}</span>`
			precioAnteriorHTML = `<span id="juego-oferta">$${Math.trunc(juego.precio * (1 - (juego.porc_descuento / 100)))}</span>` 
		}
		let tarjetaJuego = `
		<div class="card mb-3 h-100" style="max-width: 100%;">
			<div class="row g-0">
				<div class="col-md-4">
					<img src="${'/static/core/img/juegos/' + juego.img + '.jpg'}" class="img-fluid rounded-start">
				</div>
				<div class="col-md-8 d-flex flex-column">
					<div class="card-body">
						<h5 class="card-title">${juego.nombre}</h5>
						<p>${badge}</p>
						<p class="card-text">${juego.descripcion}</p>
					</div>
					<div class="card-footer text-center mt-auto">
						<b>Precio:</b> <span id="juego-precio-actual">$${juego.precio}</span> • <b>Oferta:</b> ${precioAnteriorHTML} ${porcentajeDescuentoHTML} • <b>Stock:</b> <span id="juego-stock-actual">${juego.stock}</span>
					</div>
				</div>
			</div>
		</div>
		`
		var modalHeader = document.getElementById("modalFichaProductoHeader")
		var modalBody = document.getElementById("modalFichaProductoBody")
		var modalFooter = document.getElementById("modalFichaProductoFooter")
		modalHeader.innerHTML = `
		<button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
		`
		modalBody.innerHTML = tarjetaJuego
		modalFooter.innerHTML = `
		<button class="btn btn-success mx-2 ${juego.stock === 0 ? 'disabled' : ''}" type="submit" id="searchToastBuy${i}"><i class="bi bi-cart"></i> Añadir al carrito</button>
		<button class="btn btn-success mx-2 ${juego.stock === 0 ? 'disabled' : ''}" type="submit" id="searchToastBuyNow${i}"><i class="bi bi-cash-stack"></i> Comprar ahora</button>
		<button class="btn btn-warning mx-2" type="submit" id="searchToastFav${i}"><i class="bi bi-bookmark-star"></i> Favoritos</button>
		`

		var btnAñadirCarrito = document.getElementById(`searchToastBuy${i}`)
		var btnComprarAhora = document.getElementById(`searchToastBuyNow${i}`)
		var btnAñadirFavorito = document.getElementById(`searchToastFav${i}`)

		btnAñadirCarrito.addEventListener("click", function() {
			sendToast("Juego agregado al carrito de compras", `Agregaste ${juego.nombre}.`, "success-subtle");
			agregarAlCarrito(juego);
			//actualizarInformacionBoleta(juego);
		})

		btnComprarAhora.addEventListener("click", function() {
			sendToast("Juego comprado", `Se compró ${juego.nombre}.`, "success-subtle")
		})

		btnAñadirFavorito.addEventListener("click", function() {
			sendToast("Añadido a favoritos", `¡Añadiste ${juego.nombre} a tus favoritos!`, "warning-subtle");
		})

		modalInstance.show()
	}
}

//Crear tarjeta de producto | Alineación 0: Vertical, Alineación 1: Horizontal
function crearTarjetaProducto(juego, alineacion = 0) {}

const categorias = ["Carreras", "Aventura", "Estrategia", "Cocina"] //Terminar esta parte, por favor, Seth del futuro.

export function getCategoria(juego) {
	var x = juego.categoria
	if (categorias[x]) {
		return categorias[x]
	}
	return "N/A"
}

mostrarJuegos(paginaActual)
inicializarPaginación()

//Listener para el botón del carrito
window.addEventListener("storage", actualizarBotonCarrito())