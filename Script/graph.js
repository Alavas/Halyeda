// Graphing functions.

  var currentRow = 0;
  var maxTime = 0;
  // call drawChart once google charts is loaded
  google.setOnLoadCallback(init);
  function init(){
    drawChartA();
  }

	function drawChartA() {
		var public_key = '1MxK00Z2XpsAyEM1WB4wIMxpAkv';
		var lightScaled = 0;
		//Get current date to compare with the timestamp later on.
		var d = new Date();
		maxTime = d;
		console.log("Current Time = " + d.getTime());
		d = d.getDate();
		console.log(d);
		// JSONP request
		var jsonData = $.ajax({
		url: 'http://54.85.191.82:8080/output/' + public_key + '.json',
		//data: {page: 0},
		dataType: 'jsonp',
		}).done(function (results) {

			var dataA = new google.visualization.DataTable();

			dataA.addColumn('datetime', 'Time');
			dataA.addColumn('number', 'Light');
			dataA.addColumn('number', 'Outdoor Temp');

			$.each(results, function (i, row) {
			lightScaled = (parseFloat(row.light) / 65535) * 100;				
			//lightScaled = ((parseFloat(row.light) - 10000) / 55000) * 100;
			dataA.addRow([
			(new Date(row.timestamp)),
			lightScaled,
			parseFloat(row.temp),
			]);
			//After adding the row compare date to current. Only display current day of data.
			var n = (new Date(row.timestamp));
			n = n.getDate();
			//console.log(n);
			if (n != d) {
				console.log(maxTime);
				maxTime = maxTime - 86400000;
				console.log("Maximum Time = " + maxTime);
				return false;
			}
			});

		var optionsA = {
			'displayAnnotations': true,
			'displayZoomButtons': true,
			'min': 35,
			'scaleType' : 'allmaximized',
			'scaleColumns': [1],
		};
		console.log(optionsA);
		var chartA = new google.visualization.AnnotationChart($('#current').get(0));
		chartA.draw(dataA, optionsA);
		drawChartB();
		});

	}

  function drawChartB() {

    var public_key = '1MxK00Z2XpsAyEM1WB4wIMxpAkv';
    var lightScaled = 0;
    var x = 0;
    //Get current date to compare with the timestamp later on.
    var d = new Date();
    d = d.getDate();
    d = d - 2;
    console.log(d);
    // JSONP request
    var jsonData = $.ajax({
      url: 'http://54.85.191.82:8080/output/' + public_key + '.json',
      //data: {page: 0},
      dataType: 'jsonp',
    }).done(function (results) {

      var dataB = new google.visualization.DataTable();

      dataB.addColumn('datetime', 'Time');
      dataB.addColumn('number', 'Light');
      dataB.addColumn('number', 'Outdoor Temp');

      $.each(results, function (i , row) {
		lightScaled = (parseFloat(row.light) / 65535) * 100;
        //lightScaled = ((parseFloat(row.light) - 10000) / 55000) * 100;
        //console.log(i);
        var temp = (new Date(row.timestamp));
        temp = temp.getTime();
		//console.log(temp);
        if (temp < maxTime){
          dataB.addRow([
            (new Date(row.timestamp)),
            lightScaled,
            parseFloat(row.temp),
          ]);
          //console.log(temp);
          var n = (new Date(row.timestamp));
          n = n.getDate();
		  //console.log(n);
        }
        if (n === d) {
          console.log(Date(row.timestamp));
          //console.log(i);
          return false;
        }
      });

      var optionsB = {
        'displayAnnotations': true,
        'displayZoomButtons': true,
        'min': 35,
        'scaleType' : 'allmaximized',
        'scaleColumns': [1],
      };
      console.log(optionsB);
      var chartB = new google.visualization.AnnotationChart($('#history').get(0));

      chartB.draw(dataB, optionsB);

    });

  }

  // load chart lib
  google.load('visualization', '1', {
    packages: ['annotationchart']
  });
