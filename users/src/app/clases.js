class FechaDMY
{
    constructor(diacomponent,mescomponent,aniocomponent,diasdelmes,fechacomponent){
        this.diacomponent   = diacomponent;
        this.mescomponent   = mescomponent;
        this.aniocomponent  = aniocomponent;
        this.diasdelmes     = diasdelmes;
        this.fechacomponent = fechacomponent;
    }
}


window.onload = function(){

    LlenaAnios();   
}

function LlenaAnios(){
    let anioactual=new Date();
    let selectanio = document.getElementById("anioselect");
    if(selectanio){
        for(let a=anioactual.getFullYear()-100;a<=anioactual.getFullYear()-5;a++){
            let opcion = document.createElement('option');
            opcion.value = a;
            opcion.text= a;
            selectanio.appendChild(opcion); 
        }
    }
}
function VerAnio(){

    let selectanio = document.getElementById("anioselect");

    let anioseleccionado=selectanio.options[selectanio.selectedIndex];
    let aniocomponent= anioseleccionado.text;

    return aniocomponent;
}
function VerMes(){

    let selectmes=document.getElementById("messelect");
    let messeleccionado = selectmes.options[selectmes.selectedIndex];
    let mescomponent= messeleccionado.text;

    return messeleccionado.value;
}
function VerDia(){

    let selectdia=document.getElementById("diaselect");
    let diasseleccionado = selectdia.options[selectdia.selectedIndex];
    let diacomponent= diasseleccionado.text;

    return diacomponent.value;
}
function VerFechaDMY(){
    return document.getElementById("calendario").value;
}
function CalculaDias(){

    let aniocomponent = VerAnio();
    let mescomponent = VerMes(); //devuelve el nombre de mes
    let diasdelmes=0;

    if(aniocomponent!="Año")
    {
        let bisiesto = new Date(aniocomponent, 1, 29).getMonth() == 1;
        bisiesto ? (diasdelmes = 29) : (diasdelmes = 28);
    }else
    {
        diasdelmes =0;
    }


    if(mescomponent!="Mes")
    {
        let mes = mescomponent;

        if ((mes === "01") ||
            (mes === "03") ||
            (mes === "05") ||
            (mes === "07") ||
            (mes === "08") ||
            (mes === "10") ||
            (mes === "12")
        ) { diasdelmes = 31;} 
        else if (
            (mes === "04") |
            (mes === "06") |
            (mes === "09") |
            (mes === "11")
        ) { diasdelmes = 30; } 
    }

   return diasdelmes;
}
function CambiaMesAnio(){
    BlanqueaDia();
    let diasdelmes  = CalculaDias();
    CargaDias(diasdelmes);
}

//Calcula la fecha con formato dd-mm-yyyy
function CalculaFecha(dia){
   
    let anio    = VerAnio();
    let mes     = VerMes();
    // let fecha = new Date(anio, mes, dia);
    let fecha = dia+"-"+mes+"-"+anio;
    return fecha;
}

function CargaDias(diasdelmes)
{
    let selectdia = document.getElementById("diaselect");
    
    let valor='';
    if(selectdia){
        for(let a=1;a<=diasdelmes;a++){
            let opcion = document.createElement('option');
            if(a<10)valor = "0"+a;else valor = a;
            opcion.value = valor;
            opcion.text= valor;
            selectdia.appendChild(opcion); 
        }
    }
}

function BlanqueaDia(){
    let selectdia = document.getElementById("diaselect");
    selectdia.innerHTML = '<option selected>Día</option>';
    document.getElementById("calendario").value = "";

}

function BlanqueaEdad(){
    let edad = document.getElementById("edad");
    if(edad)
    {
        edad.value = '';
    }
}

function AsingaFechaCalendario(fecha){

    let fechanueva=FechaAMD(fecha);
    document.getElementById("calendario").value = fechanueva;
}

//recibe una fecha dia-mes-anio
export function FechaAMD(fecha){

    let dia = fecha.substring(0, 2);
    let mes = fecha.substring(3, 5);
    mes = mes.toString();
    if(mes.length < 2)
    mes = "0" + mes;

    let anio = fecha.substring(6, 10);
    
    let fechanueva = anio+"-"+ mes+"-"+dia;

    return fechanueva;
}

//recibe una fecha dia-mes-anio
 export function FechaDMA(fecha){

    let dia = fecha.substring(0, 4);
    let mes = fecha.substring(5, 7);
    mes = mes.toString();
    if(mes.length < 2)
    mes = "0" + mes;

    let anio = fecha.substring(8, 10);
    
    let fechanueva =dia+"-"+mes+"-"+ anio;

    return fechanueva;
}
//Recibe año mes dia
export function ConvierteaDMA(fecha){

    let anio = fecha.substring(0, 4);
    let mes = fecha.substring(5, 7);
    mes = mes.toString();
    if(mes.length < 2)
    mes = "0" + mes;

    let dia = fecha.substring(8, 10);
    
    let fechanueva =dia+"-"+mes+"-"+ anio;

    return fechanueva;
}

function DevuelveEdad(fecha) {
      
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    if(edad<0)
    edad = 0;
    return edad;
}

document.getElementById("anioselect").addEventListener('change',function(){
    CambiaMesAnio()
});

document.getElementById("messelect").addEventListener('change',function(){
    CambiaMesAnio()
});

document.getElementById("diaselect").addEventListener('change',() => {
    
    let fecha  = CalculaFecha(document.getElementById("diaselect").value);
    AsingaFechaCalendario(fecha);
});

