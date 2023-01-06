<?php
    include('../conexiones/parametros.php');
    date_default_timezone_set('America/Argentina/Mendoza');
    header('Content-Type: text/html; charset=UTF-8');
    //---------------------parametros recibidos en el POST----------------------
    
    $tabla              = "wcpropuestas";
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    
    if($mysqli->connect_error)
    {
        exit('No se pudo conectar a la base de datos');
    }
    mysqli_set_charset($mysqli,"utf8");
            
    $sql = "DELETE FROM  " .$tabla. " WHERE 1";
    $resultado = $mysqli->query($sql);

    $mysqli->close();
?>