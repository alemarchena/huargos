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
            CargarDataTable();
        })
    }
);

function CargarDataTable() {
    loadScript('https://cdn.datatables.net/1.11.2/js/jquery.dataTables.min.js', function () {
        
        CargarUIDatapicker();
    })
}

function CargarUIDatapicker() {
    loadScript('https://code.jquery.com/ui/1.11.4/jquery-ui.min.js', function () {

        CargarExporta();
    })
}


function CargarExporta() {
    loadScript('https://cdn.datatables.net/buttons/2.0.1/js/dataTables.buttons.min.js', function () {
        
        CargarExporta1();
    })
}
function CargarExporta1() {
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js', function () {
        
        CargarExporta2();
    })
}

function CargarExporta2() {
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js', function () {
        
        CargarExporta3();
    })
}
function CargarExporta3() {
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js', function () {
        
        CargarExporta4();
    })
}

function CargarExporta4() {
    loadScript('https://cdn.datatables.net/buttons/2.0.1/js/buttons.html5.min.js', function () {
        
        CargarExporta5();
    })
}
function CargarExporta5() {
    loadScript('https://cdn.datatables.net/buttons/2.0.1/js/buttons.print.min.js', function () {
        
        CargarFunciones();
    })
}
function CargarFunciones() {
    loadScript('./funciones.js?n='+version, function () {
        CargarLogueoRegistro();
    })
}

function CargarLogueoRegistro() {
    loadScript('./scripts/logueoregistroafi.js?n='+version, function () {
        CargarFuncionalidad()
    })
}


function CargarFuncionalidad(){
    $.getScript('./scripts/cmafi.js?t='+version);
    $.getScript('./scripts/scrollwindow.js?t='+version);
    $("#footer").load("footer.html?t="+version);
    $("#divbotonflotante").load("botonflotante.html?t="+version);

}
