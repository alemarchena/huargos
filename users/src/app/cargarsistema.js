export function LoadURL(url) 
{
    const d = document;
    const main = d.querySelector("#App");
    
    // Método para cargar cualquier página
    const getHTML = async (url) => {
        try {
            let res = await fetch(url);
            // Aquí es donde deberías revisar res.ok, antes de obtener los datos
            if(!res.ok) {
                throw {status: res.status, statusText: res.statusText};
            }
            let data = await res.text();
            main.innerHTML = data;
        } catch (err) {
            console.log('Error:', err);
            let message = err.statusText || "Ocurrio un error";
        }
    }

     getHTML(url);
}

export function ActivarSistema(){
    const sistema = document.getElementById('sistema');
    sistema.style.display = 'block';
}

export function DesActivarSistema(){
    const sistema = document.getElementById('sistema');
    sistema.style.display = 'none';
}