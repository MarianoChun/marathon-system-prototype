document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("finscripcion").addEventListener('submit', enviarFormulario);
});

document.getElementById("sponsor-propio").addEventListener('click', function(){
    habilitarInput("nombre-sponsor");
    habilitarInput("descripcion");
});

document.getElementById("sponsor-general").addEventListener('click', function(){
    deshabilitarInput("nombre-sponsor");
    deshabilitarInput("descripcion");
});


function habilitarInput(idElementoInput){
    var input = document.getElementById(idElementoInput);
    
    input.disabled = false;
    input.style.backgroundColor="white";
}

function deshabilitarInput(idElementoInput){
    var input = document.getElementById(idElementoInput);
    
    input.disabled = true;
    input.style.backgroundColor="rgb(187, 185, 185)";
}

function sortearSponsorGratuito(){
    let sponsorsGratuitos = [
        {
            "nombre": "Nakidas",
        },
        {
            "nombre": "MCBurguer",
        },
        {
            "nombre": "BuzzCola",
        }
        ];

    var randomIndex = Math.floor(Math.random() * 3);

    var nombreSponsor = sponsorsGratuitos[randomIndex].nombre;

    return nombreSponsor;
}

function enviarFormulario(evento){
    evento.preventDefault(); 
    let tieneSponsorGratuito = document.getElementById("sponsor-general").checked;
    var confirmarEnvio = confirm("¿Esta seguro?");
    let sponsor;


    if(confirmarEnvio){
        if(tieneSponsorGratuito){
            sponsor = sortearSponsorGratuito();

        } else {
            sponsor = document.getElementById("nombre-sponsor").value;
        }
        let mensaje = "¡Felicitaciones se ha inscripto satisfactoriamente! Con el sponsor " + sponsor;
        alert(mensaje);
        this.submit();
    }
}
