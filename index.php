<?PHP
error_reporting(0);
session_start();
?>

<!DOCTYPE html>
<html>
	<title>Location Viewer</title>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
	<link href='https://fonts.googleapis.com/css?family=Roboto+Condensed' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="CSS/index.css" TYPE="text/css" />
	<link href="https://calendly.com/assets/external/widget.css" rel="stylesheet">
	<script src="Script/widget.js"></script>
    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>   	
	<script type="text/javascript">Calendly.initBadgeWidget({url: 'https://calendly.com/alavas/30min', text: 'Schedule time with me', color: '#ffffff', branding: true});</script>
	<script src="Script/index.js"></script>
    <style type="text/css">
      html { height: 100% }
      body { height: 100%; margin: 0; padding: 0 }
      #map_canvas { height: 100% }
    </style> 

	<script async defer
		src="http://maps.googleapis.com/maps/api/js?key=AIzaSyBmmSXBpRrjsd37zimH1ZPQWWHosyCDh6g&callback=initialize">	
	</script>	
  </head>
  <body>
	<div id="banner" style="z-index:1; position:absolute; top:0px; left:0px;"></div>
    <div id="map_canvas" style="width:100%; height:100%"></div> 
	<div class="dropdown" style="z-index:2; position:absolute; top:2px; left:2px;">
		<button class="dropbtnMenu" style="width:70px;">Menu</button>
		<div id ="menu" class="dropdown-content" style="width:132px;">
			<a id="DataViewer" href="#">Data Viewer</a>			
			<a id="About" href="#">About</a>
		</div>
	</div>
	<div class="dropdown" style="z-index:2; position:absolute; top:2px; left:75px;">
		<button class="dropbtn" style="width:150px;">Select State</button>
		<div id="states" class="dropdown-content">
			<a id="All" href="#">All States</a>			
			<a id="AL" href="#">Alabama</a>			
			<a id="AK" href="#">Alaska</a>		
			<a id="AZ" href="#">Arizona</a>
			<a id="AR" href="#">Arkansas</a>
			<a id="CA" href="#">California</a>
			<a id="CO" href="#">Colorado</a>
			<a id="CT" href="#">Connecticut</a>
			<a id="DE" href="#">Delaware</a>
			<a id="FL" href="#">Florida</a>
			<a id="GA" href="#">Georgia</a>
			<a id="HI" href="#">Hawaii</a>
			<a id="ID" href="#">Idaho</a>
			<a id="IL" href="#">Illinois</a>
			<a id="IN" href="#">Indiana</a>
			<a id="IA" href="#">Iowa</a>
			<a id="KS" href="#">Kansas</a>
			<a id="KY" href="#">Kentucky</a>
			<a id="LA" href="#">Lousiana</a>
			<a id="ME" href="#">Maine</a>
			<a id="MD" href="#">Maryland</a>
			<a id="MA" href="#">Massachussetts</a>
			<a id="MI" href="#">Michigan</a>
			<a id="MN" href="#">Minnesota</a>
			<a id="MS" href="#">Mississippi</a>
			<a id="MO" href="#">Missouri</a>
			<a id="MT" href="#">Montana</a>
			<a id="NE" href="#">Nebraska</a>
			<a id="NV" href="#">Nevada</a>
			<a id="NH" href="#">New Hampshire</a>
			<a id="NJ" href="#">New Jersey</a>
			<a id="NM" href="#">New Mexico</a>
			<a id="NY" href="#">New York</a>
			<a id="NC" href="#">North Carolina</a>
			<a id="ND" href="#">North Dakota</a>
			<a id="OH" href="#">Ohio</a>
			<a id="OK" href="#">Oklahoma</a>
			<a id="OR" href="#">Oregon</a>
			<a id="PA" href="#">Pennsylvania</a>
			<a id="RI" href="#">Rhode Island</a>
			<a id="SC" href="#">South Carolina</a>
			<a id="SD" href="#">South Dakota</a>
			<a id="TN" href="#">Tennessee</a>
			<a id="TX" href="#">Texas</a></br>
			<a id="UT" href="#">Utah</a>
			<a id="VT" href="#">Vermont</a>
			<a id="VA" href="#">Virginia</a>
			<a id="WA" href="#">Washington</a>
			<a id="WV" href="#">West Virginia</a>
			<a id="WI" href="#">Wisconsin</a>
			<a id="WY" href="#">Wyoming</a>
		</div>
	</div>
	<div id="myModal" class="modal">
		<!-- Modal content -->
		<div class="modal-content">
			<span class="close">&times;</span>
			<p>This page is an example of a project management tool that I built for a large scale project with over 400 
			installation locations.</p>
			<p>In this example I am mapping the location of the US State Capitol buildings. An MS SQL database stores the address as well as
			the population of each city. From the dropdown menu on the page you can select to display all or only one 
			state at a time. When a selection is made the abbreviation of the selected state name is sent to an SQL query and a 'WHERE LIKE' 
			query is performed. The values from the returned rows are parsed and a custom Google map is created. Aditional data stored 
			in the database for each location is add to each marker and can be displayed by hovering your mouse over each point.</p>
		</div>
	</div>	
	</body>
</html>