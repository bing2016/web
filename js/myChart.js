function initChart(arr1, arr2) {
	var ctx = $("#myChart").get(0).getContext("2d");

	var data = {
		labels: arr1,
		datasets: [
		{
			fillColor: "rgba(220,220,220,0.5)",
			strokeColor: "rgba(220,220,220,1)",
			pointColor: "rgba(220,220,220,1)",
			pointStrokeColor: "#fff",
			data: arr2
		},
		]
	}

	var myNewChart = new Chart(ctx , {
		type: "line",
		data: data, 
	});

	Chart_Opacity();
}