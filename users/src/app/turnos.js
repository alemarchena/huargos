import {ShowMessage} from './showmessage.js'
import {tipoTurno} from './accesobdd.js'
import {diaslimite} from './clasespendientes.js?a=54'

let fechaTurnos = document.getElementById('fechaturnos');
const idalumno  = document.getElementById('idalumno');
const buchon = document.getElementById('buchon');

let arregloTurnos = [];
const colorOriginal="#198754";
const colorPresionado="#b3a845";
let botonpreferido='';
let llamomisturnos = false;

document.getElementById('consultarxactividad').addEventListener('click',()=>{
    TraeDatosInteres('actividad')
    botonpreferido = 'actividad';
})

document.getElementById('consultarxhora').addEventListener('click',()=>{
    TraeDatosInteres('horainicio')
    botonpreferido = 'horainicio';
})
const ColocarFechaInicio = (()=>{
    fechaTurnos.value = new Date().toJSON().slice(0,10);
})

ColocarFechaInicio();

//   ----------------------- Datos de Interes ------------------------------

let arreglointeres = [];


async function TraeDatosInteres(botonelegido){

    let datosconsulta = {tipo : "consultafechaenadelante",idalumno  :idalumno.value,fecha:fechaTurnos.value}

    fetch("./controladores/consultainteres.php",{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})
    .then(response =>{
        if(response.statusText == 'OK')
        {
        }
        return response.json();
    })
    .then(data=>{
        const cantidad = data.length;

        if(cantidad > 0){

            for(let a=0;a<data.length;a++){
            //crea el arreglo con los turnos en los que se incribio
            let objinteres = new Object();
            objinteres.idreserva      = data[a].idreserva;
            objinteres.idturno        = data[a].idturno;
            objinteres.idactividad    = data[a].idactividad;
            objinteres.fechainscribio = data[a].fechainscribio;
            objinteres.fechaactividad = data[a].fechaactividad;
            objinteres.horainicio     = data[a].horainicio;
            objinteres.idalumno       = data[a].idalumno;
            objinteres.asistio        = data[a].asistio;

            arreglointeres.push(objinteres);
            }
        }
        if(tipoTurno==0)
            PreCargaTurnos(botonelegido);
        else
            ListarturnosFijos(botonelegido);
    })
    .catch(function (error){
    console.log(error);
    });

}

export function PreCargaTurnos(orden)
  {
        arregloTurnos=[];
        let datosconsulta = {tipo : "consultaxfecha",orden:orden,idturno  : 0,fecha:fechaTurnos.value,idactividad:0}
        fetch("./controladores/consultaturnos.php?v=1",{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})
        .then(response => response.json())
        .then(data =>
        {
            let cantidad =  data.length;
            //  let cantidad = Object.keys(data).length;
            if(data[0] != 'desconocido')
            {
                for(let a = 0 ;a<cantidad;a++) //llenar la lista
                {
                    let toPropuestas = new Object();
                    toPropuestas.idturno      = data[a].idturno;
                    toPropuestas.idactividad  = data[a].idactividad;
                    toPropuestas.idalumno     = idalumno.value;
                    toPropuestas.actividad    = data[a].actividad;
                    toPropuestas.fecha        = data[a].fecha;
                    toPropuestas.duracion     = data[a].duracion;
                    toPropuestas.horainicio   = data[a].horainicio;
                    toPropuestas.idinstructor = data[a].idinstructor;

                    arregloTurnos.push(toPropuestas);
                }
            }

            // ---------------------- Busca pendientes -------------------

            let datosconsulta = {idalumno:idalumno.value}
            fetch("./controladores/buscarclasespendientes.php?n="+ version,{method:'POST',body:JSON.stringify(datosconsulta),headers:{'Content-Type':'application/json'}})   
            .then(response =>{
                return response.json();
            }).then(data => {
                let totalReserva =0;
                let totalVenta =0;
                let ultimaventa=false;
                let fechaultimaventa='';

                for(let v=0;v < data.length;v++)
                {
                    if(data[v].reservaoventa == "Reserva" && data[v].asistio == 1)
                    {
                        totalReserva = parseInt(totalReserva) + 1; //reservas ocupadas
                    }
                    if(data[v].reservaoventa == "Ventas")
                    {
                        if(!ultimaventa)
                        {
                            fechaultimaventa = data[v].fechapago;
                            ultimaventa = true;
                        }
                        totalVenta = parseInt(totalVenta) +  parseInt(data[v].tiempopagado); //compras del alumno
                    }
                }

                let Pendientes = totalVenta - totalReserva;
                Pendientes *= -1;

                let ProximoVencimiento = '';
                
                if(fechaultimaventa != '')
                {
                    ProximoVencimiento =  SumarDiasAfecha(fechaultimaventa,diaslimite,"dmy");
                }

                let mensajebuchon = 'Superó 3 clases impagas, por favor regularice para ver los turnos';
                if(Pendientes > 3)
                {
                    buchon.innerText = mensajebuchon;
                }else{
                    buchon.innerText = '';
                    LlenaTurnos(arregloTurnos);
                }
                
                if(ProximoVencimiento > FechaActualddmmyyyy())
                {
                    ShowMessage("Tiene clases vencidas, solicite renovarlas.","error",4000);
                }
            })
            .catch(function (error){ 
                console.log(error); 
                ShowMessage("Error al leer las clases pendientes","error",3000);
            });

        //-------------------------- fin busca pendientes ------------
        })
        .catch(function(error){
            console.log(error);
        });
  }

  
function ListarturnosFijos(orden){

    arregloTurnos= [];
    let toPropuestas;
    let diadelasemana = DiaSemanaYMD(fechaturnos.value);

    let datosconsulta = {orden:orden,tipo : "consultaxdia",idturno  : 0,idactividad:0,dia:diadelasemana.diatexto}

    fetch("./controladores/consultaitinerario.php",{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})   
    .then(response => response.json())
    .then(data => 
    {
        let cantidad =  data.length;
        if(data[0]!='desconocido')
        {
            if(cantidad>0)
            {
                for(let a = 0 ;a<cantidad;a++) //llenar la Listar
                {
                    toPropuestas = new Object();
                    toPropuestas.idturno = data[a].idturno;
                    toPropuestas.idactividad = data[a].idactividad;
                    toPropuestas.idalumno     = idalumno.value;
                    toPropuestas.actividad = data[a].actividad;
                    toPropuestas.fecha = fechaturnos.value
                    toPropuestas.duracion = data[a].duracion;
                    toPropuestas.horainicio = data[a].horainicio;
                    toPropuestas.idinstructor = data[a].idinstructor;
                    toPropuestas.instructor = data[a].instructor;
                    
                    arregloTurnos.push(toPropuestas);
                }

            }
        }

        // ---------------------- Busca pendientes -------------------

        let datosconsulta = {idalumno:idalumno.value}
            fetch("./controladores/buscarclasespendientes.php?n="+ version,{method:'POST',body:JSON.stringify(datosconsulta),headers:{'Content-Type':'application/json'}})   
            .then(response =>{
                return response.json();
            }).then(data => {
                let totalReserva =0;
                let totalVenta =0;
                let ultimaventa=false;
                let fechaultimaventa='';

                for(let v=0;v < data.length;v++)
                {
                    if(data[v].reservaoventa == "Reserva" && data[v].asistio == 1)
                    {
                        totalReserva = parseInt(totalReserva) + 1; //reservas ocupadas
                    }
                    if(data[v].reservaoventa == "Ventas")
                    {
                        if(!ultimaventa)
                        {
                            fechaultimaventa = data[v].fechapago;
                            ultimaventa = true;
                        }
                        totalVenta = parseInt(totalVenta) +  parseInt(data[v].tiempopagado); //compras del alumno
                    }
                }

                let Pendientes = totalVenta - totalReserva;
                Pendientes *= -1;

                let ProximoVencimiento = '';
                
                if(fechaultimaventa != '')
                {
                    ProximoVencimiento =  SumarDiasAfecha(fechaultimaventa,diaslimite,"dmy");
                }

                let mensajebuchon = 'Superó 3 clases impagas, por favor regularice para ver los turnos';
                if(Pendientes > 3)
                {
                    buchon.innerText = mensajebuchon;
                }else{
                    buchon.innerText = '';
                    LlenaTurnos(arregloTurnos);
                }
                
                if(ProximoVencimiento > FechaActualddmmyyyy())
                {
                    ShowMessage("Tiene clases vencidas, solicite renovarlas.","error",4000);
                }
            })
            .catch(function (error){ 
                console.log(error); 
                ShowMessage("Error al leer las clases pendientes","error",3000);
            });

        //-------------------------- fin busca pendientes ------------

    })
    .catch(function(error){console.log(error);});
}

export function Limpia()
{
    let body = document.getElementsByTagName("section")[0];
    body.classList.add('table-responsive');
    while(body.firstChild){body.removeChild(body.firstChild);} 
    arregloTurnos = [];
    arreglointeres = [];
}

function LlenaTurnos(arregloTurnos) 
{
    // Obtener la referencia del elemento body
    let body = document.getElementsByTagName("section")[0];
    body.classList.add('table-responsive');
    while(body.firstChild){body.removeChild(body.firstChild);} 

    // Crea un elemento <table> y un elemento <tbody>
    let tabla   = document.createElement("table");
    tabla.classList.add('table');
    tabla.classList.add('table-striped');

    let tblBody = document.createElement("tbody");
    let encontroReserva=false;
    let asistioClase=false;
    // Crea las celdas
    for (let i = 0; i < arregloTurnos.length; i++) 
    {
      // Crea las hileras de la tabla
        let hilera = document.createElement("tr");
        let columna1 = document.createElement("th");
        let columna2 = document.createElement("th");
        let columna3 = document.createElement("th");

        let celda1 = document.createElement("td");
        let celda2 = document.createElement("td");
        let celda3 = document.createElement("td");
        
        let actividad = document.createTextNode(arregloTurnos[i].actividad);
        celda1.appendChild(actividad);
        columna1.appendChild(celda1);

        //Verifica si está anotado 
        for(let v=0;v < arreglointeres.length;v++)
        {
            if(arregloTurnos[i].idalumno == arreglointeres[v].idalumno &&
            arregloTurnos[i].idturno == arreglointeres[v].idturno )
            {
                encontroReserva = true;

                if(arreglointeres[v].asistio == 1)
                    asistioClase = true;

                //elimino del arreglo el turno que se quito
                const turnodelete = arreglointeres[v].idturno ;
                arreglointeres = arreglointeres.filter(item => item.idturno != turnodelete)
            }
        }
        
        
        let botonMeanoto = document.createElement("button");
        botonMeanoto.id = "Reserva" + arregloTurnos[i].idturno;

        if(!encontroReserva){
            botonMeanoto.innerHTML = "Me anoto";
            botonMeanoto.style.backgroundColor = colorOriginal;
        }else{
            if(asistioClase)
            {
                botonMeanoto.innerHTML = "Asistió";
                botonMeanoto.style.backgroundColor = "white";
                botonMeanoto.disabled = true;
            }else{
                botonMeanoto.innerHTML = "Anotado";
                botonMeanoto.style.backgroundColor = colorPresionado;
            }
        }
    
        botonMeanoto.classList.add("btn");
        
        botonMeanoto.onclick = (e)=>{
            e.preventDefault();

            if(!asistioClase)
                Meinteresa(e.target.id);
            else
                ShowMessage("Ya asistió a esta clase","error")

        }

        celda2.appendChild(botonMeanoto);
        columna2.appendChild(celda2);
        
        encontroReserva = false;
        asistioClase = false;

        let horainicio = document.createTextNode(arregloTurnos[i].horainicio);
        celda3.appendChild(horainicio);
        columna3.appendChild(celda3);


        hilera.appendChild(columna1);
        hilera.appendChild(columna2);
        hilera.appendChild(columna3);
        
      // agrega la hilera al final de la tabla (al final del elemento tblbody)
      tblBody.appendChild(hilera);
      
    }
  
    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");

  }

const ProVen = (()=>{
    return ProximoVencimiento();
})

const ClaPen = (()=>{
    return ClasesPendientes();
})

let leaviso = false;

function Meinteresa(valorrecibido)
  {
    document.getElementById("espera").style.visibility = "visible";
    const valor = document.getElementById(valorrecibido);
    const solovalor = valor.id.toString().replace("Reserva",'');
    
    document.getElementById(valorrecibido).disabled = true;
    let interes=null;
    
    for(let a=0;a<arregloTurnos.length;a++)
    {
      if(arregloTurnos[a].idturno == solovalor)
      {
          interes = new Object();
          interes.idturno         = arregloTurnos[a].idturno;
          interes.idactividad     = arregloTurnos[a].idactividad;
          interes.fechaactividad  = arregloTurnos[a].fecha;
          interes.horainicio      = arregloTurnos[a].horainicio;
          interes.idalumno        = arregloTurnos[a].idalumno;
          interes.asistio         = 0;
          interes.tipo            = 'guardar';
      }
    }

    let boton = document.getElementById(valorrecibido);

    if(boton)
    {
      if(boton.innerText =="Anotado")
      {
        boton.innerText ="Me anoto";
        boton.style.backgroundColor = colorOriginal;
        boton.style.color = "white";

        EliminarInteres(interes,solovalor);

      }else{

        boton.innerText ="Anotado";
        boton.style.color = "black";
        boton.style.backgroundColor = colorPresionado;

        GuardarInteres(interes,solovalor);
      }
    }
  }

  
function GuardarInteres(interes,valor){

    document.getElementById("espera").style.visibility = "visible";
    fetch("./controladores/guardarinteres.php?n="+ version,{method:'POST',body: JSON.stringify( interes ),headers:{'Content-Type':'application/json'}})
    .then(response =>{
      if(response.statusText == 'OK')
      {

      }
      return response.json();
    })
    .then(data=>{

      if(data>=1)
      {
        arreglointeres = [];
        TraeDatosInteres(botonpreferido);
        document.getElementById("espera").style.visibility = "hidden";
        document.getElementById("Reserva"+valor).disabled = false;

      }
    })
    .catch(function (error){
          console.log(error);
    });
  }

function EliminarInteres(interes,valor){
      document.getElementById("espera").style.visibility = "visible";

      let datosconsulta = {tipo : "consultaxidalumnoyturno",idalumno  : idalumno.value,fechadesde:'',idturno:interes.idturno}
      fetch("./controladores/consultareservas.php",{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})
      .then(response => response.json())
      .then(data =>
      {
          let cantidad =  data.length;
          //  let cantidad = Object.keys(data).length;
          if(data[0] != 'desconocido')
          {
            if(data[0] != undefined)
            {
                if(data[0].asistio==0)
                {
                // ----------------------------------------------------
                datosconsulta = {idalumno:interes.idalumno,idactividad:interes.idactividad,idturno:interes.idturno}

                fetch("./controladores/eliminarinteres.php?n="+ version,{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})
                .then(response =>{
                if(response.statusText == 'OK'){}
                    return response.json();
                })
                .then(data=>
                {
                    if(data>=1)
                    {
                    if(llamomisturnos==true)
                        MisTurnos();

                    }
                    document.getElementById("espera").style.visibility = "hidden";
                    document.getElementById("Reserva"+valor).disabled = false;
                })
                .catch(function (error){
                    console.log(error);
                });
                // --------------------------------------------------
                }
                else{
                    if(llamomisturnos==true)
                        MisTurnos();
                    else
                    {
                        arreglointeres = [];
                        TraeDatosInteres(botonpreferido);
                    }
                    document.getElementById("espera").style.visibility = "hidden";
                    document.getElementById("Reserva"+valor).disabled = false;
                    ShowMessage('Ya asistió a este turno','error')
                }
            }
          }
      })
      .catch(function(error){
        console.log(error);
        return false;
      });
      
  }

  
function DiaSemanaYMD(fecha){
    
    fecha = new Date(fecha);
    let fechaexacta = new Date(fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset()));

    let dia=fechaexacta.getDay()
    let dialetra='';

    let diasem=new Object();
    diasem.diavalor =dia;
    switch(dia)
    {
        case 0 :
            dialetra = "Domingo";
            break;
        case 1 :
            dialetra = "Lunes";
            break;
        case 2 :
            dialetra = "Martes";
            break;
        case 3 :
            dialetra = "Miércoles";
            break;
        case 4 :
            dialetra = "Jueves";
            break
        case 5 :
            dialetra = "Viernes";
            break
        case 6 :
            dialetra = "Sábado";
            break;
    }
    diasem.diatexto =dialetra;
    return diasem;
}

function FechaActualddmmyyyy(){

    const tiempotranscurrido = Date.now();
    const hoy = new Date(tiempotranscurrido);
    hoy.toLocaleDateString();
    return FormatoFecha(hoy,"dd/mm/yyyy");
    
};

  function FormatoFecha(fecha, formato){
    const map = {
      dd: fecha.getDate(),
      mm: fecha.getMonth() + 1,
      yy: fecha.getFullYear().toString().slice(-2),
      yyyy: fecha.getFullYear()
    }
    return formato.replace(/dd|mm|yyyy/gi, matched => map[matched])
}

function SumarDiasAfecha(fechapasada,numero,como) {
    //la fecha
    let fecha = new Date(fechapasada);
    fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset())
  
    var TuFecha = new Date(fecha);
    
    //dias a sumar
    var dias = parseInt(numero);
    
    //nueva fecha sumada
    TuFecha.setDate(TuFecha.getDate() + dias);
  
    let nuevodia = TuFecha.getDate();
    nuevodia<10 ? nuevodia = "0"+nuevodia : nuevodia;
    
    let nuevomes = TuFecha.getMonth() + 1;
    nuevomes <10 ? nuevomes = "0"+nuevomes : nuevomes;
  
    //formato de salida para la fecha
      if(como=="dmy")
      {
        return nuevodia + '/' + nuevomes + '/' + TuFecha.getFullYear();
      }else{
        return TuFecha.getFullYear() + "-" + nuevomes + "-" + nuevodia;
      }
  }