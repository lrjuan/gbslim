var oDiv=document.getElementById('displayimagelist');
var oUl=oDiv.getElementsByTagName('ul')[0];
var aLi=oUl.getElementsByTagName("li");
var iSpeed=-5;
var timer=null;
oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';
timer=setInterval(function(){
	oUl.style.left=oUl.offsetLeft+iSpeed+'px';
	if(oUl.offsetLeft<-oUl.offsetWidth/2){
		oUl.style.left='0px';
	}
},30);

	oUl.onmouseover=function(){
	clearInterval(timer);
	}
	oUl.onmouseout=function(){
		timer=setInterval(function(){
			oUl.style.left=oUl.offsetLeft+iSpeed+'px';
			if(oUl.offsetLeft<-oUl.offsetWidth/2){
				oUl.style.left='0px';
			}
		},30);
	}
