<?php
    include('../conexiones/parametros.php');
    date_default_timezone_set('America/Argentina/Mendoza');
    header('Content-Type: text/html; charset=UTF-8');

 //---------------------parametros recibidos en el POST----------------------

 //-----------------conectando con la base de datos---------------------
 $mysqli = new mysqli($host, $user, $password, $dbname, $port, $socket);
 
 if($mysqli->connect_error)
 {
     exit('No se pudo conectar a la base de datos');
    }
    
    mysqli_set_charset($mysqli,"utf8"); 
    $fho = new DateTime();
    $fechahoraoperativa= $fho->format('Y-m-d H:i:sP');
    
    //---------------------parametros recibidos en el POST----------------------
    $tablaventas        = "huventas";
    $tablareservas      = "hureservas";
    $tablaalumnos       = "hualumnos";

    $paqueteJson    = json_decode(file_get_contents('php://input'),true);
    $cantidad               = $paqueteJson['cantidad'];

    //--------------------------- Acciones -------------------------
    $data = array();
    $sql="SELECT a.id,a.nombre,a.apellido,a.whatsapp,a.email, v.idalumno,v.tiempopagado as tiempopagado,
    r.noasistio from ( (SELECT idalumno as id, idalumno, sum(tiempopagado) as tiempopagado from $tablaventas
     GROUP by idalumno) v INNER JOIN (SELECT idalumno as id,count(asistio) as noasistio from $tablareservas
      where asistio = 0 GROUP BY idalumno ) r ON v.id = r.id INNER JOIN (SELECT idalumno as id,nombre,apellido,whatsapp,email from $tablaalumnos) a ON a.id = r.id ) WHERE r.noasistio >= $cantidad order by r.noasistio DESC;";
    
    $resultado  = $mysqli->query($sql);

    $totalEliminados = 0;

    while($fila = $resultado->fetch_assoc())
    {
        // var_dump($fila['idalumno']);
        if($fila['idalumno']!=null)
        {

            $idalum = $fila['idalumno'];
            $sqlElimina = "Delete from $tablareservas where idalumno = $idalum and asistio = 0";
            $resultadoEli  = $mysqli->query($sqlElimina);
            if($resultadoEli)
            {
                $totalEliminados = $totalEliminados +1;
            }

        }
    }

    echo  json_encode($totalEliminados);

    $mysqli->close();
?>
