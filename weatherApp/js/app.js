//DOM elements
const locationId = document.getElementById("location");
const errorMessage = document.querySelector(".error-message");
const condition = document.getElementById("condition");
const img = document.getElementById("image1");
const name = document.getElementById("name");
const region = document.getElementById("region");
const degrees = document.getElementById("degrees");
const feelsLike = document.getElementById("feelsLike");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");

//variables

//Functions
async function getWeatherData(e) {
  if (e.key === "Enter" || e.keyCode === 13) {
    const locationValue = locationId.value;
    const baseURL = "https://api.weatherapi.com/v1/forecast.json?";
    const key = "key=e69e61cc7dc84263bd9210927230910";
    const location = "&q=" + locationValue;
    const days = "&days=4";
    const complete = baseURL + key + location + days;
    try {
      errorMessage.style.opacity = "0";
      const getWeatherData = await fetch(complete);
      const data = await getWeatherData.json();
      setData(data);
      console.log(data);
    } catch (error) {
      // Added the error parameter
      console.error("Error fetching data:", error);
      errorMessage.style.opacity = "1";
    }
  }
}

function setData(data) {
  img.src = data.current.condition.icon;
  condition.innerText = data.current.condition.text;
  name.innerText = data.location.name;
  region.innerText =
    data.location.name == data.location.region ? data.location.country : data.location.region;
  degrees.innerText = Math.round(data.current.temp_f);
  feelsLike.innerText = `FEELS LIKE: ${Math.round(data.current.feelslike_f)}`;
  wind.innerText = `WIND: ${data.current.wind_mph} MPH`;
  humidity.innerText = `HUMIDITY: ${data.current.humidity}%`;

  //tempValue.innerText = `Temperature: ${data.current.temp_f}°F`;
}

//Event Listeners
locationId.addEventListener("keydown", getWeatherData);
