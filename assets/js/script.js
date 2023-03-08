let locationButton = document.getElementById("button-parent");
let upcomingweather = document.getElementById("card-parent");
let currentWeather = document.getElementById('current-day');
let displayDate = document.getElementById('display-date')
let test = document.getElementById('test')
let clearMemory = document.getElementById('clear-memory')

displayDate.textContent =dayjs().format("dddd, MMMM D YYYY");

function handleFormSubmit(event) {// this functions handles infortion user does or doesnt input
  event.preventDefault();  
  let locationQuery = document.getElementById("location-input").value.trim()
  if(!locationQuery){
    return
  }
  console
  
  getCoordinates(locationQuery)
  saveCity(locationQuery)
  document.getElementById("location-input").value = '';  
}

function saveCity(city){//this functions saved searched loction in the local storage with a valid inpit checker starting on line 34
  let locationQuery = document.getElementById("location-input").value.trim()
  let storedLocation = JSON.parse(localStorage.getItem("query"));
 
  if (!storedLocation) {
    storedLocation = [];
  }
  if (storedLocation.includes(locationQuery)){
    return
  }
//code lines 34-49 checks if the input is a valid selection and if it is it will proceed to save the information to local storage
//ending if the selection is invalid
  let geoFinderUrl =
  "https://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid=c8cc486e034609223b1c1970df0b8ef2";
  fetch(geoFinderUrl)
  .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.length == 0) {
        // alert("please enter a valid city name");
        // console.log(locationButton.children)
    
        return;
      } else{
        storedLocation.push(city);
        localStorage.setItem("query", JSON.stringify(storedLocation));
        locationButton.textContent = ""
        displayHistory()
      }
    })
 
}
let pastSearchBtn;
function displayHistory() {// this function take the locations saved in local storage and makes a button out of each entry.
  let storedLocation = JSON.parse(localStorage.getItem("query"));

  if(!storedLocation){    
    return
  }
  for (let i = 0; i < storedLocation.length; i++) {
    pastSearchBtn = document.createElement("button");
    pastSearchBtn.classList.add("btn",'btn-outline-info');
    pastSearchBtn.textContent = storedLocation[i];
    locationButton.append(pastSearchBtn);
    pastSearchBtn.addEventListener('click', presentLastSearch)
   
  }
}
//this function deletes all location searches from the local storage and clears the past search buutons
clearMemory.addEventListener('click', function(event){
  event.preventDefault()
  localStorage.clear('query')
  locationButton.innerHTML = ""
})

 
// this function takes the past location search button and reruns the funcions that searches and displays a locations weather
function presentLastSearch(event){
  let reuseCity = event.target.textContent
  getCoordinates(reuseCity)
}

//this function gets the user input and conects the query to a set of coordenates
function getCoordinates(city) {
  let geoFinderUrl =
  "https://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid=c8cc486e034609223b1c1970df0b8ef2";
  fetch(geoFinderUrl)
  .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.length == 0) {
        // alert("please enter a valid city name");
        // console.log(locationButton.children)
    
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

//this funtion displays infortion on the current days weather
function searchCurrentWeather(lat,lon) {
  // console.log(lat, lon)
  let queryUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=c8cc486e034609223b1c1970df0b8ef2";
  fetch(queryUrl)
  .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data.weather[0].icon) 
      let currentDate = dayjs().format("dddd, MMMM D YYYY")
      let bigDate = document.createElement('h5')
      bigDate.textContent = currentDate
      currentWeather.append(bigDate)
      let bigIcon = document.createElement('img')
      bigIcon.setAttribute('src',"https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png" )
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
      currentWeather.classList.add()



      upcomingweather.innerHTML = " ";
    })
}

//this funtion displays the 5 days forcast information
function searchForecast(lat,lon) {
  // console.log(lat, lon)
  let queryUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat +'&lon=' + lon + '&Appid=d788f32e8b9da745fbd42aba6ed8176a&units=imperial' 
  fetch(queryUrl)
  .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i < 8; i+=2) {
    
        console.log(data.daily)
      }
      let forecastArr = data.daily
      for (let i = 0; i < 5; i++) {
        let upComingDate = dayjs().day(i + 3).$d.toString().split(':')[0].split(' ').slice(1,3)
        let showYear = dayjs().day(i + 1).$y
        // console.log(showYear)
       let theCard = document.createElement('div')
       theCard.classList.add('card', 'col-2', 'bg-dark-subtle')
       let cardBody = document.createElement('div')
       cardBody.classList.add('card-body')
       
       let smallDate = document.createElement('h4')
       smallDate.textContent = upComingDate + ' ' + showYear
       let smallIcon = document.createElement('img')
       smallIcon.setAttribute('src',"https://openweathermap.org/img/wn/" + forecastArr[i].weather[0].icon + ".png" )
       
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
