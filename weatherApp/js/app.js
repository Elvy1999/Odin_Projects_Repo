//DOM elements
const locationId = document.getElementById("location");
const img = document.getElementById("image1");
const tempValue = document.getElementById("temperature");

//Functions
async function getWeatherData(e) {
  if (e.key === "Enter" || e.keyCode === 13) {
    const locationValue = locationId.value;
    const baseURL = "http://api.weatherapi.com/v1/forecast.json?";
    const key = "key=e69e61cc7dc84263bd9210927230910";
    const location = "&q=" + locationValue;
    const days = "&days=4";
    const complete = baseURL + key + location + days;
    try {
      locationId.style.borderColor = "black";
      const getWeatherData = await fetch(complete);
      const data = await getWeatherData.json();
      console.log(data);
      console.log(data.current.condition.icon);
      img.src = data.current.condition.icon;
      tempValue.textContent = `Temperature: ${data.current.temp_f}°F`;
    } catch (error) {
      // Added the error parameter
      console.error("Error fetching data:", error);
      locationId.style.borderColor = "red";
      alert("Not a valid location");
    }
  }
}

//Event Listeners
locationId.addEventListener("keydown", getWeatherData);
