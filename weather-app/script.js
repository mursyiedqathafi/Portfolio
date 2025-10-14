const apiKey = '2ca78de23a942c2bff07401eb7dafa45'; 
const weatherDiv = document.getElementById('weatherResult');
const loading = document.getElementById('loading');

document.getElementById('getWeather').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    weatherDiv.innerHTML = '⚠️ Masukkan nama kota terlebih dahulu.';
    return;
  }
  getWeatherByCity(city);
});

// Ambil cuaca berdasarkan kota
function getWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`;
  fetchWeather(url);
}

// Ambil cuaca berdasarkan koordinat
function getWeatherByLocation(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=id`;
  fetchWeather(url);
}

// Fetch data cuaca + animasi
function fetchWeather(url) {
  loading.classList.remove('hidden');
  weatherDiv.innerHTML = '';

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Kota tidak ditemukan.');
      return response.json();
    })
    .then(data => {
      loading.classList.add('hidden');
      const icon = data.weather[0].icon;
      const desc = data.weather[0].description;
      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const wind = data.wind.speed;

      weatherDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
        <p><strong>${desc.toUpperCase()}</strong></p>
        <p>🌡️ Suhu: ${temp}°C</p>
        <p>💧 Kelembapan: ${humidity}%</p>
        <p>🌬️ Angin: ${wind} m/s</p>
      `;
    })
    .catch(error => {
      loading.classList.add('hidden');
      weatherDiv.innerHTML = `❌ ${error.message}`;
    });
}

// Saat halaman pertama kali dibuka, coba deteksi lokasi pengguna
window.addEventListener('load', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        getWeatherByLocation(latitude, longitude);
      },
      () => {
        weatherDiv.innerHTML = 'Tidak bisa mendeteksi lokasi. Silakan masukkan kota secara manual.';
      }
    );
  } else {
    weatherDiv.innerHTML = 'Browser tidak mendukung geolokasi.';
  }
});
