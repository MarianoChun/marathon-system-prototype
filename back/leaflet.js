var capaCentros = L.layerGroup([]);
var capaCorredores = L.layerGroup([]);
var capaPosicionCorredores = L.layerGroup([]);
var markersPosicionCorredores = new Map();
var markerCentrosSalud = new Map();
var mapa = L.map('map').setView([-34.52, -58.70], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapa);

document.addEventListener("DOMContentLoaded", function() {
    dibujarMapaCorredores(getTrackById(42));
    dibujarCircuitoMaraton(getTrackById(42));
    cargarCorredoresATabla();
});


document.getElementById("btn-mapa-centrosSalud").addEventListener("click", function () {
    dibujarMapaCentrosSalud(centrosSalud);
    limpiarTabla();
    cambiarATablaCentrosDeSalud()
});

document.getElementById("btn-mapa-corredores").addEventListener("click", function () {
    dibujarMapaCorredores(getTrackById(42));
    limpiarTabla();
    cambiarATablaCorredores();
});

document.getElementById('ul-lista').addEventListener("click", function (event) {
    var target = getEventTarget(event);

    if (esListaCorredores()) {

        let idCorredor = extraerIdItemLista(target);
        simularCarreraCorredor(idCorredor);

    } else {

        let centroSalud = obtenerCentroSaludPorNombre(target.textContent);
        let coordenadasCentroSalud = centroSalud['coordenadas'];

        markerCentrosSalud.get(centroSalud.nombre).openPopup();
        mapa.flyTo(new L.LatLng(coordenadasCentroSalud['x'], coordenadasCentroSalud['y']));
    }
});

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement; 
}

function extraerIdItemLista(item){
    var regExp = /\(([^)]+)\)/;
    let id = item.innerHTML.split(regExp);
  
    return id[1];
}

function obtenerCentroSaludPorNombre(nombre){
    return centrosSalud.filter(centro => centro['nombre'] === nombre)[0];
}

function cambiarATablaCorredores(){
    document.getElementById("encabezado-lista").innerHTML = "Corredores";
    cargarCorredoresATabla()
}

function cambiarATablaCentrosDeSalud(){
    document.getElementById("encabezado-lista").innerHTML = "Centros de salud";
    cargarCentrosSaludATabla();
}

function esListaCorredores() {
    return  document.getElementById("encabezado-lista").textContent === "Corredores";
}

function cargarCorredoresATabla(){

    let lista = document.getElementById("ul-lista");
    
    for(let corredor of getCorredores()){
        
        let listItem = document.createElement("li");
        let botonCorredor = document.createElement("button");

        botonCorredor.textContent = "("+ corredor['id'] +") " +corredor['name'] + " " + corredor['surname'] + " | " + corredor['sponsor']['name'];
        listItem.appendChild(botonCorredor);
        lista.appendChild(listItem);
    }   
}

function cargarCentrosSaludATabla(){

    let lista = document.getElementById("ul-lista");
    
    for(let centro of centrosSalud){
        
        let listItem = document.createElement("li");
        let botonCorredor = document.createElement("button");

        botonCorredor.textContent = centro['nombre'];
        listItem.appendChild(botonCorredor);
        lista.appendChild(listItem);
    }   
}

function limpiarTabla(){
    document.getElementById("ul-lista").innerHTML = "";
    
}
function dibujarMapaCentrosSalud(centrosSalud) {
    limpiarLayers()

    centrosSalud.forEach(centro => {
        var marker = L.marker([centro.coordenadas.x, centro.coordenadas.y]).addTo(mapa);
        marker.bindPopup("<b>" + centro.nombre + "</b>" + "<br>" + centro.direccion);

        markerCentrosSalud.set(centro.nombre, marker);
        capaCentros.addLayer(marker);
    });

    capaCentros.addTo(mapa);
}

function dibujarPostas(track) {
    let coordenadasPostasTrack = obtenerCoordenadasPostasTrack(track["id"]);
    let descripcionPosta = "Posta ";
    coordenadasPostasTrack.forEach(coordenada => {
        let indiceCoordenada = coordenadasPostasTrack.indexOf(coordenada);
        var greenIcon = new L.Icon({
            iconUrl: '../imgs/posta-roja.png',
            shadowUrl: '../imgs/marker-shadow.png',
            iconSize: [15, 20],
            iconAnchor: [10, 30],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });
          
        var marker = L.marker([coordenada[0], coordenada[1]], {icon: greenIcon}).addTo(mapa);
        marker.bindPopup("<b>" + descripcionPosta + indiceCoordenada + "</b>");
        capaCorredores.addLayer(marker);
    });
}

async function simularCarreraCorredor(idCorredor){
    let checkpointsCorredor = obtenerCoordenadasCheckpoints(idCorredor);

    for(let i = 0; i < checkpointsCorredor.length; i++){
        let coordenada = checkpointsCorredor[i];
        console.log(coordenada);
        await timeout(2000)
        .then(dibujarCorredor(idCorredor, coordenada))
        .then(timeout(2000));
        
        borrarCorredor(idCorredor);
    }

}

function timeout(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

function borrarCorredor(idCorredor){
    capaPosicionCorredores.removeLayer(markersPosicionCorredores.get(idCorredor));
}

function dibujarCorredor(idCorredor, coordenadaCorredor){
    let corredor = getCorredorPorId(idCorredor)['runner'];

    console.log(corredor);
    let marker = L.marker([coordenadaCorredor[0], coordenadaCorredor[1]]).addTo(mapa);
    marker.bindPopup("<b>" + corredor['name'] + " " +corredor['surname'] + "</b> <br> " +
    corredor['sponsor']['name']).openPopup();


    capaPosicionCorredores.addLayer(marker);
    capaPosicionCorredores.addTo(mapa);

    markersPosicionCorredores.set(idCorredor, marker);
}

function dibujarCamaras() {
    let coordenadasCamarasTrack = obtenerCoordenadasCamarasTrack();
    let descripcionCamara = "Id camara: ";
    coordenadasCamarasTrack.forEach(coordenada => {
        let indiceCoordenada = coordenadasCamarasTrack.indexOf(coordenada);
        var greenIcon = new L.Icon({
            iconUrl: '../imgs/camara.png',
            shadowUrl: '../imgs/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });
          
        var marker = L.marker([coordenada[0], coordenada[1]], {icon: greenIcon}).addTo(mapa);
        marker.bindPopup("<b>" + descripcionCamara + indiceCoordenada + "</b>");
        capaCorredores.addLayer(marker);
    });
}

function dibujarMapaCorredores(track) {
    limpiarLayers()

    dibujarPostas(track);
    dibujarCircuitoMaraton(track);
    dibujarCamaras(track);

    capaCorredores.addTo(mapa);
}

function dibujarCircuitoMaraton(track) {
    let coordenadasPostas = obtenerCoordenadasPostasTrack();

    var polyline = new L.Polyline(coordenadasPostas, {
        color: 'blue',
        weight: 3,
        opacity: 0.5,
        smoothFactor: 1
    });

    polyline.addTo(mapa);
    capaCorredores.addLayer(polyline);
}

function limpiarLayers(){
    capaCentros.clearLayers();
    capaCorredores.clearLayers();
}

