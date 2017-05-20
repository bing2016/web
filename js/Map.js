function create_Map(data){
	var ret = JSON.stringify(data);
	var User = JSON.parse(ret).user;
	var Geo = User.coordinates;
	var mapType = google.maps.MapTypeId.ROADMAP;
	var lat = 53.508742, lng = -2.120850, zoom = 5;
	var mapOptions = {
		center: new google.maps.LatLng(lat, lng),  
		zoom: zoom,               　　　　　　　　　　
		mapTypeId: mapType,       　　　　　　　　　　
		scrollwheel: true          　　　　　　　　　 
	};
	var map = new google.maps.Map(document.getElementById("map"), mapOptions); 

	for(var geo in Geo) {
		if(Geo[geo]==null){
		}
		else{	
		var lng = Geo[geo].coordinates[0];
		var lat = Geo[geo].coordinates[1];
		var marker = new google.maps.Marker({map: map,position: new google.maps.LatLng(lat, lng)});	
		}
	};
}

function initMap(){
	
}