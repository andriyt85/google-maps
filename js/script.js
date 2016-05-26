/*function initMap() {
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
	google.maps.event.addListener(map,'center_changed',function() {
	 window.setTimeout(function() {
	map.panTo(marker.getPosition());
	 },3000);
	})
	var infowindow = new google.maps.InfoWindow({
		content:"The center of the city!"
	});
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});
	
};*/


function initMap() {
  var mapOptions = {
  zoom: 5,
  center: new google.maps.LatLng(48.923694, 24.709126)
};
  
  var map = new google.maps.Map(document.getElementById('map'),  mapOptions);
    loadXMLFile();
    
function loadXMLFile(){
  var filename = "js/markers.xml";
  $.ajax({
    type: "GET",
    url:filename,
    dataType: "xml",
    success: parseXML,
   
  });
  function onXMLLoadFailed(){
    alert("You have some isssues with your browser");
  }
  function parseXML(xml){
    
    var bounds = new google.maps.LatLngBounds();
    $(xml).find("marker").each(function(){
            var lat = $(this).find('latitude').text();
            var lng = $(this).find('longitude').text();
            var name = $(this).find('name').text();
            var markerCoords = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
            bounds.extend(markerCoords);
            var marker = new google.maps.Marker({position: markerCoords, map:map, });
            var infowindow = new google.maps.InfoWindow({
                content:name
             });
            marker.addListener('click', function() {
              infowindow.open(map, marker);
            });
            
            
            
        });
  map.fitBounds(bounds);
  }

  
  
};
 
   
};

