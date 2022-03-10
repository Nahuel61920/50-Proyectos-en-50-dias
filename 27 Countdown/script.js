let days = document.getElementById('days')
let hours = document.getElementById('hours')
let minutes = document.getElementById('minutes')
let seconds = document.getElementById('seconds')
let finalMessage = document.querySelector('.final-sms')

//Fecha a futuro
let countdownDate = new Date('1 1, 2023 00:00:00').getTime();

//Intervalo de fechas
let interval = setInterval( DateFecha, 1000);

function DateFecha() {
    //Obtener fecha actual y milisegundos
    const now = new Date().getTime();
    
    //Obtener las distancias entre ambas fechas
    let distance = countdownDate - now;
    
    //Calculos a dias-horas-minutos-segundos
    let daysDate = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hoursDate = Math.floor((distance % (1000 * 60 * 60 * 24 )) / (1000 * 60 * 60));
    let minutesDate = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let secondsDate = Math.floor((distance % (1000 * 60 )) / (1000));
    
    //Escribimos resultados
    days.innerHTML = daysDate;
    hours.innerHTML = ('0' + hoursDate).slice(-2);
    minutes.innerHTML = ('0' + minutesDate).slice(-2);
    seconds.innerHTML = ('0' + secondsDate).slice(-2);
    
    //Cuando llegue a la fecha estipulada
    if(distance < 0){
        clearInterval(interval);
        finalMessage.style.transform = 'translateY(0)';
    }
}