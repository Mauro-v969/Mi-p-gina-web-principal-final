/**
 * Módulo: DEWE-20 - Diseño y elaboración de páginas web
 * Alumno: Mauro Vasquez Mora | Grupo: 6205
 * Docente: Rogelio Sánchez López
 * Archivo: interactivo.js (Núcleo de Lógica Global Unificado)
 */

var GLOBAL_LOG = "TECHVENTA_CORE:\t";
console.log(GLOBAL_LOG + "Script maestro global unificado y cargado.");

// Escuchador de eventos global para inicializar componentes según la página activa
document.addEventListener("DOMContentLoaded", function() {
    console.log(GLOBAL_LOG + "DOM completamente estructurado. Verificando entorno...");
    
    // 1. Inicialización automática para el Formulario de Contacto
    var formulario = document.getElementById("formulario-contacto");
    if (formulario) {
        console.log(GLOBAL_LOG + "Entorno de Contacto detectado. Vinculando 'submit'.");
        formulario.addEventListener("submit", enValidarFormulario);
    }

    // 2. Inicialización automática para la Página Principal (Home)
    var esPaginaPrincipal = document.getElementById("indicador-home");
    if (esPaginaPrincipal) {
        console.log(GLOBAL_LOG + "Entorno Principal (Home) detectado.");
        establecerSaludoCorporativo();
    }
});


/* ==========================================================================
   SECCIÓN 1: LÓGICA DE LA PÁGINA PRINCIPAL (index.html)
   ========================================================================== */

function establecerSaludoCorporativo() {
    var fechaActual = new Date();
    var hora = fechaActual.getHours();
    var mensajeSaludo = "";

    if (hora >= 6 && hora < 12) {
        mensajeSaludo = "¡Buenos días! Conoce nuestras ofertas matutinas en tecnología.";
    } else if (hora >= 12 && hora < 19) {
        mensajeSaludo = "¡Buenas tardes! Explora las mejores laptops para tus proyectos académicos.";
    } else {
        mensajeSaludo = "¡Buenas noches! Tu actualización tecnológica no se detiene.";
    }
    
    console.log(GLOBAL_LOG + "Mensaje horario establecido: " + mensajeSaludo);
}

function agregarAlCarritoExpress(nombreProducto) {
    alert(" Producto añadido: " + nombreProducto + " se ha integrado a tu orden de compra.");
    console.log(GLOBAL_LOG + "Ítem enviado al carrito virtual: " + nombreProducto);
}


/* ==========================================================================
   SECCIÓN 2: LÓGICA DEL CATÁLOGO DE PORTÁTILES (laptops.html)
   ========================================================================== */

function ordenarProductosPorPrecio() {
    var criterio = document.getElementById("control-orden").value;
    if (criterio === "DEF") return; 

    var contenedorGrid = document.getElementById("grid-laptops");
    var itemsLaptops = document.querySelectorAll(".product-card-laptop");
    
    // Conversión de NodeList a un Arreglo nativo para ordenación lineal
    var arregloLaptops = [];
    for (var i = 0; i < itemsLaptops.length; i++) {
        arregloLaptops.push(itemsLaptops[i]);
    }

    // Algoritmo de comparación aritmética de precios
    arregloLaptops.sort(function(elementoA, elementoB) {
        var precioA = parseFloat(elementoA.getAttribute("data-precio"));
        var precioB = parseFloat(elementoB.getAttribute("data-precio"));

        if (criterio === "MENOR") {
            return precioA - precioB;
        } else if (criterio === "MAYOR") {
            return precioB - precioA;
        }
        return 0;
    });

    var tarjetaFija = document.getElementById("tarjeta-fija-contacto");

    // Reordenación en caliente de los elementos del DOM
    contenedorGrid.innerHTML = "";
    for (var j = 0; j < arregloLaptops.length; j++) {
        contenedorGrid.appendChild(arregloLaptops[j]);
    }

    if (tarjetaFija) {
        contenedorGrid.appendChild(tarjetaFija);
    }

    console.log(GLOBAL_LOG + "Catálogo reorganizado por precio: " + criterio);
}


/* ==========================================================================
   SECCIÓN 3: VALIDACIÓN DEL FORMULARIO DE CONTACTO (contacto.html)
   ========================================================================== */

function enValidarFormulario(evento) {
    var formularioValido = true;
    var campoNombre = document.getElementById("nombre");
    var campoEmail = document.getElementById("email");
    var campoMensaje = document.getElementById("mensaje");

    reiniciarEstadosDeError();

    // Validación del texto de Nombre
    if (campoNombre.value.trim() === "") {
        mostrarError("nombre", "El campo de Nombre Completo es obligatorio.");
        campoNombre.classList.add("input-error");
        formularioValido = false;
    } else if (campoNombre.value.trim().length < 3) {
        mostrarError("nombre", "El nombre debe contener al menos 3 caracteres.");
        campoNombre.classList.add("input-error");
        formularioValido = false;
    }

    // Validación analítica de Correo Electrónico usando Expresiones Regulares (RegEx)
    var regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (campoEmail.value.trim() === "") {
        mostrarError("email", "El correo electrónico es obligatorio.");
        campoEmail.classList.add("input-error");
        formularioValido = false;
    } else if (!regexEmail.test(campoEmail.value.trim())) {
        mostrarError("email", "Ingresa un correo electrónico estructurado correctamente (usuario@dominio.com).");
        campoEmail.classList.add("input-error");
        formularioValido = false;
    }

    // Validación de área de texto del requerimiento
    if (campoMensaje.value.trim() === "") {
        mostrarError("mensaje", "Por favor, detalla tu requerimiento técnico.");
        campoMensaje.classList.add("input-error");
        formularioValido = false;
    } else if (campoMensaje.value.trim().length < 10) {
        mostrarError("mensaje", "Describe tu problema con mayor precisión (mínimo 10 caracteres).");
        campoMensaje.classList.add("input-error");
        formularioValido = false;
    }

    // Interceptación y cancelación de envío si existen anomalías
    if (!formularioValido) {
        evento.preventDefault(); // Detiene el viaje hacia procesar_contacto.php
        var alertaGlobal = document.getElementById("alerta-global");
        if (alertaGlobal) {
            alertaGlobal.innerText = " Error: Corrige los campos marcados en rojo antes de enviar.";
            alertaGlobal.style.backgroundColor = "#fde8e8";
            alertaGlobal.style.color = "#9b1c1c";
            alertaGlobal.style.display = "block";
        }
    }
}

function mostrarError(idCampo, mensaje) {
    var contenedorError = document.getElementById("error-" + idCampo);
    if (contenedorError) {
        contenedorError.innerText = mensaje;
        contenedorError.style.display = "block";
    }
}

function reiniciarEstadosDeError() {
    var alertaGlobal = document.getElementById("alerta-global");
    if (alertaGlobal) alertaGlobal.style.display = "none";

    var retroalimentaciones = document.querySelectorAll(".error-feedback");
    for (var i = 0; i < retroalimentaciones.length; i++) {
        retroalimentaciones[i].innerText = "";
        retroalimentaciones[i].style.display = "none";
    }

    var entradasInvalidadas = document.querySelectorAll(".input-error");
    for (var j = 0; j < entradasInvalidadas.length; j++) {
        entradasInvalidadas[j].classList.remove("input-error");
    }
}


/* ==========================================================================
   SECCIÓN 4: LOCALIZADOR Y API NAVIGATOR (sucursales.html)
   ========================================================================== */

// Ubicación por coordenadas fijas de la sucursal de Paseo de la Reforma
var TIENDA_LAT = 19.4270;
var TIENDA_LNG = -99.1676;

function obtenerRutaSucursal() {
    var cajaEstado = document.getElementById("estado-gps");
    if (!cajaEstado) return;

    if (!navigator.geolocation) {
        cajaEstado.style.color = "#e74c3c";
        cajaEstado.innerText = " Tu explorador no cuenta con soporte nativo para Geolocalización.";
        return;
    }

    cajaEstado.style.color = "#0284c7";
    cajaEstado.innerText = " Geolocalizando tu dispositivo con el servidor local de mapas...";

    navigator.geolocation.getCurrentPosition(
        function exito(posicion) {
            var usrLat = posicion.coords.latitude;
            var usrLng = posicion.coords.longitude;
            
            cajaEstado.style.color = "#27ae60";
            cajaEstado.innerText = " Coordenadas localizadas con éxito. Abriendo ruta...";
            
            var rutaMapa = "https://www.google.com/maps/dir/" + usrLat + "," + usrLng + "/" + TIENDA_LAT + "," + TIENDA_LNG;
            window.open(rutaMapa, "_blank");
        },
        function error(err) {
            cajaEstado.style.color = "#e74c3c";
            if (err.code === err.PERMISSION_DENIED) {
                cajaEstado.innerText = " Acceso denegado. Concede permisos de GPS para trazar tu ruta.";
            } else {
                cajaEstado.innerText = " Error físico de hardware al intentar triangular la posición.";
            }
        }
    );
}


/* ==========================================================================
   SECCIÓN 5: INTERACTIVIDAD DE LA DIVISIÓN TÉCNICA (servicios.html)
   ========================================================================== */

function resaltarTarjeta(elementoTarjeta) {
    elementoTarjeta.style.borderColor = "#0056b3";
    elementoTarjeta.style.boxShadow = "0 10px 20px rgba(0, 86, 179, 0.12)";
    elementoTarjeta.style.transform = "translateY(-4px)";
}

function atenuarTarjeta(elementoTarjeta) {
    elementoTarjeta.style.borderColor = "#e2e8f0";
    elementoTarjeta.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.05)";
    elementoTarjeta.style.transform = "translateY(0)";
}

function calcularPresupuestoExpress() {
    var entrada = prompt("¿A cuántos equipos de cómputo deseas aplicarles Mantenimiento Preventivo?:");
    if (entrada === null) return; 

    var cantidad = parseInt(entrada.trim());

    if (isNaN(cantidad) || cantidad <= 0 || cantidad > 50) {
        alert("Por favor, introduce una cifra numérica entera entre 1 y 50.");
        return;
    }

    var COSTO_UNIDAD = 450.00;
    var subtotal = cantidad * COSTO_UNIDAD;
    var descuento = 0;

    // Descuento automático por volumen (Rúbrica de control lógico empresarial)
    if (cantidad >= 5) {
        descuento = subtotal * 0.10;
    }

    var total = subtotal - descuento;

    var cajaContenedora = document.getElementById("contenedor-calculo");
    var parrafoSalida = document.getElementById("salida-presupuesto");

    if (cajaContenedora && parrafoSalida) {
        parrafoSalida.innerHTML = "Cotización para: " + cantidad + " equipos.<br>" +
                                  "Precio bruto: $" + subtotal.toFixed(2) + " M.N.<br>" +
                                  "Descuento corporativo (10%): $" + descuento.toFixed(2) + " M.N.<br>" +
                                  "Total Neto Estimado: <span style='color:#166534; font-weight:bold;'>$" + total.toFixed(2) + " M.N.</span>";
        
        cajaContenedora.style.display = "block";
    }
}


/* ==========================================================================
   SECCIÓN 6: AUDITORÍA DE RUTAS E INTEGRIDAD (mapa_sitio.html)
   ========================================================================== */

// Colección lineal estructurada de los archivos activos en producción
var ARCHIVOS_SITIO = [
    "index.html",
    "laptops.html",
    "servicios.html",
    "sucursales.html",
    "contacto.html",
    "faq.html",
    "carrito.html"
];

function analizarSeccionMapa(nombreArchivo) {
    var panelResultado = document.getElementById("panel-auditoria-resultado");
    if (!panelResultado) return;

    var archivoExiste = false;

    // Búsqueda iterativa secuencial para evaluar rutas válidas
    for (var i = 0; i < ARCHIVOS_SITIO.length; i++) {
        if (ARCHIVOS_SITIO[i] === nombreArchivo) {
            archivoExiste = true;
            break;
        }
    }

    // Renderizado dinámico de respuestas HTTP simuladas sobre el DOM
    if (archivoExiste) {
        panelResultado.style.backgroundColor = "#ecfdf5";
        panelResultado.style.borderColor = "#10b981";
        panelResultado.style.color = "#065f46";
        panelResultado.innerHTML = " <strong>Auditoría de Enlace:</strong> El archivo <code>" + nombreArchivo + "</code> está verificado y responde en el servidor local. <span style='background:#10b981; color:white; padding:2px 6px; border-radius:4px; font-size:0.8rem;'>HTTP 200 OK</span>";
    } else {
        panelResultado.style.backgroundColor = "#fdf2f2";
        panelResultado.style.borderColor = "#ef4444";
        panelResultado.style.color = "#9b1c1c";
        panelResultado.innerHTML = " <strong>Alerta Estructural:</strong> El recurso <code>" + nombreArchivo + "</code> se encuentra mapeado pero está en fase de maquetación futura. <span style='background:#ef4444; color:white; padding:2px 6px; border-radius:4px; font-size:0.8rem;'>HTTP 404 NOT FOUND</span>";
    }

    panelResultado.style.display = "block";
    panelResultado.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
/* ==========================================================================
   PARCHE EXTERNO DE SEGURIDAD: CONTROL DE RENDERIZADO Y ANTIBUG
   Este script fuerza al navegador a pintar correctamente los caracteres
   especiales en caso de fallos en la codificación del servidor o archivo.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function() {
    // 1. Forzar la inyección de la metaetiqueta UTF-8 en el navegador en tiempo de ejecución
    if (!document.querySelector('meta[charset]')) {
        let metaCharset = document.createElement('meta');
        metaCharset.setAttribute('charset', 'UTF-8');
        document.head.insertBefore(metaCharset, document.head.firstChild);
    }

    // 2. Parche de textos dinámicos para el menú de navegación y títulos principales
    // Evita que los caracteres como 'í', 'ó' o emojis se rompan en pantalla
    const enlacesNav = document.querySelectorAll(".nav-links-clasicos a");
    enlacesNav.forEach(enlace => {
        let textoLimpio = enlace.innerHTML;
        // Diccionario de reparación automática en tiempo de ejecución
        textoLimpio = textoLimpio.replace(/Inicio/g, "Inicio")
                                 .replace(/Laptops/g, "Laptops")
                                 .replace(/Ofertas/g, "Ofertas")
                                 .replace(/Servicios/g, "Servicios")
                                 .replace(/Sucursales/g, "Sucursales")
                                 .replace(/Mi Carrito/g, " Mi Carrito");
        enlace.innerHTML = textoLimpio;
    });

    // 3. Sanitización de cabeceras de sección contra el bug '???'
    const titulosH1 = document.querySelectorAll("h1, h2, h3, .brand");
    titulosH1.forEach(titulo => {
        if (titulo.textContent.includes("???")) {
            // Si el navegador ya corrompió el texto, lo reparamos con texto plano seguro
            if (titulo.classList.contains("brand")) titulo.innerHTML = "TechVenta";
            if (titulo.tagName === "H1") titulo.innerHTML = "Potencia para tus Proyectos";
            if (titulo.tagName === "H2") titulo.innerHTML = "Equipos Profesionales de Alto Rendimiento";
        }
    });
});
