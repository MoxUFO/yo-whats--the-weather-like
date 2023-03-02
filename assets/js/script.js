let locationButton = document.getElementById("button-parent");
let upcomingweather = document.getElementById("card-parent");

function handleFormSubmit(event) {
  event.preventDefault();  
  let locationQuery = document.getElementById("location-input").value.trim()
  if(!locationQuery){
    return
  }
  getCoordinates(locationQuery)
}

function saveCity(city){
  let storedLocation = JSON.parse(localStorage.getItem("query"));
  if (!storedLocation) {
    storedLocation = [];
  }
  storedLocation.push(city);
  localStorage.setItem("query", JSON.stringify(storedLocation));
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
  }
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
      saveCity(usCity.name)
      searchForecast(usCity.lat, usCity.lon)
    });
}

function searchForecast(lat,lon) {
  console.log(lat, lon)
  let queryUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=c8cc486e034609223b1c1970df0b8ef2";
  //  lat={lat}&lon={lon}
  let apiKey = "&appid=c8cc486e034609223b1c1970df0b8ef2";
  fetch(queryUrl)
  .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    console.log(data)
    })
}


document.getElementById("submit-button").addEventListener("click", handleFormSubmit);
displayHistory();

