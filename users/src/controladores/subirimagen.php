<?php


//------------------ Funciones para la subida del archivo ---------------
require ("generaraleatorio.php");
$generar = new Generar();
function obtenerExtensionArchivo(string $nombrearchivo) : string{
    $nombre = explode(".",$nombrearchivo); //devuelve la ultima parte despues del punto
    return "." . array_pop($nombre); //retorna la extension
}
//-----------------------------------------------------------------------

if(isset($_FILES) && !empty($_FILES)) //FILES son los input file enviados por el dataform
{
    $archivos = array_filter($_FILES,function ($item){ //excluye el inputfile que viene vacio
        return $item["name"][0] != "";
    });
   
    
    foreach($archivos as $inputfile) //recorre los inputfile que vienen en el arreglo
    {
        //generacion del nombre de la imagen a subir
        $tmp_name = $inputfile["tmp_name"];
        $name = $inputfile["name"];
        
        $extension = obtenerExtensionArchivo($name);
        // $nuevonombre = $tipo."-".$apellido."-".$generar->GenerarP(30).$extension; //genera un nombre aleatorio para el archivo
        $nuevonombre = $generar->GenerarP(30).$extension; //genera un nombre aleatorio para el archivo
        $path = "../imgalumnos/$nuevonombre";
        move_uploaded_file($tmp_name,$path);
    }

   
    echo $nuevonombre;
    die();

}
// header("location: ../");



?>