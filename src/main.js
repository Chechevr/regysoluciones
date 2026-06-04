import './style.css'

window.addEventListener('DOMContentLoaded', () => {

    // REVEAL SCROLL

    const elementos = document.querySelectorAll('.fade-up')

    const mostrarScroll = () => {

        elementos.forEach((el) => {

            const top = el.getBoundingClientRect().top

            if(top < window.innerHeight - 100){
                el.classList.add('active')
            }

        })

    }

    window.addEventListener('scroll', mostrarScroll)

    mostrarScroll()

    // WHATSAPP

    const boton = document.getElementById('btn-cotizar')

    boton.addEventListener('click', () => {

        const empresa = document.getElementById('empresa').value
        const nombre = document.getElementById('nombre').value
        const origen = document.getElementById('origen').value
        const destino = document.getElementById('destino').value
        const carga = document.getElementById('carga').value
        const unidad = document.getElementById('unidad').value
        const fecha = document.getElementById('fecha').value
        const servicio = document.getElementById('servicio').value

        const mensaje =
`Solicitud de Cotización REGYSoluciones

Empresa: ${empresa}

Nombre: ${nombre}

Origen: ${origen}

Destino: ${destino}

Mercancia a transportar:  ${carga}

Tipo de unidad requerida:  ${unidad}

Fecha de carga:  ${fecha}

Tipo de servicio:  ${servicio}`

        const numero = '528145135560'

        const url =
`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`

        window.open(url, '_blank')

    })

})

// CARRUSEL UNIDADES

const carousel = document.getElementById('carousel-unidades')
const next = document.getElementById('next-unidades')
const prev = document.getElementById('prev-unidades')

if (carousel && next && prev) {

    next.addEventListener('click', () => {

        carousel.scrollBy({
            left: 650,
            behavior: 'smooth'
        })

    })

    prev.addEventListener('click', () => {

        carousel.scrollBy({
            left: -650,
            behavior: 'smooth'
        })

    })

}

document.querySelectorAll('.ciudad').forEach(btn => {

    btn.addEventListener('click', () => {

        const ciudad = btn.dataset.ciudad

        const lista = rutas[ciudad]

        document.getElementById('lista-rutas').innerHTML =

            lista.map(ruta =>
                `<div class="py-2 border-b border-white/10">
                    🚚 ${ruta}
                </div>`
            ).join('')

    })

})

const ciudades = {

    nuevo_leon: { x: 590, y: 270, color: '#f957f9' },

    jalisco: { x: 470, y: 450, color: '#99e849' },

    queretaro: { x: 590, y: 430, color: '#bd3e3e' },

    guanajuato: { x: 545, y: 430, color: '#b37231' },

    cdmx: { x: 590, y: 485, color: '#adaaaa' },

    puebla: { x: 650, y: 510, color: '#fff1f1' },

    chihuahua: { x: 380, y: 160, color: '#eb3e3e' },

    laredo: { x: 615, y: 200, color: '#da8524' }

}

const contenedorRutas =
    document.getElementById('contenedor-rutas')

let ciudadActiva = null

document
    .querySelectorAll('.ciudad-svg')
    .forEach(ciudad => {

        ciudad.addEventListener('click', () => {

            const origen =
                ciudad.dataset.ruta

            if (ciudadActiva === origen) {

                contenedorRutas.innerHTML = ''

                ciudadActiva = null

                return

            }

            ciudadActiva = origen

            contenedorRutas.innerHTML = ''

            const ciudadOrigen =
                ciudades[origen]

            Object.keys(ciudades)
                .forEach(destino => {

                    if (destino === origen)
                        return

                    const ciudadDestino =
                        ciudades[destino]

                    const linea = document.createElementNS(
                        'http://www.w3.org/2000/svg',
                        'path'
                    )

                    const controlX =
                        (ciudadOrigen.x + ciudadDestino.x) / 2

                    const controlY =
                        (ciudadOrigen.y + ciudadDestino.y) / 2 - 80

                    linea.setAttribute(
                        'd',
                        `M ${ciudadOrigen.x} ${ciudadOrigen.y}
                        Q ${controlX} ${controlY}
                        ${ciudadDestino.x} ${ciudadDestino.y}`
                    )

                    linea.style.stroke =
                        ciudadOrigen.color

                    linea.setAttribute(
                        'class',
                        'ruta'
                    )

                    contenedorRutas.appendChild(
                        linea
                    )

                })

        })

    })