const carrito = document.querySelector("#carrito");
const contenidoCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];


cargarEnventListeners();
function cargarEnventListeners(){
    //Cundo agregas un curso presionando "agregar al carrito"
    listaCursos.addEventListener("click", agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener("click", eliminarCurso);

    //Muestra los cursos de LocalStorage
    document.addEventListener("DOMContentLoaded", cargarStorage () )
    
    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener("click", () =>{

        articulosCarrito = []; // reseteamos el arreglo

        limpiarHTML(); // Elimina todo el HTML
    })
}

/* Funciones */

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const cursoSelecionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSelecionado)
    }

}//Elimina un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute("data-id")

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( cursos => cursos.id !== cursoId)
        
        carritoHTML() //Iterar sobre el carrito y volvemos a mostrar su HTML
    }
}

// Lee el contenido html al que le dimos click y extrar inf

function leerDatosCurso(cursos) {
    //crear un objeto con el contenido del curso
    const infoCurso = {
        imagen: cursos.querySelector("img").src,
        titulo: cursos.querySelector("h4").textContent,
        precio: cursos.querySelector(".precio span").textContent,
        id: cursos.querySelector("a").getAttribute("data-id"),
        cantidad: 1,
    }

    //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( cursos => cursos.id === infoCurso.id);
    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( cursos=> {
            if (cursos.id === infoCurso.id) {
                cursos.cantidad++;
                return cursos;
            } else {
                return cursos;
            }
        })
        articulosCarrito = [...cursos]
    }else{
        //Agregar elemtos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    console.log(articulosCarrito)

    carritoHTML();
}

//Muestra el carrito en el html
function carritoHTML() {
    //Limpiar el html
    limpiarHTML()

    //Recorre el carrito y genera el html
    articulosCarrito.forEach( cursos => {
        const { imagen, titulo, precio, cantidad, id} = cursos;
        const row = document.createElement("tr");
        row.innerHTML =`
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}" > X </a>
            </td>
        `;

        //Agrega el html del carrito al tbody
        contenidoCarrito.appendChild(row);
    });

    // Agregar al carrito de compras el storage
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem("articulosCarrito", JSON.stringify(articulosCarrito))
}

// Cargar storage añ carrito
function cargarStorage() {
    articulosCarrito = JSON.parse( localStorage.getItem("articulosCarrito")) || [];

    carritoHTML();
}


//Elimina los cursos del tbody

function limpiarHTML(){
    while (contenidoCarrito.firstChild) {
        contenidoCarrito.removeChild(contenidoCarrito.firstChild)
    }
}