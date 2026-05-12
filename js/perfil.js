// js/perfil.js
document.addEventListener('DOMContentLoaded', () => {
    const formPerfil = document.getElementById('form-perfil');
    const btnLogout = document.getElementById('btn-logout');

    // Al guardar cambios, muestra notificación verde
    if (formPerfil) {
        formPerfil.addEventListener('submit', (e) => {
            e.preventDefault();
            // Llama a la función mostrarToast que ya existe en main.js
            mostrarToast('¡Cambios guardados correctamente! 💾');
        });
    }

    // Al cerrar sesión, te devuelve al inicio
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
});