const progress = document.querySelector("#progress");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const circles = document.querySelectorAll(".circle");

let tecnologiasActive = 1;

// Event listener
eventListener()

function eventListener() {
    next.addEventListener("click", nextBtn);
    prev.addEventListener("click", prevBtn);
    document.addEventListener("DOMContentLoaded", cargandoLocalS);
}


// Funciones

// suma 1 circulo al precionar el boton Next
function nextBtn() { 
    tecnologiasActive++;

    if(tecnologiasActive > circles.length) {
        tecnologiasActive = circles.length;
    }

    update();
}

// Resta un circulo al precionar el boton Prev
function prevBtn() { 
    tecnologiasActive--;

    if(tecnologiasActive < 1) {
        tecnologiasActive = 1;
    }

    update();
}

// Carga la linea de progreso
function update(){ 
    circles.forEach((circle, idx) =>{
        if (idx < tecnologiasActive) {
            circle.classList.add("active");
        } else {
            circle.classList.remove("active");
        }
    }) 

    btnLoad();

    sincronizarStorange();
}

// Interraccion de los botones next y prev
function btnLoad() { 
    const actives = document.querySelectorAll(".active");

    progress.style.width = ((actives.length - 1) / (circles.length -1) * 100 + "%");

    if (tecnologiasActive === 1) {
        prev.disabled = true;
    } else if (tecnologiasActive === circles.length) {
        next.disabled = true;
    } else{
        prev.disabled = false;
        next.disabled = false;
    }
}

// Agregando las tecnologias actuales a Localstorage
function sincronizarStorange() {
    localStorage.setItem("tecnologiasActive", JSON.stringify(tecnologiasActive));
}

// Agregando localStorage al html
function cargandoLocalS() {
    tecnologiasActive = JSON.parse( localStorage.getItem("tecnologiasActive") || 1);

    update();
}
