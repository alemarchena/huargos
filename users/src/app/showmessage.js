export function ShowMessage(mensaje,tipo,duracion){

    Toastify({
        text: mensaje,
        duration: duracion,
        // destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: tipo === "success" ? 'light-blue':'red',
        },
        onClick: function(){} // Callback after click
    }).showToast();
}