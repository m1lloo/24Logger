const airports = {
    "Rockford": {
        "IRCC": "124.850",
        "IRFD_TWR": "118.100",
        "IRFD_GND": "120.400",
        "IMLR_TWR": "133.850",
        "IGAR_TWR": "125.600",
        "IBLT_TWR": "120.250",
        "ITRC_TWR": "119.150"
    },
    "Cyprus": {
        "ICCC": "126.300",
        "ILAR_TWR": "121.200",
        "ILAR_GND": "119.400",
        "IPAP_TWR": "119.900",
        "IIAB_TWR": "127.250",
        "IHEN_TWR": "130.250",
        "IBAR_TWR": "118.750"
    },
    "Izolirani": {
        "IZCC": "125.650",
        "IZOL_TWR": "118.700",
        "IZOL_GND": "121.900",
        "IJAF_TWR": "119.100",
        "ISCM_TWR": "121.300"
    },
    "Orenji": {
        "IOCC": "132.300",
        "ITKO_TWR": "118.800",
        "ITKO_GND": "118.225",
        "IDCS_TWR": "118.250"
    },
    "Perth": {
        "IPCC": "135.250",
        "IPPH_TWR": "127.400",
        "IPPH_GND": "121.700",
        "ILKL_TWR": "120.150"
    },
    "Saint Barthelemy": {
        "IBCC": "128.600",
        "IBTH_TWR": "118.700",
        "ISKP_TWR": "123.250"
    },
    "Grindavik": {
        "IGCC": "126.750",
        "IGRV_TWR": "118.300"
    },
    "Sauthemptona": {
        "ISCC": "127.825",
        "ISAU_TWR": "118.200"
    }
};


const airportSelect = document.getElementById('airport');
const positionSelect = document.getElementById('position');
const sessionList = document.getElementById('sessionList');
const sessionForm = document.getElementById('sessionForm');


for (let airport in airports) {
    const option = document.createElement('option');
    option.value = airport;
    option.textContent = airport;
    airportSelect.appendChild(option);
}


airportSelect.addEventListener('change', function() {
    const airport = airportSelect.value;
    positionSelect.innerHTML = '<option value="">Select Frequency</option>';

    if (airport && airports[airport]) {
        for (let freq in airports[airport]) {
            const opt = document.createElement('option');
            opt.value = freq;
            opt.textContent = `${freq} - ${airports[airport][freq]}`;
            positionSelect.appendChild(opt);
        }
    }
});


function loadSessions() {
    const sessions = JSON.parse(localStorage.getItem('sessions')) || [];
    sessionList.innerHTML = '';

    sessions.forEach((s, i) => {
        const li = document.createElement('div');
        li.className = 'list-group-item';
        li.innerHTML = `
            <div>
                <strong>${s.date}</strong> - ${s.airport} (${s.position}) - ${s.hours} hrs
                ${s.startTime && s.endTime ? `<small> [${s.startTime} - ${s.endTime}]</small>` : ''}
                ${s.notes ? `<br><em>${s.notes}</em>` : ''}
            </div>
            <button class="btn btn-sm btn-danger mt-2" onclick="deleteSession(${i})">Delete</button>
        `;
        sessionList.appendChild(li);
    });
}


sessionForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const airport = document.getElementById('airport').value;
    const position = document.getElementById('position').value;
    const hoursInput = document.getElementById('hours').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const notes = document.getElementById('notes').value;

    if (!date || !airport || !position || !hoursInput) return;

    let hours = parseFloat(hoursInput);

    if (startTime && endTime) {
        const start = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);
        let diff = (end - start) / (1000 * 60 * 60);
        if (diff < 0) diff += 24;
        hours = parseFloat(diff.toFixed(2));
    }

    const sessions = JSON.parse(localStorage.getItem('sessions')) || [];
    sessions.push({date, airport, position, hours, startTime, endTime, notes});
    localStorage.setItem('sessions', JSON.stringify(sessions));

    sessionForm.reset();
    positionSelect.innerHTML = '<option value="">Select Frequency</option>';
    loadSessions();
});

function deleteSession(i) {
    const sessions = JSON.parse(localStorage.getItem('sessions')) || [];
    sessions.splice(i, 1);
    localStorage.setItem('sessions', JSON.stringify(sessions));
    loadSessions();
}

loadSessions();
