async function loadEvents() {
    const response = await fetch('data.json');
    const dataSets = await response.json();
    const list = document.getElementById('event-list');

    let globalIndex = 0;

    dataSets.forEach((set) => {
        Object.entries(set).forEach(([name, dateStr]) => {
            const eventDate = new Date(dateStr);
            const now = new Date();

            // Lewati jika tanggal sudah lewat
            if (eventDate <= now) return;

            const li = document.createElement('li');
            li.className = 'event-item';

            const title = document.createElement('div');
            title.className = 'event-title';
            title.textContent = `${name}`;

            const readableDate = document.createElement('div');
            readableDate.className = 'event-date';
            readableDate.textContent = formatDate(eventDate);

            const countdown = document.createElement('div');
            countdown.className = 'countdown';
            const countdownId = `countdown-${globalIndex++}`;
            countdown.id = countdownId;

            li.appendChild(title);
            li.appendChild(readableDate);
            li.appendChild(countdown);
            list.appendChild(li);

            updateCountdown(eventDate, countdownId);
            setInterval(() => updateCountdown(eventDate, countdownId), 1000);
        });
    });
}

function updateCountdown(targetDate, elementId) {
    const now = new Date();
    const diff = targetDate - now;
    const countdownElem = document.getElementById(elementId);

    if (!countdownElem) return;

    if (diff <= 0) {
        countdownElem.textContent = 'Waktu telah tiba!';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownElem.textContent = `${days}h ${hours}j ${minutes}m ${seconds}d`;
}

function formatDate(date) {
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Jakarta',
        hour12: false
    };
    return new Intl.DateTimeFormat('en-US', options).format(date).replace('.', '') + ' UTC+7';
}

loadEvents();
