const API_KEY = '6df91a897b673753ddd7c176eeef7e83'
const nameCity = document.getElementById("city");
const buttonSearch = document.getElementById("button-ubi");

const fetchData = position => {
    const {latitude, longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
    .then( response => response.json())
    .then( data => setWeatherDate(data));
}

buttonSearch.addEventListener("click", (e) => {
    if(nameCity.value === ""){
        showError("No hemos encontrado tu cuidad, Por favor vuelve a intentarlo.");
    } else{
        fetchDateInput(nameCity.value);
    }
});

const showError = message => {
    alert(message);
}

const fetchDateInput = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API_KEY}`
    fetch(url)
    .then(data => {
        return data.json()
    })
    .then(dataJSON => setWeatherDate(dataJSON));
}


const temperature = document.getElementById("temperature");
const contentMinMax = document.getElementById("minAndMax");
const windSpeed = document.getElementById("wind");
const contLocation = document.getElementById("contLocation");
const humedad = document.getElementById("humidity");
const lluvia = document.getElementById("lluvias")

const setWeatherDate = (data) =>{
    console.log(data);
    temperature.innerHTML = `
        <!-- <img src="./asset/image/partly_cloudy.png" alt="" class="img-clima"> -->
        <p class="temp">${Math.trunc(data.main.temp)}°C</p>
    `
    contentMinMax.innerHTML = `
        <p class="date" id="tempMin">Min ${Math.trunc(data.main.temp_min)}°C</p>
        <p class="date" id="tempMin">Max ${Math.trunc(data.main.temp_max)}°C</p>
                        `

    humedad.innerHTML = `
        <i class="bi bi-cloud-fog2"></i>
        <p class="title-detalles">
                            Humedad
        </p>
        <p class="date-detalles">
            ${data.main.humidity}%
        </p>
                        `

    contLocation.innerHTML = `
        <i class="bi bi-geo-alt-fill"></i>
        <p class="name-ubi">${data.name}</p>  
    `

    windSpeed.innerHTML = `
        <i class="bi bi-wind"></i>
        <p class="title-detalles">
            Viento
        </p>
        <p class="date-detalles">
            ${Math.trunc(data.wind.gust)} km/h
        </p>
    `

    lluvia.innerHTML = `
        <i class="bi bi-droplet-half"></i>
        <p class="title-detalles">
            Lluvia
        </p>
        <p class="date-detalles">
            ${data.clouds.all}%
        </p>
    `
}





const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}