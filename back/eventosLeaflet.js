var capaCentros = L.layerGroup([]);
var capaCorredores = L.layerGroup([]);
var capaPosicionCorredores = L.layerGroup([]);
var markersPosicionCorredores = new Map();
var markerCentrosSalud = new Map();
var mapaCorredores = L.map('mapaCorredores').setView([-34.52, -58.70], 16);
var mapaCentrosSalud = L.map('mapaCentrosSalud').setView([-34.53480157854912, -58.72033547055928], 13);
var timeouts = [];

var tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapaCorredores);

var tileLayer2 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapaCentrosSalud);


document.addEventListener("DOMContentLoaded", function() {
    dibujarMapaCorredores(getTrackById(42));
    dibujarCircuitoMaraton(getTrackById(42));
    cargarCorredoresATabla();
});

document.getElementById("btn-mapa-centrosSalud").addEventListener("click", function () {
    habilitarMapaCentrosSalud();
    cambiarATablaCentrosDeSalud();
});

document.getElementById("btn-mapa-corredores").addEventListener("click", function () {
    habilitarMapaCorredores();
    cambiarATablaCorredores();
});

document.getElementById('ul-lista').addEventListener("click", function (event) {
    var target = getEventTarget(event);

    if (esMapaCorredores()) {

        let idCorredor = extraerIdItemLista(target);
        if(!estaSimulandoCarreraCorredor(idCorredor)){
            simularCarreraCorredor(idCorredor);
        }

    } else {

        let centroSalud = obtenerCentroSaludPorNombre(target.textContent);
        let coordenadasCentroSalud = centroSalud['coordenadas'];

        markerCentrosSalud.get(centroSalud.nombre).openPopup();
        mapaCentrosSalud.flyTo(new L.LatLng(coordenadasCentroSalud['x'], coordenadasCentroSalud['y']));
    }
});

function dibujarMapaCorredores(track) {
    limpiarLayers();
    dibujarPostas(track);
    dibujarCircuitoMaraton(track);
    dibujarCamaras(track);

    capaCorredores.addTo(mapaCorredores);
}

function limpiarLayers(){
    capaCentros.clearLayers();
    capaCorredores.clearLayers();
}

function dibujarPostas(track) {
    let coordenadasPostasTrack = obtenerCoordenadasPostasTrack(track["id"]);
    let descripcionPosta = "Posta ";
    coordenadasPostasTrack.forEach(coordenada => {
        let indiceCoordenada = coordenadasPostasTrack.indexOf(coordenada);
        var postaRojaIcon = new L.Icon({
            iconUrl: '../imgs/posta-roja.png',
            shadowUrl: '../imgs/marker-shadow.png',
            iconSize: [15, 20],
            iconAnchor: [10, 30],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });
          
        var marker = L.marker([coordenada[0], coordenada[1]], {icon: postaRojaIcon}).addTo(mapaCorredores);
        marker.bindPopup("<b>" + descripcionPosta + indiceCoordenada + "</b>");
        capaCorredores.addLayer(marker);
    });
}

function dibujarCircuitoMaraton(track) {
    let coordenadasPostas = obtenerCoordenadasPostasTrack();

    var polyline = new L.Polyline(coordenadasPostas, {
        color: 'blue',
        weight: 3,
        opacity: 0.5,
        smoothFactor: 1
    });

    polyline.addTo(mapaCorredores);
    capaCorredores.addLayer(polyline);
}

function dibujarCamaras() {
    let coordenadasCamarasTrack = obtenerCoordenadasCamarasTrack();
    let descripcionCamara = "Id camara: ";
    coordenadasCamarasTrack.forEach(coordenada => {
        let indiceCoordenada = coordenadasCamarasTrack.indexOf(coordenada);
        var camaraIcon = new L.Icon({
            iconUrl: '../imgs/camara.png',
            shadowUrl: '../imgs/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
          
        var marker = L.marker([coordenada[0], coordenada[1]], {icon: camaraIcon}).addTo(mapaCorredores);
        marker.bindPopup("<b>" + descripcionCamara + indiceCoordenada + "</b>");
        capaCorredores.addLayer(marker);
    });
}

function cargarCorredoresATabla(){

    let lista = document.getElementById("ul-lista");
    
    for(let corredor of getCorredores()){
        
        let listItem = document.createElement("li");
        let botonCorredor = document.createElement("button");
        botonCorredor.className = "boton-lista";

        botonCorredor.textContent = "("+ corredor['id'] +") " +corredor['name'] + " " + corredor['surname'] + " | " + corredor['sponsor']['name'];
        listItem.appendChild(botonCorredor);
        lista.appendChild(listItem);
    }   
}

function habilitarMapaCorredores() {
    document.getElementById("mapaCorredores").style.display = 'block';
    document.getElementById("mapaCentrosSalud").style.display = 'none';
    dibujarMapaCorredores(getTrackById(42));
}

function cambiarATablaCorredores(){
    limpiarTabla();
    document.getElementById("encabezado-lista").innerHTML = "Corredores";
    cargarCorredoresATabla()
}

function habilitarMapaCentrosSalud() {
    document.getElementById("mapaCentrosSalud").style.display = 'block';
    document.getElementById("mapaCorredores").style.display = 'none';
    mapaCentrosSalud.invalidateSize();
    dibujarMapaCentrosSalud(centrosSalud);
}

function dibujarMapaCentrosSalud(centrosSalud) {
    limpiarLayers()

    centrosSalud.forEach(centro => {
        var marker = L.marker([centro.coordenadas.x, centro.coordenadas.y]).addTo(mapaCentrosSalud);
        marker.bindPopup("<b>" + centro.nombre + "</b>" + "<br>" + centro.direccion);

        markerCentrosSalud.set(centro.nombre, marker);
        capaCentros.addLayer(marker);
    });

    capaCentros.addTo(mapaCentrosSalud);
}

function cambiarATablaCentrosDeSalud(){
    limpiarTabla();
    document.getElementById("encabezado-lista").innerHTML = "Centros de salud";
    cargarCentrosSaludATabla();
}

function limpiarTabla(){
    document.getElementById("ul-lista").innerHTML = "";
    
}
function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement; 
}

function esMapaCorredores() {
    return  document.getElementById("encabezado-lista").textContent === "Corredores";
}

function extraerIdItemLista(item){
    var regExp = /\(([^)]+)\)/;
    let id = item.innerHTML.split(regExp);
  
    return id[1];
}

function estaSimulandoCarreraCorredor(idCorredor){
    return markersPosicionCorredores.has(idCorredor);
}

async function simularCarreraCorredor(idCorredor){
    let checkpointsCorredor = obtenerCoordenadasCheckpoints(idCorredor);

    for(let i = 0; i < checkpointsCorredor.length; i++){
        if(!esMapaCorredores()){
            clearAllTimeouts();
            borrarCorredores();
            break;
        }

        let coordenada = checkpointsCorredor[i];
        console.log(coordenada);

        await timeout(5000)
        .then(dibujarCorredor(idCorredor, coordenada))
        .then(timeout(5000));
        
        borrarCorredor(idCorredor);
    }

}

function clearAllTimeouts(){
    for(let i = 0; i < timeouts.length; i++){
        clearTimeout(timeouts[i]);
    }
}

function borrarCorredores(){
    capaPosicionCorredores.clearLayers();
    markersPosicionCorredores.clear();
}

function timeout(ms) {
    return new Promise(resolve => {
        timeouts.push(setTimeout(resolve, ms));
    });
}

function dibujarCorredor(idCorredor, coordenadaCorredor){
    let corredor = getCorredorPorId(idCorredor)['runner'];

    console.log(corredor);
    var corredorIcon = new L.Icon({
        iconUrl: '../imgs/person-running.png',
        shadowUrl: '../imgs/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    let marker = L.marker([coordenadaCorredor[0], coordenadaCorredor[1]], {icon: corredorIcon}).addTo(mapaCorredores);
    let nombreCorredor = "<b>" + corredor['name'] + " " + corredor['surname'] + "</b>";
    marker.bindPopup(nombreCorredor + "<br>" + corredor['sponsor']['name']).openPopup();


    capaPosicionCorredores.addLayer(marker);
    capaPosicionCorredores.addTo(mapaCorredores);

    markersPosicionCorredores.set(idCorredor, marker);
}

function borrarCorredor(idCorredor){
    capaPosicionCorredores.removeLayer(markersPosicionCorredores.get(idCorredor));
}

function obtenerCentroSaludPorNombre(nombre){
    return centrosSalud.filter(centro => centro['nombre'] === nombre)[0];
}

function cargarCentrosSaludATabla(){

    let lista = document.getElementById("ul-lista");
    
    for(let centro of centrosSalud){
        
        let listItem = document.createElement("li");
        let botonCentro = document.createElement("button");

        botonCentro.textContent = centro['nombre'];
        botonCentro.className = "boton-lista";

        listItem.appendChild(botonCentro);
        lista.appendChild(listItem);
    }   
}



