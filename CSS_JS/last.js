//function drawtrack(trackname,displaytype,chrname,chrstart,chrend,chrwidth){
//Gene组的绘图
function draweletrack(trackname,mode,group){
		var canvas = document.createElement('canvas');
		canvas.width=1200;
		canvas.height=60;
		canvas.style.width="100%";
		canvas.id='canvas'+trackname;
		var ctx=canvas.getContext('2d');
		ctx.beginPath();
		ctx.lineWidth=2;
   	    ctx.moveTo( 150,0);
   	    ctx.lineTo( 150,canvas.height);
   	    ctx.strokeStyle='#669999';
   	    ctx.stroke();
   	    ctx.closePath();
		
		var a=displayItems.get(trackname).getXMLnode().getElementsByTagName('E');
		if(a.length>1){
		var level=0,maxlevel=0;
		for(var j=1;j<a.length;j++){
		if(Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue)<Math.round(a[j-1].getElementsByTagName('T')[0].childNodes[0].nodeValue)){level++;}
		else{level=0;}
		if(maxlevel<level){maxlevel=level;}
		}
		if((maxlevel+2)*10>60&&mode=='pack'){
		canvas.height=(maxlevel+2)*10;
		var ctx=canvas.getContext('2d');
		ctx.beginPath();
		ctx.lineWidth=2;
   	    ctx.moveTo( 150,0);
   	    ctx.lineTo( 150,canvas.height);
   	    ctx.strokeStyle='#669999';
   	    ctx.stroke();
   	    ctx.closePath();
		}}
		
		if(a.length>0){
		var level=0;
		for(var j=0;j<a.length;j++){
			if(j>=1){
				if(Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue)<Math.round(a[j-1].getElementsByTagName('T')[0].childNodes[0].nodeValue)){level++;}
				else{level=0;}
			}
			
			
			var tl=a[j].getElementsByTagName('S').length;
			var b=a[j].getElementsByTagName('S');
			//var startArr=[];
			for(var k=0;k<tl;k++) {
				var type=b[k].getAttribute('Y');
				var start=b[k].getElementsByTagName('F')[0].childNodes[0].nodeValue;
				//startArr.push(start);
				var end=b[k].getElementsByTagName('T')[0].childNodes[0].nodeValue;
				if(end>displayarea.getStart()){
					if(start<displayarea.getStart()){
						start=displayarea.getStart();
					}
					if(mode=='dense'){draweledense(ctx,type,start,end,tl,canvas);}
					else if(mode=='pack'){
						drawelepack(ctx,type,start,end,canvas,level);
					}
				}
		}}
		}
		document.getElementById('div'+trackname).appendChild(canvas);
}
//Variant
function drawvartrack(trackname,mode,group){
		var canvas = document.createElement('canvas');
		canvas.width=1200;
		canvas.height=60;
		canvas.style.width="100%";
		canvas.id='canvas'+trackname;
		var ctx=canvas.getContext('2d');
		ctx.beginPath();
		ctx.lineWidth=2;
   	    ctx.moveTo( 150,0);
   	    ctx.lineTo( 150,canvas.height);
   	    ctx.strokeStyle='#669999';
   	    ctx.stroke();
   	    ctx.closePath();
		if(displayItems.get(trackname).getXMLnode()!=null){
		var a=displayItems.get(trackname).getXMLnode().getElementsByTagName('V');
		for(var j=0;j<a.length;j++){
			var type=a[j].getAttribute('Y');
			var start=a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue;
			var end=a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue;
			if(mode=='dense'){drawvardense(ctx,type,start,end,a.length,canvas);}
			else if(mode=='pack'){}
			}}
		document.getElementById('div'+trackname).appendChild(canvas);	
}
	//alert(displayItems.get('ERR1864411').getXMLnode().getElementsByTagName('ValueList')[0].childNodes[0].nodeValue);
//Value的绘图
function drawvaltrack(trackname,mode,group){
		var canvas = document.createElement('canvas');
		canvas.width=1200;
		canvas.height=50;
		canvas.style.width="100%";
		canvas.id='canvas'+trackname;
		var ctx=canvas.getContext('2d');
		ctx.beginPath();
		ctx.lineWidth=2;
   	    ctx.moveTo( 150,0);
   	    ctx.lineTo( 150,canvas.height);
   	    ctx.strokeStyle='#669999';
   	    ctx.stroke();
   	    ctx.closePath();
		
		
		
		var valueArr=displayItems.get(trackname).getXMLnode().getElementsByTagName('ValueList')[0].childNodes[0].nodeValue;
		var Arr=valueArr.split(";");
		for(var j=0;j<Arr.length;j++){
			Arr[j]=parseFloat(Arr[j]);
		}
		var maxNum=Math.max.apply(null,Arr);
		ctx.fillText(maxNum,100,10);
		drawvalue(ctx,valueArr,canvas);

		document.getElementById('div'+trackname).appendChild(canvas);
}
//总的绘图	
function drawalltrack(){
	var keyset=displayItems.keySet();
	for(var i=0;i<keyset.length;i++){
		var canvas=document.getElementById("canvas"+keyset[i]);
		canvas.parentNode.removeChild(canvas);
		if(displayItems.get(keyset[i]).getGroup()=='Gene'){
		draweletrack(keyset[i],displayItems.get(keyset[i]).getMode(),displayItems.get(keyset[i]).getGroup());
		}
		else if(displayItems.get(keyset[i]).getGroup()=='Variant'){ 
			drawvartrack(keyset[i],displayItems.get(keyset[i]).getMode(),displayItems.get(keyset[i]).getGroup());
		}
		else if(displayItems.get(keyset[i]).getGroup()=='RNASeq'){drawvaltrack(keyset[i],displayItems.get(keyset[i]).getMode(),displayItems.get(keyset[i]).getGroup()); }
	}
}
function draweledense(ctx,type,start,end,tl,canvas){
		var wid=(canvas.width-150)/(displayarea.getEnd()-displayarea.getStart()+1);
		var w=(end-start+1)*wid;
		var x=(start-displayarea.getStart())*wid+150;
		if(w<0.1){w=1;}
			if(type=='D'){
			   ctx.beginPath();
			   ctx.fillStyle='BLUE';
			   ctx.fillRect(x,20,w,10);
			   ctx.fill();
               ctx.closePath();
			   }
			 else if(type=='L'){
			   ctx.beginPath();
			   ctx.fillStyle='BLUE';
			   ctx.fillRect(x,24,w,2);
			   ctx.fill();
               ctx.closePath();
			}
			else if(type=='X'){
					   ctx.beginPath();
					   ctx.fillStyle='BLUE';
			   		   ctx.fillRect(x,22,w,5);
					   ctx.fill();
					   ctx.closePath();
			}

}
function drawelepack(ctx,type,start,end,canvas,level){
		var y=level*10;
		var wid=(canvas.width-150)/(displayarea.getEnd()-displayarea.getStart()+1);
		var x=150+(start-displayarea.getStart()+1)*wid;
		var w=(end-start+1)*wid;
		if(type=='D'){
			ctx.beginPath;
			ctx.fillStyle='BLUE';
			ctx.fillRect(x,y,w,8);
			ctx.fill();
            ctx.closePath();
			}
			else if(type=='L'){
				ctx.beginPath;
				ctx.fillStyle='BLUE';
				ctx.fillRect(x,y+4,w,1);
				ctx.fill();
                ctx.closePath();
				}
				else if(type=='X'){
					ctx.beginPath;
					ctx.fillStyle='BLUE';
					ctx.fillRect(x,y+2,w,4);
					ctx.fill();
                    ctx.closePath();
					}					
}
function drawvardense(ctx,type,start,end,tl,canvas){
		var wid=canvas.width/(displayarea.getEnd()-displayarea.getStart()+1);
		var w=(end-start+1)*wid;
		var dw=(end-start)*wid/4;
		var x=(start-displayarea.getStart())*wid+150;
			if(type=='SNV'){
			   ctx.beginPath();
			   ctx.fillStyle='BLUE';
			   if(wid<0.5){
			   		ctx.fillRect(x,20,0.5,10);
			   }
			   else{
				   ctx.fillRect(x,20,wid,10);
			   }
			   ctx.fill();
               ctx.closePath();
			   }
			   else if(type=='DEL'){
				   for(var j=0;j<tl;j++){
				   ctx.beginPath;
				   ctx.fillStyle='RED';
				   if(wid<0.5){
			   		ctx.fillRect(x,20,0.5,10);
			   		}
			   		else{
				   ctx.fillRect(x+j*wid,20,wid,10);
					}
				   ctx.fill();
                   ctx.closePath();
				   }
				   }	   
}

function drawvarpack(ctx,type,start,end,canvas,level){
     var y=level*10;
     var wid=(canvas.width-150)/(displayarea.getEnd()-displayarea.getStart());
     var w=(end-start+1)*wid;
     var x=150+(start-displayarea.getStart()+1)*wid;
     if(type=='SNV'){
        ctx.beginPath();
        ctx.fillStyle='blue';
        ctx.fillRect(x,y,w,8);
        ctx.fill();
        ctx.closePath();
   }
   else if(type=='DEL'){
       ctx.beginPath();
       ctx.fillStyle='blue';
       ctx.fillRect(x,y,w,2);
       ctx.fill();
       ctx.closePath();
    }   
 }

function drawvalue(ctx,valueArr,canvas){
		ctx.beginPath();
		ctx.moveTo(150,canvas.height);
		ctx.lineTo(canvas.width,canvas.height);
		ctx.strokeStyle='rgba(0,0,0,0.5)';
		ctx.stroke();
		ctx.closePath();

		var Arr=valueArr.split(";");
		for(var j=0;j<Arr.length;j++){
			Arr[j]=parseFloat(Arr[j]);
		}
		var maxNum=Math.max.apply(null,Arr);
        var curveH = (canvas.height/2)/Math.abs(maxNum);
		var wid=(canvas.width-150)/(Arr.length);
		for(var i=0;i<Arr.length;i++){
			var x=150+i*wid;
			if(Arr[i]>0){
				var h=(-curveH*Arr[i]);
			 }
			 else{
				 var h=(curveH*Arr[i]);
				 }
			 ctx.fillStyle='#2D8CF0';
             ctx.fillRect(x,canvas.height,2,h); 
             }
}