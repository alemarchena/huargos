import {DesActivarSistema,LoadURL} from './cargarsistema.js?a=54'
import {Loguear} from './formulario.js'
import {LeerDatosUsuarioBDD} from './accesobdd.js?a=54'

const loggedinlinks = document.querySelectorAll(".logged-in");//boton de logout
const loggedoutlinks = document.querySelectorAll(".logged-out");//botones login y registro
const imagenlogueado  = document.querySelector("#imagenlogueado");

export const logincheck = user =>
{
    if(user){
        if(user.photoURL != null)
        {
           imagenlogueado.src = user.photoURL;
        }
        Loguear(user.email);
        LeerDatosUsuarioBDD(user.email);

    }else{
        LoggMenu(0);
        LoadURL('bienvenidos.html?'+version)
        DesActivarSistema();
    }
}

export const LoggMenu= ((estado)=>{
    if(estado==1) //se logueo
    {
        loggedoutlinks.forEach(link => link.style.display = "none")
        loggedinlinks.forEach(link => link.style.display = "block")
    }
    else // no se logueo
    {
        loggedoutlinks.forEach(link => link.style.display = "block")
        loggedinlinks.forEach(link => link.style.display = "none")
        imagenlogueado.src = '';

    }
})