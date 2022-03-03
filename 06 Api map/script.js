// Funcion que inicia el Api 
function iniciarMap(){
    const coord = {lat:-34.5453062 ,lng:-58.4497749} // cordenadas de la ubicacion que queremos dirigirnos;
    const map = new google.maps.Map(document.getElementById("map"),
    {zoom: 15,
    center: coord});

    // marcar la ubicacion con un punto
    const marker = new google.maps.Marker({
        position: coord,
        map: map
    });
}