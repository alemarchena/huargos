<?php
    include('../conexiones/parametros.php');
    date_default_timezone_set('America/Argentina/Mendoza');
    header('Content-Type: text/html; charset=UTF-8');

    //---------------------parametros recibidos en el POST----------------------
    
    $tabla              = "hualumnos";
    $datosconsulta      = json_decode(file_get_contents('php://input'),true);
    
    $tipo               = $datosconsulta['tipo'];
    $idalumno           = $datosconsulta['idalumno'];
    $nombre             = $datosconsulta['nombre'];
    $apellido           = $datosconsulta['apellido'];
    $dni                = $datosconsulta['dni'];
    $email              = $datosconsulta['email'];
    $whatsapp           = $datosconsulta['whatsapp'];
    $foto               = $datosconsulta['foto'];
    $certificado        = $datosconsulta['certificado'];
    $estado             = $datosconsulta['estado'];
    $usuario            = $datosconsulta['usuario'];
    $fechanacimiento    = $datosconsulta['fechanacimiento'];
    $diasvencimiento    = $datosconsulta['diasvencimiento'];
     
    if($usuario == '')
        $usuario = $dni;
        
    $fho = new DateTime();
    $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');
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
    
    if($tipo == "guardar"){
        $basesql = "insert into " .$tabla;
        $sql = $basesql . " (nombre,apellido,dni,email,whatsapp,fechaalta,foto,certificado,estado,usuario,diasvencimiento) values('$nombre','$apellido','$dni','$email','$whatsapp','$fechahoraoperativa','$foto','$certificado',$estado,'$usuario',$diasvencimiento)";
    }else if($tipo == "modificar"){
        $basesql = "update " .$tabla;
        
        if($foto=="" && $certificado=="")
            $sql = $basesql . " set diasvencimiento=$diasvencimiento, fechanacimiento='$fechanacimiento', usuario='$usuario', nombre='$nombre',apellido='$apellido',dni='$dni',email='$email',whatsapp='$whatsapp',estado=$estado where idalumno =$idalumno";

        if($foto!="" && $certificado!="")
            $sql = $basesql . " set diasvencimiento=$diasvencimiento,fechanacimiento='$fechanacimiento',usuario='$usuario',nombre='$nombre',apellido='$apellido',dni='$dni',email='$email',whatsapp='$whatsapp',foto='$foto',certificado='$certificado',estado=$estado where idalumno =$idalumno";

        if($foto!="" && $certificado=="")
            $sql = $basesql . " set diasvencimiento=$diasvencimiento,fechanacimiento='$fechanacimiento',usuario='$usuario',nombre='$nombre',apellido='$apellido',dni='$dni',email='$email',whatsapp='$whatsapp',foto='$foto',estado=$estado where idalumno =$idalumno";

        if($foto=="" && $certificado!="")
            $sql = $basesql . " set diasvencimiento=$diasvencimiento,fechanacimiento='$fechanacimiento',usuario='$usuario',nombre='$nombre',apellido='$apellido',dni='$dni',email='$email',whatsapp='$whatsapp',certificado='$certificado',estado=$estado where idalumno =$idalumno";

    }else if($tipo == "eliminar"){
        $basesql = "delete from " .$tabla;
        $sql = $basesql . " where idalumno =" . $idalumno . "";
    }
    $resultado  = $mysqli->query($sql);
    echo $resultado;

    $mysqli->close();
?>
