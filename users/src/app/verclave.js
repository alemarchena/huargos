
function mostrarPassword() { 
    var cambio = document.getElementById("passwordemail"); 
    if (cambio.type == "password") { 
        cambio.type = "text"; 
        const boton = document.getElementById("verclave");
        boton.classList.remove('fa-eye-slash');
        boton.classList.add('fa-eye');
        
    } else { 
        cambio.type = "password"; 
        const boton = document.getElementById("verclave");
        boton.classList.add('fa-eye-slash');
        boton.classList.remove('fa-eye');
    } 
} 

document.getElementById("verclave").addEventListener('click', ()=>{mostrarPassword();});