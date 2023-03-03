var apiKey = '444d7ee70cf3d4f1caaf5b7385d3c7b8';
var searchForm = document.querySelector('#search-form');
var cityInput = document.querySelector('#city-input');
var searchHistoryElement = document.querySelector('#search-history');
var cityNameElement = document.querySelector('#city-name');
var temperatureElement = document.querySelector('#temperature');



var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []

function renderSearchHistory() {
    searchHistoryElement.innerHTML = '';
    searchHistory.forEach((city) => {
      var li = document.createElement('li');
      li.textContent = city;
      searchHistoryElement.appendChild(li);
    });
  }

searchForm.addEventListener('submit', (mainPage) => {
    mainPage.preventDefault();
    var city = cityInput.value.trim();

    searchHistory.push(city);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    renderSearchHistory();
});

function renderCurrentWeather(city, weather) {
    // remove miami
    cityNameElement.textContent = `${city}`;
    temperatureElement.textContent = `Temp: ${weather.main.temp} °F`;

  }

searchForm.addEventListener('submit', (searchAPI) => {
    searchAPI.preventDefault();
    var city = cityInput.value.trim();
    console.log(city)

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
.then(response => response.json())
.then(data => {
  renderCurrentWeather(city, data);
    console.log(data)
})


cityInput.value = '';
});






// Init
renderSearchHistory();