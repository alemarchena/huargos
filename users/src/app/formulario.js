import {ConvierteaDMA} from './clases.js'
//--------------------------- Interfaz -------------------------------
class UI{

    DetenerCarrusel(){
        const myCarouselElement = document.querySelector('#carrusel')
        const carousel = new bootstrap.Carousel(myCarouselElement, {
        interval: false,
        touch:true,//admite interacciones de dedo en dispositivos moviles
        ride:false,//cicla automaticamente
        wrap: false//permite loopear el slider
        })
    }
    
    VerificaLimitesCarrusel(cuenta,movimiento){
        const carrusel =document.querySelectorAll('.carousel-item');
        if(movimiento>0)
        {
            if(cuenta >= carrusel.length )
            cuenta =  carrusel.length;
        }else{
            if(cuenta < 0 )
            cuenta =  0;
        }
        return cuenta;
    }

    ControlaSiguientePrevio(cuenta){
        const carrusel =document.querySelectorAll('.carousel-item');

        //si llego al inicio previo
        if(cuenta<=0){
            previo.classList.remove('text-black');
            previo.classList.add('text-muted');
            
        }else
        {
            previo.classList.remove('text-muted');
            previo.classList.add('text-black');
        }

        //Si llego al final siguiente
        if(cuenta>=carrusel.length-1){
            siguiente.classList.remove('text-black');
            siguiente.classList.add('text-muted');
            
        }else
        {
            siguiente.classList.remove('text-muted');
            siguiente.classList.add('text-black');
        }
        
        //Muestra u oculta el boton enviar
        // const enviar = document.getElementById('enviar');
        // if(cuenta>=carrusel.length-1){
        //     enviar.style.display = "inline";
        // }else
        // {
        //     enviar.style.display = "none";
        // }
    }

    Mensajero(contador){

        const mensaje = document.getElementById('mensaje');
        let contenido = '';
        
        switch(contador)
        {
            case 0:
                contenido = 'Información de las clases';
                break;
            case 1:
                contenido = 'Datos personales';
                break;
            case 2:
                contenido = 'Fecha de Nacimiento';
                break;
            case 3:
                contenido = 'Datos de contacto';
                break;
            case 4:
                contenido = 'Tu Imagen y el certificado de aptitud físico';
                break;
        }
        mensaje.innerHTML = contenido;
    }
    
}

let contador=0;
const ui = new UI();
ui.DetenerCarrusel();
ui.Mensajero(contador);

document.querySelector('#carrusel').addEventListener('slid.bs.carousel', event => {
    const ui = new UI();
    if(event.direction == 'left')
    {
        contador +=1;
        contador = ui.VerificaLimitesCarrusel(contador,1);
    }else{
        contador -=1;
        contador = ui.VerificaLimitesCarrusel(contador,-1);
    }
   
    ui.ControlaSiguientePrevio(contador);
    ui.Mensajero(contador);

    event.preventDefault();
})

//--------------------------- Datos -------------------------------

class Datos{
    
    constructor(emailDatos){
        this.emailDatos= emailDatos;
    }

    get ConsultaDatos(){
       return this.emailDatos;
    };
}

export let datos;

export const Loguear = ((emaillogueado)=>{
    datos = new Datos(emaillogueado);
});

export class Info
{
    constructor(idalumno,usuario,dni,nombre,apellido,whatsapp,fechanacimiento,clave,foto,certificado,fechaalta,estado,email,diasvencimiento){
        this.idalumno=idalumno;
        this.usuario=usuario;
        this.dni=dni;
        this.nombre=nombre;
        this.apellido=apellido;
        this.whatsapp=whatsapp;
        this.fechanacimiento=fechanacimiento;
        this.clave=clave;
        this.foto=foto;
        this.certificado=certificado;
        this.fechaalta=fechaalta;
        this.estado=estado;
        this.email=email;
        this.diasvencimiento=diasvencimiento;
    }
}

export class Fotos
{
    constructor(foto,certificado){
        this.foto     = foto;
        this.certificado  = certificado;
    }
}

export const LlenarFormulario=((f)=>{
    
    Info.idalumno       = f.idalumno;
    Info.usuario        = f.usuario;
    Info.dni            = f.dni;
    Info.nombre         = f.nombre;
    Info.apellido       = f.apellido;
    Info.email          = f.email;
    Info.whatsapp       = f.whatsapp;
    Info.calendario     = f.fechanacimiento;
    Info.foto           = f.foto;
    Info.certificado    = f.certificado;
    // console.log(f);
    idalumno.value = f.idalumno;
    usuario.value =f.usuario;
    dni.value = f.dni;
    nombre.value=f.nombre;
    apellido.value=f.apellido;
    email.value = f.email;
    whatsapp.value = f.whatsapp;
    calendario.value = f.fechanacimiento;

    fechanacimientotexto.innerText = ConvierteaDMA(f.fechanacimiento);

    Fotos.foto = f.foto;
    f.foto!=''    ? fotoalumno.src    = "./imgalumnos/" + f.foto    : fotoalumno.src    = "./imgalumnos/avatarvacio.jpg";
    
    Fotos.certificado = f.certificado;
    f.certificado!=''    ? certificado.src    = "./imgalumnos/" + f.certificado    : certificado.src    = "./imgalumnos/avatarvacio.jpg";


})

const previo = document.querySelector('#previo');
const siguiente = document.querySelector('#siguiente');


const idalumno              = document.getElementById('idalumno');
const usuario               = document.getElementById('usuario');
const nombre                = document.getElementById('nombre');
const apellido              = document.getElementById('apellido');
const dni                   = document.getElementById('dni');
const calendario            = document.getElementById('calendario');
const email                 = document.getElementById('email');
const whatsapp              = document.getElementById('whatsapp');
const fotoalumno            = document.getElementById('fotoalumno');
const certificado           = document.getElementById('certificado');
const fechanacimientotexto  = document.getElementById('fechanacimientotexto');
