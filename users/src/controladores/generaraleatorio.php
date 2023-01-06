<?php
    //Genera una clave aleatoria para utilizar en los nombres de los archivos de imagen que suben al servidor
    class Generar
    {

        private $cadena;
        private $passw;

        public function __construct()
        {
                $this->cadena = "ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                $this->passw = "";
        }

        public function GenerarP($longitud){
           
            
            for($i=0;$i < $longitud;$i++)
            {
                $aleatorio = mt_rand(0,$longitud - 1);
                $this->passw .= substr($this->cadena,$aleatorio,1);
            }

            $pass = $this->passw;
            $this->passw = "";

            return $pass;
        }
    }
?>