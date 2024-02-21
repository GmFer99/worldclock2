document.addEventListener('DOMContentLoaded', function() {
    // Inicia a atualização dos horários
    updateTimes();
    // Define um intervalo para atualizar os horários a cada segundo (1000 milissegundos)
    setInterval(updateTimes, 1000);
});

function updateTimes() {
    // Atualiza cada horário
    fetchTime('America/Sao_Paulo', 'time-brasilia');
    fetchTime('America/New_York', 'time-washington');
    fetchTime('Asia/Shanghai', 'time-beijing');
}

function fetchTime(zone, elementId) {
    fetch(`https://worldtimeapi.org/api/timezone/${zone}`)
        .then(response => response.json())
        .then(data => {
            // Atualiza o elemento HTML com o horário formatado
            document.getElementById(elementId).textContent = formatTime(data.datetime);
        })
        .catch(error => {
            console.log('Error:', error);
            // Caso haja um erro, mostra uma mensagem padrão
            document.getElementById(elementId).textContent = 'Indisponível';
        });
}

function formatTime(datetime) {
    const date = new Date(datetime);
    // Retorna o horário no formato local
    return date.toLocaleTimeString();
}

