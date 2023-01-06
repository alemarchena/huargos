<?php

//---------------------parametros recibidos en el POST----------------------
    $rutaimagenes="../imgalumnos/";

    $json = file_get_contents('php://input');
    $jsonima = json_decode($json, true);
   
    $imagen = $jsonima['imagen'];
    
    unlink($rutaimagenes . $imagen);
      
    echo $rutaimagenes . $imagen;
    
?>