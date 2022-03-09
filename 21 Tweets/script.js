// Variables
const formulario = document.querySelector("#formulario");
const lisTweets = document.querySelector("#lista-tweets");
let tweets = [];

// Event Listeners
eventListeners();

function eventListeners() {
     // Cuando el usuario agrega un tweet
     formulario.addEventListener("submit", agregarTweet);

     // Cuando el document esta listo
     document.addEventListener("DOMContentLoaded", cargandoLocalS);
}

// Funciones

function agregarTweet(e) {
     e.preventDefault();

     // Textarea donde el usuario escribe
     const tweet = document.querySelector("#tweet").value

     // Validacion
     if(tweet === ""){
          mostrarError("Un mensaje no puede ir vacio");
          return; //Evita que se ejecuten mas lineas de codigo
     }

     const tweetObj = {
          id: Date.now(),
          tweet,
     }

     // Añadiendo al arreglo de tweets
     tweets = [...tweets, tweetObj];

     // Una vez agregado, crear html
     crearHTML();

     // Reiniciar el formulario
     formulario.reset();
}

// Mostrar mensjae de error
function mostrarError(error) {
     const mensajeError = document.createElement("p");
     mensajeError.textContent = error;
     mensajeError.classList.add("error");

     // Insertar en el contendor
     const contenido = document.querySelector("#contenido");
     contenido.appendChild(mensajeError);
     
     // Elimina alerta despues de 3seg
     setTimeout(() => {
          mensajeError.remove()
     }, 3000);
}

// Muestra un listado de los tweets
function crearHTML() {
     limpiarHTML()
     if (tweets.length > 0) {
          tweets.forEach( tweet =>{
               
               // Agregar un BTN de eliminar
               const btnEliminar = document.createElement("a");
               btnEliminar.classList.add("borrar-tweet");
               btnEliminar.innerHTML = "X";

               // Añadir la funcion de eliminar
               btnEliminar.onclick = () => {
                    borrarTweet(tweet.id);
               }

               // Crear el html
               const li = document.createElement("li");

               // Añadir el textContent
               li.innerHTML = tweet.tweet;

               // Añadir el btn
               li.appendChild(btnEliminar);

               // Insertar en el html
               lisTweets.appendChild(li);
          });
     }

     sincronizarStorange();
}

// Agregando los tweets actuales a Localstorage
function sincronizarStorange() {
     localStorage.setItem("tweets", JSON.stringify(tweets));
}

// Agregando localStorage al html
function cargandoLocalS() {
     tweets = JSON.parse( localStorage.getItem("tweets") || []);

     crearHTML();
}

// Borrar un tweet
function borrarTweet(id){
     tweets = tweets.filter( tweet => tweet.id !== id);

     crearHTML();
}

// Limpiar el html
function limpiarHTML() {
     while (lisTweets.firstChild) {
          lisTweets.removeChild(lisTweets.firstChild);
     }
}