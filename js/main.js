var searchInput = document.getElementById('search');

var todayDate = document.querySelector('.date');
var today = document.getElementsByClassName('day');

var cityLocation = document.querySelector('.location');
var todayDegree = document.querySelector('.today .degree .num');
var todayIcon = document.getElementById('todayIcon');
var todayCustom = document.querySelector('.today .card-content .custom');

var cloud = document.getElementsByClassName('cloud');
var wind = document.getElementsByClassName('wind');
var wind_deg = document.getElementsByClassName('wind_deg');


var icons = document.querySelectorAll('.forecast-icon img');
var degree = document.querySelectorAll('.degree');
var small = document.querySelectorAll('small');
var custom = document.querySelectorAll('.custom');


var forecastDay = [];

var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var dateNow = new Date();

if (searchInput.innerHTML == "") {
    search('cairo');
}

searchInput.oninput = function () {
    search(this.value);
}

async function search(city) {

    var apiResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=552920db211b4484a3a190755221110&q=${city}&days=3`);
    var apiResult = await apiResponse.json();

// ------------------------------------------------------------------------------

    cityGlobal = city;
    forecastDay = apiResult.forecast.forecastday;
    console.log(forecastDay);

// ----------------------------------------------------------------------------------

    today[0].innerHTML = days[dateNow.getDay()];
    today[1].innerHTML = days[dateNow.getDay()+1];
    today[2].innerHTML = days[dateNow.getDay()+2];

// -----------------------------------------------------------------------------------

    todayDate.innerHTML = `${dateNow.getDate()}${months[dateNow.getMonth()]}`;

// ----------------------------------------------------------------------------------

    cityLocation.innerHTML = apiResult.location.name;
    todayDegree.innerHTML = `${apiResult.current.temp_c}<sup>o</sup>C`;
    todayIcon.setAttribute('src',apiResult.current.condition.icon);
    todayCustom.innerHTML = apiResult.current.condition.text;

// -------------------------------------------------------------------------------------

    cloud[0].innerHTML = `<img src="images/icon-umberella.png" alt="">${apiResult.current.cloud}%`;
    wind[0].innerHTML = `<img src="images/icon-wind.png" alt="">${apiResult.current.wind_kph}km/h`;
    wind_deg[0].innerHTML = `<img src="images/icon-compass.png" alt="">${apiResult.current.wind_degree}`;

// -------------------------------------------------------------------------------------------

    icons[1].setAttribute('src', forecastDay[1].day.condition.icon);
    icons[2].setAttribute('src', forecastDay[2].day.condition.icon);

// ----------------------------------------------------------------------------------------

    degree[1].innerHTML = `${forecastDay[1].day.maxtemp_c}<sup>o</sup>C`;
    degree[2].innerHTML = `${forecastDay[2].day.maxtemp_c}<sup>o</sup>C`;

// --------------------------------------------------------------------------------

    small[1].innerHTML = `${forecastDay[1].day.mintemp_c}<sup>o</sup>C`;
    small[2].innerHTML = `${forecastDay[2].day.mintemp_c}<sup>o</sup>C`;

// --------------------------------------------------------------------------------------

    custom[1].innerHTML = forecastDay[1].day.condition.text;
    custom[2].innerHTML = forecastDay[2].day.condition.text;

}


