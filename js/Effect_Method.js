/**
 * Link function: redirect to links after click
 * @param  {String} A url address which needs to redirect to
 */
function openpage(url){
	window.open(url);
} 

/**
 * Change input box position after user input characters
 */
function Input_Position(){
	var node = $("#input");
	node.css("margin-top", "0%");
	node.css("margin-left", "10%");

}

/**
 * Play Chart part when user using this function
 */
function Chart_Opacity(){
	var node = $("#chart");
	node.css("display", "block");

}

/**
 * Do not play Chart part when user using other function
 */
function Chart_Opacity_0(){
	var node = $("#chart");
	node.css("display", "none");

}

/**
 * Play UserProFile part when user using this function
 */
function User_Profile_Opacity(){
	var node = $("#User_Profile");
	node.css("display", "block");
}

/**
 * Show background pic when video ended
 */
function BackGournd_Vedio_Opacity() {
	var node = $("#video");
	node.css("display", "none");
}

/**
 * CheckBox function: when checked output on, when unchecked output off
 */
function changevalue(){
	var add_type=document.getElementById("add_type");
	if(add_type.checked==true)
		add_type.value="on";
	if(add_type.checked==false)
		add_type.value="off";
}