$(document).ready(function(){
	console.log("Ready!");
	$('.buttonCSV').hover(function(){
		$(this).addClass('active');
	},
	function(){
		$(this).removeClass('active');
	}
	);
	$('.buttonCSV').click(function() {
	window.location = 'http://54.85.191.82:8080/output/1MxK00Z2XpsAyEM1WB4wIMxpAkv.csv';
	});

	$('.buttonJSON').hover(function(){
		$(this).addClass('active');
	},
	function(){
		$(this).removeClass('active');
	}
	);
	$('.buttonJSON').click(function() {
	window.location = 'http://54.85.191.82:8080/output/1MxK00Z2XpsAyEM1WB4wIMxpAkv.json';
	});

	$(".dropbtn").on("click", function(e) {
		var e=window.event||e;
		$("#menu").toggleClass("show");		
		e.stopPropagation();
	});	
	$(document).on("click", function() {
		$("#menu").removeClass("show");
	});

	$(".dropdown-content a").on("click", function() {
		switch(this.id) {
			case "StateCaps":
				window.location = "index.php";
				break;
			default:
				break;
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


