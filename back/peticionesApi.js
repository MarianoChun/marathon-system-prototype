var idTrack = 42;

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
function getCamarasTrack(){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://fasterthanall.herokuapp.com/api/webcams/" + idTrack,false);
    xhttp.send();
    //console.log(JSON.parse(xhttp.responseText));
    return JSON.parse(xhttp.responseText)['webcams'];
}

function getCheckpointsRunnerById(idRunner){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://fasterthanall.herokuapp.com/api/replays/" + idTrack + "/runner/" + idRunner,false);
    xhttp.send();
    //console.log(JSON.parse(xhttp.responseText)['positions']['checkpoints']);
    
    return JSON.parse(xhttp.responseText)['positions']['checkpoints'];
}

function getCorredorPorId(idRunner){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://fasterthanall.herokuapp.com/api/tracks/" + idTrack + "/runners/" + idRunner,false);
    xhttp.send();
    
    return JSON.parse(xhttp.responseText);
}

function getCorredores(){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://fasterthanall.herokuapp.com/api/tracks/" + idTrack +"/runners/",false);
    xhttp.send();
    
    return JSON.parse(xhttp.responseText)['runners'];
}

function obtenerCoordenadasCheckpoints(idRunner) {
    let checkpointsRunner = getCheckpointsRunnerById(idRunner);
    let coordenadas = [];
    
    for(let i = 0; i < checkpointsRunner.length; i++){
        let coordenadaActual = [];
        let coordenadaCamaraActual = checkpointsRunner[i]["coordinate"];
        
        coordenadaActual.push(coordenadaCamaraActual["lat"]);
        coordenadaActual.push(coordenadaCamaraActual["lon"]);
        
        coordenadas.push(coordenadaActual);
    }
    //console.log(coordenadas);
    return coordenadas;
}

function obtenerCoordenadasCamarasTrack() {
    let camarasTrack = getCamarasTrack(idTrack);
    
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
function obtenerCoordenadasPostasTrack(){
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