import {sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import {auth} from './firebase.js'
import {ShowMessage} from './showmessage.js'

const resetpassword = document.getElementById('resetpassword');
const loginemail = document.getElementById('loginemail');

resetpassword.addEventListener('click',()=>{

         
    sendPasswordResetEmail(auth, loginemail.value)
    .then( ()=> {

        ShowMessage('Enviamos un email de recuperación de clave, revisa la carpeta spam','success',7000);
    })
    .catch(error =>{
        if(loginemail.value == '')
            ShowMessage('Ingresa una dirección de email','error',5000);
        else
            ShowMessage(`Hubo un error : ${error} , al enviar el email de recuperación de clave.`,'success',5000);
    })

})
