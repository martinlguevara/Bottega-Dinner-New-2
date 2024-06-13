// Datos del Menú
const menu = {
    desayuno: {
        platos: {
            "Tortitas": 5.99,
            "Tortilla española": 6.99,
            "Tostadas con jamón": 5.49,
            "Burrito de Desayuno": 7.49
        },
        acompañamientos: {
            "Patatas fritas": 2.99,
            "Bacon": 3.49,
            "Salchicha": 3.49,
            "Ensalada de Frutas": 2.99
        },
        bebidas: {
            "Café": 1.99,
            "Jugo de Naranja": 2.49,
            "Té": 1.99
        }
    },
    almuerzo: {
        platos: {
            "Hamburguesa con Queso": 8.99,
            "Sándwich de Pollo": 9.49,
            "Ensalada César": 7.99,
            "Sándwich vegetariano": 8.49
        },
        acompañamientos: {
            "Patatas Fritas": 2.99,
            "Aros de Cebolla": 3.49,
            "Ensalada Simple": 2.99,
            "Ensalada Mixta": 3.49
        },
        bebidas: {
            "Refresco": 1.99,
            "Agua": 1.49,
            "Cerveza": 3.99
        }
    },
    cena: {
        platos: {
            "Filete de Lomo": 14.99,
            "Salmón": 13.99,
            "Espaguetis": 12.49,
            "Chuletas de Cerdo": 13.49
        },
        acompañamientos: {
            "Puré de Patatas": 3.49,
            "Verduras al Vapor": 3.99,
            "Arroz": 3.49,
            "Ensalada César": 3.99
        },
        bebidas: {
            "Vino Tinto": 4.99,
            "Vino Blanco": 4.99,
            "Agua": 1.49
        }
    }
};

const comentarios = [
    "¡Buena elección!",
    "¡Ese es un plato popular!",
    "¡Excelente selección!",
    "¡Te va a encantar!",
    "¡Una elección interesante!",
    "¡El favorito del chef!"
];

const horariosComida = ["desayuno", "almuerzo", "cena"];
const horarios = {
    desayuno: { inicio: 8, fin: 13 },
    almuerzo: { inicio: 13.5, fin: 18 },
    cena: { inicio: 18, fin: 23.5 }
};

// Función para obtener un comentario aleatorio
function obtenerComentarioAleatorio() {
    return comentarios[Math.floor(Math.random() * comentarios.length)];
}

// Función para normalizar cadenas (quitar acentos y convertir a minúsculas)
function normalizarCadena(cadena) {
    return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Función para pedir al usuario que seleccione del menú, incluyendo precios
function pedirSeleccionUsuario(opciones, tipoElemento) {
    let seleccion = "";
    const opcionesConPrecios = Object.entries(opciones).map(([item, price]) => `${item}: $${price.toFixed(2)}`).join("\n");
    while (!Object.keys(opciones).map(item => normalizarCadena(item)).includes(normalizarCadena(seleccion))) {
        seleccion = prompt(`Por favor, selecciona un ${tipoElemento}:\n${opcionesConPrecios}`);
        if (!Object.keys(opciones).map(item => normalizarCadena(item)).includes(normalizarCadena(seleccion))) {
            alert("Selección inválida. Por favor, inténtalo de nuevo.");
        }
    }
    // Encontrar el item original con la selección sin tener en cuenta acentos ni mayúsculas/minúsculas
    return Object.keys(opciones).find(item => normalizarCadena(item) === normalizarCadena(seleccion));
}

// Función para manejar la selección de la comida
function manejarSeleccionComida(horarioComida) {
    const comida = menu[horarioComida];
    let costoTotal = 0;
    const factura = [];

    alert(`¡Bienvenido a Bottega Comedor! Aquí está el menú de ${horarioComida}:`);

    // Mostrar todas las opciones en una sola ventana
    const opcionesMenu = `Platos:\n${Object.entries(comida.platos).map(([item, price]) => `${item}: $${price.toFixed(2)}`).join("\n")}\n\nAcompañamientos:\n${Object.entries(comida.acompañamientos).map(([item, price]) => `${item}: $${price.toFixed(2)}`).join("\n")}\n\nBebidas:\n${Object.entries(comida.bebidas).map(([item, price]) => `${item}: $${price.toFixed(2)}`).join("\n")}`;

    alert(opcionesMenu);

    // Seleccionar plato
    const plato = pedirSeleccionUsuario(comida.platos, "plato");
    alert(obtenerComentarioAleatorio());
    costoTotal += comida.platos[plato];
    factura.push({ item: plato, precio: comida.platos[plato] });

    // Seleccionar primer acompañamiento
    const acompañamiento1 = pedirSeleccionUsuario(comida.acompañamientos, "primer acompañamiento");
    alert(obtenerComentarioAleatorio());
    costoTotal += comida.acompañamientos[acompañamiento1];
    factura.push({ item: acompañamiento1, precio: comida.acompañamientos[acompañamiento1] });

    // Preguntar si quiere una bebida y mostrar mensaje de descuento
    let tieneBebida = false;
    if (confirm("¿Te gustaría añadir una bebida? Si eliges una bebida, tendrás un 50% de descuento en tu segundo acompañamiento.")) {
        const bebida = pedirSeleccionUsuario(comida.bebidas, "bebida");
        alert(obtenerComentarioAleatorio());
        costoTotal += comida.bebidas[bebida];
        factura.push({ item: bebida, precio: comida.bebidas[bebida] });
        tieneBebida = true;
    }

    // Seleccionar segundo acompañamiento con descuento si tiene bebida
    const acompañamiento2 = pedirSeleccionUsuario(comida.acompañamientos, "segundo acompañamiento");
    alert(obtenerComentarioAleatorio());
    let precioAcompañamiento2 = comida.acompañamientos[acompañamiento2];
    if (tieneBebida) {
        precioAcompañamiento2 *= 0.5; // 50% de descuento en el segundo acompañamiento
    }
    costoTotal += precioAcompañamiento2;
    factura.push({ item: acompañamiento2, precio: precioAcompañamiento2 });

    // Mostrar factura
    let mensajeFactura = `Factura de tu ${horarioComida}:\n`;
    factura.forEach(({ item, precio }) => {
        mensajeFactura += `${item}: $${precio.toFixed(2)}\n`;
    });
    mensajeFactura += `\nTotal: $${costoTotal.toFixed(2)}`;
    alert(mensajeFactura);
}

// Función para verificar si el comedor está abierto
function estaAbierto(horarioComida, horaActual) {
    const horario = horarios[horarioComida];
    return horaActual >= horario.inicio && horaActual < horario.fin;
}

// Programa Principal
function principal() {
    try {
        let horarioComida = "";

        // Preguntar la hora actual al usuario
        const horaUsuario = prompt("Por favor, introduce la hora actual en formato HH:MM (24 horas):");
        const [horas, minutos] = horaUsuario.split(":").map(Number);
        const horaActual = horas + minutos / 60;

        while (!horariosComida.includes(horarioComida)) {
            horarioComida = prompt(`¿Qué comida te gustaría? (desayuno, almuerzo, cena)`).toLowerCase();
            if (horarioComida === null) {
                throw new Error("Selección de horario de comida cancelada por el usuario.");
            }
            if (!horariosComida.includes(horarioComida)) {
                alert("Horario de comida inválido. Por favor, inténtalo de nuevo.");
            }
        }
        if (estaAbierto(horarioComida, horaActual)) {
            manejarSeleccionComida(horarioComida);
        } else {
            alert(`El comedor está cerrado para ${horarioComida}. Por favor, intenta en el horario adecuado.`);
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

// Ejecutar el programa principal
principal();
