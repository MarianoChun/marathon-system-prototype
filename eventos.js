document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("finscripcion").addEventListener('submit', enviarFormulario);
});

function enviarFormulario(evento){
    evento.preventDefault(); 
    var confirmarEnvio = confirm("¿Esta seguro?");

    if(confirmarEnvio){
        alert("¡Felicitaciones se ha inscripto satisfactoriamente!");
        this.submit();
    }
}
