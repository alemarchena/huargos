<?php
    include('../conexiones/parametros.php');

    date_default_timezone_set('America/Argentina/Mendoza');
    header('Content-Type: text/html; charset=UTF-8');

 //---------------------parametros recibidos en el POST----------------------

    $tabla              = "wcpropuestas";
    //-----------------conectando con la base de datos---------------------
        $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);

        if($mysqli->connect_error)
        {
            exit('No se pudo conectar a la base de datos');
        }
        
        mysqli_set_charset($mysqli,"utf8");
            
        $fho = new DateTime();
        $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');
    
    //--------------------------- Acciones -------------------------

    $paqueteFilas = $_POST['paqueteFilas'];
    $contador = 0;

    foreach ($paqueteFilas as $i => $value) 
    {
        
        // echo $paqueteFilas[$i];
        $objetoanuncio = json_decode($paqueteFilas[$i],true);
        $bodega = $objetoanuncio['bodega'];
        $propuesta = $objetoanuncio['propuesta'];
        $textovalor = $objetoanuncio['textovalor'];
        $valorpesos = $objetoanuncio['valorpesos'];
        $valordolar = $objetoanuncio['valordolar'];
        $zona = $objetoanuncio['zona'];
        $servicio = $objetoanuncio['servicio'];
        $imagen = $objetoanuncio['imagen'];
        
        $sql = "INSERT INTO " .$tabla. "(bodega,   propuesta ,  textovalor ,  valorpesos  , valordolar,zona,servicio,imagen) values('$bodega','$propuesta','$textovalor','$valorpesos','$valordolar','$zona','$servicio','$imagen')";
        
        $resultado = $mysqli->query($sql);
        if($resultado){
            $contador = $contador + 1;
        }
    }

    echo $contador;
    
    $mysqli->close();
?>
