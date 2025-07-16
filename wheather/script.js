async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const errorDiv = document.getElementById("error");
  const resultDiv = document.getElementById("weatherResult");

  errorDiv.style.display = "none";
  resultDiv.style.display = "none";

  if (!city) {
    errorDiv.textContent = "Please enter a city name.";
    errorDiv.style.display = "block";
    return;
  }

  const API_KEY = 'd40ddcf621b4ee20a26e851c8964a604';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found or invalid response");
    }

    const data = await response.json();

    resultDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>Temperature:</strong> ${Math.round(data.main.temp)}°C</p>
      <p><strong>Feels Like:</strong> ${Math.round(data.main.feels_like)}°C</p>
      <p><strong>Weather:</strong> ${data.weather[0].description}</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;

    resultDiv.style.display = "block";
  } catch (err) {
    errorDiv.textContent = "Could not fetch weather. Check city name.";
    errorDiv.style.display = "block";
  }
}
