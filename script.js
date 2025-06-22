async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  
  if (!city) {
    alert('Please enter a city name');
    return;
  }

  try {
    const apiKey = '90504a2744c6dccfc14595c35a7c3b43';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    
    if (!response.ok) {
      throw new Error('City not found');
    }
    
    const data = await response.json();
    
    // Get weather icon code from API
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    // Map weather conditions to Font Awesome icons
    const weatherIcons = {
      '01d': 'fas fa-sun',          // clear sky (day)
      '01n': 'fas fa-moon',         // clear sky (night)
      '02d': 'fas fa-cloud-sun',    // few clouds (day)
      '02n': 'fas fa-cloud-moon',   // few clouds (night)
      '03d': 'fas fa-cloud',        // scattered clouds
      '03n': 'fas fa-cloud',
      '04d': 'fas fa-cloud',        // broken clouds
      '04n': 'fas fa-cloud',
      '09d': 'fas fa-cloud-rain',   // shower rain
      '09n': 'fas fa-cloud-rain',
      '10d': 'fas fa-cloud-sun-rain', // rain (day)
      '10n': 'fas fa-cloud-moon-rain',// rain (night)
      '11d': 'fas fa-bolt',         // thunderstorm
      '11n': 'fas fa-bolt',
      '13d': 'fas fa-snowflake',    // snow
      '13n': 'fas fa-snowflake',
      '50d': 'fas fa-smog',         // mist
      '50n': 'fas fa-smog'
    };
    
    const weatherIconClass = weatherIcons[iconCode] || 'fas fa-cloud';
    
    document.getElementById('weatherOutput').innerHTML = `
      <div class="weather-info">
        <div class="weather-main">
          <div class="weather-icon">
            <i class="${weatherIconClass}"></i>
          </div>
          <div class="temperature">${Math.round(data.main.temp)}°C</div>
        </div>
        
        <h3 class="weather-description">${data.weather[0].description}</h3>
        <p class="location"><i class="fas fa-map-marker-alt"></i> ${data.name}, ${data.sys.country}</p>
        
        <div class="weather-details">
          <div class="detail-item">
            <i class="fas fa-temperature-high"></i>
            <span class="detail-label">Feels Like</span>
            <span class="detail-value">${Math.round(data.main.feels_like)}°C</span>
          </div>
          <div class="detail-item">
            <i class="fas fa-tint"></i>
            <span class="detail-label">Humidity</span>
            <span class="detail-value">${data.main.humidity}%</span>
          </div>
          <div class="detail-item">
            <i class="fas fa-wind"></i>
            <span class="detail-label">Wind Speed</span>
            <span class="detail-value">${data.wind.speed} m/s</span>
          </div>
          <div class="detail-item">
            <i class="fas fa-compress-alt"></i>
            <span class="detail-label">Pressure</span>
            <span class="detail-value">${data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    `;
    
  } catch (error) {
    document.getElementById('weatherOutput').innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <h3>Error</h3>
        <p>${error.message}. Please try another city.</p>
      </div>
    `;
  }
}
