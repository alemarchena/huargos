<?php
    include('../conexiones/parametros.php');
    date_default_timezone_set('America/Argentina/Mendoza');
    header('Content-Type: text/html; charset=UTF-8');

    //---------------------parametros recibidos en el POST----------------------
    
    $tabla              = "hureservas";
    $tablaactividades   = "huactividades";

    $datosconsulta      = json_decode(file_get_contents('php://input'),true);
    $tipo               = $datosconsulta['tipo'];
    $idalumno           = $datosconsulta['idalumno'];
    $fecha              = $datosconsulta['fecha'];
    
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
    
    $basesql = "Select " .$tablaactividades. ".actividad,"
    .$tabla. ".idalumno,".$tabla. ".idreserva,".$tabla. ".idturno,".$tabla. ".idactividad,".$tabla.".fechaactividad,"
    .$tabla. ".horainicio,".$tabla. ".fechainscribio,".$tabla. ".fechamarcacion,"
    .$tabla. ".asistio from (" 
    .$tabla. " LEFT JOIN " .$tablaactividades. " ON "
    .$tabla. ".idactividad = " .$tablaactividades. ".idactividad ) where "
    .$tabla. ".idalumno = ". $idalumno. " ";

    if($tipo == "consultatodo"){
        $wherefecha = " order by fechainscribio desc";
        $sql = $basesql . $wherefecha;
    }else if($tipo == "consultafechaenadelante"){
        $wherefecha = " and fechaactividad >= '$fecha' order by fechainscribio desc";
        $sql = $basesql . $wherefecha;
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
