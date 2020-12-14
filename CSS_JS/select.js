var oHtml = document.getElementsByTagName("html")[0]; 
var div=document.getElementsByClassName('whxdiv')[0];
div.shiftkey=0;
div.selectstart=0;
div.selectend=0; 

var sediv=document.createElement('div');
sediv.id='sediv';
sediv.style.top=document.getElementById('window').offsetTop+'px';
sediv.style.height=div.style.height+'px';
var canvas = document.createElement('canvas');
canvas.width=1500;
canvas.height=120;
canvas.style.width="100%";
canvas.style.height="100%";
canvas.id='sedivcanvas';
sediv.appendChild(canvas);
div.appendChild(sediv);

oHtml.onkeydown = function(ev) {  
	var div=document.getElementsByClassName('whxdiv')[0];
	var e = event || window.event || arguments.callee.caller.arguments[0]; 
	if(e&& e.keyCode == 16){
		div.shiftkey=1;
		div.onmousedown=function(){
			/*var oHtml = document.getElementsByTagName("html")[0];
			oHtml.onkeydown = function(ev) {
				var e = event || window.event || arguments.callee.caller.arguments[0];   
				if(e&& e.keyCode == 16){
					alert('a');	
				}
			}*/
			document.getElementById('cover1').style.display='none';
			var evt = evt || window.event;
			var marginleft=document.getElementById('window').offsetLeft+1;
			this.selectstart=mousePosition(evt).x-marginleft;
			
			var cvs=document.getElementById('sedivcanvas');
			var ctx=cvs.getContext('2d');
			ctx.clearRect(0,0,cvs.width,cvs.height);
			
			//document.getElementById('sediv').style.display='block'
		}
		div.onmousemove=function(){
			var evt = evt || window.event;
			var marginleft=document.getElementById('window').offsetLeft+1;
			var cvs=document.getElementById('sedivcanvas');
			var ctx=cvs.getContext('2d');
			ctx.beginPath();
			ctx.lineWidth=1;
			//ctx.moveTo( mousePosition(evt).x-marginleft,0);
			//ctx.lineTo( mousePosition(evt).x-marginleft,cvs.height);
			ctx.clearRect(0,0,cvs.width,cvs.height);
			ctx.fillStyle = "#3E9EFF"
			ctx.rect(this.selectstart,0,mousePosition(evt).x-marginleft-this.selectstart,cvs.height);
			ctx.strokeStyle='#000';
			ctx.stroke();
		}
		div.onmouseup=function(){
			var evt = evt || window.event;
			var marginleft=document.getElementById('window').offsetLeft+1;
			this.selectend=mousePosition(evt).x-marginleft;
			//document.getElementById('sediv').style.display='none'
			//document.getElementById('sediv').style.display='none'
			//document.getElementById('cover1').style.display='block'
			//alert(this.selectstart+'-'+this.selectend);
		}
	} 
	//else if(e==null){document.getElementById('cover1').style.display='block';}
}
oHtml.onkeyup=function(ev){
	//document.getElementById('cover1').style.display='block'
}

function mousePosition(evt){
	evt = evt || window.event;
	if(evt.pageX || evt.pageY){
		return { x : evt.pageX,y : evt.pageY}	
	}
	//IE
	return {
		x : evt.clientX + document.body.scrollLeft - document.body.clientLeft,
		y : evt.clientY + document.body.scrollTop - document.body.clientTop
	}
}