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

function enviarFormulario(evento){
    evento.preventDefault(); 
    var confirmarEnvio = confirm("¿Esta seguro?");

    if(confirmarEnvio){
        alert("¡Felicitaciones se ha inscripto satisfactoriamente!");
        this.submit();
    }
}
