<?php
    include('../conexiones/parametros.php');
    date_default_timezone_set('America/Argentina/Mendoza');
    header('Content-Type: text/html; charset=UTF-8');


    //---------------------parametros recibidos en el POST----------------------
    
    $tabla              = "huactividades";
    $datosconsulta      = json_decode(file_get_contents('php://input'),true);
    $tipo               = $datosconsulta['tipo'];
    $id                 = $datosconsulta['idactividad'];
    
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
    
    $basesql = "Select * from " .$tabla;

    if($tipo == "consultatodo")
    {
        if($tipo == "consultatodo")
            $sql = $basesql . " where 1 order by actividad";
        else
            $sql = $basesql . " where idactividad =" . $id . " order by actividad";
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
        echo  json_encode($data);
    }else
        echo "consultavacia"; 

    $mysqli->close();
?>
