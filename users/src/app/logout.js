import { signOut } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import {auth} from './firebase.js'
import { LoggMenu } from "./logincheck.js";
import { ShowMessage } from "./showmessage.js";
import {DesActivarSistema,LoadURL} from './cargarsistema.js'
import {Info,LlenarFormulario} from './formulario.js'

export const logout = document.querySelector("#logout");

logout.addEventListener('click',async ()=>{
    await signOut(auth);
    ShowMessage('Has salido de tu cuenta','success',3000);
    LoggMenu(0);
    DesActivarSistema();
    LoadURL("bienvenidos.html");
    const formulario = new Info('','','','','','','','','','','','','');
    LlenarFormulario(formulario);
    
    //Limpieza de la lista y el mensaje de impago
    let body = document.getElementsByTagName("section")[0];
    body.classList.add('table-responsive');
    while(body.firstChild){body.removeChild(body.firstChild);} 

    buchon.innerText = '';

})