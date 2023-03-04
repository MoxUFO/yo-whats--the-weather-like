let locationButton = document.getElementById("button-parent");
let upcomingweather = document.getElementById("card-parent");
let currentWeather = document.getElementById('current-day')

function handleFormSubmit(event) {
  event.preventDefault();  
  let locationQuery = document.getElementById("location-input").value.trim()
  if(!locationQuery){
    return
  }
  console
  
  getCoordinates(locationQuery)
  saveCity(locationQuery)
}

function saveCity(city){
 
  let storedLocation = JSON.parse(localStorage.getItem("query"));
  if (!storedLocation) {
    storedLocation = [];
  }
  storedLocation.push(city);
  localStorage.setItem("query", JSON.stringify(storedLocation));
  locationButton.textContent = ""
  displayHistory()
}

function displayHistory() {
  let storedLocation = JSON.parse(localStorage.getItem("query"));
  if(!storedLocation){
    return
  }
  for (let i = 0; i < storedLocation.length; i++) {
    let pastSearchBtn = document.createElement("button");
    pastSearchBtn.classList.add("btn", "btn-primary");
    pastSearchBtn.textContent = storedLocation[i];
    locationButton.append(pastSearchBtn);
    pastSearchBtn.addEventListener('click', presentLastSearch)
  }
}

function presentLastSearch(event){
  let reuseCity = event.target.textContent
  getCoordinates(reuseCity)
}

function getCoordinates(city) {
  let geoFinderUrl =
  "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid=c8cc486e034609223b1c1970df0b8ef2";
  fetch(geoFinderUrl)
  .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.length == 0) {
        alert("please enter a valid city name");
        return;
      }
      var usCity = data.find(function(element){
        return element.country == "US"
      })
      if(usCity == undefined){
        usCity = data[0]
      }
     
      searchCurrentWeather(usCity.lat, usCity.lon)
      currentWeather.innerHTML = " ";
      searchForecast(usCity.lat, usCity.lon)
    });
}

function searchCurrentWeather(lat,lon) {
  console.log(lat, lon)
  let queryUrl = "http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=c8cc486e034609223b1c1970df0b8ef2";
  fetch(queryUrl)
  .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.weather[0].icon) 
      let bigDate = document.createElement('h5')
      let bigIcon = document.createElement('i')
      bigIcon.textContent = data.weather[0].icon
      currentWeather.append(bigIcon)
      let bigTemp = document.createElement('h6')
      bigTemp.textContent = "Today's Temp: " + data.main.temp
      currentWeather.append(bigTemp)
      let bigWind = document.createElement('h6')
      bigWind.textContent = "today's Wind Speed: " + data.wind.speed
      currentWeather.append(bigWind)
      let bigHumid = document.createElement('h6')
      bigHumid.textContent = "today's Humidity: " + data.main.humidity + " %"
      currentWeather.append(bigHumid)


      upcomingweather.innerHTML = " ";
    })
}

function searchForecast(lat,lon) {
  console.log(lat, lon)
  let queryUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat +'&lon=' + lon + '&Appid=d788f32e8b9da745fbd42aba6ed8176a&units=imperial' 
  fetch(queryUrl)
  .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data.daily)
      let forecastArr = data.daily
      for (let i = 0; i < 5; i++) {
        console.log(forecastArr[i] )
       let theCard = document.createElement('div')
       theCard.classList.add('card', 'col-2')
       let cardBody = document.createElement('div')
       cardBody.classList.add('card-body')
       let smallDate = document.createElement('h5')
       smallDate.textContent = 'Date: '
       let smallIcon = document.createElement('div')
       smallIcon.textContent = forecastArr[i].weather[0].icon
       let smallTemp = document.createElement('div')
       smallTemp.textContent = 'Temp: ' + forecastArr[i].temp.day
       let smallWind = document.createElement('div')
       smallWind.textContent = 'wind speed: ' + forecastArr[i].wind_speed
       let smallHumid = document.createElement('div')
       smallHumid.textContent = 'humidity: ' + forecastArr[i].humidity + ' %'
       cardBody.append(smallDate)
       cardBody.append(smallIcon)
       cardBody.append(smallTemp)
       cardBody.append(smallWind)
       cardBody.append(smallHumid)
       theCard.append(cardBody)
       upcomingweather.append(theCard)
     }
    })
}


document.getElementById("submit-button").addEventListener("click", handleFormSubmit);
displayHistory();

