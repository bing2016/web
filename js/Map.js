function create_Map(Tweets){

	var mapType = google.maps.MapTypeId.ROADMAP;
	var lat = 53.508742, lng = -2.120850, zoom = 5;
	var mapOptions = {
		center: new google.maps.LatLng(lat, lng),  
		zoom: zoom,               　　　　　　　　　　
		mapTypeId: mapType,       　　　　　　　　　　
		scrollwheel: true          　　　　　　　　　 
	};
	var map = new google.maps.Map(document.getElementById("map"), mapOptions); 

	for(var twit in Tweets) {
		if(Tweets[twit].coordinates2==null){
		}
		else{	
			var lng = Tweets[twit].coordinates2;
			var lat = Tweets[twit].coordinates1;
			var marker = new google.maps.Marker({map: map,position: new google.maps.LatLng(lat, lng)});	
		}
	};
}

function initMap(){
	
}