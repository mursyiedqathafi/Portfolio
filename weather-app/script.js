const apiKey = "2ca78de23a942c2bff07401eb7dafa45"; // Ganti dengan API Key kamu
const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeather');
const weatherResult = document.getElementById('weatherResult');

getWeatherBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city === "") {
    alert("Masukkan nama kota dulu!");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) throw new Error("Kota tidak ditemukan!");
      return response.json();
    })
    .then(data => {
      const temp = data.main.temp;
      const condition = data.weather[0].description;
      weatherResult.innerHTML = `Cuaca di <strong>${city}</strong>: ${temp}°C, ${condition}`;
    })
    .catch(error => {
      weatherResult.innerHTML = `<span style="color:red;">${error.message}</span>`;
    });
});
