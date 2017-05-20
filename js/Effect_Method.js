function openpage(url){
	window.open(url);
} 

function Input_Position(){
	var node = $("#input");
	node.css("margin-top", "0%");
	node.css("margin-left", "10%");

}

function Chart_Opacity(){
	var node = $("#chart");
	node.css("display", "block");

}

function Chart_Opacity_0(){
	var node = $("#chart");
	node.css("display", "none");

}

function User_Profile_Opacity(){
	var node = $("#User_Profile");
	node.css("display", "block");
}

function BackGournd_Vedio_Opacity() {
	var node = $("#video");
	node.css("display", "none");
}

window.onscroll = function (){
	var marginBot = 0;
	if (document.documentElement.scrollTop){
		var X=document.documentElement.scrollHeight;
		var Y=document.documentElement.scrollTop+document.body.scrollTop;
		var Z=document.documentElement.clientHeight;
		marginBot=X-Y-Z;
	} else {
		var J=document.body.scrollHeight;
		var I=document.body.scrollTop;
		var K=document.body.clientHeight;
		marginBot=J-I-K;
	}
	if(marginBot<=0) {
		// scroll(0,0);
	}
}

function changevalue(){
	var add_type=document.getElementById("add_type");
	if(add_type.checked==true)
		add_type.value="on";
	if(add_type.checked==false)
		add_type.value="off";
}