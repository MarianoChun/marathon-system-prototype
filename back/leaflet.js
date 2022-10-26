var capaCentros = L.layerGroup([]);
var capaCorredores = L.layerGroup([]);
var mapa = L.map('map').setView([-34.52, -58.70], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapa);

document.addEventListener("DOMContentLoaded", function() {
    dibujarMapaCorredores(postas);
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

function dibujarMapaCorredores(postas) {
    limpiarLayers()

    postas.forEach(posta => {
        var greenIcon = new L.Icon({
            iconUrl: '../imgs/marker-verde.png',
            shadowUrl: '../imgs/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });
          
        var marker = L.marker([posta.coordenadas.x, posta.coordenadas.y], {icon: greenIcon}).addTo(mapa);
        marker.bindPopup("<b>" + posta.id + "</b>").openPopup();
        capaCorredores.addLayer(marker);
    });

    capaCorredores.addTo(mapa);
}

function limpiarLayers(){
    capaCentros.clearLayers();
    capaCorredores.clearLayers();
}

