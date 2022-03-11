//Variables
const inputBuscar = document.getElementById('buscar')
const celdas = document.getElementsByTagName('td')

//traemos los datos desde una API
let uri = 'https://jsonplaceholder.typicode.com/users'
fetch(uri)
    .then( response => response.json() )
    .then( json => mostrarDatos(json) )
    .catch( error => console.log(error) )

const mostrarDatos = (data) => {
    let body=''
    for(let i=0; i<data.length; i++){
        body += `<tr><td>${data[i].name}</td></tr>`;
    }
    document.querySelector('.datos').innerHTML = body;
}    

//Búsqueda
inputBuscar.addEventListener('keyup', busqueda);

// function de busqueda
function busqueda(e){
    let texto = e.target.value;
    let er = new RegExp(texto, "i")
    for(let i=0; i<celdas.length; i++) {
        let valor = celdas[i];
        if(er.test(valor.innerText)){
            valor.classList.remove("ocultar");
        }else{
            console.log(valor)
            valor.classList.add("ocultar");
        }
    }
}
