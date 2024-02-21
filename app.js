function setupClocks() {
    // Configura os eventos de clique para cada botão
    document.getElementById('btn-brasilia').addEventListener('click', () => startUpdatingTime('America/Sao_Paulo', 'time-brasilia'));
    document.getElementById('btn-washington').addEventListener('click', () => startUpdatingTime('America/New_York', 'time-washington'));
    document.getElementById('btn-beijing').addEventListener('click', () => startUpdatingTime('Asia/Shanghai', 'time-beijing'));
}

function startUpdatingTime(zone, elementId) {
    // Atualiza a hora imediatamente
    fetchTime(zone, elementId);
    // Inicia um intervalo para atualizar a hora a cada segundo
    setInterval(() => {
        fetchTime(zone, elementId);
    }, 1000);
}

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

// Quando o conteúdo da página estiver carregado, configura os relógios
document.addEventListener('DOMContentLoaded', setupClocks);


