// // alert("Bienvenido a Mandarina Airlines 🍊, su aerolinea favorita para viajes DENTRO de Argentina: \n-Buenos Aires\n-Mendoza\n-Ushuaia\n-Salta\n-Misiones");
let menor = ""
let destino = ""
let cardSection = document.querySelector(".cardSection");
let ticketContainer = document.querySelector(".ticketContainer");
let form = document.querySelector(".form");
let add = document.querySelector(".add");
let finalPrice = document.querySelector(".finalPrice");
let cantidadDePasajeros = document.getElementById("pasajeros");
let cantidadDeMenores = document.getElementById("menores");
let price = 0;

let opcionDestino = [
    { id: 1, nombre: "buenos aires", precio: 30000 },
    { id: 2, nombre: "mendoza", precio: 40000 },
    { id: 3, nombre: "ushuaia", precio: 70000 },
    { id: 4, nombre: "salta", precio: 55000 },
    { id: 5, nombre: "misiones", precio: 25000 },
    { id: 6, nombre: "santa cruz", precio: 10000 }
];

document.addEventListener("DOMContentLoaded", () => {
    agregarDestinos();
    cantidadDePasajeros.value = localStorage.getItem("pasajeros");
    cantidadDeMenores.value = localStorage.getItem("menores");
    price = JSON.parse(localStorage.getItem("destino")).precio || 0
    let destino = JSON.parse(localStorage.getItem("destino"))
    destino && selectedCard(destino.id, destino.nombre, destino.precio)
});

function agregarDestinos() {
    opcionDestino.forEach((destino) => {
        cardSection.innerHTML += writeCard(destino)
    }
    )
}

function selectedCard(id, nombre, precio) {
    ticketContainer.innerHTML = writeCard({ id, nombre, precio });
    price = precio
    totalPrice();
    localStorage.setItem("destino", JSON.stringify({ id, nombre, precio }))
}

function removeCard(id) {
    let idDestino = JSON.parse(localStorage.getItem("destino"));
    let idDestinoObtenido = idDestino.id;
    if (id == idDestinoObtenido) {
        ticketContainer.innerHTML = `<div> </div>`
        localStorage.clear("destino");
    } 
}

function writeCard({ id, nombre, precio }) {
    return `
    <div class="card">
    <div class="cardIcon">
    <i class="fas fa-plane"></i> 
    </div>
      <h3 class="cardTitle">${nombre.charAt(0).toUpperCase() + nombre.slice(1)}</h3>
      <p class="cardDescription">Precio por boleto: $${precio}</p>
      <div class="buttonContainer">
      <button class="add" onclick="selectedCard(${id}, '${nombre}', ${precio})">+</button>
      <button class="remove" onclick="removeCard(${id})">-</button>
      </div>
      </div>`
}

cantidadDePasajeros.addEventListener("input", () => {
    validateInputs(cantidadDePasajeros, cantidadDePasajeros.value > 0);
    totalPrice();
    localStorage.setItem("pasajeros", cantidadDePasajeros.value);
})

cantidadDeMenores.addEventListener("input", () => {
    validateInputs(cantidadDeMenores, cantidadDeMenores.value >= 0);
    totalPrice();
    localStorage.setItem("menores", cantidadDeMenores.value);
})

function totalPrice() {
    let precioFinal = price * cantidadDePasajeros.value
    for (let i = 1; i <= cantidadDeMenores.value; i++) {
        precioFinal -= price
    }
    finalPrice.textContent =
        ` El precio final es: $${precioFinal} `
}

function validateInputs(cantidadDeX, validation) {
    if (validation && cantidadDeMenores.value < cantidadDePasajeros.value) {
        cantidadDeX.classList.remove("error");
    } else {
        cantidadDeX.classList.add("error");
    }
}

document.querySelector(".submitForm").addEventListener("click", confirmFly)

function confirmFly() {
    if (cantidadDeMenores.value && cantidadDePasajeros.value && price != 0 && cantidadDeMenores.value < cantidadDePasajeros.value){
        console.log(price);
        Swal.fire(
            'Bien hecho!',
            'Usted ha confirmado su vuelo! 🛫',
            'success'
        ).then(() => {
            localStorage.clear();
            location.reload();
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Torre de control...?',
            text: 'Tenemos un problema!',
            footer: '<a href="" stlyes="font-weight: 600">Debe completar los datos.</a>'
          }).then(() => {
            localStorage.clear();
          })
    }
}



