// clock
const clock = document.getElementById('clock');
const date = document.getElementById('date');

function updateTime() {
    if (!clock || !date) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    clock.textContent = `${hours}:${minutes}`;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    date.textContent = now.toLocaleDateString(undefined, options);
}

setInterval(updateTime, 1000);
updateTime();

// weather
const weather = document.getElementById('weather');

async function fetchweather() {
    const ip = await fetch("https://ipwho.is/") // get location from ip
    const location = await ip.json();
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`); 
    const data = await res.json();
    weather.textContent = `${location.capital} | ${data.current_weather.temperature}°C`;

}
setInterval(fetchweather, 30 * 60 * 1000);
fetchweather();

