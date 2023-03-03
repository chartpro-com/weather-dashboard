var apiKey = '444d7ee70cf3d4f1caaf5b7385d3c7b8';
var searchForm = document.querySelector('#search-form');
var cityInput = document.querySelector('#city-input');
var searchHistoryElement = document.querySelector('#search-history');

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



// Init
renderSearchHistory();