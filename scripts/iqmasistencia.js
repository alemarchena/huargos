function addEvent(element, event, fn) {
    if (element.addEventListener) {
        element.addEventListener(event, fn, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + event, fn);
    }
}

//Carga una función de forma asíncrona
function loadScript(src, callback) {
    var s,
        r,
        t,
        write;

    write = src.split("/");
    r = false;
    s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;

    s.onload = s.onreadystatechange = function () {
        if (!r && (!this.readyState || this.readyState == 'complete')) {
            r = true;
            if (callback !== undefined) {
                callback();
            }
        }
    };
    t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
}

addEvent(window, 'load',
    function () {
        loadScript('https://code.jquery.com/jquery-3.3.1.min.js', function () {
            CargarFunciones();
        })
    }
);

function CargarFunciones() {
    loadScript('funciones.js?n='+version, function () {
        CargarPanel();
    })
}

function CargarPanel(){
    $.getScript('./scripts/cm.js?n='+version);
    $("#bloqueprincipal").load("marcarasistencia.html?n="+version);
    $("#footer").load("footer.html?n="+version);
}
