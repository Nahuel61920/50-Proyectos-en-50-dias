const boton = document.querySelector("#boton");

let encendido = true;

boton.addEventListener("click", cambiar);

function cambiar(){
	if(encendido == true){
		
		document.getElementById('cambio').className = 'encendido';
		document.getElementById('boton').innerHTML = 'APAGAR';
		encendido = false;
	}else{
	
		document.getElementById('cambio').className = 'apagado';
		document.getElementById('boton').innerHTML = 'ENCENDER';
		encendido = true;
	}
}