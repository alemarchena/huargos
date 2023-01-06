
import {Fotos} from './formulario.js';

const input     = document.querySelector("#input-file");

const idalumno  = document.getElementById('idalumno');

const fotoalumno  = document.getElementById('fotoalumno');
const certificado  = document.getElementById('certificado');


const botonfoto = document.getElementById('botonfoto');
const botoncertificado = document.getElementById('botoncertificado');

let quebotontoco;

botonfoto.addEventListener('click',(e)=>{
    e.preventDefault();
    quebotontoco='foto';
    input.click();
})

botoncertificado.addEventListener('click',(e)=>{
    e.preventDefault();
    quebotontoco='certificado';

    input.click();
})

input.addEventListener('change',(e) => {
    e.preventDefault();
    const file = input.files;
    showFile(file);
});


function showFile(files){

    if(files === undefined)
    {
        processFile(files);
    }else{
        for(const file of files){
            processFile(file);
        }
    }
}



function processFile(file)
{
    const tipo=file.type;
    const validExtentions = ['image/jpeg','image/jpg','image/png','image/gif'];

    if(validExtentions.includes(tipo) )
    {
        const fileReader = new FileReader();
        const id =  `file-${Math.random().toString(32).substring(7)}`;

        fileReader.addEventListener('load', e => {
            const fileURL = fileReader.result;

                const image =`
                <div id="${id}" class="row container">
                <div class='col-sm-12 col-md-6'>
                    <img src="${fileURL}" alt="${file.name}" width="100px" heigth="auto">
                </div>
                <div class='col-sm-12 col-md-6'>
                    <div class="status"></div>
                    <span>${file.name}</span>
                    <span id="span${id}">Cargando...</span>
                </div>
                `;

            const html = document.querySelector('#preview').innerHTML ;
            document.querySelector('#preview').innerHTML = image + html;
        });

        fileReader.readAsDataURL(file);
        uploadFile(file,id);
    }else{
        alert("No es un archivo válido")
    }
}



const uploadFile = async (file,id)=> {
    const formData = new FormData();
    formData.append("file",file);
    try {
        const response = await fetch('./controladores/subirimagen.php',{method:'POST', body:formData});
        const responseText = await response.text();

        //el div que contiene la imagen toma el nomrbe de la imagen mas un "div" adelante
        const divimagen = document.querySelector(`#${id}`);
        divimagen.id = responseText;
        divimagen.id="div"+ responseText.replace('.','-');

        document.querySelector(`#span${id}`).innerHTML = `<span class="success">Ok</span>`;

        ActualizaImagen(quebotontoco,idalumno.value,responseText)

    } catch (error) {
        document.querySelector(`#span${id}`).innerHTML = `<span class="failure">Error.</span>`;
    }
}

function ActualizaImagen(tipo,idalumno,imagen)    
{
    let datosconsulta = {tipo:tipo,idalumno  : idalumno,imagen : imagen}

    fetch("./controladores/actualizarimagenalumno.php?n="+ version,{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})   
    .then(response =>{
        return response.text();
    }).then(data => {
        if(data == 1)
        {
            if(tipo=='foto'){
                fotoalumno.src = "./imgalumnos/" + imagen;
                
                eliminaImagen(Fotos.foto)
                Fotos.foto = imagen;
            }
            if(tipo=='certificado'){
                certificado.src = "./imgalumnos/" + imagen;
                eliminaImagen(Fotos.certificado);
                Fotos.certificado = imagen;
            }
           
        }
    })
    .catch(function (error){ 
        console.log(error); 
        // alert("Error al actualizar la imagen");
    });
}

const eliminaImagen = async (imagen)=>
{
    //eliminar el archivo del atleta fisicamente
    let imagenobj = {
    imagen:imagen,
    }
    const eliminarjson = JSON.stringify(imagenobj);
    fetch("./controladores/eliminarImagen.php",{method:'POST',body:eliminarjson,headers:{'Content-Type':'application/json'}})
    .then(response => response.text())
    .then(data => {
    })
    .catch(function(error) {
    console.log(error)
    });
}
