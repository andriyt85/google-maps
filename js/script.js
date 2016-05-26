function initMap() {
  	var myMapDiv = document.getElementById('map');
    var map = new google.maps.Map(myMapDiv, {
      center: {lat: 48.921, lng: 24.710},
      zoom: 8
    });
   
    loadXMLFile();
    
  	function loadXMLFile() {
	    var filename = "js/markers.xml";
	    $.ajax({
	      type: "GET",
	      url:filename,
	      dataType: "xml",
	      success: parseXML,
	      error: onXMLLoadFailed
	    });	 
	    function onXMLLoadFailed(){
      		alert("You have some isssues with your browser");
    	}
	    function parseXML(xml){	      
			var point = new google.maps.LatLngBounds();
			$(xml).find("points").each(function(){
				var lat = $(this).find('latitude').text();
				var lng = $(this).find('longitude').text();
				var name = $(this).find('name').text();
				var markersPositioms = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
				point.extend(markersPositioms);

				var marker;
				marker = new google.maps.Marker({
				map: map,
				draggable: true,
				animation: google.maps.Animation.DROP,
				position: markersPositioms, map:map, });
				
				google.maps.event.addListener(marker,'click',function() {
        	map.setZoom(14.5);
        	map.setCenter(marker.getPosition());
      	});
      	
      	google.maps.event.addListener(marker,'select',function() {
        	map.setZoom(14);
        	map.setCenter(marker.getPosition());
      	});

				var infowindow = new google.maps.InfoWindow({
					content:name
				});

				marker.addListener('click', function() {
					infowindow.open(map, marker);
				});     
	        });
	    map.fitBounds(point);
	    }
	};  
};
