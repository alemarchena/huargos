document.oncontextmenu = function () { 
    return false 
}
var usuariologueado = false;
var emg='';

var idiomaactual = 1;
var email;

function ira(velocidad, lugar) {
    var posicion = $("#" + lugar).offset().top ;
    $("HTML, BODY").animate({ scrollTop: posicion }, velocidad);
}
function precargar(adonde){    
    let ruta = '';
    if(indexopanel=='indexafi'){
        ruta = '../panel/';    
    }
    
    $("#"+adonde).load(ruta + "precarga.html?n="+version);
}

function ocultaprecarga(adonde) {    
    $("#"+adonde).hide();
}
function cargaenprincipal(pagina){
    $("#bloqueprincipal").load(pagina + "?n="+ version);
}

lugar = "bloqueprincipal";
velocidad = 500;

const entorno = '';
let ENLACE_WEB='';
let ENTORNO_WEB='';
$(document).ready(function () {            
    if(entorno==='local')
        ENTORNO_WEB = 'http://localhost/huargos/';    
    else
        ENTORNO_WEB = 'https://www.huargoskickboxing.com/';  
    
    setTimeout(() => {        
        $("#lhome").on('click', function (e)
        {
            cargaenprincipal('principal.html');
            ira(1200, "navfija");
        });           

        $("#logoempresa").on('click', function (e)
            {
                ENLACE_WEB = ENTORNO_WEB +'index.html';
                $(location).attr('href', ENLACE_WEB);
        });

       
    }, 700);   
});