import {datos,LlenarFormulario, Info} from './formulario.js?a=56'
import {CerrarModal,MostarImagenLogin} from './modal.js?a=56'
import {ShowMessage} from './showmessage.js?a=56'
import {LoggMenu} from './logincheck.js?a=56'
import {DesActivarSistema, ActivarSistema,LoadURL} from './cargarsistema.js?a=56'
import {ConvierteaDMA} from './clases.js?a=56'
import {Limpia} from './turnos.js?a=56'
import {ConsultaDiasLimite,diaslimite} from './clasespendientes.js?a=56'

let imagenlogueado  = document.querySelector("#imagenlogueado");


export const LeerCodigoUsuarioBDD = ((codigo)=>{
    Ingresa('consultaxusuario','','',codigo)
    CerrarModal();
})

//Consulta la base de datos para ver si existe el alumno
export const LeerDatosUsuarioBDD = ((emailDatos)=>{
        Ingresa('consultaxemail','',emailDatos,'')
})

function Ingresa(tipo,id,email,usuario)
{
    document.cookie.split(";").forEach(function(c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    let datosconsulta = {tipo:tipo,idalumno:id,email:email,usuario:usuario}
    fetch('./controladores/consultaalumnos.php?100',{method:'POST',body:JSON.stringify(datosconsulta),headers:{'Content-Type':'application/Json'}})
    .then(response=>
    {
        if(response.status==200)
        {
            return response.json();
        }
    })
    .then(data=>
        {
        if(data.length>0)
        {
            ConsultaTipoTurno();

            const formulario = new Info(data[0].idalumno,data[0].usuario,data[0].dni,data[0].nombre,data[0].apellido,data[0].whatsapp,data[0].fechanacimiento,data[0].clave,data[0].foto,data[0].certificado,data[0].fechaalta,data[0].estado,data[0].email,data[0].diasvencimiento);
            
            LlenarFormulario(formulario);
            if(usuario!='' && email == '') //Entro con usuario
            { 

                if(data[0].foto != '')
                   MostarImagenLogin(data[0].foto);
                else
                    MostarImagenLogin("avatarvacio.jpg");
            }else // Entro con email
            {
                if(data[0].foto != '')
                   MostarImagenLogin(data[0].foto);
                else
                    MostarImagenLogin('avatarvacio.jpg');

            }

            LoggMenu(1);
            LoadURL('sistema.html?'+version)
            ActivarSistema();
            ConsultaDiasLimite();

            
        }else{

            if(email != '')
            {
                CrearUsuarioBDD(email)
                ShowMessage("Hemos registrado su primer ingreso.","success",4000);
                LoggMenu(1);
                LoadURL('sistema.html?'+version)
                ActivarSistema();
            }else
            {
                imagenlogueado.src = '';
                LoggMenu(0);
                DesActivarSistema();
                ShowMessage("El código ingresado no existe en el sistema.","error",3000);
            }
        }
    })
    .catch(function(error)
    {
        console.log(error);
    });
}

//Crea el alumno en caso que no exista
export const CrearUsuarioBDD = ((emailnuevo)=>{
    GuardarDatos(emailnuevo);     
})

function GuardarDatos(email)    
{
    let datosconsulta = {tipo : 'guardar',idalumno  : 0,nombre : '',apellido:'',dni:'',email:email,whatsapp:'',foto:'',certificado:'',estado:1,fechanacimiento:'',usuario  : '',diasvencimiento:diaslimite}
    fetch("./controladores/abmalumnos.php?n="+ version,{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})   
    .then(response =>{
        return response.json();
    }).then(data => {
        if(data == 1){
            const formulario = new Info('','','','','','','','','','','','',email,diaslimite);
            LlenarFormulario(formulario);
            setTimeout(() => {
                ShowMessage("Ingresando por primera vez...","success",3000);
                Ingresa('consultaxemail','',email,'')
            }, 1000);
        }
    })
    .catch(function (error){ 
        console.log(error); 
        ShowMessage("Error al guardar en la base de datos","error",3000);
    });
}



// ----------------------- Modificaciones de datos -----------------------
const idalumno = document.getElementById('idalumno');
const calendario = document.getElementById('calendario');
const fechaacimientotexto= document.getElementById('fechaacimientotexto');

//Actualiza los datos del alumno en la base de datos
export const ABDD = ((campo,valor,tipodato)=>{
    valor = valor.replace("'",'`');
    let datosconsulta = {idalumno  : idalumno.value,campo : campo,valor:valor,tipodato:tipodato}
    fetch("./controladores/actualizaalumnos.php?n="+ version,{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})   
    .then(response =>{
        return response.json();
    }).then(data => {
        if(data == 1){
            ShowMessage(campo+" guardado..","success",2000)
        }
    })
    .catch(function (error){ 
        console.log(error); 
        ShowMessage("Error al guardar en la base de datos","error",3000);
    });
})



document.addEventListener('change',function(e){

    let uck = e.target.id;
    let valor = this.getElementById(uck).value;
    
    uck == 'nombre'     ? ABDD('nombre',valor,'texto')  : false;
    uck == 'apellido'   ? ABDD('apellido',valor,'texto'): false;
    uck == 'usuario'    ? ABDD('usuario',valor,'texto') : false;
    uck == 'dni'        ? ABDD('dni',valor,'texto')     : false;
    uck == 'whatsapp'   ? ABDD('whatsapp',valor,'texto'): false;
    uck == 'calendario' ? ABDD('fechanacimiento',valor,'texto') : false;
    if(uck == 'diaselect')
    {
        let fechavalida = new Date(calendario.value)
        if(fechavalida == 'Invalid Date')
            ShowMessage('Verifique la fecha','Error',3000)
        else{
            fechaacimientotexto.innerText = ConvierteaDMA(calendario.value);
            ABDD('fechanacimiento',fechavalida,'texto')
        }
    }
    uck == 'email' ? ShowMessage('Se ha intentado cambiar el email','error') : false;
    uck == 'idalumno' ? ShowMessage('Se ha intentado cambiar el id del alumno','error',3000) : false;
    uck == 'fechaturnos' ? Limpia() : false;

    e.preventDefault();
});


export let tipoTurno=-1;
function ConsultaTipoTurno()
{
    const quehace='consulta';
    let datosconsulta = {tipo  : 0,quehace:quehace}

    fetch("./controladores/setturno.php",{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})   
    .then(response =>{
        if(response.statusText == 'OK'){}
        return response.text();
    }).then(data => {
        tipoTurno = data;
    })
    .catch(function (error){ console.log(error); });
}
