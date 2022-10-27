

function getTracks(){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://fasterthanall.herokuapp.com/api/tracks",false);
    xhttp.send();
    //console.log(JSON.parse(xhttp.responseText));
    return JSON.parse(xhttp.responseText);
}

function getTrackById(idTrack){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://fasterthanall.herokuapp.com/api/tracks/" + idTrack,false);
    xhttp.send();
    //console.log(JSON.parse(xhttp.responseText));
    return JSON.parse(xhttp.responseText)['track'];
}
function getCamarasTrackById(idTrack){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://fasterthanall.herokuapp.com/api/webcams/" + idTrack,false);
    xhttp.send();
    //console.log(JSON.parse(xhttp.responseText));
    return JSON.parse(xhttp.responseText)['webcams'];
}

function obtenerCoordenadasCamarasTrack(idTrack) {
    let camarasTrack = getCamarasTrackById(idTrack);
    
    let coordenadas = [];
    
    for(let i = 0; i < camarasTrack.length; i++){
        let coordenadaActual = [];
        let coordenadaCamaraActual = camarasTrack[i]["coordinate"];
        
        coordenadaActual.push(coordenadaCamaraActual["lat"]);
        coordenadaActual.push(coordenadaCamaraActual["lon"]);
        
        coordenadas.push(coordenadaActual);
    }
    //console.log(coordenadas);
    return coordenadas;
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