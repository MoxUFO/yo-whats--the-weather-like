let locationButton = document.getElementById('button-parent')
let upcomingweather = document.getElementById('card-parent')
let locationSearch = document.getElementById('location-input')
let saveLocationBtn = document.getElementById('submit-button')
let storedLocation = [] 


function saveCity(event){
event.preventDefault()

let locationQuery = locationSearch.value
storedLocation.push(locationQuery)
console.log(storedLocation)
localStorage.setItem('query', storedLocation)

}
// console.log(storedCity)
// for (let i = 0; i< localStorage.length; i++) {

//   console.log(localStorage.city)
// }
saveLocationBtn.addEventListener("click", saveCity)