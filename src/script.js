let currentTime = new Date();
let clock = document.querySelector("#time");
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let formattedDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = formattedDays[currentTime.getDay()];
clock.innerHTML = `${currentDay} ${hours}:${minutes}`;

function displayWeather(response) {
  celsiusTemp = response.data.main.temp;
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function searchCity(city) {
  let apiKey = "9e55ce91de1e84df9f3dbe33f9c2133a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "9e55ce91de1e84df9f3dbe33f9c2133a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#whole-searchbar");
searchForm.addEventListener("submit", handleSubmit);
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("New York");
//to-do before submitting- unit conversion C and F, icon changes for wether type (cloudy, sunny, etc)

function showFahrenheitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;
let fahrenheitLink = document.querySelector("#fahrenheit");
let celsiusLink = document.querySelector("#celsius");

fahrenheitLink.addEventListener("click", showFahrenheitTemp);
celsiusLink.addEventListener("click", showCelsiusTemp);

searchCity("New York");
