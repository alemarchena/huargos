<?php
    include('../conexiones/parametros.php');
    date_default_timezone_set('America/Argentina/Mendoza');
    header('Content-Type: text/html; charset=UTF-8');

    //---------------------parametros recibidos en el POST----------------------
    
    $tabla              = "hualumnos";
    $datosconsulta      = json_decode(file_get_contents('php://input'),true);
    
    $tipo               = $datosconsulta['tipo'];
    $idalumno                 = $datosconsulta['idalumno'];
    $nombre             = $datosconsulta['nombre'];
    $apellido           = $datosconsulta['apellido'];
    $dni                = $datosconsulta['dni'];
    $edad               = $datosconsulta['edad'];
    $whatsapp           = $datosconsulta['whatsapp'];
    
    $fho = new DateTime();
    $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');
    //-----------------conectando con la base de datos---------------------
    
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    if($mysqli->connect_error)
    {
        var_dump($mysqli->connect_error);
        exit('No se pudo conectar a la base de datos del sistema');
    }
    mysqli_set_charset($mysqli,"utf8");

    //--------------------------- Acciones -------------------------
    
    if($tipo == "guardar"){
        $basesql = "insert into " .$tabla;
        $sql = $basesql . " (nombre,apellido,dni,edad,whatsapp) values('$nombre','$apellido','$dni','$edad',$whatsapp)";
    }else if($tipo == "modificar"){
        $basesql = "update " .$tabla;
        $sql = $basesql . " set nombre='$nombre',apellido='$apellido',dni='$dni',edad='$edad',whatsapp='$whatsapp' where idalumno =$idalumno";
    }else if($tipo == "eliminar"){
        $basesql = "delete from " .$tabla;
        $sql = $basesql . " where idalumno =" . $idalumno . "";
    }
    
    $resultado  = $mysqli->query($sql);
    echo $resultado;

    $mysqli->close();
?>
