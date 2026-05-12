// js/login.js
document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');
    const linkRegistro = document.getElementById('link-registro');

    // Al enviar el formulario, te lleva al perfil
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = 'perfil.html';
        });
    }

    // Alerta temporal para el botón de registro
    if (linkRegistro) {
        linkRegistro.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Función de registro próximamente');
        });
    }
});