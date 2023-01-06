const dropArea  = document.querySelector(".drag-area");

const dragText  = dropArea.querySelector('h5');
const button    = dropArea.querySelector('button');
const input     = dropArea.querySelector("#input-file");
const idalumno  = document.getElementById('idalumno');
const fotoalumno  = document.getElementById('fotoalumno');
const misimagenes  = document.getElementById('misimagenes');
let files;

button.addEventListener('click',(e) =>{
    e.preventDefault();

    input.click();
});

input.addEventListener('change',(e) => {
    e.preventDefault();

    const file = input.files;
    dropArea.classList.add("active");
    showFile(file);
    dropArea.classList.remove('active');
});

// mientras se arrastra
dropArea.addEventListener('dragover',(e) => {
    e.preventDefault();
    dropArea.classList.add('active');
    dragText.textContent = "Suelta para subir los archivos";
})

// arrastra pero esta fuera de la zona
dropArea.addEventListener('dragleave',(e) => {
    e.preventDefault();
    dropArea.classList.remove('active');
    dragText.textContent = "Arrastra y suelta las imagenes";
})

// cuando se suelta en la zona de archivos
dropArea.addEventListener('drop',(e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    showFile(files);
    dropArea.classList.remove('active');
    dragText.textContent = "Arrastra y suelta las imagenes";

})

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
                <div class='col-sm-12 col-md-3'>
                    <img src="${fileURL}" alt="${file.name}" width="50px">
                </div>
                <div class='col-sm-12 col-md-3'>
                    <div class="status"></div>
                    <span>${file.name}</span>
                    <span id="span${id}">Cargando...</span>
                </div>
                <div class='col-sm-12 col-md-3'>
                    <a href='#' id="botonmifoto${id}" onclick="SelectImage(this)" class='btn btn-info'>Es mi foto</a>
                </div>
                <div class='col-sm-12 col-md-3'>
                    <a  href='#' id="boton${id}" onclick="DeleteImage(this)" class='btn btn-danger'>Eliminar</a>
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

        //el boton que contiene la imagen toma el nombre de la imagen
        const botonmifoto = document.querySelector(`#botonmifoto${id}`);
        botonmifoto.id = "_"+responseText;

        //el boton que contiene la imagen toma el nombre de la imagen
        const boton = document.querySelector(`#boton${id}`);
        boton.id = responseText;

        //el div que contiene la imagen toma el nomrbe de la imagen mas un "div" adelante
        const divimagen = document.querySelector(`#${id}`);
        divimagen.id = responseText;
        divimagen.id="div"+ responseText.replace('.','-');

        document.querySelector(`#span${id}`).innerHTML = `<span class="success">Ok</span>`;

        GuardarImagen(idalumno.value,responseText);

    } catch (error) {
        document.querySelector(`#span${id}`).innerHTML = `<span class="failure">Error.</span>`;
    }
}

function DeleteImage(yo){
    eliminaImagen(yo.id);
}

function SelectImage(yo){
    yo.id = yo.id.replace('_','');
    ActualizaImagen(idalumno.value,yo.id)
}

function GuardarImagen(idalumno,imagen)    
{
    let datosconsulta = {tipo:'guardar',idalumno  : idalumno,imagen : imagen}

    fetch("./controladores/abmimagen.php?n="+ version,{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})   
    .then(response =>{
        return response.json();
    }).then(data => {
        if(data == 1){
        }
    })
    .catch(function (error){ 
        console.log(error); 
        alert("Error al guardar la imagen");
    });
}

function ActualizaImagen(idalumno,imagen)    
{
    let datosconsulta = {idalumno  : idalumno,imagen : imagen}

    fetch("./controladores/actualizarimagenalumno.php?n="+ version,{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})   
    .then(response =>{
        return response.text();
    }).then(data => {
        if(data == 1){
           fotoalumno.src = "./imgalumnos/" + imagen;
        }
    })
    .catch(function (error){ 
        console.log(error); 
        // alert("Error al actualizar la imagen");
    });
}

function EliminarImagenDBB(idalumno,imagen)    
{
    let datosconsulta = {tipo:'eliminar',idalumno  : idalumno,imagen : imagen}


    fetch("./controladores/abmimagen.php?n="+ version,{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})   
    .then(response =>{
        return response.text();
    }).then(data => {
        if(data == 1){
        }
    })
    .catch(function (error){ 
        console.log(error); 
        alert("Error al eliminar");
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

        EliminarImagenDBB(idalumno.value,imagen) 
        const encontrado = document.querySelector(`#div${imagen.replace('.','-')}`);
        while(encontrado.firstChild){
            encontrado.removeChild(encontrado.firstChild);
        }
      })
      .catch(function(error) {
        console.log(error)
      });

    
}

misimagenes.addEventListener('click',(e)=>{
    e.preventDefault()
    LevantarImagenes(idalumno.value);
})
function LevantarImagenes(idalumno)    
{
    const contenedorhtml = document.querySelector('#preview') ;

    while(contenedorhtml.firstChild){
        contenedorhtml.removeChild(contenedorhtml.firstChild);
    }

    let datosconsulta = {idalumno  : idalumno}

    fetch("./controladores/consultaimagenesalumnos.php?n="+ version,{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})   
    .then(response =>{
        return response.json();
    }).then(data => {
        if(data.length>0)
        {
            for(let a=0;a<data.length;a++)
            {
                let divima ="div"+ data[a].imagen.toString().replace('.','-');

                const image =`
                <div id="${divima}" class="row container " style='margin-bottom: 2.5em;'>
                    <div class='col-sm-12 col-md-3'>
                        <img src="${"./imgalumnos/"+data[a].imagen}" alt="${data[a].imagen}" width="50px">
                    </div>
                    <div class='col-sm-12 col-md-3'>
                        <div class="status"></div>
                        <span></span>
                        <span id="span${data[a].imagen}">Guardado</span>
                    </div>
                    <div class='col-sm-12 col-md-3' style='padding: 1em;'>
                        <button id="_${data[a].imagen}" onclick="SelectImage(this)" class='btn btn-sm btn-info'>Es mi foto</button>
                    </div>
                    <div class='col-sm-12 col-md-3'>
                        <button id="${data[a].imagen}" onclick="DeleteImage(this)" class='btn btn-sm btn-danger'>Eliminar</button>
                    </div>
                </div>
                `;

                const html = document.querySelector('#preview').innerHTML ;
                document.querySelector('#preview').innerHTML = image + html;
            }
        }
    })
    .catch(function (error){ 
        console.log(error); 
        alert("Error al leer las imagenes en la base de datos");
    });
}