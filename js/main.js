// js/main.js - Lógica Global

// --- 1. MODO OSCURO ---
function toggleModoOscuro() {
    document.body.classList.toggle('dark-mode');
    // Guardar preferencia en el navegador
    const esOscuro = document.body.classList.contains('dark-mode');
    localStorage.setItem('modoOscuro', esOscuro);
    mostrarToast(esOscuro ? "🌙 Modo Oscuro Activado" : "☀️ Modo Claro Activado");
}

// Cargar preferencia al iniciar
if (localStorage.getItem('modoOscuro') === 'true') {
    document.body.classList.add('dark-mode');
}

// --- 2. NOTIFICACIONES (TOAST) ---
function mostrarToast(mensaje) {
    const toast = document.createElement('div');
    toast.className = 'toast-notificacion';
    toast.innerHTML = `✅ ${mensaje}`;
    document.body.appendChild(toast);
    
    // Mostrar
    setTimeout(() => toast.classList.add('mostrar'), 10);
    // Ocultar y eliminar
    setTimeout(() => {
        toast.classList.remove('mostrar');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- 3. CARRITO BÁSICO ---
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(idProducto, talla, color) {
    talla = talla || "Estándar";
    color = color || "Único";

    if (typeof productos === 'undefined') return; // Evita error si datos.js no está cargado

    const producto = productos.find(p => p.id === idProducto);
    if (!producto) return;

    carrito.push({ ...producto, idUnicoCarrito: Date.now(), tallaSeleccionada: talla, colorSeleccionado: color });
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    const contador = document.getElementById('contador-carrito');
    if (contador) contador.innerText = carrito.length;

    mostrarToast(`Agregado: ${producto.nombre}`);
    abrirCarrito();
}

function eliminarDelCarrito(idUnico) {
    carrito = carrito.filter(item => item.idUnicoCarrito !== idUnico);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    const contador = document.getElementById('contador-carrito');
    if (contador) contador.innerText = carrito.length;
    
    renderizarCarrito();
}

function renderizarCarrito() {
    const lista = document.getElementById('lista-carrito');
    const totalSpan = document.getElementById('total-carrito');
    
    // Si la página no tiene carrito (como en login.html), no hacemos nada
    if (!lista || !totalSpan) return; 
    
    if (carrito.length === 0) {
        lista.innerHTML = "<p style='text-align:center; color:gray; margin-top:50px;'>Tu carrito está vacío 🛒</p>";
        totalSpan.innerText = "0.00";
        return;
    }

    let total = 0;
    lista.innerHTML = ''; 
    
    carrito.forEach(item => {
        total += item.precio;
        lista.innerHTML += `
            <div class="item-carrito">
                <img src="${item.imagen}" alt="${item.nombre}">
                <div class="item-carrito-info">
                    <h4>${item.nombre}</h4>
                    <p>Talla: ${item.tallaSeleccionada} | Color: ${item.colorSeleccionado}</p>
                    <p style="font-weight:bold;">S/ ${item.precio.toFixed(2)}</p>
                    <button class="btn-eliminar" onclick="eliminarDelCarrito(${item.idUnicoCarrito})">Eliminar</button>
                </div>
            </div>
        `;
    });
    
    totalSpan.innerText = total.toFixed(2);
}

// --- 4. LÓGICA DE PANELES LATERALES (CORREGIDA) ---
function abrirCarrito() {
    const panelCarrito = document.getElementById('panel-carrito');
    const overlay = document.getElementById('overlay');
    
    // Solo lo abre si existe en esa página
    if (panelCarrito && overlay) {
        panelCarrito.classList.add('abierto');
        overlay.classList.add('activo');
        renderizarCarrito();
    }
}

function abrirMenu() {
    const panelMenu = document.getElementById('panel-menu');
    const overlay = document.getElementById('overlay');
    
    // Solo lo abre si existe en esa página
    if (panelMenu && overlay) {
        panelMenu.classList.add('abierto');
        overlay.classList.add('activo');
    }
}

function cerrarPaneles() {
    const panelCarrito = document.getElementById('panel-carrito');
    const panelMenu = document.getElementById('panel-menu');
    const overlay = document.getElementById('overlay');

    // ¡LA MAGIA! Verifica si existen antes de intentar cerrarlos
    if (panelCarrito) panelCarrito.classList.remove('abierto');
    if (panelMenu) panelMenu.classList.remove('abierto');
    if (overlay) overlay.classList.remove('activo');
}

// Actualizar el numerito rojo al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    const contador = document.getElementById('contador-carrito');
    if (contador) contador.innerText = carrito.length;
});