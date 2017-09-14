<?php

if(isset($_GET['boton'])){
		$name = $_GET['param1'];
		$direction = $_GET['param2'];
		$phone = $_GET['param3'];
		$email = $_GET['param4'];
		$web = $_GET['param5'];
		$entry = $_GET['param6'];
		$latitud = $_GET['param7'];
		$longitud = $_GET['param8'];
		$contact = $_GET['param9'];
		$priority = $_GET['param10'];
		
	if($_GET['boton']=="agregar"){
		$enlace = mysql_connect('localhost', 'root', '');
		if (!$enlace) {
			die('No se pudo conectar: ' . mysql_error());
		}
		mysql_select_db('empresas');

		mysql_query("INSERT INTO maquinarias(name, direction,phone,email,web,entry,latitud,longitud,contact,priority) 
		values ('$name','$direction','$phone','$email' ,'$web' ,'$entry','$latitud','$longitud','$contact','$priority')");
		mysql_close($enlace);
    }
	
	elseif($_GET['boton']=="consultar"){
        $enlace = mysql_connect('localhost', 'root', '');
		if (!$enlace) {
			die('No se pudo conectar: ' . mysql_error());
		}
		mysql_select_db('empresas');
		$sql = "SELECT latitud,longitud FROM maquinarias WHERE name = '$name'";//query
		//$sql = "SELECT latitud,longitud FROM maquinarias";//query
		$selected = mysql_query( $sql, $enlace );
		
		//echo $selected;
		
		if(! $selected ) {
		die('Could not get data: ' . mysql_error());
		echo "No hay datos que cumplen <br>";
		}
		
		while($row = mysql_fetch_array($selected, MYSQL_ASSOC)) {
		 echo "LATITUD : {$row['latitud']} <br> ";
		 echo "LONGITUD : {$row['longitud']} <br> ";
		} 

		mysql_close($enlace);
    }
	
	elseif($_GET['boton']=="update"){
		$enlace = mysql_connect('localhost', 'root', '');
		if (!$enlace) {
			die('No se pudo conectar: ' . mysql_error());
		}
		mysql_select_db('empresas');
		$sql = "UPDATE maquinarias SET direction = '$direction', phone = '$phone' , email = '$email' , web = '$web' , entry = '$entry' ,
		latitud = '$latitud', longitud = '$longitud' , contact = '$contact' , priority = '$priority' WHERE name = '$name'";//update por nombre
		$updated = mysql_query( $sql, $enlace );
		
		if(! $updated ) {
           die('Could not update data: ' . mysql_error());
         }
            
         echo "Updated data successfully\n";
  
		mysql_close($enlace);
	}
	
	elseif($_GET['boton']=="remover"){
		$enlace = mysql_connect('localhost', 'root', '');
		if (!$enlace) {
			die('No se pudo conectar: ' . mysql_error());
		}
		mysql_select_db('empresas');
		$sql = "DELETE FROM maquinarias WHERE name = '$name' AND  direction = '$direction'";//borrar por nombre
		$removed = mysql_query( $sql, $enlace );
		
		if(! $removed ) {
           die('Could not delete data: ' . mysql_error());
         }
            
         echo "Deleted data successfully\n";
  
		mysql_close($enlace);
	}
}

?>
