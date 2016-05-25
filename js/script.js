function initMap() {
	var myMapDiv = document.getElementById('map');
    var map = new google.maps.Map(myMapDiv, {
      center: {lat: 48.921, lng: 24.710},
      zoom: 8
    });
    var marker;
    marker = new google.maps.Marker({
	    map: map,
	    draggable: true,
	    animation: google.maps.Animation.DROP,
	    position: {lat: 48.921, lng: 24.710}
	});
	google.maps.event.addListener(marker,'click',function() {
	map.setZoom(15);
	map.setCenter(marker.getPosition());
	});
	/*google.maps.event.addListener(map,'center_changed',function() {
	 window.setTimeout(function() {
	map.panTo(marker.getPosition());
	 },3000);
	});*/
	var infowindow = new google.maps.InfoWindow({
		content:"The center of the city!"
	});
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});
	
};
