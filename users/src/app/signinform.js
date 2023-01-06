import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import {auth} from './firebase.js'
import {LoadURL} from './cargarsistema.js'
import {CerrarModal,MostarImagenLogin} from './modal.js'
import {ShowMessage} from './showmessage.js'
import {LeerCodigoUsuarioBDD} from './accesobdd.js'

// import { Loguear } from "./formulario.js";

const signinform = document.querySelector("#login-form");
const codigo = document.querySelector("#codigo");

signinform.addEventListener('submit',async (e)=>{
    e.preventDefault();

    const email = signinform['loginemail'].value;
    const password = signinform['passwordemail'].value;

    try{
        const credentials = await signInWithEmailAndPassword(auth,email,password);

        //Cerrar el modal de boostrap y mostrar la imagen en el login
        CerrarModal();
        ShowMessage("Bienvenid@ " + credentials.user.email  ,"success",3000);
        LoadURL('sistema.html?'+version)
       
    }catch(error){
        if(error.code === 'auth/wrong-password')
        {
            ShowMessage("Password errónea","error",3000);
        }else if(error.code === 'auth/user-not-found')
        {
            ShowMessage("El usuario no existe","error",3000);
        }else
        {
            ShowMessage(error,"error",3000);
        }
    }
})

document.getElementById('logincodigo').addEventListener('click',(e)=>{
    if(codigo.value != '')
        LeerCodigoUsuarioBDD(codigo.value);
    else
        ShowMessage("Ingrese un código válido","error",4000)
    e.preventDefault();
})



