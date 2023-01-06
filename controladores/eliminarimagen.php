<?php

//---------------------parametros recibidos en el POST----------------------
    $rutaimagenes="../imgalumnos/";

    $datosconsulta      = json_decode(file_get_contents('php://input'),true);
    $imagen               = $datosconsulta['imagen'];

    unlink($rutaimagenes . $imagen);

    echo $rutaimagenes . $imagen;
    
?>