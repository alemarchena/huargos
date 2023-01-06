<?php
    include('./parametros.php');
    date_default_timezone_set('America/Argentina/Mendoza');
    header('Content-Type: text/html; charset=UTF-8');

 //---------------------parametros recibidos en el POST----------------------

    $tabla              = "hureservas";
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

    $json = json_decode(file_get_contents('php://input'),true);
        
    $tipo               = $json['tipo'];
    $idturno            = $json['idturno'];
    $idactividad        = $json['idactividad'];
    $fechaactividad     = $json['fechaactividad'];
    $horainicio         = $json['horainicio'];
    $idalumno           = $json['idalumno'];
    $asistio            = $json['asistio'];
    
    if($tipo=="guardar"){
        $sql = "INSERT INTO " .$tabla. "(idturno,idactividad,fechaactividad,horainicio,idalumno,fechainscribio) values($idturno,$idactividad,'$fechaactividad','$horainicio',$idalumno,'$fechahoraoperativa')";
    }
    $contador=0;
    $resultado = $mysqli->query($sql);
    if($resultado){
        $contador = $contador + 1;
    }


    echo $contador;
    
    $mysqli->close();
?>
