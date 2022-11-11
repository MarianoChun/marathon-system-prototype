window.onload = function() {
    $('#cargando').fadeOut(2000);
    $('body').removeClass('ocultar-preloader');
}

document.addEventListener("DOMContentLoaded", function() {
    onloadPage();
});

function onloadPage() {
    window.onload = function() {
        $('#cargando').fadeOut(2000);
        $('body').removeClass('ocultar-preloader');
    }
}



