// variables
const btnEnviar = document.querySelector("#enviar");
const resetBtn = document.querySelector("#resetBtn");
const formularioEnviar = document.querySelector("#enviar-mail");

// variables para campos
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners()
function eventListeners() {
     // Cuando la app arranca
     document.addEventListener("DOMcontentLoaded", iniciarApp);

     // Campos del formulario
     email.addEventListener("blur", validarForm);
     asunto.addEventListener("blur", validarForm);
     mensaje.addEventListener("blur", validarForm);

     // Enviar formulario
     formularioEnviar.addEventListener("submit", enviarEmail);

     // Resetear formulario
     resetBtn.addEventListener("click", resetFormulario);
}

// Funciones
function iniciarApp() {
     btnEnviar.disabled = true;
     btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

// Validando formulario
function validarForm(e) {
     if (e.target.value.length > 0) {

          // Elimina los errores
          const error = document.querySelector("p.error");
          if (error) {
               error.remove();
          }

          e.target.classList.remove("border", "border-red-500");
          e.target.classList.add("border", "border-green-500");
     } else {
          e.target.classList.remove("border", "border-green-500");
          e.target.classList.add("border", "border-red-500");

          mostrarError("Todos los campos son obligatorios")
     }

     if (e.target.type === "email") {

          if (er.test( e.target.value )) {
               const error = document.querySelector("p.error");
               if (error) {
                    error.remove();
               }

               e.target.classList.remove("border", "border-red-500");
               e.target.classList.add("border", "border-green-500");
          } else {
               e.target.classList.remove("border", "border-green-500");
               e.target.classList.add("border", "border-red-500");
               mostrarError("Email no valido");
          }
     }

     if (er.test( email.value ) && asunto.value !== "" && mensaje.value !== ""){
          btnEnviar.disabled = false;
          btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
     } 
}

function mostrarError(mensaje) {
     const mensajeError = document.createElement("p");
     mensajeError.textContent = mensaje;
     mensajeError.classList.add("border", "border-red-500", "bg-red-100", "text-red-500", "p-3", "mt-5", "text-center", "error");

     const errores = document.querySelectorAll(".error");
     if(errores.length === 0){
          formulario.appendChild(mensajeError);
     }
}

//Restear el formulario
function resetFormulario(e) {
     formularioEnviar.reset();
     e.preventDefault();
}

// Envia el Email
function enviarEmail(e) {
     e.preventDefault();

     // Mostrar el spinner
     const spinner = document.querySelector("#spinner");
     spinner.style.display = "flex";

     // Despues de 3 seg ocultar el spinner y mostrar el mensaje
     setTimeout(() => {
          spinner.style.display = "none";

          // Mensjae de envio correcto
          const parrafo = document.createElement("p");
          parrafo.textContent = "El mensaje se envio correctamente";
          parrafo.classList.add("text-center", "my-10", "p-3", "bg-green-500", "text-white", "font-bold", "uppercase")

          // Inserta el parrafo antes del spinner
          formularioEnviar.insertBefore(parrafo, spinner);

          setTimeout(() => {
               parrafo.remove();//Elimina el mensaje de exito

               resetFormulario();
          }, 5000);
     }, 3000);
}



