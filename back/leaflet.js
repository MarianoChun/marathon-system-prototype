var capaCentros = L.layerGroup([]);
var capaCorredores = L.layerGroup([]);
var mapa = L.map('map').setView([-34.52, -58.70], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapa);

document.addEventListener("DOMContentLoaded", function() {
    dibujarMapaCorredores(getTrackById(42));
    dibujarCircuitoMaraton(getTrackById(42))
});


document.getElementById("btn-mapa-centrosSalud").addEventListener("click", function () {
    dibujarMapaCentrosSalud(centrosSalud);
});

document.getElementById("btn-mapa-corredores").addEventListener("click", function () {
    dibujarMapaCorredores(postas);
});


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
    
    coordenadasPostasTrack = obtenerCoordenadasPostasTrack(track["id"]);
    let descripcionPosta = "Posta ";
    coordenadasPostasTrack.forEach(coordenada => {
        let indiceCoordenada = coordenadasPostasTrack.indexOf(coordenada);
        var greenIcon = new L.Icon({
            iconUrl: '../imgs/marker-verde.png',
            shadowUrl: '../imgs/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });
          
        var marker = L.marker([coordenada[0], coordenada[1]], {icon: greenIcon}).addTo(mapa);
        marker.bindPopup("<b>" + descripcionPosta + indiceCoordenada + "</b>").openPopup();
        capaCorredores.addLayer(marker);
    });
}
function dibujarMapaCorredores(track) {
    limpiarLayers()

    dibujarPostas(track)
    dibujarCircuitoMaraton(track)

    capaCorredores.addTo(mapa);
}

function dibujarCircuitoMaraton(track) {
    let coordenadasPostas = obtenerCoordenadasPostasTrack(track["id"]);

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

