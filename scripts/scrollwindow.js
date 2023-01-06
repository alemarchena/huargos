
window.onscroll = function () { scrollfunction() };

function scrollfunction() 
{
    var winScroll = document.body.scrollTop;
    var height = document.body.scrollHeight - document.body.clientHeight;
    var scrolled = (winScroll / height) * 100;
    
    Funcionalidad(scrolled);

}


function Funcionalidad(movimiento){
    botonFlotante(movimiento);
}

function botonFlotante(m){
    let boton = document.getElementById("botonflotante");
    if(boton)
    {
        if(m > 10)
        { 
            boton.style.display= "block";
        }else{
            boton.style.display = "none";
        }
    }
}