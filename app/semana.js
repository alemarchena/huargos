 
function ListarSemana(orden){

    let arregloTurnos= [];
    let toPropuestas;

    let datosconsulta = {tipo : "consultatodo",idturno  : 0,idactividad:0,dia:''}

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
                    toPropuestas.idturno        = data[a].idturno;
                    toPropuestas.idactividad    = data[a].idactividad;
                    toPropuestas.actividad      = data[a].actividad;
                    toPropuestas.dia            = data[a].dia;
                    toPropuestas.duracion       = data[a].duracion;
                    toPropuestas.horainicio     = data[a].horainicio;
                    toPropuestas.idinstructor   = data[a].idinstructor;
                    toPropuestas.instructor     = data[a].instructor;
                    
                    arregloTurnos.push(toPropuestas);
                }

            }
        }
        CreaTabla(arregloTurnos);
        

    })
    .catch(function(error){console.log(error);});
}

let body;
let tabla;
let cuerpo;

function CreaTabla(arregloTurnos){

    // Obtener la referencia del elemento body
    body = document.getElementsByTagName("section")[0];
    body.classList.add('table-responsive');
    while(body.firstChild){body.removeChild(body.firstChild);} 
    
    // Crea un elemento <table> y un elemento <tbody>
    tabla   = document.createElement("table");
    tabla.classList.add('table');
    tabla.classList.add('table-striped');

    //Crea el cuerpo de la tabla
    cuerpo = document.createElement("tbody");
    
    LlenaTurnosSemana(body,tabla,cuerpo,arregloTurnos);
    LlenaTurnosSemana(body,tabla,cuerpo,arregloTurnos);
    
    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(cuerpo);
    // appends <table> into <body>
    body.appendChild(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");
}

function LlenaTurnosSemana(body,tabla,cuerpo,arregloTurnos) {

    let hilera;
    let columna;
    let celda;
    let contenido;

    // Crea las celdas
    for (let i = 0; i < arregloTurnos.length; i++)
    {
      // Crea las hileras de la tabla
        hilera = document.createElement("tr");
        columna = document.createElement("th");
        celda = document.createElement("td");
        contenido = document.createTextNode(arregloTurnos[i].actividad + " - " + arregloTurnos[i].horainicio);

        celda.appendChild(contenido);
        columna.appendChild(celda);
        hilera.appendChild(columna);
        
        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        cuerpo.appendChild(hilera);
    }
  }

  ListarSemana();