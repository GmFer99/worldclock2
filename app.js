document.addEventListener('DOMContentLoaded', function() {
    fetchTime('America/Sao_Paulo', 'time-brasilia');
    fetchTime('America/New_York', 'time-washington');
    fetchTime('Asia/Shanghai', 'time-beijing');
});

function fetchTime(zone, elementId) {
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
