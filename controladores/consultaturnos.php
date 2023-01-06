<?php
    include('../conexiones/parametros.php');
    date_default_timezone_set('America/Argentina/Mendoza');
    header('Content-Type: text/html; charset=UTF-8');

    //---------------------parametros recibidos en el POST----------------------
    
    $tabla              = "huturnos";
    $tablainstructores  = "huinstructores";
    $tablaactividades   = "huactividades";

    $datosconsulta      = json_decode(file_get_contents('php://input'),true);
    $tipo               = $datosconsulta['tipo'];
    $id                 = $datosconsulta['idturno'];
    $fecha              = $datosconsulta['fecha'];
    $fechahasta         = $datosconsulta['fechahasta'];
    $idactividad        = $datosconsulta['idactividad'];
    
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
    
    $basesql = "Select " . $tabla.".fecha,idturno,".$tablaactividades.".idactividad,".$tablaactividades.".actividad,".$tabla.".duracion,fecha,horainicio,".$tablainstructores. ".idinstructor,".$tablainstructores.".instructor from ((" .$tabla. 
    " LEFT JOIN " .$tablainstructores. " ON " . $tabla.".idinstructor = " .$tablainstructores.".idinstructor ) LEFT JOIN " .$tablaactividades. " ON " . $tabla.".idactividad = " .$tablaactividades.".idactividad ) ";

    if($tipo == "consultatodo")
    {
            $sql = $basesql . " where 1 order by fecha";
    }
    else if($tipo == "consultaxfecha")
    {
        $sql = $basesql . " where fecha ='" . $fecha . "' order by fecha asc";
    }
    else if($tipo == "consultaentrefecha")
    {
        $sql = $basesql . " where fecha >='" . $fecha . "' and fecha <='" . $fechahasta . "' order by fecha asc";
    }
    else if($tipo == "consultaxfechayactividad")
    {
        $sql = $basesql . " where fecha >='" . $fecha . "' and fecha <='" . $fechahasta . "' and ". $tablaactividades .".idactividad = " . $idactividad ." order by fecha asc";
    }
    else{
        $sql = $basesql . " where idturno =" . $id . " order by fecha asc";
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
