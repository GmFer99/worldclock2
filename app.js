let intervals = {}; // Armazena os intervalos de atualização para cada relógio

document.addEventListener('DOMContentLoaded', function() {
    setupButton('btn-brasilia', 'America/Sao_Paulo', 'time-brasilia');
    setupButton('btn-washington', 'America/New_York', 'time-washington');
    setupButton('btn-beijing', 'Asia/Shanghai', 'time-beijing');
});

function setupButton(buttonId, zone, elementId) {
    document.getElementById(buttonId).addEventListener('click', () => {
        toggleTime(zone, elementId);
    });
}

function toggleTime(zone, elementId) {
    const element = document.getElementById(elementId);
    if (intervals[elementId]) {
        // Se já existe um intervalo, limpe-o e remova o texto.
        clearInterval(intervals[elementId]);
        delete intervals[elementId];
        element.textContent = '';
    } else {
        // Busca e exibe a hora imediatamente, depois começa a atualizar a cada segundo.
        fetchAndUpdateTime(zone, elementId);
        intervals[elementId] = setInterval(() => {
            fetchAndUpdateTime(zone, elementId);
        }, 1000);
    }
}

function fetchAndUpdateTime(zone, elementId) {
    fetch(`https://worldtimeapi.org/api/timezone/${zone}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById(elementId).textContent = formatTime(data.datetime);
        })
        .catch(error => {
            console.log('Error:', error);
            document.getElementById(elementId).textContent = 'Indisponível';
        });
}

function formatTime(datetime) {
    const date = new Date(datetime);
    return date.toLocaleTimeString();
}




