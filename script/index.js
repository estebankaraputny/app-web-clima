// SPINNER DE CARGA

function fadeOut(el) {
  el.style.opacity = 1;
  (function fade() {
    if ((el.style.opacity -= 0.1) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

function fadeIn(el, display) {
  el.style.opacity = 0;
  el.style.display = display || "block";
  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += 0.1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

const loaderPage = document.querySelector("#loader");
const bodyPage = document.querySelector("main");

window.onload = function () {
  fadeOut(loaderPage);
  bodyPage.classList.remove("hiddenBody");

  // OBTENEMOS LA UBICACION DEL USUARIO
  navigator.geolocation.getCurrentPosition(fetchData);
};

// CONSUMIENDO APIS
const API_KEY_CLIMA = "6df91a897b673753ddd7c176eeef7e83";
const API_KEY_NOTICIAS = "d148999bd2314dca8c00a2b099ee9e06";
const nameCity = document.getElementById("city");
const buttonSearch = document.getElementById("button-ubi");

const fetchData = (position) => {
  const { latitude, longitude } = position.coords;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY_CLIMA}`
  )
    .then((response) => response.json())
    .then((data) => setWeatherDate(data));
};

buttonSearch.addEventListener("click", (e) => {
  if (nameCity.value === "") {
    showError("No hemos encontrado tu cuidad, Por favor vuelve a intentarlo.");
  } else {
    fetchDateInput(nameCity.value);
  }
});

const showError = (message) => {
  alert(message);
};

const fetchDateInput = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API_KEY_CLIMA}`;
  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((dataJSON) => setWeatherDate(dataJSON));
};

// IMPRIMIR EN EL DOM

const temperature = document.getElementById("temperature");
const contentMinMax = document.getElementById("minAndMax");
const windSpeed = document.getElementById("wind");
const contLocation = document.getElementById("contLocation");
const humedad = document.getElementById("humidity");
const lluvia = document.getElementById("lluvias");
const estadoClima = document.getElementById("estadoDelClima");

const setWeatherDate = (data) => {
  console.log(data);
  temperature.innerHTML = `
        <!-- <img src="./asset/image/partly_cloudy.png" alt="" class="img-clima"> -->
        <p class="temp">${Math.trunc(data.main.temp)}°C</p>
    `;
  estadoClima.innerHTML = `
        <p class="title-estado-clima">
           <!-- <i class="${data.weather[0].icon}" stlye="color:#fff;"></i> -->
            ${data.weather[0].description.toUpperCase()}
        </p>
    `;

  contentMinMax.innerHTML = `
        <p class="date" id="tempMin"><i class="bi bi-thermometer"></i> Min ${Math.trunc(
          data.main.temp_min
        )}°C</p>
        <p class="date" id="tempMin"><i class="bi bi-thermometer-high"></i> Max ${Math.trunc(
          data.main.temp_max
        )}°C</p>
                        `;

  humedad.innerHTML = `
        <i class="bi bi-cloud-fog2"></i>
        <p class="title-detalles">
                            Humedad
        </p>
        <p class="date-detalles">
            ${data.main.humidity}%
        </p>
                        `;

  contLocation.innerHTML = `
        <i class="bi bi-geo-alt-fill"></i>
        <p class="name-ubi">${data.name}</p>  
    `;

  windSpeed.innerHTML = `
        <i class="bi bi-wind"></i>
        <p class="title-detalles">
            Viento
        </p>
        <p class="date-detalles">
            ${Math.trunc(data.wind.speed)} km/h
        </p>
    `;

  lluvia.innerHTML = `
        <i class="bi bi-droplet-half"></i>
        <p class="title-detalles">
            Lluvia
        </p>
        <p class="date-detalles">
            ${data.clouds.all}%
        </p>
    `;
};

// INICIA RELOJ
const time = document.getElementById("time");
const fechaActual = document.getElementById("fecha");

const dayWeek = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const intervalo = setInterval(() => {
  const amOPM = document.getElementById("amOPm");
  const local = new Date();

  let day = local.getDate(),
    month = local.getMonth(),
    year = local.getFullYear();
  dayName = local.getDay();

  // console.log(local.toLocaleTimeString())
  time.innerHTML = local.toLocaleTimeString();
  fechaActual.innerHTML = `<i class="bi bi-calendar-event"></i> ${dayWeek[dayName]}, ${day} de ${monthNames[month]} del ${year}`;
  //  if(){

  //  }
}, 1000);

// NOTICIAS APPI

// El código ISO 3166-1 de 2 letras del país del que desea obtener titulares. Posibles opciones: ar
// br ca ch cn co eg fr in jp mx ru us ve

const insertNoticas = document.getElementById("noticias");
const selectCountry = document.getElementById("selectCountry");

selectCountry.addEventListener("change", () => {
  let codigoPais = selectCountry.value;
  console.log(codigoPais);
  if (selectCountry.value === "invalid") {
    errorNotice();
  } else {
    limpiarNoticias();
    fetchNoticeInput(codigoPais);
  }
});

const limpiarNoticias = () => {
  insertNoticas.innerHTML = "";
};

const errorNotice = () => {
  insertNoticas.innerHTML = `
        <div class="campo-vacio">
            <img class="ilustracion-error" src="./asset/image/ilustrations/Currect location-60b6.svg" alt="Ilustracion de error">
            <p class="mensaje-de-error">No se ha seleccionado ningún país, por favor seleccione su país.</p>
        </div>
    `;
};

const fetchNoticeInput = (pais) => {
  let urlNoticias = `https://newsapi.org/v2/top-headlines?country=${pais}&apiKey=${API_KEY_NOTICIAS}`;

  fetch(urlNoticias)
    .then((resp) => resp.json())
    .then((noticiasDatos) => {
      console.log(noticiasDatos);
      let noticias = noticiasDatos.articles;
      for (let i = 0; i < 3; i++) {
        console.log(i);
        insert(noticias[i]);
      }
    });
};

function insert(numero) {
  // Corrección: Cambiar la sintaxis de flecha a la declaración de función convencional// Corrección: Cambiar la sintaxis de flecha a la declaración de función convencional
  let tituloAcortado = acortarTitulo(numero.title, 60);
  // let autorAcortado = acortarTitulo(numero.author, 15);

  let div = document.createElement("div");
  div.classList.add("content-info-noti");
  div.innerHTML = `
                <div class="img-and-descri">
                    <div class="cont-img">
                        <img src="${numero.urlToImage}" class="img-noticias" alt="No se encontró img en la API - Imagen descriptiva de la noticia">
                    </div>
                </div>
                <div class="cont-title-noti">
                    <h2 class="title-noticias">${tituloAcortado}</h2>
                </div>
                <div class="button-ver-autor">
                        <!-- <p class="description-noticias">${numero.description}</p> -->
                        <p class="autor-noticia">${numero.author}</p>
                        <a class="url-noti" href="${numero.url}" target="_blank">Saber más</a>
                </div>
            `;
  insertNoticas.appendChild(div);
}

const acortarTitulo = (titulo, longMax) => {
  if (titulo.length > longMax) {
    return titulo.substring(0, longMax) + "...";
  }
};
