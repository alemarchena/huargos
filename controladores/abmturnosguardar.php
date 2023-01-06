<?php
    include('../conexiones/parametros.php');
    date_default_timezone_set('America/Argentina/Mendoza');
    header('Content-Type: text/html; charset=UTF-8');

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

    //---------------------parametros recibidos en el POST----------------------
    
    $tabla            = "huturnos";
    $paqueteJson      = json_decode(file_get_contents('php://input'),true);

    $contador = 0;

    //--------------------------- Acciones -------------------------

    foreach ($paqueteJson as $i => $datosconsulta) 
    {
        $tipo               = $datosconsulta['tipo'];
        $idturno            = $datosconsulta['idturno'];
        $idactividad        = $datosconsulta['idactividad'];
        $fecha              = $datosconsulta['fecha'];
        $duracion           = $datosconsulta['duracion'];
        $horainicio         = $datosconsulta['horainicio'];
        $idinstructor       = $datosconsulta['idinstructor'];
        
        if($tipo == "guardar"){
            $basesql = "insert into " .$tabla;
            $sql = $basesql . " (idactividad,fecha,duracion,horainicio,idinstructor) values('$idactividad','$fecha','$duracion','$horainicio','$idinstructor')";
        }else if($tipo == "modificar"){
            $basesql = "update " .$tabla;
            $sql = $basesql . " set idactividad='$idactividad',fecha='$fecha',duracion='$duracion',horainicio='$horainicio',idinstructor='$idinstructor' where idturno =$idturno";
        }else if($tipo == "eliminar"){
            $basesql = "delete from " .$tabla;
            $sql = $basesql . " where idturno =" . $idturno . "";
        }
        
        $resultado  = $mysqli->query($sql);
        
        if($resultado){
            $contador = $contador + 1;
        }
    }

    echo $contador;

    $mysqli->close();
?>
