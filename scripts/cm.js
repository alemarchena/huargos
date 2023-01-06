document.oncontextmenu = function () { return false }
var usuarioactual='';
var idalumno=-1;
var nombrealumno='';
var apellidoalumno='';
var whatsappalumno='';
var fechanacimientoalumno='';
var emailalumno = '';
var estadoactualalumno = '';
var fotoactual = '';
var certificadoactual = '';

function ira(velocidad, lugar) {
    
    var posicion = $("#" + lugar).offset().top;
    $("HTML, BODY").animate({ scrollTop: posicion }, velocidad);
}
function precargar(adonde){
    $("#"+adonde).load("precarga.html?n="+version);
    $("#"+adonde).show();

}

function ocultaprecarga(adonde) {
    
    $("#"+adonde).hide();
}

function cargaenpanel(pagina){
    $("#bloquepanel").load(pagina + "?n="+version);
}


function el(selector)
{
    return document.querySelector(selector);
}

lugar = "divbotones";
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
        //Links desde paginas ----------------------------
        $("#lhome").on('click', function (e) {
            cargaenpanel('index.html');
            ira(1200, "navfija");
        });
      
        //Menu -------------------------------------------
        $("#logoempresa").on('click', function (e) {
            if (actual === 'index')
                ira(1200, "navfija");
            else
            {
                ENLACE_WEB = ENTORNO_WEB +'index.html';
                $(location).attr('href', ENLACE_WEB);
            }    
        });

    }, 500);

    
});