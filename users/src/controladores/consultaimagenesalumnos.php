<?php
    include('./parametros.php');
    date_default_timezone_set('America/Argentina/Mendoza');
    header('Content-Type: text/html; charset=UTF-8');
    //---------------------parametros recibidos en el POST----------------------
    
    $tabla              = "huimagenes";
    $datosconsulta      = json_decode(file_get_contents('php://input'),true);
    $idalumno           = $datosconsulta['idalumno'];

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

    $sql = $basesql . " where idalumno  =" . $idalumno . "";
    
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
    // var_dump($data);
    echo  json_encode($data);

    $mysqli->close();
?>
