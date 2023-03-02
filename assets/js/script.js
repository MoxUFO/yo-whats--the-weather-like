let locationButton = document.getElementById('button-parent')
let upcomingweather = document.getElementById('card-parent')
let locationSearch = document.getElementById('location-input')
let saveLocationBtn = document.getElementById('submit-button')



function saveCity(event){
event.preventDefault()
  let storedCity = []
let locationQuery = locationSearch.value
storedCity.push(locationQuery)
console.log(locationQuery)
console.log(storedCity)
// storedCity.push(locationQuery)
// localStorage.setItem('query',storedCity)

}

for (let i = 0; i< localStorage.length; i++) {

  console.log(localStorage.city)
}
saveLocationBtn.addEventListener("click", saveCity)