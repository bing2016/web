function GetDateStr(AddDayCount) { 
	var dd = new Date(); 
	dd.setDate(dd.getDate()+AddDayCount);
	var y = dd.getFullYear(); 
	var m = dd.getMonth()+1;
	if (m>=1 && m<=9) {
		m = '0'+ m
	}
	var d = dd.getDate(); 
	return y+"-"+m+"-"+d; 
} 


function initChart(statistics) {



	var day1 = GetDateStr(0);
	var day2 = GetDateStr(-1);
	var day3 = GetDateStr(-2);
	var day4 = GetDateStr(-3);
	var day5 = GetDateStr(-4);
	var day6 = GetDateStr(-5);
	var day7 = GetDateStr(-6);

	var arr1 = [day7,day6,day5,day4,day3,day2,day1];
	var arr2 = [0,0,0,0,0,0,0];

	for (i in arr1) {
		for (j in statistics) {
			if (statistics[j].date == arr1[i]) {
				arr2[i] = statistics[j].value;
			}
		}
	}

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