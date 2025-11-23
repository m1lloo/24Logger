
const sessions = JSON.parse(localStorage.getItem('sessions')) || [];


const totalHours = sessions.reduce((sum, s) => sum + parseFloat(s.hours), 0);
document.getElementById('totalHours').textContent = `Total Hours Logged: ${totalHours.toFixed(2)} hrs`;


const airportMap = {};
sessions.forEach(s => {
    airportMap[s.airport] = (airportMap[s.airport] || 0) + parseFloat(s.hours);
});

const airportLabels = Object.keys(airportMap);
const airportData = Object.values(airportMap);

const airportChart = new Chart(document.getElementById('airportChart'), {
    type: 'bar',
    data: {
        labels: airportLabels,
        datasets: [{
            label: 'Hours',
            data: airportData,
            backgroundColor: '#0d6efd'
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            y: { beginAtZero: true }
        }
    }
});

const freqMap = {};
sessions.forEach(s => {
    freqMap[s.position] = (freqMap[s.position] || 0) + parseFloat(s.hours);
});

const freqLabels = Object.keys(freqMap);
const freqData = Object.values(freqMap);

const frequencyChart = new Chart(document.getElementById('frequencyChart'), {
    type: 'bar',
    data: {
        labels: freqLabels,
        datasets: [{
            label: 'Hours',
            data: freqData,
            backgroundColor: '#0d6efd'
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            y: { beginAtZero: true }
        }
    }
});
