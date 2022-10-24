document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("finscripcion").addEventListener('submit', enviarFormulario);
});

document.getElementById("sponsor-propio").addEventListener('click', function(){
    var inputNombreSponsor = document.getElementById("nombre-sponsor");
    var inputDescripcionSponsor = document.getElementById("descripcion");

    inputNombreSponsor.disabled = false;
    inputDescripcionSponsor.disabled = false;

    inputNombreSponsor.style.backgroundColor="white";
    inputDescripcionSponsor.style.backgroundColor="white";
});

document.getElementById("sponsor-general").addEventListener('click', function(){
    var inputNombreSponsor = document.getElementById("nombre-sponsor");
    var inputDescripcionSponsor = document.getElementById("descripcion");

    inputNombreSponsor.disabled = true;
    inputDescripcionSponsor.disabled = true;

    inputNombreSponsor.style.backgroundColor="rgb(187, 185, 185)";
    inputDescripcionSponsor.style.backgroundColor="rgb(187, 185, 185)";
});

function enviarFormulario(evento){
    evento.preventDefault(); 
    var confirmarEnvio = confirm("¿Esta seguro?");

    if(confirmarEnvio){
        alert("¡Felicitaciones se ha inscripto satisfactoriamente!");
        this.submit();
    }
}
