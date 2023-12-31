//code to display current date and time
function currentDate() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  let minutesFormatted = (minutes < 10 ? "0" : "") + minutes;
  let today = document.querySelector("#date");

  today.innerHTML = `${day}, ${hour}:${minutesFormatted}`;
}
currentDate();

//code for displaying country being searched and current temp of that country
let searchCity = document.querySelector("#search-form");
let country = document.querySelector("#country");
function weather(response) {
  let temperature = document.querySelector("#current-temp");
  celciusTemp = response.data.temperature.current;
  let theTemp = Math.round(celciusTemp);
  temperature.innerHTML = `${theTemp}`;
  let icon = document.querySelector("#weather-icon");
  icon.src = response.data.condition.icon_url;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
}
function displayCountry(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search");
  country.innerHTML = search.value;

  let city = search.value;
  let key = "eb0aaf5ccaae9604a31eat3cfdo3faac";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&units=metric`;
  axios.get(`${apiUrl}&key=${key}`).then(weather);
  getForecast(search.value);
}
searchCity.addEventListener("submit", displayCountry);

//code for the button using geolocation API
let currentLocation = document.querySelector("#current-location");

function geoTemp(response) {
  let temperature = document.querySelector("#current-temp");
  celciusTemp = response.data.temperature.current;

  let theTemp = Math.round(celciusTemp);
  temperature.innerHTML = `${theTemp}`;
  let myLocation = document.querySelector("#country");
  myLocation.innerHTML = response.data.city;
  let icon = document.querySelector("#weather-icon");
  icon.src = response.data.condition.icon_url;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
}
function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "eb0aaf5ccaae9604a31eat3cfdo3faac";
  let url = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&units=metric`;
  axios.get(`${url}&key=${apiKey}`).then(geoTemp);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(getLocation);
}

currentLocation.addEventListener("click", getCurrentPosition);
getCurrentPosition();

//code temperature conversion between celcius and fahrenheit

let Fahrenheit = document.querySelector("#degrees-fahrenheit");
let celcius = document.querySelector("#degrees-celcius");
function tempC(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(celciusTemp);
  //removes working class from fahrenheit link
  celcius.classList.add("working");
  Fahrenheit.classList.remove("working");
}
celcius.addEventListener("click", tempC);

function tempF(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(fahrenheitTemp);
  //removes working class from celcius link
  celcius.classList.remove("working");
  Fahrenheit.classList.add("working");
}
Fahrenheit.addEventListener("click", tempF);
let celciusTemp = null;

//code for the forecast
let forecast = document.querySelector("#weather-forecast");
function getForecast(cityName) {
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=eb0aaf5ccaae9604a31eat3cfdo3faac&units=metric`;
  axios.get(`${url}`).then(showForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

function showForecast(response) {
  let forecastSection = document.querySelector("#weather-forecast");
  let forecastData = response.data.daily;

  let forecastHTML = `<div class="row">`;

  forecastData.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
            <div class="day">${formatDay(forecastDay.time)}</div>
            <br />
            <div>
              <img
                src="${forecastDay.condition.icon_url}"
                alt="weather icon"
                class="forecastIcon"
              />
            </div>
            <br />
            <span class="forecastMax"><strong>${Math.round(
              forecastDay.temperature.maximum
            )}°</strong></span>
            <span class="forecastMin"> ${Math.round(
              forecastDay.temperature.minimum
            )}°</span>
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastSection.innerHTML = forecastHTML;
}
//displays current location forecast
function harareForecast() {
  let url = `https://api.shecodes.io/weather/v1/forecast?query=Harare&key=eb0aaf5ccaae9604a31eat3cfdo3faac&units=metric`;
  axios.get(`${url}`).then(showForecast);
}
harareForecast();
