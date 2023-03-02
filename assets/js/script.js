let locationButton = document.getElementById('button-parent')
let upcomingweather = document.getElementById('card-parent')
let locationSearch = document.getElementById('location-input')
let saveLocationBtn = document.getElementById('submit-button ')






saveLocationBtn.addEventListener('click', function(){
    let locationQuery = locationSearch.value
    console.log(locationQuery)
})
