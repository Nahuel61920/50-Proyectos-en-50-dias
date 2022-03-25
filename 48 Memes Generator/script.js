// Variables
let text = document.querySelector('#text-input');
let memeInsert = document.querySelector("#meme-insert");
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
let container = document.getElementById("meme-image-container");
let imageContainer = document.querySelector('#meme-text');
let img = document.querySelector("img");
let meme1 = document.getElementById("meme-1");
let meme1Src = meme1.src;
let meme2 = document.getElementById("meme-2");
let meme2Src = meme2.src;
let meme3 = document.getElementById("meme-3");
let meme3Src = meme3.src;
let meme4 = document.getElementById("meme-4");
let meme4Src = meme4.src;

// EventListener
EventList();
// Insertar imagen de usuario
function EventList() {
  memeInsert.addEventListener("input", function() {
    img.id = "meme-image";
    img.src = URL.createObjectURL(this.files[0]);
    })
  // Button 1 - border type
  button1.addEventListener("click", function(){
    container.style.border = "3px dashed blue";
  })
  // Button 2 - border type
  button2.addEventListener("click", function(){
    container.style.border = "5px double red";
  })
  // Button 3 - border type
  button3.addEventListener("click", function(){
    container.style.border = "6px groove black";
  })
  // Use meme 1
  meme1.addEventListener("click", function() {
    img.id = "meme-image";
    img.src = meme1Src;
  })
  // Use meme 2
  meme2.addEventListener("click", function() {
    img.id = "meme-image";
    img.src = meme2Src;
  })
  // Use meme 3
  meme3.addEventListener("click", function() {
    img.id = "meme-image";
    img.src = meme3Src;
  })
  // Use meme 4
  meme4.addEventListener("click", function() {
    img.id = "meme-image";
    img.src = meme4Src;
  })
}

// Funciones
function writeOnImg() {// Escribir en la imagen
  imageContainer.innerHTML = text.value;
}

