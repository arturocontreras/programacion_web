//variables globales(se pueden usar dentro de cualquier funcion en JS)
//Se agregó condición de vecindad, y alert para ver el valor de la variable

 var myLatLng = {lat: -33.890542, lng: 151.274856};
 var mypos = [-33.890542 , 151.274856 ];
 var lat_comp ; //latitud de la compañia
 var lon_comp ; //longitud de la compañia
 var lat_curr = mypos[0]; //se va actualizando
 var lon_curr = mypos[1];
 var map;
 var markers = [];
 var companies = [];
 var cityCircle;
 var radio_vecindad = 11170; //Se va a parametrizar el radio_vecindad
 var num_empresas;//numero de empresas en la vecindad
 
 //variables de comunicacion con PHP de base de datos
 
 var datosDB;
 
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: myLatLng,
	mapTypeId: google.maps.MapTypeId.TERRAIN
  });
  
  //setMarkers(map);
  buscar_empresas();
  
  //Eventos 
  
  map.addListener('map3d', 'click', function(event) {
    alert("Hola");
  });
  
  google.maps.event.addListener(map, 'rightclick', function(event) {
    mostrar_coordenada(event.latLng, map);
  });
  
  
}

//////////////////////////////////////// Companies information ///////////////////////////////////////////

var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">CONTREMAR</h1>'+
      '<div id="bodyContent">'+
      '<p><b>CONTREMAR</b>, also referred </p>'+
      '<p> Website : <a href="http://www.karlaequipment.com">'+
      'http://www.karlaequipment.com</a></p>'+
	  '<p> Cell : +51 950560793 </p>'
      '</div>'+
      '</div>';
	  

//Funcion creada por el evento
function mostrar_coordenada(location , map){
  alert(location);	
  
  //Crear referencia
  var referencias = new google.maps.Marker({
    position: location,
    map: map
  });
  
  //Mostrar en HTML
  //var e = document.getElementById("calculos");
  
  document.getElementById("result3").textContent = JSON.stringify(location); //convertir object to text
  
}

function attachSecretMessage(marker, secretMessage) {
  var infowindow = new google.maps.InfoWindow({
    content: secretMessage
  });

  marker.addListener('click', function() {
    infowindow.open(marker.get('map'), marker);
  });
}

////////////////////////////////////// Vecindad ///////////////////////////////

function setDomain(map) {
	  cityCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: myLatLng,
      radius: radio_vecindad
	  //radius: Math.sqrt(citymap[city].population) * 100
    });
}

function vecindad(latpos,lonpos,latcomp,loncomp){
	
	var distance;
	
	distance = Math.pow(latpos -latcomp,2) + Math.pow(lonpos - loncomp,2);
	distance = Math.sqrt(distance);
	//distance = 1;
	//cada 0.01 es 1.117 Km
	var radio_coord = (radio_vecindad*0.008952)/1000;
	//alert(distance);
	
	if(distance < radio_coord) return true; //11.17Km alrededor
	else return false;
	
}

///////////////////// remove elements ////////////////////////////

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
  
  for (var i = 0; i < companies.length; i++) {
    companies[i].setMap(map);
  }
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
  companies = [];
}

function clearMarkers() {
  setMapOnAll(null);
}

/////////////////////////////////// Eventos llamados desde HTML, al presionar los botones /////////////////////////

function norte() {
  deleteMarkers() ;
  cityCircle.setMap(null);
  lat_curr =  lat_curr + 0.1*Math.random();
  lon_curr =  lon_curr;
  mypos = [lat_curr , lon_curr ];
  myLatLng = {lat: lat_curr, lng: lon_curr};
  buscar_empresas();
}

function sur() {
  deleteMarkers() ;
  cityCircle.setMap(null);
  lat_curr =  lat_curr - 0.1*Math.random();
  lon_curr =  lon_curr ;
  mypos = [lat_curr , lon_curr ];
  myLatLng = {lat: lat_curr, lng: lon_curr};
  buscar_empresas();
}

function este() {
  deleteMarkers() ;
  cityCircle.setMap(null);
  lat_curr =  lat_curr ;
  lon_curr =  lon_curr + 0.1*Math.random();
  mypos = [lat_curr , lon_curr ];
  myLatLng = {lat: lat_curr, lng: lon_curr};
  buscar_empresas();
}

function oeste() {
  deleteMarkers() ;
  cityCircle.setMap(null);
  lat_curr =  lat_curr ;
  lon_curr =  lon_curr - 0.1*Math.random();
  mypos = [lat_curr , lon_curr ];
  myLatLng = {lat: lat_curr, lng: lon_curr};
  buscar_empresas();
}

//////////

 document.addEventListener("DOMContentLoaded", function(event) {
  var e = document.getElementById("calculos");
  e.addEventListener("input", function() {
	radio_vecindad = this.principal.valueAsNumber;
    /* this.result1.value = this.principal.valueAsNumber;
	this.result2.value = this.value1.valueAsNumber / 100; 
	this.result3.value = this.value2.value;*/
  }, false);
}); 

function buscar_empresas() {
	
	var valor = "leer_db";
	/* var latitud_deseada = document.getElementById("nombre").value;
	var longitud_deseada = document.getElementById("direction").value; */
	var latitud_deseada = -33.890542;
	var longitud_deseada = 151.274856;

	$.ajax({
	type: 'GET',
	url: 'vecindad_DB_v2.php',
	data: { boton: valor  , param1: lat_curr , param2 : lon_curr , param3 : radio_vecindad },
	success: function(response) {
	$('#result').html(response);
	//alert(response);
	//datosDB = response;
	datosDB = jQuery.parseJSON(response); //usando jQuery JSON para obtener el arreglo desde el PHP
	var dato_empresa = datosDB;
	//alert(dato_empresa[1][0].name);
	//alert(dato_empresa.length);
	empresas_vecindad(map,dato_empresa);
	}
	});

}

// Graficar marcas de las empresas de la vecindad

function empresas_vecindad(map, dato_empresa){
	
  var posicionac = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Dealers!'
  });
  
  map.setZoom(10);
  map.setCenter(myLatLng);

  var image = {
    url: 'images/caterpillar.jpg',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };

  var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };
  
  num_empresas = dato_empresa.length;
  
  for(var jj =0 ; jj < num_empresas;jj++ ){
	var name_e = dato_empresa[jj][0].name;
	var lat_e = Number(dato_empresa[jj][0].lat);
	var lng_e = Number(dato_empresa[jj][0].lng);
	
	//alert(lng_e);//Solo para testeo

	var marker = new google.maps.Marker({
	position: {lat: lat_e, lng: lng_e},
	map: map,
	icon: image,
	shape: shape,
	title: name_e,
	zIndex: jj
	});
	
	attachSecretMessage(marker, name_e); 
		
	companies.push(marker);
  }
  
 markers.push(posicionac);
  
 setDomain(map);
 
 document.getElementById("result1").value = lat_curr;	
 document.getElementById("result2").value = lon_curr;
 document.getElementById("result3").value = num_empresas;
}

//activar una funcion que cree el evento X que se llame a una funcion cada 1s, de tal manera que en ese segundo, se lea GPS y se busque empresas.


////// Funciones Test comunicar JS con PHP

function test(arg) {
  //alert(arg);
  console.log("Holamundo");
  oeste();
}



