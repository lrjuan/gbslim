//function drawtrack(trackname,displaytype,chrname,chrstart,chrend,chrwidth){
//Gene组的绘图
function draweletrack(trackname,mode,group){
		var canvas = document.createElement('canvas');
		canvas.width=2400;
		canvas.height=120;
		canvas.style.width="100%";
		canvas.id='canvas'+trackname;
		var ctx=canvas.getContext('2d');
		if(mode=='dense'){canvas.height=80;}
		var a=displayItems.get(trackname).getXMLnode().getElementsByTagName('E');
		if(a.length>1){
		var level=0,maxlevel=0;
		var array1=new Array();
		array1[0]=last;
		var array2=new Array();
		var wid=(canvas.width-300)/(displayarea.getEnd()-displayarea.getStart()+1);
		var start=Math.round(a[0].getElementsByTagName('F')[0].childNodes[0].nodeValue);
		var end=Math.round(a[0].getElementsByTagName('T')[0].childNodes[0].nodeValue);
		var last=(Math.round(a[0].getElementsByTagName('F')[0].childNodes[0].nodeValue)-displayarea.getStart())*wid+300+(end-start+1)*wid+175;
		var last1=last;
		for(var j=1;j<a.length;j++){
			if(a.length<=150 && trackname=='PtrGene' && mode=='pack'){
				var start=Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue);
				var end=Math.round(a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue);
				var x=(Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue)-displayarea.getStart())*wid+300;
				var w=(end-start+1)*wid;
				var leveltemp=-1;
				if(last>x){
					if(array2.length==0){
						//if(last<x+w+170)
						//{last=x+w+170;}
						//last=x+w+170;
						if(array1[0]<x){
							level=0;
							array2=array1;
							array1=[];
							array1[0]=x+w+175;
							}
						else{
							level++;
							array1[level]=x+w+175;
							}				
						
					}
					else{
						//level++;
						//if(last<x+w+170)
						//{last=x+w+170;}
						last=x+w+170;
						if(array1[0]<x){
							level=0;
							array2=array1;
							array1=[];
							}
						else{
							level++;
							}
							
						for(var i=0;i<array1.length;i++)
							{
								if(array1[i]==-1){
									if(array2[i]<x){
										leveltemp=i;
										array1[i]=x+w+175;
										break;	
										}
									}
								}
						
						while(leveltemp==-1){
							if(level>=array2.length){break;}
							if(array2[level]>x){
								array1[level]=-1;
								level++;
							}
							else{break;}
						}
						if(leveltemp==-1){array1[level]=x+w+175;}
						else{level--;}
					}
					
				}
				else{level=0;last=x+w+175;}
				if(maxlevel<level){maxlevel=level;}
			}
			
			
			else{
				if(Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue)<Math.round(a[j-1].getElementsByTagName('T')[0].childNodes[0].nodeValue)){
					level++;
					
				}
				else{level=0;
					last=x+w+175;
					array2=array1;
					array1=[];
					array1[0]=last;}
				if(maxlevel<level){maxlevel=level;}		
			}
		}
		
		if((maxlevel+2)*10>60&&mode=='pack'){
		if(a.length<=150 && trackname=='PtrGene' && mode=='pack'){
			canvas.height=(maxlevel+3)*20;
			}
		else{
		canvas.height=(maxlevel+3)*20;}
		var ctx=canvas.getContext('2d');
		}}
		
		if(a.length>0){
		var level=0;
		var temp=-1;
		var last=last1;
		var array1=new Array();
		array1[0]=last;
		var array2=new Array();
		var temp1=0;
		for(var j=0;j<a.length;j++){
			var leveltemp=-1;
			if(j>=1){
				if(a.length<=150 && trackname=='PtrGene' && mode=='pack'){
				var start=Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue);
				var end=Math.round(a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue);
				var wid=(canvas.width-300)/(displayarea.getEnd()-displayarea.getStart()+1);
				var x=(Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue)-displayarea.getStart())*wid+300;
				var y=0
				var w=(end-start+1)*wid;
				if(last>x){
					if(array2.length==0){
						//if(last<x+w+170)
						//{last=x+w+170;}
						//last=x+w+170;
						if(array1[0]<x){
							level=0;
							array2=array1;
							array1=[];
							array1[0]=x+w+175;
							}
						else{
							level++;
							array1[level]=x+w+175;
							}				
						
					}
					else{
						//level++;
						//if(last<x+w+170)
						//{last=x+w+170;}
						last=x+w+175;
						if(array1[0]<x){
							level=0;
							array2=array1;
							array1=[];
							}
						else{
							level++;
							}
							
						for(var i=0;i<array1.length;i++)
							{
								if(array1[i]==-1){
									if(array2[i]<x){
										leveltemp=i;
										array1[i]=x+w+175;
										break;	
										}
									}
								}
						
						while(leveltemp==-1){
							if(level>=array2.length){break;}
							if(array2[level]>x){
								array1[level]=-1;
								level++;
							}
							else{break;}
						}
						if(leveltemp==-1){array1[level]=x+w+175;}
						else{level--;}
						
					}
					
					//if(Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue)>Math.round(a[j-1].getElementsByTagName('T')[0].childNodes[0].nodeValue)&&minlast+50<x&&level>15){level=0;minlast=last;}
					//if(a.length<=50){
					//	if(level==10){level=0;}
					//	}
					//else{if(level==15){level=0;}}
				}
				else{
					level=0;
					last=x+w+175;
					array2=array1;
					array1=[];
					array1[0]=last;
					}
				}
				
				
				else{
				if(Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue)<Math.round(a[j-1].getElementsByTagName('T')[0].childNodes[0].nodeValue)){level++;}
				else{level=0;}}
			}
			
			var leveltp=level;
			if(leveltemp!=-1){level=leveltemp;}
			if(a.length>100){
				var gbtn=document.getElementsByClassName("genebutton");
						if(gbtn.length > 0&&j==0){
							while (gbtn.length > 0) {
								gbtn[0].remove();
							}
						}
				}
			if(a.length<=150 && trackname=='PtrGene' && mode=='pack'){
						var gbtn=document.getElementsByClassName("genebutton");
						if(gbtn.length > 0&&j==0){
							while (gbtn.length > 0) {
								gbtn[0].remove();
							}
						}
						var start=Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue);
						var end=Math.round(a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue);
						var wid=(canvas.width-300)/(displayarea.getEnd()-displayarea.getStart()+1);
						var x=(Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue)-displayarea.getStart())*wid+300;
						var y=0
						if(Math.round(displayarea.getEnd())<end){end=Math.round(displayarea.getEnd());}
						if(Math.round(displayarea.getStart())>start){start=Math.round(displayarea.getStart());}
						var w=(end-start+1)*wid;
				
						
						if(x>=300&&x<=2400){
						ctx.font = '18px Century';
						ctx.fillStyle='black';
						ctx.fillText(a[j].id,x-175,level*20+20);
						temp=level;
						
						}
						if((x+w)>=300){
						var button = document.createElement('input');
						button.type = 'button';
						button.className="genebutton";
						
						button.style.width=(w*document.getElementById('divPtrGene').getBoundingClientRect().width/canvas.width+2)+2+'px';
						button.style.height=12/(detectZoom()/100)+'px';
						button.id=a[j].id;
						var xlabel=document.getElementById('divPtrGene').getBoundingClientRect().width*(x/canvas.width)-2;
						var ylabel=(level*12.8/(detectZoom()/100))+2;
						button.style.marginLeft=xlabel+'px';
						button.style.marginTop=ylabel+'px';
						document.getElementById('divPtrGene').appendChild(button);					
						}
			
			}
			
			var tl=a[j].getElementsByTagName('S').length;
			if(tl==0&&Math.round(a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue)>displayarea.getStart()){
				var wid=(canvas.width-300)/(displayarea.getEnd()-displayarea.getStart()+1);
				var start=Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue);
				var end=Math.round(a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue);
				if (start<displayarea.getStart()){start=displayarea.getStart()}
				var w=(end-start+1)*wid;
				var x=(start-displayarea.getStart())*wid+300;
				if(w<1){w=1;}
				ctx.beginPath;
				ctx.fillStyle='#1f78b4';
				if(mode=='pack')
				{
					if(a.length<=150 && trackname=='PtrGene'){
					ctx.fillRect(x,level*20+5,w,16);}
					else{ctx.fillRect(x,level*20+5,w,16);}
					
				
				}
				else if(mode='dense')
				{ctx.fillRect(x,20,w,18);}
				ctx.fill();
            	ctx.closePath();
			}
			else if(tl>0&&Math.round(a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue)>displayarea.getStart()&&a.length>150){
				var wid=(canvas.width-300)/(displayarea.getEnd()-displayarea.getStart()+1);
				var start=Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue);
				var end=Math.round(a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue);
				if (start<displayarea.getStart()){start=displayarea.getStart()}
				var w=(end-start+1)*wid;
				var x=(start-displayarea.getStart())*wid+300;
				if(w<1){w=1;}
				ctx.beginPath;
				ctx.fillStyle='#1f78b4';
				if(mode=='pack')
				{
					if(a.length<=150 && trackname=='PtrGene'){
					ctx.fillRect(x,level*20+5,w,16);}
					else{ctx.fillRect(x,level*20+5,w,16);}
				}
				else if(mode='dense')
				{ctx.fillRect(x,20,w,18);}
				ctx.fill();
            	ctx.closePath();
				
			}
			else if(Math.round(a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue)>displayarea.getStart()){
			var b=a[j].getElementsByTagName('S');
			//var startArr=[];
			for(var k=0;k<tl;k++) {
				var type=b[k].getAttribute('Y');
				var start=b[k].getElementsByTagName('F')[0].childNodes[0].nodeValue;
				//startArr.push(start);
				var end=b[k].getElementsByTagName('T')[0].childNodes[0].nodeValue;
				if(end>displayarea.getStart()){
					if(start<displayarea.getStart()){start=displayarea.getStart();}
					if(mode=='dense'){draweledense(ctx,type,start,end,tl,canvas);}
					else if(mode=='pack'){
						if(a.length<=150 && trackname=='PtrGene'){drawelepack(ctx,type,start,end,canvas,level);}
						else{drawelepack(ctx,type,start,end,canvas,level);}
					}}
				}
		}
		level=leveltp;
		}
		}
		ctx.beginPath();
		ctx.clearRect(0,0,302,canvas.height);
		ctx.lineWidth=1;
   	    ctx.moveTo( 300,0);
   	    ctx.lineTo( 300,canvas.height);
   	    ctx.strokeStyle='#B2B2B2';
   	    ctx.stroke();
   	    ctx.closePath();
		document.getElementById('div'+trackname).appendChild(canvas);
}
//Variant
function drawvartrack(trackname,mode,group){
		var canvas = document.createElement('canvas');
		canvas.width=2400;
		canvas.height=120;
		canvas.style.width="100%";
		canvas.id='canvas'+trackname;
		var ctx=canvas.getContext('2d');
		ctx.beginPath();
		ctx.lineWidth=1;
   	    ctx.moveTo( 300,0);
   	    ctx.lineTo( 300,canvas.height);
   	    ctx.strokeStyle='#B2B2B2';
   	    ctx.stroke();
   	    ctx.closePath();
		if(displayItems.get(trackname).getXMLnode()!=null){
		if(displayItems.get(trackname).getXMLnode().getElementsByTagName('V').length==0){if(displayarea.getEnd()-displayarea.getStart()>=1000000)
			{ctx.font = '22px Century';
			ctx.fillText('Zoom in to display.',1150,70);}}	
		var a=displayItems.get(trackname).getXMLnode().getElementsByTagName('V');
		
		//计算重叠最大层数，重绘canvas画布高度。
		var level=0;
		var maxlevel=0;
		for(var j=0;j<a.length;j++){
			var wid=(canvas.width-300)/(displayarea.getEnd()-displayarea.getStart()+1);
				if(j>0){
					var laststart=parseFloat(a[j-1].getElementsByTagName('F')[0].childNodes[0].nodeValue);
					var lastend=parseFloat(a[j-1].getElementsByTagName('T')[0].childNodes[0].nodeValue);
					var w=(lastend-laststart+1)*wid;
					
					if(w<1){w=1}
					else{w=Math.round(w);}
						var start=parseFloat(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue);
						var lastx=300+Math.round((laststart-displayarea.getStart())*wid);
						var x=300+Math.round((start-displayarea.getStart())*wid);
						if(lastx+w>x){level++;if(level>maxlevel)maxlevel=level;}
						else{level=0;}
					
			}	
		}
		
		if((maxlevel+1)*20>120&&mode=='pack'){
		canvas.height=(maxlevel+1)*20;
		var ctx=canvas.getContext('2d');
		ctx.beginPath();
		ctx.lineWidth=1;
   	    ctx.moveTo( 300,0);
   	    ctx.lineTo( 300,canvas.height);
   	    ctx.strokeStyle='#B2B2B2';
   	    ctx.stroke();
   	    ctx.closePath();
		}
		//var wid=(canvas.width-150)/(displayarea.getEnd()-displayarea.getStart()+1);
		//for(var j=0;j<a.length;j++){}
		var level=0;
		
		for(var j=0;j<a.length;j++){
			var type=a[j].getAttribute('Y');
			var start=parseFloat(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue);
			var end=parseFloat(a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue);
			var lastend=-1;
			if(j>0){
				var laststart=parseFloat(a[j-1].getElementsByTagName('F')[0].childNodes[0].nodeValue);
				var lastend=parseFloat(a[j-1].getElementsByTagName('T')[0].childNodes[0].nodeValue);
				var w=(lastend-laststart+1)*wid;
					
				if(w<0.5){
						var start=parseFloat(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue);
						var lastx=300+(laststart-displayarea.getStart())*wid;
						var x=300+(start-displayarea.getStart())*wid;
						if(lastx+0.5>x){level++;if(level>maxlevel)maxlevel=level;}
						else{level=0;}
				}
			}
			if(mode=='dense'){drawvardense(ctx,type,start,end,a.length,canvas);}
			else if(mode=='pack'){drawvarpack(ctx,type,start,end,canvas,level);}
			}}
		else{
			if(displayarea.getEnd()-displayarea.getStart()>=1000000)
			ctx.font = '22px Century';	
			{ctx.fillText('Zoom in to display.',1150,70);}
		}
		document.getElementById('div'+trackname).appendChild(canvas);	
}
	//alert(displayItems.get('ERR1864411').getXMLnode().getElementsByTagName('ValueList')[0].childNodes[0].nodeValue);
//Value的绘图。柱形图，波形图，热度图
function drawvaltrack(trackname,mode,group){
		//document.getElementById('div'+trackname).style.height=60+'px';
		var canvas = document.createElement('canvas');
		canvas.width=2400;
		canvas.height=80;
		if(group=='Temp'){canvas.height=100;}
		canvas.style.width="100%";
		canvas.id='canvas'+trackname;
		var ctx=canvas.getContext('2d');
		var valueArr=displayItems.get(trackname).getXMLnode().getElementsByTagName('ValueList')[0].childNodes[0].nodeValue;
		var Arr=valueArr.split(";");
		for(var j=0;j<Arr.length;j++){
			Arr[j]=parseFloat(Arr[j]);
		}
		var maxNum=Math.max.apply(null,Arr);
	    ctx.font = '18px Century'
		ctx.fillText(Math.round(maxNum),305,25);
	    if(mode=='pack'){canvas.height=120;drawthermogram(ctx,Arr,canvas);}//热图
	    else if(mode=='dense'){drawwaveform(ctx,Arr,canvas);}//波形图
	    //else if(type=='diagram'){//曲线图
	             //drawdiagram(ctx,Arr,canvas);}三种画图
		ctx.beginPath();
		ctx.lineWidth=1;
   	    ctx.moveTo( 300,0);
   	    ctx.lineTo( 300,canvas.height);
   	    ctx.strokeStyle='#B2B2B2';
   	    ctx.stroke();
   	    ctx.closePath();
		document.getElementById('div'+trackname).appendChild(canvas);
}
function drawetrack(trackname,mode,group){
		var canvas = document.createElement('canvas');
		canvas.width=2400;
		canvas.height=120;
		canvas.style.width="100%";
		canvas.id='canvas'+trackname;
		var ctx=canvas.getContext('2d');
		ctx.beginPath();
		ctx.lineWidth=1;
   	    ctx.moveTo( 300,0);
   	    ctx.lineTo( 300,canvas.height);
   	    ctx.strokeStyle='#B2B2B2';
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
		canvas.height=(maxlevel+2)*20;
		var ctx=canvas.getContext('2d');
		ctx.beginPath();
		ctx.lineWidth=1;
   	    ctx.moveTo( 300,0);
   	    ctx.lineTo( 300,canvas.height);
   	    ctx.strokeStyle='#B2B2B2';
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
			if(tl==0){
				var wid=(canvas.width-300)/(displayarea.getEnd()-displayarea.getStart()+1);
				var start=Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue);
				var end=Math.round(a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue);
				var w=(end-start+1)*wid;
				var x=(start-displayarea.getStart())*wid+300;
				ctx.beginPath;
				ctx.fillStyle='#1f78b4';
				ctx.fillRect(x,level*20,w,16);
				ctx.fill();
            	ctx.closePath();
			}
			else{
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
		}}}
		}
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
		else if(displayItems.get(keyset[i]).getGroup().substring(0,6)=='RNASeq'){drawvaltrack(keyset[i],displayItems.get(keyset[i]).getMode(),displayItems.get(keyset[i]).getGroup()); }
		else if(displayItems.get(keyset[i]).getGroup()=="Temp"){drawvaltrack(keyset[i],displayItems.get(keyset[i]).getMode(),displayItems.get(keyset[i]).getGroup()); }
		else if(displayItems.get(keyset[i]).getGroup()=='Regulation'){draweletrack(keyset[i],displayItems.get(keyset[i]).getMode(),displayItems.get(keyset[i]).getGroup()); }
		else if(displayItems.get(keyset[i]).getGroup()=='User'){draweletrack(keyset[i],displayItems.get(keyset[i]).getMode(),displayItems.get(keyset[i]).getGroup()); }
	}
}
function draweledense(ctx,type,start,end,tl,canvas){
		var wid=(canvas.width-300)/(displayarea.getEnd()-displayarea.getStart()+1);
		var w=(end-start+1)*wid;
		var x=(start-displayarea.getStart())*wid+300;
			if(type=='X'){
			   ctx.beginPath();
			   ctx.fillStyle='#1f78b4';
			   ctx.fillRect(x,20,w,10);
			   ctx.fill();
               ctx.closePath();
			   }
			 else if(type=='L'){
			   ctx.beginPath();
			   ctx.fillStyle='#1f78b4';
			   ctx.fillRect(x,24,w,2);
			   ctx.fill();
               ctx.closePath();
			}
			else if(type=='D'){
					   ctx.beginPath();
					   ctx.fillStyle='#1f78b4';
			   		   ctx.fillRect(x,22,w,5);
					   ctx.fill();
					   ctx.closePath();
			}

}
function drawelepack(ctx,type,start,end,canvas,level){
		var y=level*20+5;
		var wid=(canvas.width-300)/(displayarea.getEnd()-displayarea.getStart()+1);
		var w=(end-start)*wid;
		var x=300+(start-displayarea.getStart())*wid;
		if(type=='X'){
			ctx.beginPath;
			ctx.fillStyle='#1f78b4';
			ctx.fillRect(x,y,w,16);
			ctx.fill();
            ctx.closePath();
			}
			else if(type=='L'){
				ctx.beginPath;
				ctx.fillStyle='#1f78b4';
				ctx.fillRect(x,y+8,w,2);
				ctx.fill();
                ctx.closePath();
				}
				else if(type=='D'){
					ctx.beginPath;
					ctx.fillStyle='#1f78b4';
					ctx.fillRect(x,y+4,w,8);
					ctx.fill();
                    ctx.closePath();
					}					
}
function drawvardense(ctx,type,start,end,tl,canvas){
		var wid=canvas.width/(displayarea.getEnd()-displayarea.getStart()+1);
		var w=(end-start+1)*wid;
		var dw=(end-start)*wid/4;
		var x=(start-displayarea.getStart())*wid+300;
			if(type=='SNV'){
			   ctx.beginPath();
			   ctx.fillStyle='#1f78b4';
			   if(wid<0.5){
			   		ctx.fillRect(x,20,0.5,12);
			   }
			   else{
				   ctx.fillRect(x,20,wid,12);
			   }
			   ctx.fill();
               ctx.closePath();
			   }
			   else if(type=='DEL'){
				   for(var j=0;j<tl;j++){
				   ctx.beginPath;
				   ctx.fillStyle='#ed5126';
				   if(wid<0.5){
			   		ctx.fillRect(x,20,0.5,12);
			   		}
			   		else{
				   ctx.fillRect(x+j*wid,20,wid,12);
					}
				   ctx.fill();
                   ctx.closePath();
				   }
				   }	   
}

function drawvarpack(ctx,type,start,end,canvas,level){
     var y=level*20;
     var wid=(canvas.width-300)/(displayarea.getEnd()-displayarea.getStart()+1);
     var x=300+Math.round((start-displayarea.getStart())*wid);
	 if(wid<1){wid=1;}
	 var w=(end-start+1)*wid;
     if(type=='SNV'){
        ctx.beginPath();
        ctx.fillStyle='#1f78b4';
        ctx.fillRect(x,y,w,16);
        ctx.fill();
        ctx.closePath();
   }
   else if(type=='DEL'){
       ctx.beginPath();
       ctx.fillStyle='#ed5126';
       ctx.fillRect(x,y,w,16);
       ctx.fill();
       ctx.closePath();
    } 
	
	return level;  
 }

//value三种绘图，未画值小于零的情况热图、曲线图、波形图
//柱状图
function drawhistogram(ctx,valueArr,canvas){
		ctx.beginPath();
		ctx.moveTo(150,canvas.height-5);
		ctx.lineTo(canvas.width,canvas.height-5);
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
             ctx.fillRect(x,canvas.height-6,wid,h); 
             }
}
//波形图
function drawwaveform(ctx,Arr,canvas){
		ctx.beginPath();
		ctx.moveTo(300,canvas.height-5);
		ctx.lineTo(canvas.width,canvas.height-5);
		ctx.strokeStyle='rgba(0,0,0,0.5)';
		ctx.stroke();
		ctx.closePath();
		for(var j=0;j<Arr.length;j++){
			Arr[j]=parseFloat(Arr[j]);
		}
	    var maxNum=Math.max.apply(null,Arr);
	    var curveH = (canvas.height/2)/Math.abs(maxNum);
		var wid=(canvas.width-300)/(Arr.length);
	    for(var i=0;i<Arr.length;i++){
			var x=300+i*wid;
			if(Arr[i]>0){
				var h1=canvas.height-7-(curveH*Arr[i]);
				var h2=canvas.height-7-(curveH*Arr[i+1]);
				var h3=canvas.height-7-(curveH*Arr[i-1]);
			 }
			 else{
				 var h1=canvas.height-7+(curveH*Arr[i]);
				 var h2=canvas.height-7+(curveH*Arr[i+2]);
				 }
			    ctx.beginPath();
			    ctx.strokeStyle='#00C957';
			    if(h1<=113&&h2<=113){
			    ctx.moveTo(x,h1);
			    ctx.lineTo(x+wid,h1);
			    ctx.lineTo(x+wid,h2);
               
			   }
				else{
					var h3=canvas.height-7-(curveH*Arr[i+1]);
					ctx.moveTo(x,113);
					ctx.lineTo(x,h3);
					ctx.lineTo(x+wid,h3);
				}
		        ctx.stroke();
		        ctx.closePath();
		}
	
}

//曲线图
function drawdiagram(ctx,Arr,canvas){
	    ctx.beginPath();
		ctx.moveTo(300,canvas.height-5);
		ctx.lineTo(canvas.width,canvas.height-5);
		ctx.strokeStyle='rgba(0,0,0,0.5)';
		ctx.stroke();
		ctx.closePath();
		for(var j=0;j<Arr.length;j++){
			Arr[j]=parseFloat(Arr[j]);
		}
	    var maxNum=Math.max.apply(null,Arr);
	    var curveH = (canvas.height-10)/Math.abs(maxNum);
		var wid=(canvas.width-300)/(Arr.length);
	    for(var i=0;i<Arr.length;i++){
			var x=300+i*wid;
			//var a=Math.floor(((maxNum-Arr[i])/maxNum)*255);
			//var b=Math.floor((Arr[i]/maxNum)*255);
			if(Arr[i]>0){
				 var h=canvas.height-7-(curveH*Arr[i]);
			 }
			 else{
				 var h=canvas.height-7+(curveH*Arr[i]);
				 }
			ctx.beginPath();
			ctx.strokeStyle='##FF0000';
			ctx.moveTo(x,canvas.height-7);
			ctx.quadraticCurveTo(x+wid/2,h,x+wid,canvas.height-7);
			ctx.lineTo(x,canvas.height-7);
		    ctx.stroke();
		    ctx.closePath();
		}
}
//热图分为12级填充指定颜色
function drawthermogram(ctx,Arr,canvas){
		for(var j=0;j<Arr.length;j++){
			Arr[j]=parseFloat(Arr[j]);
		}
	    var maxNum=Math.max.apply(null,Arr);
	    var curveH = (canvas.height-10)/Math.abs(maxNum);
		var wid=(canvas.width-300)/(Arr.length);
	    for(var i=0;i<Arr.length;i++){
			var x=300+i*wid;
			//var a=Math.floor(((maxNum-Arr[i])/maxNum)*255);
			//var b=Math.floor((Arr[i]/maxNum)*255);
			ctx.beginPath();
			if(Arr[i]==0){
				ctx.fillStyle='white';
				ctx.strokeStyle='white';
			} 
			else if(Arr[i]<-500){
			    ctx.fillStyle='#00008B';
			}
			else if(Arr[i]>=-500&&Arr[i]<-400){
				ctx.fillStyle='#0000CD'
			}
			else if(Arr[i]>=-400&&Arr[i]<-300){
				ctx.fillStyle='#0000FF';
			}
			else if(Arr[i]>=-300&&Arr[i]<-200){
				ctx.fillStyle='#6A5ACD';
			}
			else if(Arr[i]>=-200&&Arr[i]<-100){
				ctx.fillStyle='#1E90FF';
			}
			else if(Arr[i]>=-100&&Arr[i]<0){
				ctx.fillStyle='#ADD8E6';
			}
			else if(Arr[i]>0&&Arr[i]<(maxNum/6)){
				ctx.fillStyle='rgb(253,11,30)';
				ctx.strokeStyle='rgb(253,11,30)';
			}
			else if(Arr[i]>=(maxNum/6)&&Arr[i]<((maxNum/6)*2)){
				ctx.fillStyle='rgb(244,44,67)';
				ctx.strokeStyle='rgb(244,44,67)';
			}
			else if(Arr[i]>=((maxNum/6)*2)&&Arr[i]<((maxNum/6)*3)){
				ctx.fillStyle='rgb(255,69,0)';
				ctx.strokeStyle='rgb(255,69,0)';
			}
			else if(Arr[i]>=((maxNum/6)*3)&&Arr[i]<((maxNum/6)*4)){
				ctx.fillStyle='rgb(255,0,0)';
				ctx.strokeStyle='rgb(255,0,0)';
			}
			else if(Arr[i]>=((maxNum/6)*4)&&Arr[i]<((maxNum/6)*5)){
				ctx.fillStyle='rgb(215,48,39)';
				ctx.strokeStyle='rgb(215,48,39)';
			}
			else if(Arr[i]>=((maxNum/6)*5)){
				ctx.fillStyle='rgb(165,0,38)';
				ctx.strokeStyle='rgb(165,0,38)';
			}
			ctx.fillRect(x,5,wid,canvas.height-10);
			ctx.fill;
		    ctx.strokeRect(x,5,wid,canvas.height-10)
			ctx.stroke();
		    ctx.closePath();
		}
}
//柱状图
function drawhistogram(ctx,Arr,canvas){
		ctx.beginPath();
		ctx.moveTo(150,canvas.height-5);
		ctx.lineTo(canvas.width,canvas.height-5);
		ctx.strokeStyle='rgba(0,0,0,0.5)';
		ctx.stroke();
		ctx.closePath();

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
             ctx.fillRect(x,canvas.height-6,wid,h); 
             }
}


//canvas平移，滚轮缩放
