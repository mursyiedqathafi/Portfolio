const apiKey = '2ca78de23a942c2bff07401eb7dafa45';
const weatherDiv = document.getElementById('weatherResult');
const loading = document.getElementById('loading');

document.getElementById('getWeather').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    showMessage('⚠️ Masukkan nama kota terlebih dahulu.');
    return;
  }
  getWeatherByCity(city);
});

// Ambil cuaca berdasarkan kota
function getWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=id`;
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
  weatherDiv.classList.remove('show');
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
        <h2>${escapeHtml(data.name)}, ${escapeHtml(data.sys.country)}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${escapeHtml(desc)}" />
        <p><strong>${escapeHtml(desc).toUpperCase()}</strong></p>
        <p>🌡️ Suhu: ${temp}°C</p>
        <p>💧 Kelembapan: ${humidity}%</p>
        <p>🌬️ Angin: ${wind} m/s</p>
      `;
      weatherDiv.classList.add('show');
    })
    .catch(error => {
      loading.classList.add('hidden');
      showMessage(`❌ ${error.message}`);
    });
}

function showMessage(msg) {
  weatherDiv.innerHTML = `<p>${msg}</p>`;
  weatherDiv.classList.add('show');
}

// Saat halaman pertama kali dibuka, coba deteksi lokasi pengguna
window.addEventListener('load', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        getWeatherByLocation(latitude, longitude);
      },
      err => {
        // Jika pengguna tolak atau error, biarkan input manual
        console.log('Geolocation error or denied:', err);
        showMessage('Tidak bisa mendeteksi lokasi. Silakan masukkan kota secara manual.');
      },
      { timeout: 8000 }
    );
  } else {
    showMessage('Browser tidak mendukung geolokasi.');
  }
});

// Minimal HTML escaping to avoid injection if city name contains weird chars
function escapeHtml(str) {
  return (''+str).replace(/[&<>"']/g, function(m) {
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];
  });
}
