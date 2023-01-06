<?php
    include('../conexiones/parametros.php');
    date_default_timezone_set('America/Argentina/Mendoza');
    header('Content-Type: text/html; charset=UTF-8');

    //---------------------parametros recibidos en el POST----------------------
    
    $tabla              = "huinstructores";
    $datosconsulta      = json_decode(file_get_contents('php://input'),true);
    
    $tipo               = $datosconsulta['tipo'];
    $idinstructor       = $datosconsulta['idinstructor'];
    $instructor         = $datosconsulta['nombre'];
  
    
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
        $sql = $basesql . " (instructor) values('$instructor')";
    }else if($tipo == "modificar"){
        $basesql = "update " .$tabla;
        $sql = $basesql . " set instructor='$instructor' where idinstructor =$idinstructor";
    }else if($tipo == "eliminar"){
        $basesql = "delete from " .$tabla;
        $sql = $basesql . " where idinstructor =" . $idinstructor . "";
    }
    
    $resultado  = $mysqli->query($sql);
    echo $resultado;

    $mysqli->close();
?>
