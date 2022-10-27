

function getTracks(){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://fasterthanall.herokuapp.com/api/tracks",false);
    xhttp.send();
    //console.log(JSON.parse(xhttp.responseText));
    return JSON.parse(xhttp.responseText);
}

function getTrackById(id){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://fasterthanall.herokuapp.com/api/tracks/" + id,false);
    xhttp.send();
    //console.log(JSON.parse(xhttp.responseText));
    return JSON.parse(xhttp.responseText)['track'];
}

function obtenerCoordenadasPostasTrack(idTrack){
    let coordenadasTrack = getTrackById(idTrack)['coordinates'];
    //console.log(coordenadasTrack);
    let coordenadas = [];
    
    for(let i = 0; i < coordenadasTrack.length; i++){
        let coordenadaActual = [];
        let coordenadaPostaActual = coordenadasTrack[i];
        
        coordenadaActual.push(coordenadaPostaActual["lat"]);
        coordenadaActual.push(coordenadaPostaActual["lon"]);
        
        coordenadas.push(coordenadaActual);
    }

    return coordenadas;
}