// Graphing functions.

// Call drawChart once Google charts is loaded.
  google.setOnLoadCallback(init);
function init () {
  var d = new Date();
  console.log(d);
  d.setHours(d.getHours() - 5);
  var t = d.toISOString().slice(0, 19).replace('T', ' ');
  d.setDate(d.getDate()-1);
  var r = d.toISOString().slice(0, 19).replace('T', ' ');
  drawChart(1,t,'#current');
  drawChart(2,r,'#history');
}

function drawChart(maxHr,minHr,div) {
	var jsonData = $.ajax({
		url: "php/returnData.php",
		type: "POST",
		async: false,
		data: ({Hours: maxHr, HoursP: minHr}),
	}).done(function (results) {
		var data = new google.visualization.DataTable();
		data.addColumn('datetime', 'Time');
		data.addColumn('number', 'Light');
		data.addColumn('number', 'Outdoor Temp');
		$.each(results, function (i, row) {
			lightScaled = (parseInt(row.Light) / 65535) * 100;
			data.addRow([
			(new Date(row.TimeStamp.date)),
			lightScaled,
			parseFloat(row.Temp),
			]);
		});

	var options = {
		'displayAnnotations': true,
		'displayZoomButtons': true,
		'min': 35,
		'scaleType' : 'allmaximized',
		'scaleColumns': [1],
	};
	console.log(options);
	var chart = new google.visualization.AnnotationChart($(div).get(0));
	chart.draw(data, options);

	});
};

// load chart lib
google.load('visualization', '1', {
	packages: ['annotationchart']
});
