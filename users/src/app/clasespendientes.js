import {ShowMessage} from './showmessage.js?a=54'
import {ConvierteaDMA} from './clases.js?a=54'

export let diaslimite=30;

const idalumno = document.getElementById('idalumno');
const clasespendientes = document.getElementById('clasespendientes');
const diasrestantesvencimiento = document.getElementById('diasrestantesvencimiento');
const clasespagadas = document.getElementById('clasespagadas');
const clasesusadas = document.getElementById('clasesusadas');
const ultimopago = document.getElementById('ultimopago');

export let Pendientes;
export let ProximoVencimiento;

export function ConsultaClasesPendientes ()    
{
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

        clasespendientes.value = totalVenta - totalReserva;
        Pendientes = clasespendientes.value * -1;

        
        // console.log("Total venta:" + totalVenta + "-" + "Total usada:" + totalReserva + " Ultima fecha de pago:"+ fechaultimaventa + "Dias limite : " + diaslimite);
        if(fechaultimaventa != '')
        {
           ProximoVencimiento =  SumarDiasAfecha(fechaultimaventa,diaslimite,"dmy");
            diasrestantesvencimiento.value = ProximoVencimiento;
        }else
        {
            diasrestantesvencimiento.value ='';
        }
         
        clasespagadas.value = totalVenta;
        clasesusadas.value = totalReserva;

        if(fechaultimaventa!='')
            ultimopago.value =  ConvierteaDMA(fechaultimaventa);
        else
            ultimopago.value = ''
        
    })
    .catch(function (error){ 
        console.log(error); 
        ShowMessage("Error al leer las clases pendientes","error",3000);
    });

}

export function ConsultaDiasLimite()    
{
    fetch("./controladores/consultadiaslimite.php?n="+ version,{method:'POST',headers:{'Content-Type':'application/json'}})   
    .then(response =>{
        return response.json();
    }).then(data => {
        diaslimite = data[0].diasvencimiento;
        ConsultaClasesPendientes()
    })
    .catch(function (error){ 
        console.log(error); 
        ShowMessage("Error al leer los días límite de vencimiento","error",3000);
    });
}


function SumarDiasAfecha(fechapasada,numero,como) {
    //la fecha
    let fecha = new Date(fechapasada);
    fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset())
  
    let TuFecha = new Date(fecha);
    
    //dias a sumar
    const dias = parseInt(numero);
    
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