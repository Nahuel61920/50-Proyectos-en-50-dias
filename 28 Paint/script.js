// Variables
const color = document.querySelector("#color");
const ancho = document.querySelector("#ancho");
const limpiar = document.querySelector("#limpiar");
const canvas = document.querySelector("#canvas");
const contexto = canvas.getContext("2d");


// event Listener

eventList();
function eventList() {
    canvas.addEventListener("mousemove", dibujar); //cuando se mueva el mouse llamamos a la funcion dibujar
    canvas.addEventListener("mousedown", function() {
    ruta=true;// Creamos la ruta de la linea
    contexto.beginPath(); // funcion que comieza a dibujar
    contexto.moveTo(x,y);
    console.log("posicion Inicial X;"+x+" Y:"+y);
    canvas.addEventListener("mousemove", dibujar);
    });

    canvas.addEventListener("mouseup", function() { //cuando se termine de precionar el mouse se termina de dibujar
    ruta=false;
    })

    color,addEventListener("change", colorLinea); // Selecciona el color

    ancho.addEventListener("change", anchoLinea); // Selecciona el ancho

    limpiar.addEventListener("click", limpiarCanvas); // limpia el canvas
}

// Definir el hancho de linea
contexto.lineWidth = 1;

// Creando ruta 
let ruta = false;

// funciones

// funcion que dibuja sobre el canvas
function dibujar(e){
    //Elegimos el comportamiento de X e Y
    x=e.clientX-canvas.offsetLeft; 
    y=e.clientY-canvas.offsetTop;

    if (ruta == true) {
        contexto.lineTo(x,y);
        contexto.stroke();
    }
}

function colorLinea() {
    contexto.strokeStyle=color.value;
}

function anchoLinea() {
    contexto.lineWidth=ancho.value;
    document.getElementById("valor").innerHTML=ancho.value;
}

function limpiarCanvas(){
    contexto.clearRect(0,0,canvas.width, canvas.height)
}