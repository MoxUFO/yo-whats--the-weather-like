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



document.getElementById("submit-button").addEventListener("click", handleFormSubmit);
displayHistory();

