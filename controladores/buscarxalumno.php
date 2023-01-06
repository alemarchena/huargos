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
    $tabla            = "hualumnos";
    $paqueteJson      = json_decode(file_get_contents('php://input'),true);

    //--------------------------- Acciones -------------------------
    $basesql = "Select idalumno,nombre,apellido,dni,whatsapp from " .$tabla;
    $contador = 0;

    if(count($paqueteJson) ==0)
    {
        $sql = $basesql . " where 1 ";
    }else{
        foreach ($paqueteJson as $i => $datosconsulta) 
        {
            $palabra = $datosconsulta['palabra'];
            $contador = $contador + 1;
            if($contador==1)
            {
                $sql = $basesql . " where ( nombre like '%".$palabra."%' or apellido like '%".$palabra."%' or dni like '%$palabra%' or whatsapp like '%$palabra%' ) ";
            }else{
                $sql = $sql . " and ( nombre like '%$palabra%' or apellido like '%".$palabra."%' or dni like '%".$palabra."%' or whatsapp like '%$palabra%' ) ";
            }
        }

        $sql = $sql . " GROUP by nombre order by nombre asc; ";
    }
    $resultado  = $mysqli->query($sql);
    $data = array();
    if($resultado)
    {
        $resultado->data_seek(0);
        while($fila = $resultado->fetch_assoc())
        {
            array_push($data,  $fila );
        }
    }else
    {
        array_push($data,  "desconocido" );
    }
    
    echo  json_encode($data);

    $mysqli->close();
?>
