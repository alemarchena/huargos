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
        $idturno            = $datosconsulta['idturno'];
        $basesql = "delete from " .$tabla;
        $sql = $basesql . " where idturno =" . $idturno . "";
        
        $resultado  = $mysqli->query($sql);
        
        if($resultado){
            $contador = $contador + 1;
        }
    }

    echo $contador;

    $mysqli->close();
?>
