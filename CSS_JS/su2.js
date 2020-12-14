//######################################################################################################################
	var canvas = document.getElementsByTagName('canvas')[0];
	//var canvas.width = 1550; var canvas.height = 600;
	var canvasstart=150; var canvaslong=1150;//放缩画布区间（150-1150）
    var canvasend=canvaslong+canvasstart;
	var start=displayarea.getStart(); 
    var end=displayarea.getEnd();
    var long=displayarea.getEnd()-displayarea.getStart();
	var ctx = canvas.getContext('2d');
	var move1=document.getElementById("move1");
	var move2=document.getElementById("move2");
	var move3=document.getElementById("move3");
	var move4=document.getElementById("move4");
	var innermousemove=-656.5;
	//初始 画
	document.getElementById('chrname').innerHTML = displayarea.getChr();
	var chrkeySet = chrLength.keySet();
	var b = document.getElementById('chrmenu');
	for(var i in chrkeySet){
		var a = document.createElement('button');
		a.innerHTML=chrkeySet[i];
		a.style.fontFamily='Century';
		a.style.cursor='pointer';
		a.onclick=function(){
			displayarea.setChr(this.innerHTML);
			displayarea.setStart(chrLength.get(this.innerHTML)/10);	
			displayarea.setEnd(Math.round(chrLength.get(this.innerHTML)/5));
			update(displayarea.getChr(),displayarea.getStart(),displayarea.getEnd());
			document.getElementById("chrmenu").style.display="none";
			document.getElementById("cover3").style.display="none";
			
		}
		a.onmouseover=function(){
			this.style.background=' #A6D2FF';	
			this.style.color='#FFF';
		}
		a.onmouseout=function(){
			this.style.background='#FFF';	
			this.style.color='#000';
		}
		a.className="chrbutton";
		b.appendChild(a);
	}	
	
	getSeqData(displayarea.getWidth(),displayarea.getChr(),displayarea.getStart(),displayarea.getEnd());
	var k=annotations.keySet();
	var scroll1 = document.getElementById("scroll1");
	var width = scroll1.clientWidth||scroll1.offsetWidth;
	var bar1 = document.getElementById('bar1');
	var temp=(displayarea.getEnd()-displayarea.getStart()+1)/4+displayarea.getStart()-1;
	var a=(temp)/Math.round(chrLength.get(displayarea.getChr()));
	var b=(displayarea.getEnd()-displayarea.getStart()+1)/Math.round(chrLength.get(displayarea.getChr()));
	bar1.style.left=width*a+'px';
	if(width*b/2<1){bar1.style.width='1px';}
	else{bar1.style.width=width*b/2+'px';}
	window.onload = function(){
		start=displayarea.getStart(); //放缩坐标区间（0-1000）
    	end=displayarea.getEnd();
	 //计算各操作
		var lastX=(end+start)/2, lastY=canvas.height/2;

		//缩小10
var handleScroll1 = function(){
			var long=displayarea.getEnd()-displayarea.getStart()+1;
			var a=Math.round(document.getElementsByClassName('innerdiv')[0].displaystart)/2626;
			var temp1=a*long;
			var start=parseInt(temp1+displayarea.getStart()-long/4)+1;
			var end=start+long-1;
			var temp=long;
			long=long*10;
			start = Math.round(start-temp*4.5);
			end = start + long;
			if(start<=0){
				innermousemove-=(start/long)*2626;
				if(innermousemove>0){innermousemove=0}
				start=1;
			}
			if(end>chrLength.get(displayarea.getChr())){
				innermousemove-=((end-chrLength.get(displayarea.getChr()))/long)*2626;
				if(innermousemove<-1313){innermousemove=-1313}
				end=chrLength.get(displayarea.getChr());
			}
			ctx.translate((end + start) / 2, lastY);
			update(displayarea.getChr(), start, end);
};
		//缩小5
var handleScroll2 = function(){
			var long=displayarea.getEnd()-displayarea.getStart()+1;
			var a=Math.round(document.getElementsByClassName('innerdiv')[0].displaystart)/2626;
			var temp1=a*long;
			var start=parseInt(temp1+displayarea.getStart()-long/4)+1;
			var end=start+long-1;
			var temp=long;
			long=long*3;
			start = start-temp;
			end = start + long;
			if(start<=0){
				innermousemove-=(start/long)*2626;
				if(innermousemove>0){innermousemove=0}
				start=1;
			}
			if(end>chrLength.get(displayarea.getChr())){
				innermousemove-=((end-chrLength.get(displayarea.getChr()))/long)*2626;
				if(innermousemove<-1313){innermousemove=-1313}
				end=chrLength.get(displayarea.getChr());
			}
			if(end>chrLength.get(displayarea.getChr())){end=chrLength.get(displayarea.getChr());}
			ctx.translate((end + start) / 2, lastY);
			update(displayarea.getChr(), start, end);
			
};
		//放大5
var handleScroll3 = function(){
			var long=displayarea.getEnd()-displayarea.getStart()+1;
			var a=Math.round(document.getElementsByClassName('innerdiv')[0].displaystart)/2626;
			var temp1=a*long;
			var start=parseInt(temp1+displayarea.getStart()-long/4)+1;
			var end=start+long-1;
			if(start<=0){start=1;}
			if(end>chrLength.get(displayarea.getChr())){end=chrLength.get(displayarea.getChr());}
			long=Math.round(long/3)
			if(long <10){
				long=10;
			}
			else{
				start = start+long;
				end = start + long;
				var length=end-start+1;
				if(innermousemove!=-656.5){
					var temp=(-656.5-innermousemove)/2626;
					start+=temp*(displayarea.getEnd()-displayarea.getStart()+1);
					end+=temp*(displayarea.getEnd()-displayarea.getStart()+1);
					innermousemove=-656.5;
				}
				start=Math.round(start);
				end=Math.round(end);
				ctx.translate((end + start) / 2, lastY);
				update(displayarea.getChr(), start, end);
			}

};
		//放大10
var handleScroll4 = function(){
			var long=displayarea.getEnd()-displayarea.getStart()+1;
			var a=Math.round(document.getElementsByClassName('innerdiv')[0].displaystart)/2626;
			var temp1=a*long;
			var start=parseInt(temp1+displayarea.getStart()-long/4)+1;
			var end=start+long-1;
			if(start<=0){start=1;}
			if(end>chrLength.get(displayarea.getChr())){end=chrLength.get(displayarea.getChr());}
			long=Math.round(long/10)
			if(long <10){
				long=10;
			}
			else{
				start = start+long*4.5;
				end = start + long;
				if(innermousemove!=-656.5){
					var temp=(-656.5-innermousemove)/2626;
					start+=temp*(displayarea.getEnd()-displayarea.getStart()+1);
					end+=temp*(displayarea.getEnd()-displayarea.getStart()+1);
					innermousemove=-656.5;
				}
				start=Math.round(start);
				end=Math.round(end);
				
				ctx.translate((end + start) / 2, lastY);
				update(displayarea.getChr(), start, end);
			}

};
		//左移1/4
var handleScroll6 = function(){
			var long=displayarea.getEnd()-displayarea.getStart()+1;
			var start=displayarea.getStart();
			var end=displayarea.getEnd();
			if(start-Math.round(long/4)>0){
				if(innermousemove<-656.5){
					var temp=(-innermousemove-656.5)/2626;
					temp=1/4-temp;	
					innermousemove=-656.5;
					start=start-Math.round(long*temp);
					end=end-Math.round(long*temp);	
				}
				else{
					start=start-Math.round(long/4);
					end=end-Math.round(long/4);	
				}
			}
			else{
				start=start-Math.round(long/4);
				end=end-Math.round(long/4);
				var length=displayarea.getEnd()-displayarea.getStart()+1;
				innermousemove=innermousemove-(Math.round(start))/length*2626;
				if(innermousemove>0){innermousemove=0;}
				start=0;
				end=long;
				
			}
			update(displayarea.getChr(),start,end);
};
		//右移1/4
var handleScroll7 = function(){
			var long=displayarea.getEnd()-displayarea.getStart()+1;
			var start=displayarea.getStart();
			var end=displayarea.getEnd();
			if(Math.round(chrLength.get(displayarea.getChr()))<end+Math.round(long/4)){
				start=start+Math.round(long/4);
				end=end+Math.round(long/4);
				var length=displayarea.getEnd()-displayarea.getStart()+1;
				innermousemove=innermousemove-(end-chrLength.get(displayarea.getChr()))/length*2626;
				end=chrLength.get(displayarea.getChr());
				start=end-length;
				if(innermousemove<-1313){innermousemove=-1313;}
			}
			else{
				if(innermousemove>-656.5){
					var temp=(innermousemove+656.5)/2626;
					temp=1/4-temp;	
					innermousemove=-656.5;
					start=start+Math.round(long*temp);
					end=end+Math.round(long*temp);	
				}
				else{
					start=start+Math.round(long/4);
					end=end+Math.round(long/4);
				}
			}
				update(displayarea.getChr(),start,end);
};
		
var handleScroll8 = function(){
			var long=displayarea.getEnd()-displayarea.getStart()+1;
			var start=displayarea.getStart();
			var end=displayarea.getEnd();
			if(start-Math.round(long/10)>0){
				if(innermousemove<-656.5){
					var temp=(-innermousemove-656.5)/2626;
					temp=1/10-temp;
					if(temp>0){
						innermousemove=-656.5;
						start=start-Math.round(long*temp);
						end=end-Math.round(long*temp);	
					}
					else{
						innermousemove=innermousemove+2626/10;
					}
				}
				else{
					start=start-Math.round(long/10);
					end=end-Math.round(long/10);
				}
			}
			else{
				start=start-Math.round(long/10);
				end=end-Math.round(long/10);
				var length=displayarea.getEnd()-displayarea.getStart()+1;
				innermousemove=innermousemove-(Math.round(start))/length*2626;
				if(innermousemove>0){innermousemove=0;}
				start=0;
				end=long;
			}
			ctx.translate((end+start)/2,lastY);
			update(displayarea.getChr(),start,end);
};

var handleScroll9 = function(){
			var long=displayarea.getEnd()-displayarea.getStart()+1;
			var start=displayarea.getStart();
			var end=displayarea.getEnd();
			if(Math.round(chrLength.get(displayarea.getChr()))<end+Math.round(long/10)){
				start=start+Math.round(long/10);
				end=end+Math.round(long/10);
				var length=displayarea.getEnd()-displayarea.getStart()+1;
				innermousemove=innermousemove-(end-chrLength.get(displayarea.getChr()))/length*2626;
				end=chrLength.get(displayarea.getChr());
				start=end-length;
				if(innermousemove<-1313){innermousemove=-1313;}
			}
			else{
				if(innermousemove>-656.5){
					var temp=(innermousemove+656.5)/2626;
					temp=1/10-temp;	
					if(temp>0){
						innermousemove=-656.5;
						start=start+Math.round(long*temp);
						end=end+Math.round(long*temp);	
					}
					else{
						innermousemove=innermousemove-2626/10;
					}
				}
				else{
					start=start+Math.round(long/10);
					end=end+Math.round(long/10);
				}
			}
			
			update(displayarea.getChr(),start,end);
};
var handleScroll10 = function(){
			var long=displayarea.getEnd()-displayarea.getStart()+1;
			var start=displayarea.getStart();
			var end=displayarea.getEnd();
			if(start-Math.round(long/2)>0){
				if(innermousemove<-656.5){
					var temp=(-innermousemove-656.5)/2626;
					temp=1/2-temp;	
					innermousemove=-656.5;
					start=start-Math.round(long*temp);
					end=end-Math.round(long*temp);	
				}
				else{
					start=start-Math.round(long/2);
					end=end-Math.round(long/2);	
				}
			}
			else{
				start=start-Math.round(long/2);
				end=end-Math.round(long/2);
				var length=displayarea.getEnd()-displayarea.getStart()+1;
				innermousemove=innermousemove-(Math.round(start))/length*2626;
				if(innermousemove>0){innermousemove=0;}
				start=0;
				end=long;
				
			}
			update(displayarea.getChr(),start,end);

};
var handleScroll11 = function(){
			var long=displayarea.getEnd()-displayarea.getStart()+1;
			var start=displayarea.getStart();
			var end=displayarea.getEnd();
			if(Math.round(chrLength.get(displayarea.getChr()))<end+Math.round(long*0.5)){
				start=start+Math.round(long/2);
				end=end+Math.round(long/2);
				var length=displayarea.getEnd()-displayarea.getStart()+1;
				innermousemove=innermousemove-(end-chrLength.get(displayarea.getChr()))/length*2626;
				end=chrLength.get(displayarea.getChr());
				start=end-length;
				if(innermousemove<-1313){innermousemove=-1313;}
			}
			else{
				if(innermousemove>-656.5){
					var temp=(innermousemove+656.5)/2626;
					temp=1/2-temp;	
					innermousemove=-656.5;
					start=start+Math.round(long*temp);
					end=end+Math.round(long*temp);	
				}
				else{
					start=start+Math.round(long/2);
					end=end+Math.round(long/2);
				}
			}
			ctx.translate((end+start)/2,lastY);
			update(displayarea.getChr(),start,end);
};
		

	//添加按钮事件
     move1.addEventListener("click",handleScroll1);//缩小10倍
	 move2.addEventListener("click",handleScroll2);//缩小5倍
	 move3.addEventListener("click",handleScroll3);//放大5倍
	 move4.addEventListener("click",handleScroll4);//放大10倍
	 left.addEventListener("click",handleScroll6);
	 right.addEventListener("click",handleScroll7);
	 
	 left1.addEventListener("click",handleScroll8);
	 right1.addEventListener("click",handleScroll9);
	 left2.addEventListener("click",handleScroll10);
	 right2.addEventListener("click",handleScroll11);
	 
	 
	 Move1.addEventListener("click",handleScroll1);//缩小10倍
	 Move2.addEventListener("click",handleScroll2);//缩小5倍
	 Move3.addEventListener("click",handleScroll3);//放大5倍
	 Move4.addEventListener("click",handleScroll4);//放大10倍
	 Left.addEventListener("click",handleScroll6);
	 Right.addEventListener("click",handleScroll7);
	 Left1.addEventListener("click",handleScroll8);
	 Right1.addEventListener("click",handleScroll9);
	 Left2.addEventListener("click",handleScroll10);
	 Right2.addEventListener("click",handleScroll11);
	 
	};

	var divloading=document.createElement('div');
	divloading.className='uploading';
	divloading.id='uploading';
	divloading.style.left=document.getElementById('window').offsetLeft+550+'px';
	divloading.style.display='none';
	document.getElementById('window').appendChild(divloading);
	
	var divloading1=document.createElement('div');
	divloading1.className='uploading1';
	divloading.appendChild(divloading1);

    function update(chr,start,end){
	 //var querry="action=update&width="+displayarea.getWidth()+"&chr="+chr+"&start="+start+"&end="+end;
	 var req1 = createXMLHttpRequest();
	 var querry="action=update&width="+displayarea.getWidth()+"&chr="+chr+"&start="+start+"&end="+end;
	 req1.onreadystatechange = function(){Update_GetReadyStateHandler1(req1);};
	 req1.open("GET","servlet/test.do?"+querry,true);
	 req1.send(null);
	 
	 //删除detail div
	 var gbtn=document.getElementsByClassName("detail");						
		if(gbtn.length > 0){
			while (gbtn.length > 0) {
				gbtn[0].remove();
			}
		}
	}
	function Update_GetReadyStateHandler1(request) {
	if (request.readyState == 4&&request.status == 200){
		//document.getElementById('innerdiv'+'PtrGene').style.marginLeft='-656.5px';
		document.getElementById('uploading').style.display='none';
		document.getElementById("cover2").style.display = "none";
		//alert();
		var XmlNode=request.responseXML;
		var temp=XmlNode.getElementsByTagName('Start')[0].childNodes[0].nodeValue;
		displayarea.setStart(temp);
		temp=XmlNode.getElementsByTagName('End')[0].childNodes[0].nodeValue;
		displayarea.setEnd(temp);
		temp=XmlNode.getElementsByTagName('Chromosome')[0].childNodes[0].nodeValue;
		displayarea.setChr(temp);
		
		var innerdiv=document.getElementsByClassName('innerdiv');
		for(var i=0;i<innerdiv.length;i++){
			var temp=innermousemove;
			if(temp>0){temp=0;}
			innerdiv[i].style.marginLeft=temp+'px';
		}
		
		document.getElementById('chrname').innerHTML = displayarea.getChr();
		getSeqData(displayarea.getWidth(),displayarea.getChr(),displayarea.getStart(),displayarea.getEnd());	
		if(displayItems.size()!=0){
			//alert(displayItems.keySet()[0]);
			var keySet=displayItems.keySet();
			for(var i in keySet){
				var temp=XmlNode.getElementById(keySet[i]);
				displayItems.get(keySet[i]).setXMLnode(temp); 
			} 
		}
		drawalltrack();	
		//tempXML=XmlNode;
		//scorll1的位置控制
		var scroll1 = document.getElementById("scroll1");
		var width = scroll1.clientWidth||scroll1.offsetWidth;
		var bar1 = document.getElementById('bar1');
		var temp=displayarea.getStart();
		var a=(temp)/Math.round(chrLength.get(displayarea.getChr()));
		var length=displayarea.getEnd()-displayarea.getStart()+1;
		var b=length/Math.round(chrLength.get(displayarea.getChr()));
		var left=width*a-((innermousemove)/2626)*b*width;
		if(left<0){left=0;}
		bar1.style.left=left+'px';
		if(width*b/2<1){bar1.style.width='1px';}
		else{bar1.style.width=width*b/2+'px';}
	}
	else{
		if(document.getElementById('uploading').style.display=='none'){
			document.getElementById('uploading').style.display='block';
			document.getElementById("cover2").style.display = "block";
		}
		
	}
}
