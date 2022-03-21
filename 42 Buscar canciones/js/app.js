import { API } from './api.js';
import * as UI from './interfaz.js';

UI.formularioBuscar.addEventListener('submit', (e) => {
     e.preventDefault();

     // Obtener datos del formulario
     const artista = document.querySelector('#artista').value,
           cancion = document.querySelector('#cancion').value;

     if(artista === '' || cancion === '') {
          // El usuario deja los campos vacios, mostrar error
          UI.divMensajes.innerHTML = 'Error... Todos los campos son obligatorios';
          UI.divMensajes.classList.add('error');
          setTimeout(() => {
               UI.divMensajes.innerHTML = '';
               UI.divMensajes.classList.remove('error');
          }, 3000);
     } else {
          // El formulario esta completo, realizar consulta a la API
          new API(artista, cancion);
     }

});