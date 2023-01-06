<?php
    include('../conexiones/parametros.php');
    date_default_timezone_set('America/Argentina/Mendoza');
    header('Content-Type: text/html; charset=UTF-8');

    //-----------------conectando con la base de datos---------------------
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    if($mysqli->connect_error){var_dump($mysqli->connect_error);exit('No se pudo conectar a la base de datos del sistema');}
    
    mysqli_set_charset($mysqli,"utf8");
    //---------------------parametros recibidos en el POST----------------------
    $datosconsulta      = json_decode(file_get_contents('php://input'),true);
    $tabla              = $datosconsulta['tabla'];
    $tipo               = $datosconsulta['tipo'];
    $idcampo            = $datosconsulta['idcampo'];
    $valor              = $datosconsulta['valor'];
    //--------------------------- Acciones -------------------------
    $basesql = "Select $tabla.$idcampo from $tabla ";

    if($tipo == "actividad")
    {
        $sql = $basesql . " where idactividad = $valor";
    }else if($tipo == "turno")
    {
        $sql = $basesql . " where idturno = $valor";
    }else if($tipo == "alumnopagos")
    {
        $sql = $basesql . " where idalumno = $valor";
    }else if($tipo == "alumnoreservas")
    {
        $sql = $basesql . " where idalumno = $valor";
    }
    

    $resultado  = $mysqli->query($sql);
    
    $data = array();
    if($resultado)
    {
        $resultado->data_seek(0);
        while($fila = $resultado->fetch_assoc())
        {
            array_push($data,  $fila );
        }
    }else
    {
        array_push($data,  "desconocido" );
    }
    
    echo  json_encode($data);

    $mysqli->close();
?>
