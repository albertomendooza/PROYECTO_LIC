// Definir datos de usuarios y transacciones
const usuarios = [
    {
        pin: "1234",
        nombre: "Juanin"
    },
    {
        pin: "4321",
        nombre: "Esteban"
    }
];

// Lógica para manejar el inicio de sesión
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que se recargue la página

    // Obtener el PIN ingresado por el usuario
    const pinIngresado = document.getElementById("pin").value;

    // Verificar si el PIN ingresado coincide con alguno de los usuarios
    const usuario = usuarios.find(user => user.pin === pinIngresado);

    if (usuario) {
        // Redirigir a acciones.html pasando el nombre de usuario como parámetro de consulta
        window.location.href = "acciones.html?nombre=" + encodeURIComponent(usuario.nombre);
    } else {
        // Mostrar mensaje de error si el PIN es incorrecto
        document.getElementById("mensaje-error").textContent = "PIN incorrecto. Inténtalo de nuevo.";
    }
});
