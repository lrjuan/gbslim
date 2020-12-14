var chrname=displayarea.getChr();
var chrstart=displayarea.getStart();
var chrend=displayarea.getEnd();
var chrwidth=displayarea.getWidth();
var tempXML1;

//getSeqData(chrwidth,chrname,chrstart,chrend);
function getSeqData(chrwidth,chrname,chrstart,chrend){
	var reqq = createXMLHttpRequest();	
	querry='action=update&width='+chrwidth+'&chr='+chrname+'&start='+chrstart+'&end='+chrend;
	reqq.onreadystatechange = function(){Update_GetSequence(reqq);};
	reqq.open("GET","servlet/test.do?"+querry,false);
	reqq.send(null);
	var tempseq;
	if(tempXML1.getElementsByTagName('Sequence').length!=0){
	tempseq=tempXML1.getElementsByTagName('Sequence')[0].childNodes[0].nodeValue;
	drawseq(tempseq);
	}
	else{
		drawXy();
	}
	
}
//alert(seq);
function Update_GetSequence(request) {
	if (request.readyState == 4&&request.status == 200){
		tempXML1=request.responseXML;
		//seq=XmlNode.getElementsByTagName('Sequence')[0].childNodes[0].nodeValue;	
		//alert(seq);
	}
		
}
function drawseq(arr){
	var canvas=document.getElementById("canvas");
	canvas.width=2400;
	canvas.height=150;;
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0,0,canvas.width,canvas.height);
	var len=arr.length;
	var wid=(canvas.width-300)/(len);
			
	if(wid>10){
    phXy(ctx,len,wid);
    phall(ctx,len,wid,arr);
	phCount(ctx,arr,wid);
	}
    else{
	phXy(ctx,len,wid);
	}
} 
			
		function phXy(ctx,l,wid){
			ctx.beginPath();
   	        ctx.moveTo( 300, 30);
   	        ctx.lineTo( canvas.width,30 );
   	        ctx.strokeStyle='rgba(0,0,0,0.8)';
   	        ctx.stroke();
   	        ctx.closePath();
   		
   	        ctx.beginPath();
			ctx.lineWidth=1;
   	        ctx.moveTo( 300,0);
   	        ctx.lineTo( 300,canvas.height);
   	        ctx.strokeStyle='#B2B2B2';
   	        ctx.stroke();
   	        ctx.closePath();
			if(l<110){
		    for(var i= 0;i< l;i+= 1){
   		    ctx.beginPath();
   			ctx.moveTo( 300+wid*(i+1)*10,30 );
   			ctx.lineTo( 300+wid*(i+1)*10,55 );
   			ctx.strokeStyle = 'rgba(0,0,0,1)';
            ctx.stroke();
   			ctx.closePath();
			
			ctx.beginPath();
   			ctx.moveTo( 300+wid*(i+1)*2,30 );
   			ctx.lineTo( 300+wid*(i+1)*2,43);
   			ctx.strokeStyle = 'rgba(0,0,0,0.8)';
            ctx.stroke();
   			ctx.closePath();
			
		    
		    }
			}
		    else{
	        var Dl=(canvas.width-300)/7; 
			var Dx=Dl/5;
		    for(var i=0;i<35;i++){
			ctx.beginPath();
   			ctx.moveTo( 300+(i+1)*Dx*5,30 );
   			ctx.lineTo( 300+(i+1)*Dx*5,55 );
   			         ctx.strokeStyle = 'rgba(0,0,0,1)';
                     ctx.stroke();
   			         ctx.closePath();
			 
					 ctx.beginPath();
					 ctx.moveTo( 300+(i+1)*Dx,30 );
   			         ctx.lineTo( 300+(i+1)*Dx,43 );
   			         ctx.strokeStyle = 'rgba(0,0,0,1)';
                     ctx.stroke();
   			         ctx.closePath();
					 }
					 for(var i=0;i<6;i++){
					 var Dt=Math.floor((displayarea.getEnd()-displayarea.getStart())/7);
					     ctx.font = '22px Century';
	                     ctx.fillStyle='black';
			             ctx.fillText((displayarea.getStart()+Dt*(i+1)).toLocaleString(),250+(i+1)*Dl,27)
				 }

				}
			ctx.font = '22px Century'  
	        ctx.fillStyle='black'
			ctx.fillText(displayarea.getChr(),20,40)
   	        ctx.fillText((displayarea.getStart()).toLocaleString(),301,27)
			ctx.textAlign='right';
			if(Math.round(displayarea.getEnd())/100000<=1){	
				ctx.fillText((displayarea.getEnd()).toLocaleString(),canvas.width,27)
			}
   	        else{
				ctx.fillText((displayarea.getEnd()).toLocaleString(),canvas.width,27)
			}
		}
		
		function phall(ctx,len,wid,arr){
			
			for(var i=0;i<len;i++){
				var rw=wid;
				var x=rw*i+300;
				var y=80;
				var h=10;
				var a=arr[i];
				
				ctx.beginPath();
				ctx.strokeRect(x,y,rw,h)
				if(a=='A'){
				ctx.fillStyle='rgb(255,0,0)';
				}
				else if(a=='C'){
					ctx.fillStyle='rgb(255,165,0)';
				}
				else if(a=='T'){
					ctx.fillStyle='rgb(0,255,55)';
				}
				else if(a=='G'){
					ctx.fillStyle='rgb(0,0,255)';
				}
				ctx.fillRect(x,y,rw,h)
				ctx.closePath();
				}
			
			}
		
		function phCount(ctx,rr,wid){
		for (var j=0;j<rr.length;j++){
		ctx.font='20px Century';
		ctx.fillStyle='black';
		ctx.fillText(rr[j],305+wid*j+(wid/5)*2,112);
		
		}
		} 
		
function drawXy(){
 var canvas=document.getElementById('canvas');
    canvas.width=2400;
    canvas.height=150;
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.moveTo( 300, 30);
    ctx.lineTo( canvas.width,30 );
    ctx.strokeStyle='rgba(0,0,0,0.8)';
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.lineWidth=1;
    ctx.moveTo( 300,0);
    ctx.lineTo( 300,canvas.height);
    ctx.strokeStyle='#B2B2B2';
    ctx.stroke();
    ctx.closePath();
 var len=displayarea.getEnd()-displayarea.getStart();
 var Dl=(canvas.width-300)/7; 
 var Dx=Dl/5;
 for(var i=0;i<35;i++){
     ctx.beginPath();
     ctx.moveTo( 300+(i+1)*Dx*5,30 );
     ctx.lineTo( 300+(i+1)*Dx*5,55 );
     ctx.strokeStyle = 'rgba(0,0,0,1)';
     ctx.stroke();
     ctx.closePath();
    
     ctx.beginPath();
     ctx.moveTo( 300+(i+1)*Dx,30 );
     ctx.lineTo( 300+(i+1)*Dx,43 );
     ctx.strokeStyle = 'rgba(0,0,0,1)';
        ctx.stroke();
     ctx.closePath();
     }
  for(var i=0;i<6;i++){
   var Dt=Math.floor((displayarea.getEnd()-displayarea.getStart())/7);
   ctx.font = '22px Century'  
   ctx.fillStyle='black'
   ctx.fillText((displayarea.getStart()+Dt*(i+1)).toLocaleString(),250+(i+1)*Dl,27)
      }
   
  ctx.font = '22px Century'  
  ctx.fillStyle='black'
  ctx.fillText(displayarea.getChr(),20,40)
  ctx.fillText((displayarea.getStart()).toLocaleString(),301,27)
  ctx.textAlign='right';
  if(Math.round(displayarea.getEnd())/100000<=1){ 
   ctx.fillText((displayarea.getEnd()).toLocaleString(),canvas.width,27)
   }
            else{
    ctx.fillText((displayarea.getEnd()).toLocaleString(),canvas.width,27)
   }
  }


