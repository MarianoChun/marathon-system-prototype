// Recorrido: UNGS hasta Carrefour Bella Vista (5KM)

// Despues podemos agregar nombre a las postas con el  nombre de las calles en las que se encuentran
let postas = [
    {
        "id": 1,
        "coordenadas": {
            "x": "-34.5217890405664",
            "y": "-58.70138303720158"
        }
    },
    {
        "id": 2,
        "coordenadas": {
            "x": "-34.52540289075149",
            "y": "-58.7050178813483"
        }
    },
    {
        "id": 3,
        "coordenadas": {
            "x": "-34.52948876665597",
            "y": "-58.70943870146655"
        }
    },
    {
        "id": 4,
        "coordenadas": {
            "x": "-34.53303673245571",
            "y": "-58.70474371384659"
        }
    },
    {
        "id": 5,
        "coordenadas": {
            "x": "-34.53725810748499",
            "y": "-58.69904191117025"
        }
    },
    {
        // Posta mitad carrera
        "id": 6,
        "coordenadas": {
            "x": "-34.54026050456874",
            "y": "-58.69519860735387"
        }
    },
    {
        "id": 7,
        "coordenadas": {
            "x": "-34.5429203664123",
            "y": "-58.69149545732107"
        }
    },
    {
        "id": 8,
        "coordenadas": {
            "x": "-34.54567065049201",
            "y": "-58.6944334812363"
        }
    },
    {
        "id": 9,
        "coordenadas": {
            "x": "-34.54862167379783",
            "y": "-58.6974820212389"
        }
    },
    {
        "id": 10,
        "coordenadas": {
            "x": "-34.5510476410589",
            "y": "-58.69997200373866"
        }
    },
    {
        "id": 11,
        "coordenadas": {
            "x": "-34.55205746661128",
            "y": "-58.69859909175121"
        }
    },
    {
        "id": 12,
        "coordenadas": {
            "x": "-34.55295435532709",
            "y": "-58.697445741970824"
        }
    },   
]

var obtenerCoordenadasPostas = function obtenerCoordenadasPostas(){
    let coordeandas = [];
    
    for(let i = 0; i < postas.length; i++){
        let coordenadaActual = [];
        let coordeandasPostaActual = postas[i].coordenadas;

        coordenadaActual.push(coordeandasPostaActual.x);
        coordenadaActual.push(coordeandasPostaActual.y);
        
        coordeandas.push(coordenadaActual);
    }

    return coordeandas;
}