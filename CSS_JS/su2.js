//######################################################################################################################
	var canvas = document.getElementsByTagName('canvas')[0];
	//var canvas.width = 1550; var canvas.height = 600;
	var canvasstart=150; var canvaslong=1150;//放缩画布区间（150-1150）
    var canvasend=canvaslong+canvasstart;
	var start=displayarea.getStart(); //放缩坐标区间（0-1000）

    var end=displayarea.getEnd();
    var long=displayarea.getEnd()-displayarea.getStart()+1;
    //alert(long)
	var ctx = canvas.getContext('2d');
	var move1=document.getElementById("move1");
	var move2=document.getElementById("move2");
	var move3=document.getElementById("move3");
	var move4=document.getElementById("move4");
	//var slider = document.getElementById("slider");
	var left=document.getElementById("left");
	var right = document.getElementById("right");
	
	getSeqData(10000000,displayarea.getChr(),displayarea.getStart(),displayarea.getEnd());

	window.onload = function(){

	 //计算各操作
		var lastX=(end+start)/2, lastY=canvas.height/2;

		//缩小10
		var handleScroll1 = function(){
			long=long*10;
            if(long>10000){
            	alert("超出范围")
			}else {
				start = start;
				end = start + long;
				//alert(end);
				ctx.translate((end + start) / 2, lastY);
				update(displayarea.getChr(), start, end);
			}

		};
		//缩小5
		var handleScroll2 = function(){

			long=long*5;
			if(long>10000){
            	alert("超出范围")
			}else {
				start = start;
				end = start + long;
				//alert(start);
				//alert(end);
				ctx.translate((end + start) / 2, lastY);
				update(displayarea.getChr(), start, end);
			}

		};
		//放大5
		var handleScroll3 = function(){
			long=long/5
			if(long<10){
            	alert("超出范围")
			}else {
				start = start;
				end = start + long;
				//alert(start);
				//alert(end);
				ctx.translate((end + start) / 2, lastY);
				update(displayarea.getChr(), start, end);
			}

		};
		//放大10
		var handleScroll4 = function(){
			long=long/10;
			if(long<10){
            	alert("超出范围")
			}else {
				start = start;
				end = start + long;
				//alert(start);
				//alert(end);
				ctx.translate((end + start) / 2, lastY);
				update(displayarea.getChr(), start, end);
			}

		};
		//左移20
		var handleScroll6 = function(){
			if(start>1){
				start=start-20;
				end=end-20;
				ctx.translate((end+start)/2,lastY);
				update(displayarea.getChr(),start,end);
			}
			
		};
		//右移20
		var handleScroll7 = function(){
			start=start+20;
			end=end+20;
			if(start<0){start=0}
			//alert(start);
			//alert(end);
			ctx.translate((end+start)/2,lastY);
            update(displayarea.getChr(),start,end);
		};
	//添加按钮事件
     move1.addEventListener("click",handleScroll1);//缩小10倍
	 move2.addEventListener("click",handleScroll2);//缩小5倍
	 move3.addEventListener("click",handleScroll3);//放大5倍
	 move4.addEventListener("click",handleScroll4);//放大10倍
	 left.addEventListener("click",handleScroll6);//左平移20
	 right.addEventListener("click",handleScroll7);//右平移20

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
		
	
		getSeqData(10000000,displayarea.getChr(),displayarea.getStart(),displayarea.getEnd());	//getSeqData(displayarea.getWidth(),displayarea.getChr(),displayarea.getStart(),displayarea.getEnd());
		//alert(displayarea.getWidth()+displayarea.getChr()+displayarea.getStart()+'  '+displayarea.getEnd());//temp=XmlNode.getElementsByTagName('E')[0].getElementsByTagName('T')[0].childNodes[0].nodeValue;
		//alert(temp);
		//var str=XmlNode.getElementsByTagName('Sequence')[0].childNodes[0].nodeValue;
		if(displayItems.size()!=0){
			//alert(displayItems.keySet()[0]);
			var keySet=displayItems.keySet();
			for(var i in keySet){
				var temp=XmlNode.getElementById(keySet[i]);
				displayItems.get(keySet[i]).setXMLnode(temp); 
				//alert(displayItems.get(keySet[i]).getName());
				//displayitem(a,b,c)
			} 
		}
		tempXML=XmlNode;
	}
}