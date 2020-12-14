//function drawtrack(trackname,displaytype,chrname,chrstart,chrend,chrwidth){
//Gene组的绘图
function draweletrack(trackname,mode,group){
		var currentwidth;//名字长度
		if(trackname=='PtrGene'){currentwidth=195;}
		if(trackname=='miRNA'){currentwidth=160;}
		if(trackname=='Repeat Mask'){currentwidth=185;}
		var canvas = document.createElement('canvas');
		canvas.width=4800;
		canvas.height=120;
		canvas.classList='outercanvas';
		canvas.id='canvas'+trackname;
		var ctx=canvas.getContext('2d');
		if(mode=='dense'){canvas.height=100;}
		var a=displayItems.get(trackname).getXMLnode().getElementsByTagName('E');
		
		if(a.length>1){
		var level=0,maxlevel=0;
		var array1=new Array();
		array1[0]=last;
		var array2=new Array();
		var wid=(canvas.width)/(displayarea.getEnd()-displayarea.getStart()+1);
		var start=Math.round(a[0].getElementsByTagName('F')[0].childNodes[0].nodeValue);
		var end=Math.round(a[0].getElementsByTagName('T')[0].childNodes[0].nodeValue);
		var last=(Math.round(a[0].getElementsByTagName('F')[0].childNodes[0].nodeValue)-displayarea.getStart())*wid+(end-start+1)*wid+currentwidth;
		var last1=last;

		for(var j=1;j<a.length;j++){
			if(a.length<=250 && mode=='pack'){
				var start=Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue);
				var end=Math.round(a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue);
				var x=(Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue)-displayarea.getStart())*wid;
				var w=(end-start+1)*wid;
				var leveltemp=-1;
				if(last>x){
					if(array2.length==0){
						if(array1[0]<x){
							level=0;
							array2=array1;
							array1=[];
							array1[0]=x+w+currentwidth;
							}
						else{
							level++;
							array1[level]=x+w+currentwidth;
							}				
					}
					else{
						last=x+w+currentwidth-5;
						if(array1[0]<x){
							level=0;
							array2=array1;
							array1=[];
							}
						else{level++;}
						for(var i=0;i<array1.length;i++)
							{
								if(array1[i]==-1){
									if(array2[i]<x){
										leveltemp=i;
										array1[i]=x+w+currentwidth;
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
						if(leveltemp==-1){array1[level]=x+w+currentwidth;}
						else{level--;}
					}
					
				}
				else{level=0;last=x+w+currentwidth;}
				if(maxlevel<level){maxlevel=level;}
			}
			else{
				if(Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue)<Math.round(a[j-1].getElementsByTagName('T')[0].childNodes[0].nodeValue)){
					level++;
				}
				else{level=0;
					last=x+w+currentwidth;
					array2=array1;
					array1=[];
					array1[0]=last;}
				if(maxlevel<level){maxlevel=level;}		
			}
		}
		if((maxlevel+3)*30>120&&mode=='pack'){
			
			if(a.length<=250 && mode=='pack'){
				canvas.height=(maxlevel+5)*30;
				}
			else{
			canvas.height=(maxlevel+5)*30;}
			var ctx=canvas.getContext('2d');
			}
		}
				
		var gbtn=document.getElementById('div'+trackname).getElementsByClassName("genebutton");						
		if(gbtn.length > 0){
			while (gbtn.length > 0) {
				gbtn[0].remove();
			}
		}
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
				if(a.length<=250 && mode=='pack'){
				var start=Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue);
				var end=Math.round(a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue);
				var wid=(canvas.width)/(displayarea.getEnd()-displayarea.getStart()+1);
				var x=(Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue)-displayarea.getStart())*wid;
				var y=0
				var w=(end-start+1)*wid;
				if(last>x){
					if(array2.length==0){
						if(array1[0]<x){
							level=0;
							array2=array1;
							array1=[];
							array1[0]=x+w+currentwidth;
							}
						else{
							level++;
							array1[level]=x+w+currentwidth;
							}				
					}
					else{
						last=x+w+currentwidth;
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
										array1[i]=x+w+currentwidth;
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
						if(leveltemp==-1){array1[level]=x+w+currentwidth;}
						else{level--;}
						
					}
				}
				else{
					level=0;
					last=x+w+currentwidth;
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
			if(a.length<=250  && mode=='pack'){
						var start=Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue);
						var end=Math.round(a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue);
						var wid=(canvas.width)/(displayarea.getEnd()-displayarea.getStart()+1);
						
						if(Math.round(displayarea.getEnd())<end){end=Math.round(displayarea.getEnd());}
						if(Math.round(displayarea.getStart())>start){start=Math.round(displayarea.getStart());}
						var x=(start-displayarea.getStart())*wid;
						var y=0
						var w=(end-start+1)*wid;
				
						ctx.font = '20px Century';
						ctx.fillStyle='black';
						ctx.fillText(a[j].id,x-currentwidth,level*30+23);
						temp=level;
						
						if(true){
							var trackdiv;
							var btnwth=110;
							var btnleft=107;
							if(trackname=='PtrGene'){trackdiv=document.getElementById('divPtrGene');}
							else if(trackname=='miRNA'){trackdiv=document.getElementById('divmiRNA');btnleft=90;btnwth=90;}
							//if(x-currentwidth<0){btnwth=(x)*11/17;x=0;btnleft=0;}
							var button = document.createElement('input');
							button.type = 'button';
							button.className="genebutton";
							if(w<1){w=1;}
							//button.style.width=(w*2626/canvas.width+2)+btnwth+'px';
							button.style.height=14+'px';
							button.id=a[j].id;
							button.start=a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue;
							button.end=a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue;
							button.trackname=trackname;
							button.group=group;
							
							var xlabel=2626*(x/canvas.width)-2;
							//if(trackname=='miRNA'){}
							var ylheight=16.4;
							var ylabel=(level*ylheight)+2;
							button.style.marginLeft=xlabel-btnleft+'px';
							button.style.marginTop=ylabel+'px';
							button.startpo=xlabel-btnleft;
							button.endpo=xlabel-btnleft+(w*2626/canvas.width+2)+btnwth;
							
							button.onclick=function(){
								getDetail(this.id,this.start,this.end,this.trackname,this.group);
							}
							//trackdiv.appendChild(button);
							
							button.style.display='none';
							buttoncheck(button,0-innermousemove);
							if(group!='User'){
								document.getElementById('innerdiv'+trackname).appendChild(button);
							}
						}
			
			}
			
			var tl=a[j].getElementsByTagName('S').length;
			if(tl==0&&Math.round(a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue)>displayarea.getStart()){
				var wid=(canvas.width)/(displayarea.getEnd()-displayarea.getStart()+1);
				var start=Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue);
				var end=Math.round(a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue);
				if (start<displayarea.getStart()){start=displayarea.getStart()}
				var w=(end-start+1)*wid;
				var x=(start-displayarea.getStart())*wid;
				if(w<1){w=1;}
				ctx.beginPath;
				ctx.fillStyle='#1f78b4';
				if(mode=='pack')
				{
					if(a.length<=250){
					ctx.fillRect(x,level*30+5,w,24);}
					else{ctx.fillRect(x,level*30+5,w,24);}
					
				
				}
				else if(mode='dense')
				{ctx.fillRect(x,30,w,24);}
				ctx.fill();
            	ctx.closePath();
			}
			else if(tl>0&&Math.round(a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue)>displayarea.getStart()&&a.length>250){
				var wid=(canvas.width)/(displayarea.getEnd()-displayarea.getStart()+1);
				var start=Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue);
				var end=Math.round(a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue);
				if (start<displayarea.getStart()){start=displayarea.getStart()}
				var w=(end-start+1)*wid;
				var x=(start-displayarea.getStart())*wid;
				if(w<1){w=1;}
				ctx.beginPath;
				ctx.fillStyle='#1f78b4';
				if(mode=='pack')
				{
					if(a.length<=250 ){
					ctx.fillRect(x,level*30+5,w,20);}
					else{ctx.fillRect(x,level*30+5,w,20);}
				}
				else if(mode='dense')
				{ctx.fillRect(x,30,w,22);}
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
						if(a.length<=250){drawelepack(ctx,type,start,end,canvas,level);}
						else{drawelepack(ctx,type,start,end,canvas,level);}
					}}
				}
		}
		level=leveltp;
		}
		}
		canvas.style.height='100%';

		innermove('innerdiv'+trackname);
		document.getElementById('innerdiv'+trackname).appendChild(canvas);
		document.getElementById('div'+trackname).style.height=document.getElementById('innerdiv'+trackname).offsetHeight+'px';
		//document.getElementById('innerdiv'+trackname).style.height='190px';
		//document.getElementById('div'+trackname).style.height='200px';
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
//Variant
function drawvartrack(trackname,mode,group){
		var canvas = document.createElement('canvas');
		canvas.width=4800;
		canvas.height=120;
		canvas.style.width="100%";
		canvas.id='canvas'+trackname;
		var ctx=canvas.getContext('2d');
		
		var gbtn=document.getElementById('div'+trackname).getElementsByClassName("genebutton");						
		if(gbtn.length > 0){
			while (gbtn.length > 0) {
				gbtn[0].remove();
			}
		}
		if(displayItems.get(trackname).getXMLnode()!=null){
			if(displayItems.get(trackname).getXMLnode().getElementsByTagName('V').length==0){
				if(displayarea.getEnd()-displayarea.getStart()>=100000)
				{
					var temp=2200-4800*(-656.5-innermousemove)/(-2626);
					ctx.font = '22px Century';	
					ctx.fillText('Zoom in to display.',temp,70);
				}
			}	
			var a=displayItems.get(trackname).getXMLnode().getElementsByTagName('V');
		
		//计算重叠最大层数，重绘canvas画布高度。
			if((a.length>200&&mode=='pack')||(mode=='dense'&&a.length>0)){
				/*var level=0;
				var maxlevel=0;
				var wid=(canvas.width)/(displayarea.getEnd()-displayarea.getStart()+1);
				for(var j=0;j<a.length;j++){
						if(j>0){
							var laststart=parseFloat(a[j-1].getElementsByTagName('F')[0].childNodes[0].nodeValue);
							var lastend=parseFloat(a[j-1].getElementsByTagName('T')[0].childNodes[0].nodeValue);
							var w=(lastend-laststart+1)*wid;	
							if(w<1.5){w=1.5;}
							var start=parseFloat(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue);
							var lastx=Math.round((laststart-displayarea.getStart())*wid);
							var x=Math.round((start-displayarea.getStart())*wid);
							if(lastx+w>=x){level++;if(level>maxlevel)maxlevel=level;}
							else{level=0;}
						}	
				}
			
				if((maxlevel+1)*30>120&&mode=='pack'){
					canvas.height=(maxlevel+4)*30;
					var ctx=canvas.getContext('2d');
					ctx.beginPath();
				}
				var level=0;
				var maxlevel=0;
				for(var j=0;j<a.length;j++){
					var type=a[j].getAttribute('Y');
					var start=parseFloat(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue);
					var end=parseFloat(a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue);
					var lastend=-1;
					if(j>0){
						var laststart=parseFloat(a[j-1].getElementsByTagName('F')[0].childNodes[0].nodeValue);
						var lastend=parseFloat(a[j-1].getElementsByTagName('T')[0].childNodes[0].nodeValue);
						var w=(lastend-laststart+1)*wid;
						if(w<1.5){w=1.5;}
						var start=parseFloat(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue);
						var lastx=Math.round((laststart-displayarea.getStart())*wid);
						var x=Math.round((start-displayarea.getStart())*wid);
						if(lastx+w>=x){level++;if(level>maxlevel){maxlevel=level;}}
						else{level=0;}
					}
					if(mode=='dense'){drawvardense(ctx,type,start,end,a.length,canvas);}
					else if(mode=='pack'){drawvarpack(ctx,type,start,end,canvas,level);}
				}*/
				var currentwidth=0;
				var start=Math.round(a[0].getElementsByTagName('F')[0].childNodes[0].nodeValue);
				var end=Math.round(a[0].getElementsByTagName('T')[0].childNodes[0].nodeValue);
				var wid=(canvas.width-300)/(displayarea.getEnd()-displayarea.getStart()+1);
				var last=(Math.round(a[0].getElementsByTagName('F')[0].childNodes[0].nodeValue)-displayarea.getStart())*wid+(end-start+1)*wid+currentwidth;
				var level=0;
				var posmat=[];
				for(var j=0;j<a.length;j++){
					var start=Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue);
					var end=Math.round(a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue);
					var x=(Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue)-displayarea.getStart())*wid;
					var w=(end-start+1)*wid+5;
					//if(w<1){w=1};
					if(j==0){
						posmat[0]=x+w+currentwidth;
					}
					//if(j==a.length-1){alert(posmat[1].length)};
					if(j>0){
						var i;
						var newlevel=true;
						for(i=0;i<posmat.length;i++){
							if(x>posmat[i]){
								level=i; 
								posmat[i]=x+w+currentwidth;
								newlevel=false;
								break;
							}
						}
						if(newlevel){
							level=i;
							posmat[i]=x+w+currentwidth;
						}
					}
				}
				var maxlevel=posmat.length;
				if((maxlevel+1)*20>120&&mode=='pack'){
					canvas.height=(maxlevel+4)*20;
					var ctx=canvas.getContext('2d');
				}
				var start=Math.round(a[0].getElementsByTagName('F')[0].childNodes[0].nodeValue);
				var end=Math.round(a[0].getElementsByTagName('T')[0].childNodes[0].nodeValue);
				var wid=(canvas.width)/(displayarea.getEnd()-displayarea.getStart()+1);
				var last=(Math.round(a[0].getElementsByTagName('F')[0].childNodes[0].nodeValue)-displayarea.getStart())*wid+(end-start+1)*wid+currentwidth;
				var level=0;
				var posmat=[];
				for(var j=0;j<a.length;j++){				
					var type=a[j].getAttribute('Y');
					var start=Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue);
					var end=Math.round(a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue);
					var x=(Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue)-displayarea.getStart())*wid;
					var w=(end-start+1)*wid+5;
					//if(w<1){w=1;}
					if(j==0){
						if(mode=='pack'){drawvarpack(ctx,type,start,end,canvas,level);}
						else{drawvardense(ctx,type,start,end,a.length,canvas);}
						posmat[0]=x+w+currentwidth;
					}
					//if(j==a.length-1){alert(posmat[1].length)};
					if(j>0){
						var i;
						var newlevel=true;
						for(i=0;i<posmat.length;i++){
							if(x>posmat[i]){
								level=i; 
								posmat[i]=x+w+currentwidth;
								newlevel=false;
								break;
							}
						}
						if(newlevel){
							level=i;
							posmat[i]=x+w+currentwidth;
						}
						if(mode=='pack'){drawvarpack(ctx,type,start,end,canvas,level);}
						else{drawvardense(ctx,type,start,end,a.length,canvas);}
					}
				}
			}
			else if(mode=='pack'&&a.length<=200&&a.length>0){//写入变异ID
				var currentwidth=77;
				var start=Math.round(a[0].getElementsByTagName('F')[0].childNodes[0].nodeValue);
				var end=Math.round(a[0].getElementsByTagName('T')[0].childNodes[0].nodeValue);
				var wid=(canvas.width-300)/(displayarea.getEnd()-displayarea.getStart()+1);
				var last=(Math.round(a[0].getElementsByTagName('F')[0].childNodes[0].nodeValue)-displayarea.getStart())*wid+(end-start+1)*wid+currentwidth;
				var level=0;
				var posmat=[];
				for(var j=0;j<a.length;j++){
					var start=Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue);
					var end=Math.round(a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue);
					var x=(Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue)-displayarea.getStart())*wid;
					var w=(end-start+1)*wid+5;
					//if(w<1){w=1};
					if(j==0){
						posmat[0]=x+w+currentwidth;
					}
					if(j>0){
						var i;
						var newlevel=true;
						for(i=0;i<posmat.length;i++){
							if(x>posmat[i]){
								level=i; 
								posmat[i]=x+w+currentwidth;
								newlevel=false;
								break;
							}
						}
						if(newlevel){
							level=i;
							posmat[i]=x+w+currentwidth;
						}
					}
				}
				var maxlevel=posmat.length;
				if((maxlevel+1)*20>120&&mode=='pack'){
					canvas.height=(maxlevel+4)*20;
					var ctx=canvas.getContext('2d');
				}
				//写入id
				var start=Math.round(a[0].getElementsByTagName('F')[0].childNodes[0].nodeValue);
				var end=Math.round(a[0].getElementsByTagName('T')[0].childNodes[0].nodeValue);
				var wid=(canvas.width)/(displayarea.getEnd()-displayarea.getStart()+1);
				var last=(Math.round(a[0].getElementsByTagName('F')[0].childNodes[0].nodeValue)-displayarea.getStart())*wid+(end-start+1)*wid+currentwidth;
				var level=0;
				var posmat=[];
				var gbtn=document.getElementById('div'+trackname).getElementsByClassName("genebutton");						
						if(gbtn.length > 0&& j==0){
							while (gbtn.length > 0) {
								gbtn[0].remove();
							}
						}
				for(var j=0;j<a.length;j++){				
					var type=a[j].getAttribute('Y');
					var start=Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue);
					var end=Math.round(a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue);
					var x=(Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue)-displayarea.getStart())*wid;
					var w=(end-start+1)*wid+5;
					//if(w<1){w=1;}
					if(j==0){
						ctx.font = '20px Century';
						ctx.fillStyle='black';
						ctx.fillText('variant',x-currentwidth,level*20+20);
						drawvarpack(ctx,type,start,end,canvas,level);
						posmat[0]=x+w+currentwidth;
					}
					//if(j==a.length-1){alert(posmat[1].length)};
					if(j>0){
						var i;
						var newlevel=true;
						for(i=0;i<posmat.length;i++){
							if(x>posmat[i]){
								level=i; 
								posmat[i]=x+w+currentwidth;
								newlevel=false;
								break;
							}
						}
						if(newlevel){
							level=i;
							posmat[i]=x+w+currentwidth;
						}
						ctx.font = '20px Century';
						ctx.fillStyle='black';
						ctx.fillText('variant',x-currentwidth,level*20+20);
						drawvarpack(ctx,type,start,end,canvas,level);
						
								
						
					}//j>0
					//移除按钮
						/*var gbtn=document.getElementById('div'+trackname).getElementsByClassName("genebutton");						
						if(gbtn.length > 0&& j==0){
							while (gbtn.length > 0) {
								gbtn[0].remove();
							}
						}*/
						//加入按钮
						
						var trackdiv=document.getElementById('div'+trackname);
						var btnwth=45;
						var btnleft=43;
						//if(x-currentwidth<0){btnwth=(x)*11/17;x=0;btnleft=0;}
						var button = document.createElement('input');
						button.type = 'button';
						button.className="genebutton";
						if(w<1){w=1;}
						
						button.style.width=(w*trackdiv.getBoundingClientRect().width/canvas.width+2)+btnwth+'px';
						button.style.height=7*(detectZoom()/100)+'px';
						button.start=a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue;
						button.end=a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue;
						button.id=start+' '+end;
						button.trackname=trackname;
						button.group=group;
						//button.active=0;
						//var xlabel=1313*(x/canvas.width)-2;
						////if(trackname=='miRNA'){}
						//var ylheight=16;
						//var ylabel=(level*ylheight)+3;
						
						var xlabel=2626*(x/canvas.width)-2;
						var ylheight=10.9;
						var ylabel=(level*ylheight)+2;
						button.style.marginLeft=xlabel-btnleft+'px';
						button.style.marginTop=ylabel+'px';
						button.style.height='13px';
						button.startpo=xlabel-btnleft;
						button.endpo=xlabel-btnleft+(w*2626/canvas.width+2)+btnwth;
						
						button.style.marginLeft=xlabel-btnleft+'px';
						button.style.marginTop=ylabel+'px';
						button.onclick=function(){
								getDetail(this.id,this.start,this.end,this.trackname,this.group);
								this.active=1;
						}
						button.style.display='none';
						buttoncheck(button,0-innermousemove);
						document.getElementById('innerdiv'+trackname).appendChild(button);					
				}
				
			}
		}
		else{
			if(displayarea.getEnd()-displayarea.getStart()>=100000)
			{
				var temp=2200-4800*(-656.5-innermousemove)/(-2626);
				ctx.font = '22px Century';	
				ctx.fillText('Zoom in to display.',temp,70);
			}
		}
		//document.getElementById('innerdiv'+trackname).style.height=canvas.height*0.62+'px';
		canvas.style.height='100%';
		document.getElementById('innerdiv'+trackname).appendChild(canvas);	
		innermove('innerdiv'+trackname);
		document.getElementById('div'+trackname).style.height=document.getElementById('innerdiv'+trackname).offsetHeight+'px';
}
	//alert(displayItems.get('ERR1864411').getXMLnode().getElementsByTagName('ValueList')[0].childNodes[0].nodeValue);
//Value的绘图。柱形图，波形图，热度图
function drawvaltrack(trackname,mode,group){
		//document.getElementById('div'+trackname).style.height=60+'px';
		var canvas = document.createElement('canvas');
		canvas.width=4800;
		canvas.height=100;
		if(group=='Sequence Feature'){canvas.height=120;}
		canvas.style.width="100%";
		canvas.id='canvas'+trackname;
		var ctx=canvas.getContext('2d');
		var valueArr=displayItems.get(trackname).getXMLnode().getElementsByTagName('ValueList')[0].childNodes[0].nodeValue;
		var Arr=valueArr.split(";");
		for(var j=0;j<Arr.length;j++){
			Arr[j]=parseFloat(Arr[j]);
		}
		//var maxNum=Math.max.apply(null,Arr);
	   // ctx.font = '18px Century'
		//ctx.fillText(Math.round(maxNum),305,25);
	    if(mode=='pack'){canvas.height=120;drawthermogram1(ctx,Arr,canvas);}//热图
	    else if(mode=='dense'){drawwaveform(ctx,Arr,canvas);}//波形图
	    //else if(type=='diagram'){//曲线图
	             //drawdiagram(ctx,Arr,canvas);}三种画图
		document.getElementById('innerdiv'+trackname).appendChild(canvas);
		innermove('innerdiv'+trackname);
		document.getElementById('div'+trackname).style.height=document.getElementById('innerdiv'+trackname).offsetHeight+'px';
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
		else if(displayItems.get(keyset[i]).getGroup().substring(0,6)=='RNASeq'){
			drawvaltrack(keyset[i],displayItems.get(keyset[i]).getMode(),displayItems.get(keyset[i]).getGroup()); }
		else if(displayItems.get(keyset[i]).getGroup()=="Sequence Feature"){
			if(keyset[i]=='Repeat Mask'){draweletrack(keyset[i],displayItems.get(keyset[i]).getMode(),displayItems.get(keyset[i]).getGroup());}
			else{drawvaltrack(keyset[i],displayItems.get(keyset[i]).getMode(),displayItems.get(keyset[i]).getGroup());}
		}
		else if(displayItems.get(keyset[i]).getGroup()=='Regulation'){draweletrack(keyset[i],displayItems.get(keyset[i]).getMode(),displayItems.get(keyset[i]).getGroup()); }
		else if(displayItems.get(keyset[i]).getGroup()=='User'){
			var a=displayItems.get(keyset[i]).getXMLnode();
			//draweletrack(keyset[i],displayItems.get(keyset[i]).getMode(),displayItems.get(keyset[i]).getGroup()); 
			if(a.getElementsByTagName('E').length!=0){draweletrack(keyset[i],displayItems.get(keyset[i]).getMode(),displayItems.get(keyset[i]).getGroup());}
		  	else if(a.getElementsByTagName('ValueList').length!=0){drawvaltrack(keyset[i],displayItems.get(keyset[i]).getMode(),displayItems.get(keyset[i]).getGroup());}
		 	else if(a.getElementsByTagName('V').length!=0){drawvartrack(keyset[i],displayItems.get(keyset[i]).getMode(),displayItems.get(keyset[i]).getGroup());}
			}
		else if(displayItems.get(keyset[i]).getGroup()=='Genome align'){drawgenomealigntrack(keyset[i],displayItems.get(keyset[i]).getMode(),displayItems.get(keyset[i]).getGroup());}
	}
}
function draweledense(ctx,type,start,end,tl,canvas){
		var wid=(canvas.width)/(displayarea.getEnd()-displayarea.getStart()+1);
		var w=(end-start+1)*wid;
		var x=(start-displayarea.getStart())*wid;
		/*
			if(type=='X'){
			   ctx.beginPath();
			   ctx.fillStyle='#1f78b4';
			   ctx.fillRect(x,24,w,10);
			   ctx.fill();
               ctx.closePath();
			   }
			 else if(type=='L'){
			   ctx.beginPath();
			   ctx.fillStyle='#1f78b4';
			   ctx.fillRect(x,28,w,2);
			   ctx.fill();
               ctx.closePath();
			}
			else if(type=='D'){
					   ctx.beginPath();
					   ctx.fillStyle='#1f78b4';
			   		   ctx.fillRect(x,26,w,5);
					   ctx.fill();
					   ctx.closePath();
			}*/
			ctx.fillStyle='#1f78b4';
			ctx.fillRect(x,30,w,24);

}
function drawelepack(ctx,type,start,end,canvas,level){
		var y=level*30+5;
		var wid=(canvas.width)/(displayarea.getEnd()-displayarea.getStart()+1);
		var w=(end-start+1)*wid;
		var x=(start-displayarea.getStart())*wid;
		if(type=='X'){
			ctx.beginPath;
			ctx.fillStyle='#1f78b4';
			ctx.fillRect(x,y,w,20);
			ctx.fill();
            ctx.closePath();
			}
			else if(type=='L'){
				ctx.beginPath;
				ctx.fillStyle='#1f78b4';
				ctx.fillRect(x,y+8,w,4);
				ctx.fill();
                ctx.closePath();
				}
				else if(type=='D'){
					ctx.beginPath;
					ctx.fillStyle='#1f78b4';
					ctx.fillRect(x,y+4,w,10);
					ctx.fill();
                    ctx.closePath();
					}					
}
function drawvardense(ctx,type,start,end,tl,canvas){
		var wid=canvas.width/(displayarea.getEnd()-displayarea.getStart()+1);
		var w=(end-start+1)*wid;
		var dw=(end-start)*wid/4;
		var x=(start-displayarea.getStart())*wid;
			if(type=='SNV'){
			   ctx.beginPath();
			   ctx.fillStyle='#1f78b4';
			   if(wid<1){
			   		ctx.fillRect(x,30,1,22);
			   }
			   else{
				   ctx.fillRect(x,30,wid,22);
			   }
			   ctx.fill();
               ctx.closePath();
			   }
			   else if(type=='DEL'){
				   for(var j=0;j<tl;j++){
				   ctx.beginPath;
				   ctx.fillStyle='#ed5126';
				   if(wid<1){
			   		ctx.fillRect(x,30,1,22);
			   		}
			   		else{
				   ctx.fillRect(x+j*wid,30,wid,22);
					}
				   ctx.fill();
                   ctx.closePath();
				   }
				   }	   
}

function drawvarpack(ctx,type,start,end,canvas,level){
     var y=level*20+6;
     var wid=(canvas.width)/(displayarea.getEnd()-displayarea.getStart()+1);
     var x=Math.round((start-displayarea.getStart())*wid);
	 var w=(end-start+1)*wid;
	 if(w<3){w=3;}
     if(type=='SNV'){
        ctx.beginPath();
        ctx.fillStyle='#1f78b4';
        ctx.fillRect(x,y,w,15);
        ctx.fill();
        ctx.closePath();
   }
   else if(type=='DEL'){
       ctx.beginPath();
       ctx.fillStyle='#ed5126';
       ctx.fillRect(x,y,w,15);
       ctx.fill();
       ctx.closePath();
    } 
	else if(type=='INS'){
       ctx.beginPath();
       ctx.fillStyle='#000';
       ctx.fillRect(x,y,w,15);
       ctx.fill();
       ctx.closePath();
    } 
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
		for(var j=0;j<Arr.length;j++){
			Arr[j]=parseFloat(Arr[j]);
		}
	    var maxNum=Math.max.apply(null,Arr);
	    var curveH = (canvas.height/2)/Math.abs(maxNum);
		var wid=(canvas.width)/(Arr.length);
		var h1,h2,h3;
	    for(var i=0;i<Arr.length;i++){
			var x=i*wid;
			if(Arr[i]>=0){
				h1=canvas.height-7-(curveH*Arr[i]);
				h2=canvas.height-7-(curveH*Arr[i+1]);
				if(i==Arr.length-1){h2=h1}
				h3=canvas.height-7-(curveH*Arr[i-1]);
			 }
			 else{
				 h1=canvas.height-7-(curveH*Arr[i]);
				 h2=canvas.height-7-(curveH*Arr[i+2]);
				 if(i==Arr.length-1){h2=h1;}
			}
			ctx.beginPath();
			ctx.strokeStyle='#00C957';
			
			if(h1<=113&&h2<=113){
			ctx.moveTo(x,h1);
			ctx.lineTo(x+wid,h1);
			ctx.lineTo(x+wid,h2);
               
			}
			else{
					h3=canvas.height-7-(curveH*Arr[i+1]);
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
		for(var j=0;j<Arr.length;j++){
			Arr[j]=parseFloat(Arr[j]);
		}
	    var maxNum=Math.max.apply(null,Arr);
	    var curveH = (canvas.height-10)/Math.abs(maxNum);
		var wid=(canvas.width)/(Arr.length);
	    for(var i=0;i<Arr.length;i++){
			var x=i*wid;
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
		var wid=(canvas.width)/(Arr.length);
	    for(var i=0;i<Arr.length;i++){
			var x=i*wid;
			//var a=Math.floor(((maxNum-Arr[i])/maxNum)*255);
			//var b=Math.floor((Arr[i]/maxNum)*255);
			ctx.beginPath();
			if(Arr[i]==0){
				ctx.fillStyle='white';
				ctx.strokeStyle='white';
			}
			
			else if(Arr[i]<0&&maxNum<0){
			if(Arr[i]<((maxNum/6)*5)){
			    ctx.fillStyle='#00008B';
			}
			else if(Arr[i]>=((maxNum/6)*5)&&Arr[i]<((maxNum/6)*4)){
				ctx.fillStyle='#0000CD'
			}
			else if(Arr[i]>=((maxNum/6)*4)&&Arr[i]<((maxNum/6)*3)){
				ctx.fillStyle='#0000FF';
			}
			else if(Arr[i]>=((maxNum/6)*3)&&Arr[i]<((maxNum/6)*2)){
				ctx.fillStyle='#6A5ACD';
			}
			else if(Arr[i]>=((maxNum/6)*2)&&Arr[i]<(maxNum/6)){
				ctx.fillStyle='#1E90FF';
			}
			else if(Arr[i]>=(maxNum/6)&&Arr[i]<0){
				ctx.fillStyle='#ADD8E6';
			}
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

//颜色为变量
function drawthermogram1(ctx,Arr,canvas){
	for(var j=0;j<Arr.length;j++){
		Arr[j]=parseFloat(Arr[j]);
	}
	var maxNum=Math.max.apply(null,Arr);
	var maxnumber = Math.ceil(maxNum);
	var wid=(canvas.width)/(Arr.length);
	for(var i=0;i<Arr.length;i++){
		var x=i*wid;
		ctx.beginPath();
		if(Arr[i]==0){
			ctx.fillStyle='white';
			ctx.strokeStyle='white';
		} 
		else if(Arr[i]>0){
			var value1=parseInt(125-(Arr[i]/maxnumber)*125);
			var value2=parseInt(125-(Arr[i]/maxnumber)*125);
			var value3=parseInt(255-(Arr[i]/maxnumber)*40);
			ctx.fillStyle="rgb(255,"+value1+","+value2+")";
			ctx.strokeStyle="rgb(255,"+value1+","+value2+")";
		}
		else if(Arr[i]<0){
			ctx.fillStyle='white';
			ctx.strokeStyle='white';
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
