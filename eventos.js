document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("finscripcion").addEventListener('submit', enviarFormulario);
});

document.getElementById("sponsor-propio").addEventListener('click', function(){
    var inputNombreSponsor = document.getElementById("nombre-sponsor");
    var inputDescripcionSponsor = document.getElementById("descripcion");

    inputNombreSponsor.disabled = false;
    inputDescripcionSponsor.disabled = false;
});

document.getElementById("sponsor-general").addEventListener('click', function(){
    var inputNombreSponsor = document.getElementById("nombre-sponsor");
    var inputDescripcionSponsor = document.getElementById("descripcion");

    inputNombreSponsor.disabled = true;
    inputDescripcionSponsor.disabled = true;
});

function enviarFormulario(evento){
    evento.preventDefault(); 
    var confirmarEnvio = confirm("¿Esta seguro?");

    if(confirmarEnvio){
        alert("¡Felicitaciones se ha inscripto satisfactoriamente!");
        this.submit();
    }
}
