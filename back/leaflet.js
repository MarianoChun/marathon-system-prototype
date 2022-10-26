var capaCentros = L.layerGroup([]);
var mapa = L.map('map').setView([-34.52, -58.70], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapa);


document.getElementById("btn-mapa-centrosSalud").addEventListener("click", function () {
    dibujarMapaCentrosSalud(centrosSalud);
});

document.getElementById("btn-mapa-corredores").addEventListener("click", function () {
    dibujarMapaCorredores();
});


function dibujarMapaCentrosSalud(centrosSalud) {
    centrosSalud.forEach(centro => {
        var marker = L.marker([centro.coordenadas.x, centro.coordenadas.y]).addTo(mapa);
        marker.bindPopup("<b>" + centro.nombre + "</b>" + "<br>" + centro.direccion).openPopup();
        capaCentros.addLayer(marker);
    });

    capaCentros.addTo(mapa);
}

function dibujarMapaCorredores() {
    capaCentros.clearLayers();
}

