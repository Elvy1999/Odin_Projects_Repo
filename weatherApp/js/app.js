const locationId = document.getElementById("location");
const img = document.getElementById("image1");

async function getWeatherData(e) {
  if (e.key === "Enter" || e.keyCode === 13) {
    const locationValue = locationId.value;
    const baseURL = "http://api.weatherapi.com/v1/current.json?";
    const key = "key=e69e61cc7dc84263bd9210927230910";
    const location = "&q=" + locationValue;
    const complete = baseURL + key + location; // Added const keyword

    try {
      const getWeatherData = await fetch(complete);
      const data = await getWeatherData.json();
      console.log(data);
      console.log(data.current.condition.icon);
      img.src = data.current.condition.icon;
    } catch (error) {
      // Added the error parameter
      console.error("Error fetching data:", error);
      alert("Not a valid location");
      // You can add code here to handle the error, such as displaying a message to the user
    }
  }
}
locationId.addEventListener("keydown", getWeatherData);
