import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import {auth} from './app/firebase.js'
import {logincheck} from './app/logincheck.js?a=54'

import './app/signupForm.js?a=54'
import './app/logout.js?a=54'
import './app/signinform.js?a=54'
import './app/googlelogin.js?a=54'
import './app/verclave.js?a=54'
import './app/turnos.js?a=54'
import './app/resetpassword.js?a=54'

onAuthStateChanged(auth,async (user) => {
    logincheck(user);
})