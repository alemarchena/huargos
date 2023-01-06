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
    $tablaactividades   = "huactividades";
    $tablareservas      = "hureservas";
    $tablaventas        = "huventas";
    $tablatiposdepago   = "hutiposdepago";

    $paqueteJson    = json_decode(file_get_contents('php://input'),true);

    //--------------------------- Acciones -------------------------
    $sql='';
    $data = array();
    if(count($paqueteJson) >0)
    {
        foreach ($paqueteJson as $i => $datosconsulta) 
        {
            $idalumno = $datosconsulta['idalumno'];

            //----------------- Busca todas las reservas del alumno ------------------------

            $sql = "select ".$tablareservas.".idalumno,".$tablareservas.".idactividad,"
                    .$tablareservas.".fechaactividad,".$tablareservas.".fechamarcacion,".$tablareservas.".asistio,"
                    .$tablaactividades.".actividad from (". $tablareservas ." LEFT JOIN " 
                    .$tablaactividades . " ON " . $tablareservas. ".idactividad = "  . $tablaactividades. ".idactividad ) where " 
                    .$tablareservas.".idalumno = ".$idalumno." order by " .$tablareservas.".fechamarcacion asc";

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
            $sql = "select ".$tablaventas.".idalumno,".$tablaventas.".tiempopagado,"
                    .$tablaventas.".montopagado,".$tablaventas.".fechapago,".$tablaventas.".fechaguardadopago from (". $tablaventas .
                    " LEFT JOIN " .$tablatiposdepago . " ON " . $tablaventas. ".idtipodepago = "  . $tablatiposdepago. ".idtipodepago ) where " 
                    .$tablaventas.".idalumno = ".$idalumno." order by ".$tablaventas.".fechapago asc ";


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


        }
    }

    echo  json_encode($data);

    $mysqli->close();
?>
