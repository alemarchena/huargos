import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import {auth} from './app/firebase.js'
import {logincheck} from './app/logincheck.js?a=56'

import './app/signupForm.js?a=56'
import './app/logout.js?a=56'
import './app/signinform.js?a=56'
import './app/googlelogin.js?a=56'
import './app/verclave.js?a=56'
import './app/turnos.js?a=56'
import './app/resetpassword.js?a=56'
import './app/formulario.js?a=56'

onAuthStateChanged(auth,async (user) => {
    logincheck(user);
})