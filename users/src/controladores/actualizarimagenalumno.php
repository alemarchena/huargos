<?php
    include('./parametros.php');
    date_default_timezone_set('America/Argentina/Mendoza');
    header('Content-Type: text/html; charset=UTF-8');

    //---------------------parametros recibidos en el POST----------------------
    
    $tabla              = "hualumnos";
    $datosconsulta      = json_decode(file_get_contents('php://input'),true);

    $idalumno           = $datosconsulta['idalumno'];
    $imagen               = $datosconsulta['imagen'];
    $tipo                   = $datosconsulta['tipo'];
        
    
    //-----------------conectando con la base de datos---------------------
    
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    if($mysqli->connect_error)
    {
        var_dump($host.",".$user.",".$password.",".$dbname.",".$port.",".$socket);
        var_dump($mysqli->connect_error);
        exit('No se pudo conectar a la base de datos del sistema');
    }
    
    mysqli_set_charset($mysqli,"utf8");
    //--------------------------- Acciones -------------------------
    if($tipo=='foto')
        $sql = "update " .$tabla. " set foto='$imagen' where idalumno =$idalumno";
    
    else if($tipo=='certificado')
        $sql = "update " .$tabla. " set certificado='$imagen' where idalumno =$idalumno";
    
    $resultado  = $mysqli->query($sql);
    echo $resultado;

    $mysqli->close();
?>
