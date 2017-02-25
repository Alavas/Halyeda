<!DOCTYPE html>
<html>
  <title>Data Viewer</title>
  <head>
    <link href='https://fonts.googleapis.com/css?family=Roboto+Condensed' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="CSS/main.css" TYPE="text/css" />
	<!--<link rel="stylesheet" href="CSS/widget.css" TYPE="text/css" />-->
	<script src="Script/widget.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://www.google.com/jsapi"></script>
	<link href="https://calendly.com/assets/external/widget.css" rel="stylesheet">
	<!--<script type="text/javascript" src="https://calendly.com/assets/external/widget.js"></script>-->
	<script type="text/javascript">Calendly.initBadgeWidget({url: 'https://calendly.com/alavas/30min', text: 'Schedule time with me', color: '#ffffff', branding: true});</script>
    <script src="Script/graphNew.js"></script>
    <script src="Script/script.js"></script>
  </head>
  <body>
	<div id="banner"></div>
	<div class="dropdown" style="z-index:2; position:absolute; top:2px; left:2px;">
		<button class="dropbtn" style="width:70px;">Menu</button>
		<div id ="menu" class="dropdown-content" style="width:132px;">
			<a id="StateCaps" href="#">State Capitals</a>			
			<a id="About" href="#">About</a>
		</div>
	</div>
    <div id="title">Today's Data</div>
    <div id="current"></div>
    <div id="title">Yesterday's Data</div>
    <div id="history"></div>
	<div id="myModal" class="modal">
		<!-- Modal content -->
		<div class="modal-content">
			<span class="close">&times;</span>
			<p>This page displays the light value and outdoor temperature of my living room.</p>
			<p>The light is being measured by an Electric Imp IOT device which sends the light data to the Electric Imp cloud server. 
			Once the data is received there I use the Wunderground API to get the local outdoor temperature. These values are then packed
			and then an HTTP POST request is sent to my server where a Node.js Express server is running waiting to receive it. The Node.js
			server then takes the data and does another HTTP POST to a PHP file that writes to the MS SQL database. This query assigns a
			unique ID and a timestamp to the data points for later use.</p>
			<p>The webpage has 2 separate DIVs that display the current day's data and the previous day's data up until the same point as the 
			current day. This allows you to compare the days against each other and easily spot the differences. This is done by passing 
			parameters to an HTTP POST to an SQL query to return the data for the specified time period.</p>
			</div>
	</div>
  </body>
</html>
