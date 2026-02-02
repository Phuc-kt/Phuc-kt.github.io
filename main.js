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

