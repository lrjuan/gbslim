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
   	 canvas.width=1200;
   	 canvas.height=100;
   	 var ctx = canvas.getContext('2d');
			ctx.clearRect(0,0,canvas.width,canvas.height);
			var len=arr.length;
	        var wid=(canvas.width-150)/(len);
			
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
   	        ctx.moveTo( 150, 30);
   	        ctx.lineTo( canvas.width,30 );
   	        ctx.strokeStyle='rgba(0,0,0,0.5)';
   	        ctx.stroke();
   	        ctx.closePath();
   		
   	        ctx.beginPath();
   	        ctx.moveTo( 150,0);
   	        ctx.lineTo( 150,canvas.height);
   	        ctx.strokeStyle='rgba(0,0,0,0.8)';
   	        ctx.stroke();
   	        ctx.closePath();
		for(var i= 0;i< l; i+= 1){
   		    ctx.beginPath();
   			ctx.moveTo( 150+wid*(i+1)*10,0 );
   			ctx.lineTo( 150+wid*(i+1)*10,50 );
   			ctx.strokeStyle = 'rgba(0,0,0,1)';
            ctx.stroke();
   			ctx.closePath();
			
			ctx.beginPath();
   			ctx.moveTo( 150+wid*(i+1)*2,20 );
   			ctx.lineTo( 150+wid*(i+1)*2, 40);
   			ctx.strokeStyle = 'rgba(0,0,0,0.3)';
            ctx.stroke();
   			ctx.closePath();
			
		    ctx.font = '15px Arial'  
	        ctx.fillStyle='green'
			ctx.fillText(displayarea.getChr(),110,34)
   	        ctx.fillText(displayarea.getStart(),150,29)
   	        ctx.fillText(displayarea.getEnd(),canvas.width-30,29)
		    }
		}
		
		function phall(ctx,len,wid){
			
			for(var i=0;i<len;i++){
				var rw=wid;
				var x=rw*i+150;
				var y=60;
				var h=10;
				
				ctx.beginPath();
				ctx.strokeRect(x,y,rw,h)
				ctx.fillStyle='#FFFF00';
				ctx.fillRect(x,y,rw,h)
				ctx.closePath();
				}
			
			}
		
		function phCount(ctx,rr,wid){
		for (var j=0;j<rr.length;j++){
		ctx.font='10px georgian';
		ctx.fillStyle='black';
		ctx.fillText(rr[j],152+wid*j,90);
		
		}
		}
		

	
		
		
		

	 