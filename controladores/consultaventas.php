<?php
    include('../conexiones/parametros.php');
    date_default_timezone_set('America/Argentina/Mendoza');
    header('Content-Type: text/html; charset=UTF-8');

    //---------------------parametros recibidos en el POST----------------------
    
    $tabla              = "huventas";
    $tablaalumnos       = "hualumnos";
    $tablatipodepago    = "hutiposdepago";

    $datosconsulta      = json_decode(file_get_contents('php://input'),true);
    $tipo               = $datosconsulta['tipo'];
    $idpago             = $datosconsulta['idpago'];
    $fechadesde         = $datosconsulta['fechadesde'];
    $fechahasta         = $datosconsulta['fechahasta'];
    
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
    
    $basesql = "Select " .$tabla. ".idpago,".$tabla. ".idalumno,".$tabla. ".tiempopagado,"
    .$tabla. ".montopagado,".$tabla. ".fechapago,".$tabla. ".idtipodepago,".$tabla. ".fechaguardadopago,"
    .$tablaalumnos. ".nombre,".$tablaalumnos. ".apellido,"
    .$tablatipodepago. ".nombrepago from(( " .$tabla. " LEFT JOIN " .$tablaalumnos. " ON " .$tabla. ".idalumno=" .$tablaalumnos.".idalumno) LEFT JOIN "
    .$tablatipodepago." ON " .$tabla.".idtipodepago = " .$tablatipodepago.".idtipodepago )";

    if($tipo == "consultatodo")
        $sql = $basesql . " where fechapago >='" . $fechadesde . "' and fechapago <= '" .$fechahasta . "' order by .$tablaalumnos. apellido";
    else if($tipo == "consultaxalumno")
        $sql = $basesql . " where " .$tabla. ".idalumno =" . $idalumno . " order by apellido";
    
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
