let pagina = 1;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

btnSiguiente.addEventListener("click", () => {
	if(pagina < 1000){
	pagina += 1;
	optenerPeliculas();
	}
})

btnAnterior.addEventListener("click", () => {
	if(pagina > 1){
	pagina -= 1;
	optenerPeliculas();
	}
})

const optenerPeliculas = async () => {
	try {
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=d5c775389c73a0b2a2bc815d05093528&language=es-MX&page=${pagina}`)
		console.log(respuesta)


		if(respuesta.status === 200){
			const datos = await	respuesta.json();
			
			let peliculas = "";
			
			datos.results.forEach(pelicula => {
				peliculas += `
					<div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title}</h3>
					</div>
					
				`;
			});

			document.getElementById("contenedor").innerHTML = peliculas

		} else if(respuesta.status === 401){
			console.log("key erroneo");
		} else if(respuesta.status === 404){
			console.log("Pelicula no encontrada")
		} else {
			console.log("Hubo un erro inesperado")
		}
	
	} catch(error){
		console.log(error);
	}
}

optenerPeliculas ()