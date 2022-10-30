var capaCentros = L.layerGroup([]);
var capaCorredores = L.layerGroup([]);
var capaPosicionCorredor = L.layerGroup([]);
var mapa = L.map('map').setView([-34.52, -58.70], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapa);

document.addEventListener("DOMContentLoaded", function() {
    dibujarMapaCorredores(getTrackById(42));
    dibujarCircuitoMaraton(getTrackById(42));
    simularCarreraCorredor(7);
});


document.getElementById("btn-mapa-centrosSalud").addEventListener("click", function () {
    dibujarMapaCentrosSalud(centrosSalud);
    cambiarATablaCentrosDeSalud()
});

document.getElementById("btn-mapa-corredores").addEventListener("click", function () {
    dibujarMapaCorredores(getTrackById(42));
    cambiarATablaCorredores()
});

function cambiarATablaCorredores(){
    document.getElementById("encabezado-lista").innerHTML = "Corredores";
}

function cambiarATablaCentrosDeSalud(){
    document.getElementById("encabezado-lista").innerHTML = "Centros de salud";
}


function dibujarMapaCentrosSalud(centrosSalud) {
    limpiarLayers()

    centrosSalud.forEach(centro => {
        var marker = L.marker([centro.coordenadas.x, centro.coordenadas.y]).addTo(mapa);
        marker.bindPopup("<b>" + centro.nombre + "</b>" + "<br>" + centro.direccion).openPopup();
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
        marker.bindPopup("<b>" + descripcionPosta + indiceCoordenada + "</b>").openPopup();
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
        .then(timeout(2000))
        .then(borrarCorredores);
    }

}

function timeout(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

function borrarCorredores(){
    capaPosicionCorredor.clearLayers();
}

function dibujarCorredor(idCorredor, coordenadaCorredor){
    let corredor = getCorredorPorId(idCorredor)['runner'];
    console.log(corredor);
    var marker = L.marker([coordenadaCorredor[0], coordenadaCorredor[1]]).addTo(mapa);

    marker.bindPopup("<b>" + corredor['name'] + " " +corredor['surname'] + "</b> <br> " +
    corredor['sponsor']['name']).openPopup();

    capaPosicionCorredor.addLayer(marker);
    capaPosicionCorredor.addTo(mapa);
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
        marker.bindPopup("<b>" + descripcionCamara + indiceCoordenada + "</b>").openPopup();
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

