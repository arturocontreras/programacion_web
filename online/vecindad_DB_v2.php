
<?php

$username = 'id2913281_hola';
$password = 'database2017';
$database = 'id2913281_hola';

		//valores GPS
		$latitud_gps = $_GET['param1']; //latitud y longitud del GPS, deseados como centro del circulo de vecindad
		$longitud_gps = $_GET['param2'];
		$radio_vecindad = $_GET['param3'];
		
		//Arrays
		$empresa = array();  
		$data_empresa = array(); 
		
		if(isset($_GET['boton'])){
			
			if($_GET['boton']=="leer_db"){
				$enlace = mysql_connect('localhost', $username, $password );
				if (!$enlace) {
					die('No se pudo conectar: ' . mysql_error());
				}
				mysql_select_db($database);
							
				$sql = "SELECT name,latitud,longitud FROM maquinarias";//query
				
				$selected = mysql_query( $sql, $enlace );
				
				if(! $selected ) {
				die('Could not get data: ' . mysql_error());
				echo "No hay datos que cumplen <br>";
				}
				
				$jj = 0;
				
				while($row = mysql_fetch_array($selected, MYSQL_ASSOC)) {
				 //valor de coordenadas de empresa_i
				 $latitud_i =  $row['latitud'];
				 $longitud_i =  $row['longitud'];
				 
				 //Evaluacion de vecindad
				 $radio2 = pow($latitud_gps-$latitud_i,2) + pow($longitud_gps-$longitud_i,2);
				 $radio = sqrt($radio2);
				 
				 //$radio_vecindad = 11170;
				 $radio_coord = ($radio_vecindad*0.008952)/1000;
				 
				 if($radio < $radio_coord){
					 
					 //$data_empresa=array($row['name'],$row['latitud'],$row['longitud']); 
					 $empresa = array(
						"name" => $row['name'],
						"lat" => $row['latitud'],
						"lng" => $row['longitud']
					 );
					 
					 $data_empresa[$jj][] = $empresa;
					 $jj = $jj +1;
				 }
				 				 
				}

				echo json_encode($data_empresa); //Se envia en formato JSON los datos de las empresas en la vecindad hacia el JS				

				mysql_close($enlace);
		 
			}
		}
			
?>