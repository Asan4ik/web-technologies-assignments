/* =========================================================
   KAZTOUR TRIP GUIDE: LIVE WEATHER FROM OPEN-METEO
   ========================================================= */
(() => {
    const citySelect = document.getElementById('weatherCity');
    const loading = document.getElementById('weatherLoading');
    const errorBox = document.getElementById('weatherError');
    const errorText = document.getElementById('weatherErrorText');
    const content = document.getElementById('weatherContent');
    const retryButton = document.getElementById('weatherRetry');

    if (!citySelect || !loading || !errorBox || !errorText || !content || !retryButton) return;

    // Coordinates are used to request a forecast for each selectable destination.
    const cities = {
        astana: { name: 'Astana', latitude: 51.1694, longitude: 71.4491 },
        almaty: { name: 'Almaty', latitude: 43.2389, longitude: 76.8897 },
        turkistan: { name: 'Turkistan', latitude: 43.2973, longitude: 68.2518 },
        aktau: { name: 'Aktau', latitude: 43.6532, longitude: 51.1975 },
        shymkent: { name: 'Shymkent', latitude: 42.3417, longitude: 69.5901 }
    };
    const REQUEST_TIMEOUT_MS = 10000;

    const weatherCodes = {
        0: ['Clear sky', '☀'],
        1: ['Mainly clear', '🌤'],
        2: ['Partly cloudy', '⛅'],
        3: ['Overcast', '☁'],
        45: ['Fog', '🌫'],
        48: ['Depositing rime fog', '🌫'],
        51: ['Light drizzle', '🌦'],
        53: ['Drizzle', '🌦'],
        55: ['Dense drizzle', '🌧'],
        56: ['Freezing drizzle', '🌧'],
        57: ['Dense freezing drizzle', '🌧'],
        61: ['Light rain', '🌦'],
        63: ['Rain', '🌧'],
        65: ['Heavy rain', '🌧'],
        66: ['Freezing rain', '🌧'],
        67: ['Heavy freezing rain', '🌧'],
        71: ['Light snow', '🌨'],
        73: ['Snow', '🌨'],
        75: ['Heavy snow', '❄'],
        77: ['Snow grains', '❄'],
        80: ['Rain showers', '🌦'],
        81: ['Rain showers', '🌧'],
        82: ['Heavy rain showers', '🌧'],
        85: ['Snow showers', '🌨'],
        86: ['Heavy snow showers', '❄'],
        95: ['Thunderstorm', '⛈'],
        96: ['Thunderstorm with hail', '⛈'],
        99: ['Thunderstorm with heavy hail', '⛈']
    };

    function setText(id, value) {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    }

    function showLoading() {
        loading.classList.remove('d-none');
        errorBox.classList.add('d-none');
        content.classList.add('d-none');
        retryButton.disabled = true;
    }

    function showError(message) {
        loading.classList.add('d-none');
        content.classList.add('d-none');
        errorText.textContent = message;
        errorBox.classList.remove('d-none');
        retryButton.disabled = false;
    }

    function formatDay(dateString) {
        const date = new Date(`${dateString}T12:00:00`);
        return new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date);
    }

    function renderForecast(data, city) {
        const current = data.current;
        const daily = data.daily;
        const [description, icon] = weatherCodes[current.weather_code] || ['Weather conditions', '🌡'];

        setText('weatherTemperature', `${Math.round(current.temperature_2m)}°C`);
        setText('weatherDescription', description);
        setText('weatherFeelsLike', `Feels like ${Math.round(current.apparent_temperature)}°C`);
        setText('weatherWind', `${Math.round(current.wind_speed_10m)} km/h`);
        setText('weatherRain', `${daily.precipitation_probability_max[0] ?? 0}% chance`);
        setText('weatherRange', `${Math.round(daily.temperature_2m_min[0])}° / ${Math.round(daily.temperature_2m_max[0])}°C`);
        setText('weatherIcon', icon);
        setText('travel-weather-title', `Weather in ${city.name}`);

        const forecast = document.getElementById('weatherForecast');
        forecast.replaceChildren();
        daily.time.slice(0, 3).forEach((date, index) => {
            const [dayDescription, dayIcon] = weatherCodes[daily.weather_code[index]] || ['Weather', '🌡'];
            const col = document.createElement('div');
            col.className = 'col-4';
            const card = document.createElement('div');
            card.className = 'weather-day h-100';
            const day = document.createElement('div');
            day.className = 'small text-secondary';
            day.textContent = formatDay(date);
            const symbol = document.createElement('div');
            symbol.className = 'fs-4 my-1';
            symbol.textContent = dayIcon;
            symbol.setAttribute('aria-label', dayDescription);
            const temperature = document.createElement('strong');
            temperature.className = 'small';
            temperature.textContent = `${Math.round(daily.temperature_2m_min[index])}° / ${Math.round(daily.temperature_2m_max[index])}°`;
            card.append(day, symbol, temperature);
            col.append(card);
            forecast.append(col);
        });
    }

    async function loadWeather() {
        const city = cities[citySelect.value];
        if (!city) return;
        showLoading();

        const params = new URLSearchParams({
            latitude: city.latitude,
            longitude: city.longitude,
            current: 'temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m',
            daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
            forecast_days: '3',
            timezone: 'auto'
        });
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, {
                signal: controller.signal
            });
            if (!response.ok) throw new Error(`Weather service returned ${response.status}`);
            const data = await response.json();
            if (!data.current || !data.daily || !Array.isArray(data.daily.time)) {
                throw new Error('Weather data is incomplete');
            }
            renderForecast(data, city);
            loading.classList.add('d-none');
            errorBox.classList.add('d-none');
            content.classList.remove('d-none');
        } catch (error) {
            console.error('Open-Meteo request failed:', error);
            if (error.name === 'AbortError') {
                showError('The request took too long. Check your connection and try again.');
            } else {
                showError('Weather data is temporarily unavailable. Please try again.');
            }
        } finally {
            window.clearTimeout(timeoutId);
        }
    }

    citySelect.addEventListener('change', loadWeather);
    retryButton.addEventListener('click', loadWeather);
    loadWeather();
})();
