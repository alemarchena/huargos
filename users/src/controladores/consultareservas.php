<?php
    include('./parametros.php');
    date_default_timezone_set('America/Argentina/Mendoza');
    header('Content-Type: text/html; charset=UTF-8');

    //---------------------parametros recibidos en el POST----------------------
    
    $tabla              = "hureservas";
    $tablaactividades   = "huactividades";
    $tablaturnos        = "huturnos";
    $tablaalumnos       = "hualumnos";
    $tablaalumnospas    = "hualumnospas";

    $datosconsulta      = json_decode(file_get_contents('php://input'),true);
    $tipo               = $datosconsulta['tipo'];
    $idalumno           = $datosconsulta['idalumno'];
    $fechadesde         = $datosconsulta['fechadesde'];
    $idturno            = $datosconsulta['idturno'];

    
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
    
    $basesql = "Select " .$tabla. ".asistio," .$tabla. ".idreserva,".$tabla. ".fechainscribio,". $tabla.".idturno,"   . $tabla.".idactividad,". $tabla.".fechaactividad,"
                         . $tabla.".horainicio,". $tablaactividades.".actividad,". $tablaactividades.".duracion from ( "
                         .$tabla. " LEFT JOIN " .$tablaactividades. " ON " .$tabla. ".idactividad = ".$tablaactividades. ".idactividad )" ;

    if($tipo == "consultatodo")
    {
            $sql = $basesql . " where 1 order by fecha";
    }
    else if($tipo == "consultaxidalumno")
    {
        $sql = $basesql . " where idalumno =" . $idalumno . " order by fechaactividad asc";
    }
    else if($tipo == "consultaxidalumnoyturno")
    {
        $sql = $basesql . " where idturno =" . $idturno . " and idalumno =" . $idalumno . "  order by fechaactividad asc";
    }
    else if($tipo == "consultaxfechas")
    {
        $basesql = "Select " 
        . $tabla.".idreserva," . $tabla.".idturno," . $tabla. ".idactividad," . $tabla. ".fechaactividad," . $tabla.".horainicio,". $tabla.".asistio,". $tabla.".fechainscribio,". $tabla.".fechamarcacion,"
        . $tablaactividades.".actividad,"
        . $tablaturnos.".duracion,"
        . $tablaalumnos.".nombre,". $tablaalumnos.".apellido from ((( " .$tabla. " LEFT JOIN " 
        . $tablaactividades. " ON " .$tabla. ".idactividad = ".$tablaactividades. ".idactividad ) LEFT JOIN "
        . $tablaturnos. " ON " .$tabla. ".idturno  = ".$tablaturnos. ".idturno ) LEFT JOIN "
        . $tablaalumnos. " ON " .$tabla. ".idalumno = ".$tablaalumnos. ".idalumno )";

        $sql = $basesql . " where fechaactividad >='" . $fechadesde . "' and fechaactividad <= '" .$fechahasta . "' order by fechaactividad asc";
    }
    else if($tipo == "consultaxfechayturno")
    {
        $basesql = "Select " 
        . $tabla. ".idreserva,". $tabla. ".idturno,". $tabla. ".fechaactividad,". $tabla.".asistio,"
        . $tablaalumnos.".usuario,". $tablaalumnos. ".foto,". $tablaalumnos.".nombre,". $tablaalumnos.".apellido from ( " .$tabla. " LEFT JOIN " 
        . $tablaalumnos. " ON " .$tabla. ".idalumno = ".$tablaalumnos. ".idalumno )";

        $sql = $basesql . " where " . $tabla. ".idturno =" . $idturno . " and ". $tabla.".fechaactividad >='" . $fechadesde . "' and ". $tabla.".fechaactividad <= '" .$fechahasta . "' and " .$tabla. ".asistio=0 order by " .$tablaalumnos. ".apellido asc";
    }
    // var_dump($sql);
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
