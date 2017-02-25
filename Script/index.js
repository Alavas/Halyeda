$(document).ready(function() {
	console.log(stateSelect);
	$.getJSON("php/returnAddresses.php",{State: stateSelect}, function(json1) {
		var greyIcon = 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_grey.png';
		var blueIcon = 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue.png';		
		var blackIcon = 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_black.png';
		var yellowIcon = 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_yellow.png';
		var greenIcon = 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_green.png';	
		var redIcon = 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_red.png';		
		$.each(json1, function(key, data) {
			console.log(data.Pop);
			var latLng = {lat: data.lat, lng: data.lng};
			// Creating a marker and putting it on the 
			if (data.Pop > 500000) {
				displayIcon = blackIcon;
			} else if (data.Pop > 300000) {
				displayIcon = greyIcon;
			} else if (data.Pop > 200000) {
				displayIcon = blueIcon;
			} else if (data.Pop > 100000) {
				displayIcon = yellowIcon;
			} else if (data.Pop > 50000) {
				displayIcon = greenIcon;
			} else {
				displayIcon = redIcon;
			}
			var marker = new google.maps.Marker({
				position: latLng,
				title: ('State: ' + data.State + '\rCapital: ' + data.City + '\rPopulation: ' + data.Pop),
				icon: displayIcon,
				map: map
			});
			marker.addListener('click', function() {
				map.setZoom(16);
				map.setCenter(marker.getPosition());
			});
		});
	});	
	
	$(".dropbtn").on("click", function(e) {
		var e=window.event||e;
		$("#states").toggleClass("show");		
		e.stopPropagation();
	});
	$(".dropbtnMenu").on("click", function(e) {
		var e=window.event||e;
		$("#menu").toggleClass("show");		
		e.stopPropagation();
	});	
	$(document).on("click", function() {
		$("#states").removeClass("show");
		$("#menu").removeClass("show");
	});
	
	$(".dropdown-content a").on("click", function() {
		switch(this.id) {
			case "DataViewer":
				window.location = "dataView.php";
				break;
			case "About":
				break;
			default:
				window.location = "index.php?" + this.id;
		}
	});
	

	// Get the modal
	var modal = document.getElementById('myModal');

	// Get the button that opens the modal
	var btn = document.getElementById("About");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks the button, open the modal 
	btn.onclick = function() {
		modal.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}	
	
});

var stateSelect = location.search.split('?')[1]
var storeSelect = stateSelect;
if (typeof stateSelect === 'undefined'){
	stateSelect = "All";
} else if (stateSelect.length === 4){
	stateSelect = "All";
}
var map;
var zoomLvl;
var mapLat;
var mapLong; 

function initialize() {
	$.ajax({
		url: "php/mapCenter.php",
		type: "POST",
		async: false,
		data: ({State: stateSelect}),
		success: function(data){
			zoomLvl = data.Zoom;
			mapLat = data.lat;
			mapLong = data.lng;		
		}
	});
	console.log(zoomLvl);
	console.log(mapLat);
	console.log(mapLong);
	setupMap();
};
function setupMap() {
	var mapOptions = {
		center: new google.maps.LatLng(mapLat, mapLong),
		zoom: zoomLvl,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		streetViewControl: false,
		zoomControl: true,
		zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
		},
		scaleControl: true,
		mapTypeControl: false,
	};
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

};