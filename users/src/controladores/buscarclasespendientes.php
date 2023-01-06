<?php
    include('./parametros.php');
    date_default_timezone_set('America/Argentina/Mendoza');
    header('Content-Type: text/html; charset=UTF-8');

    //-----------------conectando con la base de datos---------------------
    $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
    if($mysqli->connect_error)
    {
        var_dump($mysqli->connect_error);
        exit('No se pudo conectar a la base de datos del sistema');
    }
    mysqli_set_charset($mysqli,"utf8");

    //---------------------parametros recibidos en el POST----------------------
    $tablareservas      = "hureservas";
    $tablaventas        = "huventas";

    $datosconsulta      = json_decode(file_get_contents('php://input'),true);
    $idalumno           = $datosconsulta['idalumno'];

    //--------------------------- Acciones -------------------------
    $sql='';
    $data = array();
   

    //----------------- Busca todas las reservas del alumno ------------------------

    $sql = "select idalumno,asistio from $tablareservas where idalumno = $idalumno";

    $resultado  = $mysqli->query($sql);
    if($resultado)
    {
        $resultado->data_seek(0);

        while($fila = $resultado->fetch_assoc())
        {
            $fila["reservaoventa"] = "Reserva";
            array_push($data,  $fila );
        }
    }

    //----------------- Busca todos los pagos del alumno ------------------------
   
    $sql = "select idalumno,tiempopagado,fechapago from $tablaventas where idalumno = $idalumno order by fechapago desc" ;

    $resultado  = $mysqli->query($sql);
    if($resultado)
    {
        $resultado->data_seek(0);

        while($fila = $resultado->fetch_assoc())
        {
            $fila["reservaoventa"] = "Ventas";
            array_push($data,  $fila );
        }
    }


    echo  json_encode($data);

    $mysqli->close();
?>
