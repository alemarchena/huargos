<?php
    include('../conexiones/parametros.php');
    date_default_timezone_set('America/Argentina/Mendoza');
    header('Content-Type: text/html; charset=UTF-8');

    //---------------------parametros recibidos en el POST----------------------
    
    $tabla              = "hualumnospas";
    $datosconsulta      = json_decode(file_get_contents('php://input'),true);
    
    $tipo               = $datosconsulta['tipo'];
    $usuario            = $datosconsulta['usuario'];
    $clave              = $datosconsulta['clave'];
    $usuarioanterior    = $datosconsulta['usuarioanterior'];
   

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
    
    if($tipo == "guardar"){
        $basesql = "insert into " .$tabla;
        $sql = $basesql . " (usuario,clave) values('$usuario','$clave')";
    }else if($tipo == "modificar"){
        $basesql = "update " .$tabla;
        $sql = $basesql . " set clave='$clave' where usuario ='$usuario'";
    }else if($tipo == "modificarsolousuario"){
        $basesql = "update " .$tabla;
        $sql = $basesql . " set usuario='$usuario' where usuario ='$usuarioanterior'";
    }else if($tipo == "eliminar"){
        $basesql = "delete from " .$tabla;
        $sql = $basesql . " where usuario ='" . $usuario . "'";
    }
    
    $resultado  = $mysqli->query($sql);
    echo $resultado;

    $mysqli->close();
?>
