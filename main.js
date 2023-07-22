alert("Bienvenido a Mandarina Airlines 🍊, su aerolinea favorita para viajes DENTRO de Argentina: \n-Buenos Aires\n-Mendoza\n-Ushuaia\n-Salta\n-Misiones");
let menor = ""
let cantidadDeMenores = 0
let cantidadDePasajeros = 0
let destino = ""

pasajeros();
function pasajeros() {
    cantidadDePasajeros = parseInt(prompt("Ingrese el número de pasajeros"));
    console.log(cantidadDePasajeros);
    if (cantidadDePasajeros < 1) {
        alert("La cantidad de pasajeros no puede ser negativa o 0!");
        pasajeros();
    } else if (!cantidadDePasajeros) {
        alert("La cantidad de pasajeros debe ingresarse con números");
        pasajeros();
    } else {
        hayMenor();
        armarPaquete();
    }
}

function hayMenor() {
    menor = prompt("Algun/a pasajero/a es menor de edad?").toLowerCase();
    if (menor == "no") {
        alert("Excelente, a continuación se le solicitará que ingrese el destino de su viaje")
    } else if (menor == "si") {
        cuantosMenores();
    } else {
        alert("Dato ingresado incorrectamente");
        hayMenor();
    }
}

function cuantosMenores() {
    cantidadDeMenores = parseInt(prompt("Cuantos menores son?"))
    if (cantidadDeMenores >= cantidadDePasajeros || cantidadDeMenores < 0) {
        alert("Los menores deben viajar acompañados de un adulto!")
        cuantosMenores();
    } else if (!cantidadDeMenores) {
        alert("La cantidad de menores debe ingresarse con números")
        cuantosMenores();
    } else {
        alert(`Excelente, no se le cobrará boleto a ${cantidadDeMenores} pasajero/s. Ingrese su destino a continuación`)
    }
}



function armarPaquete() {
    destino = prompt("Ingrese su destino por favor").toLowerCase()
    switch (destino) {
        case "buenos aires":
            casoDestino(30000)
            break;

        case "mendoza":
            casoDestino(40000)
            break;

        case "ushuaia":
            casoDestino(70000)
            break;

        case "salta":
            casoDestino(55000)
            break;

        case "misiones":
            casoDestino(25000)
            break;

        default:
            alert("No ha ingresado un destino o no es válido...")
            destino = prompt("Ingrese su destino por favor").toLowerCase();
            armarPaquete();

    }
}
function casoDestino(precioIndividual) {
    if (menor == "no") {
        alert(`Usted a seleccionado ${destino} como destino, con un precio final de: $${precioIndividual * cantidadDePasajeros}`);
    } else {
        let precioFinal = precioIndividual * cantidadDePasajeros
        for (let i = 1; i <= cantidadDeMenores; i++) {
            precioFinal -= precioIndividual
        }
        alert(`Usted a seleccionado ${destino} como destino, con un precio final de: $${precioFinal}`);

    }
    respuestaFinal();
}

function respuestaFinal() {
    let respuestaFinal = prompt("Desea confirmar el vuelo?").toLowerCase();
    if (respuestaFinal == "si") {
        alert("Felicidades! A seleccionado correctamente su destino...Que tenga un buen viaje! 🛫🌎")
    } else {
        alert("Por favor, complete los datos nuevamente...")
        pasajeros();
    }
}
