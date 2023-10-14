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
const day1 = document.getElementById("day1");
const forecast = document.querySelector(".forecast");
const weatherContent = document.getElementsByClassName("weatherContent");

//variables

//Functions
function executor(e) {
  if (e.key === "Enter" || e.keyCode === 13) {
    getWeatherData();
  }
}

function playMusic(locationValue) {
  const location = locationValue.toLowerCase();
  const germanAudio = document.getElementById("germanAudio");
  const spanishAudio = document.getElementById("spanishAudio");
  const princessAudio = document.getElementById("princessAudio");
  const peasentAudio = document.getElementById("peasentAudio");
  const allAudio = [germanAudio, spanishAudio, princessAudio, peasentAudio];
  princessAudio.volume = 1; // Adjust volume to 80%
  peasentAudio.volume = 1; // Adjust volume to 80%
  germanAudio.volume = 0.1;
  spanishAudio.volume = 0.7;

  allAudio.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });

  if (location === "germany") {
    germanAudio.currentTime = 9;
    germanAudio.play();
    peasentAudio.play();
  }
  if (location === "spain") {
    princessAudio.play();
    spanishAudio.play();
  }
}

async function getWeatherData() {
  const locationValue = locationId.value == "" ? "china" : locationId.value;
  const baseURL = "https://api.weatherapi.com/v1/forecast.json?";
  const key = "key=e69e61cc7dc84263bd9210927230910";
  const location = "&q=" + locationValue;
  const days = "&days=4";
  const complete = baseURL + key + location + days;
  try {
    errorMessage.style.opacity = "0";
    const getWeatherData = await fetch(complete);
    const data = await getWeatherData.json();
    playMusic(locationValue);
    transition();
    setCurrentData(data);
    createDayCards(data);
  } catch (error) {
    // Added the error parameter
    console.error("Error fetching data:", error);
    errorMessage.style.opacity = "1";
  }
}
// Creates a transition for the WeatherContent everytime the page is loaded or
//a different location is entered
function transition() {
  Array.from(weatherContent).forEach((section) => {
    if (section.classList.contains("fade-in2")) {
      section.classList.remove("fade-in2");
      section.offsetWidth;
      section.classList.add("fade-in2");
    } else {
      section.classList.add("fade-in2");
    }
  });
}
//Uses the data from the API to set the html data for the current weather
function setCurrentData(data) {
  img.src = data.current.condition.icon;
  condition.innerText = data.current.condition.text;
  name.innerText = data.location.name;
  region.innerText =
    data.location.name == data.location.region ? data.location.country : data.location.region;
  degrees.innerText = Math.round(data.current.temp_f);
  feelsLike.innerText = `FEELS LIKE: ${Math.round(data.current.feelslike_f)}`;
  wind.innerText = `WIND: ${data.current.wind_mph} MPH`;
  humidity.innerText = `HUMIDITY: ${data.current.humidity}%`;
  const dateObject = new Date(data.current.last_updated);
  const dayOfWeek = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(dateObject);
  day1.innerText = dayOfWeek;
}
//Creates cards using the API data for each forecast day to display in html
function createDayCards(data) {
  forecast.textContent = "";
  const days = data.forecast.forecastday.slice(1);
  for (const day in days) {
    //Getting needed values from json data
    const dateData = days[day];
    const dateObject = new Date(dateData.date + "T23:59:59");
    const dayOfWeek = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(dateObject);
    const weatherType = dateData.day.condition.text;
    const weatherIcon = dateData.day.condition.icon;
    const minTemp = dateData.day.mintemp_f;
    const maxTemp = dateData.day.maxtemp_f;
    //Creating Dom element
    const dayElem = document.createElement("section");
    dayElem.classList.add("day");
    const dayOfWeekElem = document.createElement("section");
    dayOfWeekElem.classList.add("dayOfWeek");
    dayOfWeekElem.textContent = dayOfWeek;
    dayElem.appendChild(dayOfWeekElem);
    const weatherConditionElem = document.createElement("section");
    weatherConditionElem.classList.add("weatherCondition");
    const conditionElem = document.createElement("section");
    conditionElem.classList.add("condition");
    conditionElem.textContent = weatherType;
    weatherConditionElem.appendChild(conditionElem);
    const iconElem = document.createElement("img");
    iconElem.classList.add("icon");
    iconElem.src = weatherIcon;
    weatherConditionElem.appendChild(iconElem);
    dayElem.appendChild(weatherConditionElem);
    const dayTempElem = document.createElement("section");
    dayTempElem.classList.add("dayTemp");
    dayTempElem.textContent = `Low ${minTemp} - ${maxTemp}°F High`;
    dayElem.appendChild(dayTempElem);
    forecast.appendChild(dayElem);
  }
}

//Event Listeners

getWeatherData();
locationId.addEventListener("keydown", executor);
