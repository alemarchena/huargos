<?php
    include('../conexiones/parametros.php');
    date_default_timezone_set('America/Argentina/Mendoza');
    header('Content-Type: text/html; charset=UTF-8');

    //---------------------parametros recibidos en el POST----------------------
    
    $tabla              = "hureservas";
    $datosconsulta      = json_decode(file_get_contents('php://input'),true);
    
    $tipo               = $datosconsulta['tipo'];
    $idreserva          = $datosconsulta['idreserva'];
    $idturno            = $datosconsulta['idturno'];
    $idactividad        = $datosconsulta['idactividad'];
    $fechaactividad     = $datosconsulta['fechaactividad'];
    $horainicio         = $datosconsulta['horainicio'];
    $idalumno           = $datosconsulta['idalumno'];
    
    
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
        $sql = $basesql . " (idturno,idactividad,fechaactividad,horainicio,idalumno,fechainscribio) values($idturno,$idactividad,'$fechaactividad','$horainicio',$idalumno,'$fechahoraoperativa')";
    }else if($tipo == "modificar"){
        $basesql = "update " .$tabla;
        $sql = $basesql . " set idturno='$idturno',idactividad='$idactividad',fechaactividad='$fechaactividad',horainicio='$horainicio',idalumno='$idalumno' where idreserva =$idreserva";
    }else if($tipo == "eliminar"){
        $basesql = "delete from " .$tabla;
        $sql = $basesql . " where idreserva =" . $idreserva . "";
    }
    
    $resultado  = $mysqli->query($sql);
    echo $resultado;

    $mysqli->close();
?>
