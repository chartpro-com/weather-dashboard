var apiKey = '444d7ee70cf3d4f1caaf5b7385d3c7b8'; 
var searchForm = document.querySelector('#search-form');
var cityInput = document.querySelector('#city-input');
var cityNameElement = document.querySelector('#city-name');
var currentDateElement = document.querySelector('#current-date');
var weatherIconElement = document.querySelector('#weather-icon');
var temperatureElement = document.querySelector('#temperature');
var humidityElement = document.querySelector('#humidity');
var windSpeedElement = document.querySelector('#wind-speed');
var forecastCardsElement = document.querySelector('#forecast-cards');
var searchHistoryElement = document.querySelector('#search-history');

let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];


function renderSearchHistory() {
  searchHistoryElement.innerHTML = '';
  searchHistory.forEach((city) => {
    var li = document.createElement('li');
    li.textContent = city;
    searchHistoryElement.appendChild(li);
  });
}


function renderCurrentWeather(city, weather) {
  cityNameElement.textContent = `${city} (${currentDateElement.textContent})`;
  weatherIconElement.setAttribute('src', `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`);
  temperatureElement.textContent = `Temperature: ${weather.main.temp} °F`;
  humidityElement.textContent = `Humidity: ${weather.main.humidity}%`;
  windSpeedElement.textContent = `Wind Speed: ${weather.wind.speed} MPH`;
}


function renderForecast(forecast) {
  forecastCardsElement.innerHTML = '';
  for (let i = 0; i < forecast.list.length; i += 8) {
    var forecastItem = forecast.list[i];


    var date = new Date(forecastItem.dt * 1000);
    var formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;


    var card = document.createElement('div');
    card.classList.add('forecast-card');


    var cardContent = `
      <p>${formattedDate}</p>
      <img src="http://openweathermap.org/img/w/${forecastItem.weather[0].icon}.png" alt="Weather Icon">
      <p>Temp: ${forecastItem.main.temp} °F</p>
      <p>Humidity: ${forecastItem.main.humidity}%</p>
      <p>Wind Speed: ${forecastItem.wind.speed} MPH</p>
    `;
    card.innerHTML = cardContent;


    forecastCardsElement.appendChild(card);
  }
}


searchForm.addEventListener('submit', (mainPage) => {
  mainPage.preventDefault();
  var city = cityInput.value.trim();

    // API querty
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      renderCurrentWeather(city, data);
      return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`);
    })
    .then(response => response.json())
    .then(data => renderForecast(data))
    .catch(error => console.error(error));

  // Clear input
  cityInput.value = '';
});


searchHistoryElement.addEventListener('click', (sidebarCity) => {
    if (sidebarCity.target.tagName === 'LI') {
    var city = e.target.textContent;
    cityInput.value = city;
    searchForm.dispatchEvent(new Event('submit'));
    }
    });
    
    // Initialize
    renderSearchHistory();
