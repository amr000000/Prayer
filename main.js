async function getPrayerTimes() {
    const city = document.getElementById('city').value.trim();
    const country = document.getElementById('country').value.trim();
    const method = 2;  // Default method: Islamic Society of North America (ISNA)

    if (!city || !country) {
        alert('Please enter both a city and a country');
        return;
    }

    const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}`;
    console.log('Request URL:', url);  // Debugging line

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log('API Response:', data);  // Debugging line

        if (response.ok && data.data && data.data.timings) {
            displayPrayerTimes(data.data.timings, `${city}, ${country}`);
        } else {
            const errorMessage = data.data ? data.data.error : 'Error fetching prayer times';
            alert(errorMessage);
            console.error('API Error:', errorMessage);  // Debugging line
        }
    } catch (error) {
        console.error('Network Error:', error);
        alert('Network error. Please try again.');
    }
}

function displayPrayerTimes(timings, city) {
    const tableBody = document.getElementById('prayer-times-table').querySelector('tbody');
    tableBody.innerHTML = '';

    document.querySelector('.city').textContent = `Prayer times for ${city}`;

    for (const [prayer, time] of Object.entries(timings)) {
        const row = document.createElement('tr');
        const prayerCell = document.createElement('td');
        const timeCell = document.createElement('td');

        prayerCell.textContent = prayer;
        timeCell.textContent = time;

        row.appendChild(prayerCell);
        row.appendChild(timeCell);
        tableBody.appendChild(row);
    }
}
