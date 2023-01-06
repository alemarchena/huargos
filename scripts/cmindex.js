document.oncontextmenu = function () { return false }

const entorno = '';
let ENLACE_WEB='';
let ENTORNO_WEB='';


$(document).ready(function () {
    
    if(entorno==='local')
        ENTORNO_WEB = 'http://localhost/huargos/';
    else
        ENTORNO_WEB = 'https://www.huargoskickboxing.com/';
    
});