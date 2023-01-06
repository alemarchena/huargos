<?php
    include('../conexiones/parametros.php');
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
    $tablaventas        = "huventas";
    $tablareservas      = "hureservas";

    $paqueteJson    = json_decode(file_get_contents('php://input'),true);
    $cantidad               = $paqueteJson['cantidad'];

    //--------------------------- Acciones -------------------------
    $data = array();
    $sql="SELECT a.nombre,a.apellido,a.whatsapp,a.email, v.id,v.tiempopagado as tiempopagado,r.asistio, (v.tiempopagado - r.asistio) as disponible from
    (
    (SELECT idalumno as id, idalumno, sum(tiempopagado) as tiempopagado from $tablaventas GROUP by idalumno) v INNER JOIN (SELECT idalumno as id,sum(asistio) as asistio from $tablareservas GROUP BY idalumno ) r ON v.id = r.id INNER JOIN
    (SELECT idalumno as id,nombre,apellido,whatsapp,email from hualumnos) a ON a.id = r.id
    )
    where v.tiempopagado - r.asistio <= $cantidad";

    $resultado  = $mysqli->query($sql);
    if($resultado)
    {
        $resultado->data_seek(0);

        while($fila = $resultado->fetch_assoc())
        {
            array_push($data,  $fila );
        }
    }

    echo  json_encode($data);

    $mysqli->close();
?>
