let minor = ""
let destination = ""
let cardSection = document.querySelector(".cardSection");
let ticketContainer = document.querySelector(".ticketContainer");
let form = document.querySelector(".form");
let add = document.querySelector(".add");
let finalPrice = document.querySelector(".finalPrice");
let totalPassengers = document.getElementById("passengers");
let totalMinors = document.getElementById("minors");
let globalPrice = 0;
let themeSwitch = document.querySelector(".darkMode");
let body = document.querySelector("body");
let locationName = document.querySelector(".locationName");
let submitLocation = document.querySelector(".submitLocation");
let actualWeather = document.querySelector(".actualWeather");

let destinationChoice = [
    { id: 1, name: "buenos aires", price: 30000 },
    { id: 2, name: "mendoza", price: 40000 },
    { id: 3, name: "ushuaia", price: 70000 },
    { id: 4, name: "salta", price: 55000 },
    { id: 5, name: "misiones", price: 25000 },
    { id: 6, name: "santa cruz", price: 10000 },
];

document.addEventListener("DOMContentLoaded", () => {
    addDestination();
    totalPassengers.value = localStorage.getItem("passengers");
    totalMinors.value = localStorage.getItem("minors");
    globalPrice = JSON.parse(localStorage.getItem("destination"))?.price || 0
    totalPrice();
    let destino = JSON.parse(localStorage.getItem("destination"))
    destino && selectedCard(destino.id, destino.name, destino.price);
});

function addDestination() {
    destinationChoice.forEach((destino) => {
        cardSection.innerHTML += writeCard(destino)
    }
    )
}

function selectedCard(id, name, price) {
    ticketContainer.innerHTML = writeCard({ id, name, price });
    globalPrice = price
    totalPrice();
    localStorage.setItem("destination", JSON.stringify({ id, name, price }))
}

function removeCard(id) {
    let idDestination = JSON.parse(localStorage.getItem("destination")).id;
    if (id == idDestination) {
        ticketContainer.innerHTML = `<div> </div>`
        localStorage.removeItem("destination");
        globalPrice = 0;
        totalPrice();
    }
}

function writeCard({ id, name, price }) {
    return `
    <div class="card">
    <div class="cardIcon">
    <i class="fas fa-plane"></i> 
    </div>
      <h3 class="cardTitle">${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <p class="cardDescription">Precio por boleto: $${price}</p>
      <div class="buttonContainer">
      <button class="add" onclick="selectedCard(${id}, '${name}', ${price})">+</button>
      <button class="remove" onclick="removeCard(${id})">-</button>
      </div>
      </div>`
}

totalPassengers.addEventListener("input", () => {
    validateInputs(totalPassengers, totalPassengers.value > 0);
    totalPrice();
    localStorage.setItem("passengers", totalPassengers.value);
})

totalMinors.addEventListener("input", () => {
    validateInputs(totalMinors, totalMinors.value >= 0);
    totalPrice();
    localStorage.setItem("minors", totalMinors.value);
})

function totalPrice() {
    let finalPriceText = globalPrice * totalPassengers.value
    for (let i = 1; i <= totalMinors.value; i++) {
        finalPriceText -= globalPrice
    }
    finalPrice.innerHTML =
        ` El precio final es: $${finalPriceText}`
}

function validateInputs(totalX, validation) {
    if (validation && totalMinors.value < totalPassengers.value) {
        totalX.classList.remove("error");
    } else {
        totalX.classList.add("error");
    }
}

document.querySelector(".submitForm").addEventListener("click", confirmFly)

function confirmFly() {
    if (totalMinors.value && totalPassengers.value && globalPrice != 0 && totalMinors.value < totalPassengers.value) {
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
        })
    }
}


// Dark mode code 

themeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark-mode")
})


// Reques API

submitLocation.addEventListener("click", (e) => {
    e.preventDefault();
    getWeatherLocation("Argentina " + locationName.value);
})

function getWeatherLocation(location) {
    console.log(location);
    fetch(`https://api.weatherapi.com/v1/current.json?key=86aa92a0f3124c9b98d192820230409&q=${location}&aqi=no&lang=es`)
    .then(res => res.json())
    .then(data => {
        writeWeather(data);
        console.log(data);
    })
}

function writeWeather(data) {
    actualWeather.innerHTML = `
    <img src="${data.current.condition.icon}" alt="icono clima">
    <p>${data.location.region}</p>
    <p>${data.current.condition.text}</p>
    <p>Temperatura: ${data.current.temp_c}°</p>
    <small>Sensación térmica: ${data.current.feelslike_c}°</small>
    `
}