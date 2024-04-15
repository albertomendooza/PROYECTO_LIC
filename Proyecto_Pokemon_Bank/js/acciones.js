// Definir datos de usuarios y transacciones
const usuarios = [
    {
        pin: "1234",
        nombre: "Juanin",
        numeroCuenta: "0001",
        saldo: 1000,
        transacciones: [
            { monto: 200, descripcion: "Depósito inicial", tipo: "crédito", fecha: "2024-04-14" },
            { monto: 50, descripcion: "Compra en tienda", tipo: "débito", fecha: "2024-04-15" }
        ]
    },
    {
        pin: "4321",
        nombre: "Esteban",
        numeroCuenta: "0002",
        saldo: 1500,
        transacciones: [
            { monto: 300, descripcion: "Depósito inicial", tipo: "crédito", fecha: "2024-04-14" },
            { monto: 100, descripcion: "Pago de factura", tipo: "débito", fecha: "2024-04-15" }
        ]
    }
];

// Función para obtener el número de cuenta de un usuario
function obtenerNumeroCuenta(nombreUsuario) {
    const usuario = usuarios.find(user => user.nombre === nombreUsuario);
    return usuario ? usuario.numeroCuenta : null;
}

// Función para mostrar la bienvenida al usuario dentro del panel central
function mostrarBienvenida(nombreUsuario, numeroCuenta) {
    const panelCentral = document.getElementById("panel-central");
    if (panelCentral) {
        panelCentral.innerHTML = `
            <p>Bienvenido, ${nombreUsuario}. Tu número de cuenta es: ${numeroCuenta}</p>
        `;
    }
}

// Obtener el nombre de usuario de la URL (parámetro de consulta)
const params = new URLSearchParams(window.location.search);
const nombreUsuario = params.get('nombre');

// Obtener el número de cuenta del usuario
const numeroCuenta = obtenerNumeroCuenta(nombreUsuario);

// Mostrar la bienvenida al usuario
if (nombreUsuario && numeroCuenta) {
    mostrarBienvenida(nombreUsuario, numeroCuenta);
} else {
    console.error("Nombre de usuario no válido o número de cuenta no encontrado.");
}

// Obtener referencia al botón de cerrar sesión
const cerrarSesionButton = document.getElementById("cerrar-sesion");

// Agregar evento de clic al botón de cerrar sesión
cerrarSesionButton.addEventListener("click", function() {
    // Redirigir al usuario a la página de inicio de sesión (index.html)
    window.location.href = "index.html";
});

// Función para mostrar el formulario de depósito
function mostrarFormularioDeposito() {
    // Limpiar el panel central
    const panelCentral = document.getElementById("panel-central");
    panelCentral.innerHTML = "";

    // Crear el formulario de depósito
    const depositarForm = document.createElement("form");
    depositarForm.id = "depositar-form";

    // Agregar etiqueta y campo de monto con estilo
    depositarForm.innerHTML = `
        <label for="monto" style="display: block; text-align: center; margin-bottom: 10px; font-size: 18px; color: #333;">Monto a depositar:</label>
<input type="number" id="monto" name="monto" style="display: block; margin: 0 auto 20px; width: 200px; font-size: 18px; text-align: center; border: 1px solid #ccc; border-radius: 5px; padding: 8px;" required>
<button type="submit" id="efectuar-deposito" style="display: block; margin: 0 auto; width: 200px; height: 40px; font-size: 18px; background-color: #007bff; color: #fff; border: none; border-radius: 5px; cursor: pointer;">Efectuar depósito</button>

    `;

    // Agregar evento de envío al formulario
    depositarForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar que se recargue la página

        // Obtener el monto ingresado por el usuario
        const monto = parseFloat(document.getElementById("monto").value);

        // Validar que el monto sea válido
        if (!isNaN(monto) && monto > 0) {
            // Actualizar el saldo del usuario (simulación)
            const usuario = usuarios.find(user => user.nombre === nombreUsuario);
            if (usuario) {
                usuario.saldo += monto;

                // Mostrar la máscara en toda la pantalla
                mostrarMascara();
            } else {
                console.error("Usuario no encontrado.");
            }
        } else {
            // Mostrar mensaje de error si el monto no es válido
            panelCentral.innerHTML = `
                <p>Por favor, ingresa un monto válido.</p>
            `;
        }
    });

    // Agregar el formulario al panel central
    panelCentral.appendChild(depositarForm);
}

// Obtener referencia al botón "Depositar"
const depositarButton = document.getElementById("depositar");

// Agregar evento de clic al botón "Depositar"
depositarButton.addEventListener("click", mostrarFormularioDeposito);

// Función para mostrar la máscara en toda la pantalla
function mostrarMascara() {
    // Crear el div para la máscara
    const mascara = document.createElement("div");
    mascara.id = "mascara";
    mascara.style.position = "fixed";
    mascara.style.top = "0";
    mascara.style.left = "0";
    mascara.style.width = "100%";
    mascara.style.height = "100%";
    mascara.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Fondo semi-transparente
    mascara.style.zIndex = "9999"; // Asegurar que esté sobre todo
    mascara.style.display = "flex";
    mascara.style.alignItems = "center";
    mascara.style.justifyContent = "center";
    mascara.style.flexDirection = "column"; // Alinear en columna

    // Crear el mensaje "Seleccione una opción"
    const mensaje = document.createElement("p");
    mensaje.textContent = "Seleccione una opción";
    mensaje.style.fontSize = "24px";
    mensaje.style.color = "#fff";
    mensaje.style.marginBottom = "20px"; // Espaciado inferior

    // Crear los botones
    const imprimirDetalleButton = document.createElement("button");
    imprimirDetalleButton.textContent = "Imprimir detalle y salir";
    imprimirDetalleButton.classList.add("boton"); // Agregar clase de estilo
    imprimirDetalleButton.addEventListener("click", function() {
        // Mostrar el nuevo saldo de la cuenta
        const usuario = usuarios.find(user => user.nombre === nombreUsuario);
        if (usuario) {
            alert(`Nuevo saldo: $${usuario.saldo.toFixed(2)}`);
        } else {
            console.error("Usuario no encontrado.");
        }
        // Redirigir al usuario a la página de inicio de sesión (index.html)
        window.location.href = "index.html";
    });

    const salirButton = document.createElement("button");
    salirButton.textContent = "Salir";
    salirButton.classList.add("boton"); // Agregar clase de estilo
    salirButton.addEventListener("click", function() {
        // Redirigir al usuario a la página de inicio de sesión (index.html)
        window.location.href = "index.html";
    });

    const otraTransaccionButton = document.createElement("button");
    otraTransaccionButton.textContent = "Hacer otra transacción";
    otraTransaccionButton.classList.add("boton"); // Agregar clase de estilo
    otraTransaccionButton.addEventListener("click", function() {
        // Mostrar la bienvenida al usuario nuevamente
        mostrarBienvenida(nombreUsuario, numeroCuenta);
        // Eliminar la máscara
        document.body.removeChild(mascara);
    });

    // Agregar mensaje y botones a la máscara
    mascara.appendChild(mensaje);
    mascara.appendChild(imprimirDetalleButton);
    mascara.appendChild(salirButton);
    mascara.appendChild(otraTransaccionButton);

    // Agregar la máscara al body
    document.body.appendChild(mascara);
}


// Obtener referencia al botón "Retirar"
const retirarButton = document.getElementById("retirar");

// Agregar evento de clic al botón "Retirar"
retirarButton.addEventListener("click", function() {
    // Limpiar el panel central
    const panelCentral = document.getElementById("panel-central");
    panelCentral.innerHTML = "";

    // Crear el formulario de retiro
    const retirarForm = document.createElement("form");
    retirarForm.id = "retirar-form";

    // Estilos del formulario
    retirarForm.style.textAlign = "center";

    // Agregar etiqueta y campo de monto con estilo
    retirarForm.innerHTML = `
        <label for="monto" style="display: block; text-align: center; margin-bottom: 10px; font-size: 18px; color: #333;">Monto a retirar:</label>
<input type="number" id="monto" name="monto" style="display: block; margin: 0 auto 20px; width: 200px; font-size: 18px; text-align: center; border: 1px solid #ccc; border-radius: 5px; padding: 8px;" required>
<button type="button" id="efectuar-retiro" style="display: block; margin: 0 auto; width: 200px; height: 40px; font-size: 18px; background-color: #007bff; color: #fff; border: none; border-radius: 5px; cursor: pointer;">Efectuar retiro</button>

    `;

    // Agregar evento de clic al botón "Efectuar retiro"
    const efectuarRetiroButton = retirarForm.querySelector("#efectuar-retiro");
    efectuarRetiroButton.addEventListener("click", function() {
        // Obtener el monto ingresado por el usuario
        const monto = parseFloat(document.getElementById("monto").value);

        // Validar que el monto sea válido
        if (!isNaN(monto) && monto > 0) {
            // Verificar si el usuario tiene suficiente saldo para realizar el retiro
            const usuario = usuarios.find(user => user.nombre === nombreUsuario);
            if (usuario) {
                if (usuario.saldo >= monto) {
                    // Actualizar el saldo del usuario
                    usuario.saldo -= monto;

                    
                    // Mostrar la máscara en toda la pantalla
                    mostrarMascara(); // Mostrar la máscara solo aquí
                } else {
                    // Mostrar mensaje de error si el usuario no tiene suficiente saldo
                    const mensajeError = document.createElement("p");
                    mensajeError.textContent = "No tienes suficiente saldo para realizar este retiro.";
                    mensajeError.style.textAlign = "center";
                    panelCentral.appendChild(mensajeError);
                }
            } else {
                console.error("Usuario no encontrado.");
            }
        } else {
            // Mostrar mensaje de error si el monto no es válido
            const mensajeError = document.createElement("p");
            mensajeError.textContent = "Por favor, ingresa un monto válido.";
            mensajeError.style.textAlign = "center";
            panelCentral.appendChild(mensajeError);
        }
    });

    // Agregar el formulario al panel central
    panelCentral.appendChild(retirarForm);
});
// Función para mostrar el formulario de consulta de saldo
function mostrarFormularioConsultaSaldo() {
    // Limpiar el panel central
    const panelCentral = document.getElementById("panel-central");
    panelCentral.innerHTML = "";

    // Mostrar el saldo actual en grande
    mostrarSaldoActual();
}

// Función para mostrar el saldo actual en grande
function mostrarSaldoActual() {
    const panelCentral = document.getElementById("panel-central");
    if (panelCentral) {
        // Limpiar el panel central
        panelCentral.innerHTML = "";

        // Encontrar el usuario actual
        const usuario = usuarios.find(user => user.nombre === nombreUsuario);
        if (usuario) {
            // Mostrar el saldo actual en grande
            const saldoActualElement = document.createElement("h2");
            saldoActualElement.textContent = "Saldo Actual: $" + usuario.saldo.toFixed(2);
            saldoActualElement.style.textAlign = "center";
            panelCentral.appendChild(saldoActualElement);

            // Crear botón para imprimir estado de cuenta
            const imprimirEstadoCuentaButton = document.createElement("button");
            imprimirEstadoCuentaButton.textContent = "Imprimir Estado de Cuenta";
            imprimirEstadoCuentaButton.classList.add("boton");
            imprimirEstadoCuentaButton.style.display = "block";
            imprimirEstadoCuentaButton.style.margin = "20px auto";
            imprimirEstadoCuentaButton.addEventListener("click", function() {
                // Lógica para imprimir estado de cuenta
                imprimirEstadoDeCuenta(usuario);
            });
            panelCentral.appendChild(imprimirEstadoCuentaButton);

            // Crear botón para mostrar gráfica del dinero gastado en el mes
            const mostrarGraficaButton = document.createElement("button");
            mostrarGraficaButton.textContent = "Mostrar Gráfica de Gastos";
            mostrarGraficaButton.classList.add("boton");
            mostrarGraficaButton.style.display = "block";
            mostrarGraficaButton.style.margin = "0 auto";
            mostrarGraficaButton.addEventListener("click", function() {
                // Lógica para mostrar gráfica de gastos
                alert("Mostrar gráfica de gastos");
            });
            panelCentral.appendChild(mostrarGraficaButton);

        } else {
            console.error("Usuario no encontrado.");
        }
    }
}

// Función para imprimir el estado de cuenta del usuario
function imprimirEstadoDeCuenta(usuario) {
    // Construir el texto del estado de cuenta
    let estadoDeCuenta = `Estado de Cuenta para ${usuario.nombre}:\n\n`;
    estadoDeCuenta += `Saldo Actual: $${usuario.saldo.toFixed(2)}\n\n`;
    estadoDeCuenta += "Movimientos:\n";
    usuario.transacciones.forEach(transaccion => {
        estadoDeCuenta += `- ${transaccion.descripcion} (${transaccion.fecha}): ${transaccion.monto.toFixed(2)}\n`;
    });

    // Mostrar el estado de cuenta en un cuadro de diálogo
    alert(estadoDeCuenta);
}


// Obtener referencia al botón "Consultar Saldo"
const consultarSaldoButton = document.getElementById("consultar-saldo");

// Agregar evento de clic al botón "Consultar Saldo"
consultarSaldoButton.addEventListener("click", mostrarSaldoActual);

// Función para mostrar el formulario de pago de servicios
function mostrarFormularioPagoServicios() {
    // Limpiar el panel central
    const panelCentral = document.getElementById("panel-central");
    panelCentral.innerHTML = "";

    // Crear el formulario de pago de servicios
    const pagoServiciosForm = document.createElement("form");
    pagoServiciosForm.id = "pago-servicios-form";

    // Crear la etiqueta para seleccionar el tipo de servicio
    const servicioLabel = document.createElement("label");
    servicioLabel.textContent = "Seleccione el tipo de servicio:";
    servicioLabel.style.display = "block";
    servicioLabel.style.marginBottom = "10px";

    // Crear el select con las opciones de servicio
    const servicioSelect = document.createElement("select");
    servicioSelect.id = "servicio";
    servicioSelect.name = "servicio";
    // Agregar las opciones de servicio
    const opcionesServicio = ["Energía eléctrica", "Internet", "Telefonía", "Agua potable"];
    opcionesServicio.forEach(opcion => {
        const option = document.createElement("option");
        option.value = opcion;
        option.textContent = opcion;
        servicioSelect.appendChild(option);
    });

    // Crear la etiqueta y el campo para ingresar el monto
    const montoLabel = document.createElement("label");
    montoLabel.textContent = "Monto a pagar:";
    montoLabel.style.display = "block";
    montoLabel.style.marginTop = "20px";
    const montoInput = document.createElement("input");
    montoInput.type = "number";
    montoInput.id = "monto-pago";
    montoInput.name = "monto-pago";
    montoInput.style.display = "block";
    montoInput.style.marginBottom = "20px";
    montoInput.required = true;

    // Crear el botón de pagar
    const pagarButton = document.createElement("button");
    pagarButton.textContent = "Aceptar";
    pagarButton.classList.add("boton");
    pagarButton.style.display = "block";
    pagarButton.style.margin = "0 auto";

    // Agregar evento de clic al botón de pagar
    pagarButton.addEventListener("click", function() {
        // Obtener el tipo de servicio y el monto ingresado por el usuario
        const servicio = servicioSelect.value;
        const monto = parseFloat(montoInput.value);

        // Realizar el pago (simulación)
        if (!isNaN(monto) && monto > 0) {
            // Agregar la transacción al usuario
            const usuario = usuarios.find(user => user.nombre === nombreUsuario);
            if (usuario) {
                agregarTransaccion(usuario, `Pago de ${servicio}`, monto, "débito", new Date().toISOString().split('T')[0]);
                // Mostrar mensaje de éxito
                usuario.saldo -= monto;
                panelCentral.innerHTML = "<p>Pago exitoso</p>";
            } else {
                console.error("Usuario no encontrado.");
            }
        } else {
            alert("Por favor, ingresa un monto válido.");
        }
    });

    // Agregar elementos al formulario
    pagoServiciosForm.appendChild(servicioLabel);
    pagoServiciosForm.appendChild(servicioSelect);
    pagoServiciosForm.appendChild(montoLabel);
    pagoServiciosForm.appendChild(montoInput);
    pagoServiciosForm.appendChild(pagarButton);

    // Agregar el formulario al panel central
    panelCentral.appendChild(pagoServiciosForm);
}
// Obtener referencia al botón "Pagar servicios"
const pagarServiciosButton = document.getElementById("pagar-servicios");

// Agregar evento de clic al botón "Pagar servicios"
pagarServiciosButton.addEventListener("click", mostrarFormularioPagoServicios);

// Función para agregar una transacción a un usuario
function agregarTransaccion(usuario, descripcion, monto, tipo, fecha) {
    // Crear objeto de transacción
    const nuevaTransaccion = { monto, descripcion, tipo, fecha };

    // Agregar la transacción al usuario
    usuario.transacciones.push(nuevaTransaccion);
}


