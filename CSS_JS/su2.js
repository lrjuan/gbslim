//######################################################################################################################
	var canvas = document.getElementsByTagName('canvas')[0];
	//var canvas.width = 1550; var canvas.height = 600;
	var canvasstart=150; var canvaslong=1150;//放缩画布区间（150-1150）
    var canvasend=canvaslong+canvasstart;
	var start=displayarea.getStart(); //放缩坐标区间（0-1000）

    var end=displayarea.getEnd();
    var long=displayarea.getEnd()-displayarea.getStart();
	var ctx = canvas.getContext('2d');
	var move1=document.getElementById("move1");
	var move2=document.getElementById("move2");
	var move3=document.getElementById("move3");
	var move4=document.getElementById("move4");
	//var slider = document.getElementById("slider");
	var left=document.getElementById("left");
	var right = document.getElementById("right");
	
	//初始 画
	getSeqData(displayarea.getWidth(),displayarea.getChr(),displayarea.getStart(),displayarea.getEnd());
	
	var scroll1 = document.getElementById("scroll1");
	var width = scroll1.clientWidth||scroll1.offsetWidth;
	var bar1 = document.getElementById('bar1');
	var a=displayarea.getStart()/Math.round(chrLength.get(displayarea.getChr()));
	bar1.style.left=width*a+'px';
	var b=(displayarea.getEnd()-displayarea.getStart())/Math.round(chrLength.get(displayarea.getChr()));
	bar1.style.width=width*b+'px';
	window.onload = function(){

	 //计算各操作
		var lastX=(end+start)/2, lastY=canvas.height/2;

		//缩小10
		var handleScroll1 = function(){
			var temp=long;
			long=long*10;
				start = start-temp*4.5;
				if(start<=0){start=1;}
				end = start + long-1;
				//alert(end);
				ctx.translate((end + start) / 2, lastY);
				update(displayarea.getChr(), start, end);
		};
		//缩小5
		var handleScroll2 = function(){
			var temp=long;
			long=long*5;
	
				start = start-temp*2;
				if(start<=0){start=1;}
				end = start + long-1;
				//alert(start);
				//alert(end);
				ctx.translate((end + start) / 2, lastY);
				update(displayarea.getChr(), start, end);
			
		};
		//放大5
		var handleScroll3 = function(){
			long=Math.round(long/5)
			if(long <10){
				long=10;
			}
			else{
				start = start+long*2;
				end = start + long-1;
				//alert(start);
				//alert(end);
				ctx.translate((end + start) / 2, lastY);
				update(displayarea.getChr(), start, end);
			}

		};
		//放大10
		var handleScroll4 = function(){
			long=Math.round(long/10)
			if(long <10){
				long=10;
			}
			else{
				start = start+long*4.5;
				end = start + long-1;
				//alert(start);
				//alert(end);
				ctx.translate((end + start) / 2, lastY);
				update(displayarea.getChr(), start, end);
			}

		};
		//左移20
		var handleScroll6 = function(){
			if(start-Math.round(long/2)>=0){
				start=start-Math.round(long/2);
				end=end-Math.round(long/2);
			}
			else{
				start=0;
				end=long;
			}
			ctx.translate((end+start)/2,lastY);
			update(displayarea.getChr(),start,end);
			
		};
		//右移20
		var handleScroll7 = function(){
			if(Math.round(chrLength.get(displayarea.getChr()))<end+Math.round(long/2)){
				start+=chrLength.get(displayarea.getChr())-end;
				end=chrLength.get(displayarea.getChr());
			}
			else{
				start=start+Math.round(long/2);
				end=end+Math.round(long/2);
			}
			//if(start<0){start=0}
			ctx.translate((end+start)/2,lastY);
            update(displayarea.getChr(),start,end);
		};
		
		var handleScroll8 = function(){
			if(start-Math.round(long/10)>=0){
				start=start-Math.round(long/10);
				end=end-Math.round(long/10);
				
			}
			else{
				start=0;
				end=long;
			}
			ctx.translate((end+start)/2,lastY);
			update(displayarea.getChr(),start,end);
		};
		//右移20
		var handleScroll9 = function(){
			if(Math.round(chrLength.get(displayarea.getChr()))<end+Math.round(long/10)){
				start+=chrLength.get(displayarea.getChr())-end;
				end=chrLength.get(displayarea.getChr());
			}
			else{
				start=start+Math.round(long/10);
				end=end+Math.round(long/10);
			}
			//if(start<0){start=0}
			ctx.translate((end+start)/2,lastY);
            update(displayarea.getChr(),start,end);
		};
		var handleScroll10 = function(){
			if(start-Math.round(long*0.9)>=0){
				start=start-Math.round(long*0.9);
				end=end-Math.round(long*0.9);
				
			}
			else{
				start=0;
				end=long;
			}
			ctx.translate((end+start)/2,lastY);
			update(displayarea.getChr(),start,end);
		};
		var handleScroll11 = function(){
			if(Math.round(chrLength.get(displayarea.getChr()))<end+Math.round(long*0.9)){
				start+=chrLength.get(displayarea.getChr())-end;
				end=chrLength.get(displayarea.getChr());
			}
			else{
				start=start+Math.round(long*0.9);
				end=end+Math.round(long*0.9);
			}
			//if(start<0){start=0}
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

	};

    function update(chr,start,end){
	 //var querry="action=update&width="+displayarea.getWidth()+"&chr="+chr+"&start="+start+"&end="+end;
	 var req1 = createXMLHttpRequest();
	 var querry="action=update&width="+displayarea.getWidth()+"&chr="+chr+"&start="+start+"&end="+end;
	 req1.onreadystatechange = function(){Update_GetReadyStateHandler1(req1);};
	 req1.open("GET","servlet/test.do?"+querry,true);
	 req1.send(null);
	}
	function Update_GetReadyStateHandler1(request) {
	if (request.readyState == 4&&request.status == 200){
		//alert();
		var XmlNode=request.responseXML;
		var temp=XmlNode.getElementsByTagName('Start')[0].childNodes[0].nodeValue;
		displayarea.setStart(temp);
		temp=XmlNode.getElementsByTagName('End')[0].childNodes[0].nodeValue;
		displayarea.setEnd(temp);
		temp=XmlNode.getElementsByTagName('Chromosome')[0].childNodes[0].nodeValue;
		displayarea.setChr(temp);
		
	
		getSeqData(displayarea.getWidth(),displayarea.getChr(),displayarea.getStart(),displayarea.getEnd());		//getSeqData(displayarea.getWidth(),displayarea.getChr(),displayarea.getStart(),displayarea.getEnd());
		//alert(displayarea.getWidth()+displayarea.getChr()+displayarea.getStart()+'  '+displayarea.getEnd());//temp=XmlNode.getElementsByTagName('E')[0].getElementsByTagName('T')[0].childNodes[0].nodeValue;
		//alert(temp);
		//var str=XmlNode.getElementsByTagName('Sequence')[0].childNodes[0].nodeValue;
		if(displayItems.size()!=0){
			//alert(displayItems.keySet()[0]);
			var keySet=displayItems.keySet();
			for(var i in keySet){
				var temp=XmlNode.getElementById(keySet[i]);
				displayItems.get(keySet[i]).setXMLnode(temp); 
				//alert(keySet[i]+displayItems.get(keySet[i]).getXMLnode());
				//displayitem(a,b,c)
			} 
		}
		drawalltrack();	
		//tempXML=XmlNode;
		//scorll1的位置控制
		var scroll1 = document.getElementById("scroll1");
		var width = scroll1.clientWidth||scroll1.offsetWidth;
		var bar1 = document.getElementById('bar1');
		var a=displayarea.getStart()/Math.round(chrLength.get(displayarea.getChr()));
		
		bar1.style.left=width*a+'px';
		
		var b=(displayarea.getEnd()-displayarea.getStart())/Math.round(chrLength.get(displayarea.getChr()));
		bar1.style.width=width*b+'px';
		
		//var keyset=displayItems.keySet();
		//if(displayItems.get("HeteV").getXMLnode()!=null)
			//{alert(displayItems.get(keyset[i]).getXMLnode().getElementsByTagName('V')[0].getElementsByTagName('F')[0].innerHTML);}
			//.getElementsByTagName('V')[0].id);}
	}
}