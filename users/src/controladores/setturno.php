<?php
    include('./parametros.php');
    date_default_timezone_set('America/Argentina/Mendoza');
    header('Content-Type: text/html; charset=UTF-8');

 //---------------------parametros recibidos en el POST----------------------

    $tabla              = "hutipoturno";
    //-----------------conectando con la base de datos---------------------
        $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);

        if($mysqli->connect_error)
        {
            exit('No se pudo conectar a la base de datos');
        }
        
        mysqli_set_charset($mysqli,"utf8");
    
    //--------------------------- Acciones -------------------------

    $json = json_decode(file_get_contents('php://input'),true);
        
    $tipo               = $json['tipo'];
    $quehace            = $json['quehace'];
        
    if($quehace=="guarda"){
        $sql = "UPDATE " .$tabla. " set tipo = " .$tipo. " where 1";
    }
    else if($quehace=="consulta"){
        $sql = "SELECT $tabla.tipo FROM $tabla where 1" ;
    }

    $resultado = $mysqli->query($sql);
    if($resultado){
        $fila = $resultado->fetch_assoc();
        echo($fila["tipo"]);
    }else{
        echo "-1";
    }
    
    $mysqli->close();
?>
