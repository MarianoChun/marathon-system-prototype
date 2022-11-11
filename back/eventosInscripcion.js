document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("finscripcion").addEventListener('submit', enviarFormulario);
});

document.getElementById("sponsor-propio").addEventListener('click', function(){
    mostrarInputSponsorPropio();
});

document.getElementById("sponsor-general").addEventListener('click', function(){
    ocultarInputSponsorPropio();
});

document.getElementById("boton-enviar-formulario").click(function(event){
    enviarFormulario(event);
});

function mostrarInputSponsorPropio(){
    var nombre = document.getElementById("nombre-sponsor");
    var descripcion = document.getElementById("descripcion");
    nombre.disabled = false;
    descripcion.disabled = false;

    var seccionSponsorPropio = document.getElementsByClassName("visibilidad");
    seccionSponsorPropio[0].style.display="block";
}

function ocultarInputSponsorPropio(){
    var nombre = document.getElementById("nombre-sponsor");
    var descripcion = document.getElementById("descripcion");
    nombre.disabled = true;
    descripcion.disabled = true;

    var seccionSponsorPropio = document.getElementsByClassName("visibilidad");
    seccionSponsorPropio[0].style.display="none";
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
        window.location.href = "index.html";
    }
}
