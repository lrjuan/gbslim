	document.getElementById("div").onclick = function() {
		document.getElementById("box").style.display = "block";
		document.getElementById("cover").style.display = "block";
		}
		 
	document.getElementById("cover").onclick = function() { 
		if (document.getElementById("box").style.display == "block") {
    		document.getElementById("box").style.display = "none";
    		document.getElementById("cover").style.display = "none";
  			}
		if(document.getElementById('window').getElementsByClassName("detail").length!=0){
				var temp=document.getElementById('window').getElementsByClassName("detail")[0].id.replace('div','')
				//document.getElementById(temp).active=0;
				document.getElementById('window').removeChild(document.getElementById('div'+temp));
				document.getElementById("cover").style.display = "none";
				document.getElementById("cover").style.backgroundColor='#000';
			}
		}
	document.getElementById("tanchuang-right").onclick = function() {
		document.getElementById("box").style.display = "none";
    	document.getElementById("cover").style.display = "none";
	}
	
	document.getElementById("tree").onclick = function(){
		document.getElementById("plantgenomes").style.display = "block";
		document.getElementById("treecover").style.display = "block";
		} 
	document.getElementById("treecover").onclick = function() { 
		if (document.getElementById("plantgenomes").style.display == "block") {
    		document.getElementById("plantgenomes").style.display = "none";
    		document.getElementById("treecover").style.display = "none";
  			}
	}
	document.getElementById("treeclose").onclick = function() {
		document.getElementById("plantgenomes").style.display = "none";
    	document.getElementById("treecover").style.display = "none";
	}	
	
	var scroll1 = document.getElementById('scroll1');
    var bar1 = document.getElementById('bar1');
    var mask1 = document.getElementById('mask1');
    //var ptxt = document.getElementsByTagName('p')[0];
    var barleft = 0;
	

     document.body.onselectstart = document.body.ondrag = function(){
　　　　return false;
　　}
    /*bar1.onmousedown = function(event){
      var event = event || window.event;
      var leftVal = event.clientX - this.offsetLeft;
      var that = this;
       // 拖动一定写到 down 里面才可以
      document.onmousemove = function(event){
        var event = event || window.event;
        barleft = event.clientX - leftVal;     
        if(barleft < 0)
          barleft = 0;
        else if(barleft > scroll1.offsetWidth - bar1.offsetWidth)
          barleft = scroll1.offsetWidth - bar1.offsetWidth;
        //mask1.style.width = barleft +'px' ;
        that.style.left = barleft + "px";
        //ptxt.innerHTML = "已经走了" + parseInt(barleft/(scroll.offsetWidth-bar.offsetWidth) * 100) + "%";
        //防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
      }
 
    }
    document.onmouseup = function(){
      document.onmousemove = null; //弹起鼠标不做任何操作
    }
 
 */
  
    var scroll = document.getElementById('scroll');
    var bar = document.getElementById('bar');
    var mask = document.getElementById('mask');
    //var ptxt = document.getElementsByTagName('p')[0];
    var barleft = 0;
	/*
    bar.onmousedown = function(event){
      var event = event || window.event;
      var leftVal = event.clientX - this.offsetLeft;
      var that = this;
       // 拖动一定写到 down 里面才可以
      document.onmousemove = function(event){
        var event = event || window.event;
        barleft = event.clientX - leftVal;     
        if(barleft < 0)
          barleft = 0;
        else if(barleft > scroll.offsetWidth - bar.offsetWidth)
          barleft = scroll.offsetWidth - bar.offsetWidth;
        mask.style.width = barleft +'px' ;
        that.style.left = barleft + "px";
        //ptxt.innerHTML = "已经走了" + parseInt(barleft/(scroll.offsetWidth-bar.offsetWidth) * 100) + "%";
        //防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
      }
 
    }
    document.onmouseup = function(){
      document.onmousemove = null; //弹起鼠标不做任何操作
    }
*/
/*	
	for(var i=1;i<=5;i++)
		{
			var a = document.createElement('div');
			a.innerHTML="options"+i;
			a.className="option1";
			a.id="adiv"+i;
			a.i=i;
			a.active=0;
			var cho1 = document.getElementById('choice1');
			var cho2 = document.getElementById('choice2');
			cho1.appendChild(a);
			
			var c=document.createElement('div');
			c.id="bdiv"+i;
			c.i=i;
			c.className="option2";
			
			
			var e = document.createElement('div');
			e.innerHTML='option'+i;
			e.className='option3';
			c.appendChild(e);
				
			for(var j=1;j<=10;j++)
			{
				var f =	document.createElement('div');
				f.className="label";
				
				var d = document.createElement('div');
				d.innerHTML="点我"+i+"."+j;
				d.i=i;
				d.j=j;
				d.id="button"+i+"."+j;
				d.exist=0;
				d.className="slabel";
				
				var g =	document.createElement('select');
				g.add(new Option("pack"));
				g.add(new Option("full"));
				g.add(new Option("dense"));
				g.className='mlabel';
				
				f.appendChild(d);
				f.appendChild(g);
				c.appendChild(f);
			}
			//c.style.display='none';
			cho2.appendChild(c);
			c.style.display="none";
			
		}
	
	for(var i=1;i<=5;i++)
	{
		var a = document.getElementById("adiv"+i);
		//var b = document.getElementById("2div"+i);
		a.onclick=function aa(){		
			if(document.getElementById("bdiv"+this.i).style.display=="none"){
				
				for(var j=1;j<=5;j++)
				{
					var b = document.getElementById("adiv"+j);
					if(b.active==1){
						b.className='option1';
						b.active=0;
						document.getElementById("bdiv"+j).style.display = "none";
						}
				}
				document.getElementById("bdiv"+this.i).style.display = "block";
				this.className='option1active';
				this.active=1;
			}
			else{document.getElementById("bdiv"+this.i).style.display = "none";
			this.className='option1';
			}
		}
	}
*/			
/*	
	for(var i=1;i<=5;i++)
		{
			var b = document.getElementById('choice2');
			for(var j=1;j<=5;j++){
				var a = document.createElement('input');
				a.type = 'button';
				a.value="点我"+i+"."+j;
				a.i=i;
				a.j=j;
				a.id="button"+i+" "+j;
				a.exist=0;
				a.className="buttonsliver";
				b.appendChild(a);
				}	
		}*/
	document.getElementById("chrbutton").onclick = function() {
		document.getElementById("cover3").style.display = "block";
		var b = document.getElementById('chrmenu');
		b.style.width=document.getElementById('chrname').offsetWidth+document.getElementById('chrbutton').offsetWidth-2+'px';
		if(document.getElementById("chrmenu").style.display=="none"){
			if(document.getElementById("control").style.display == "none"){
				document.getElementById("chrmenu").style.top="90px";
				}
			else {document.getElementById("chrmenu").style.top="175px";}
			document.getElementById("chrmenu").style.display="block";
		}
		else if(document.getElementById("chrmenu").style.display=="block"){
			document.getElementById("chrmenu").style.display="none";
		}
	
	}
	document.getElementById("cover3").onclick = function() { 
		if (document.getElementById("chrmenu").style.display == "block") {
    		document.getElementById("chrmenu").style.display = "none";
    		document.getElementById("cover3").style.display = "none";
  		}
	}
	document.getElementById("buttonmove").onclick = function() {
		if(document.getElementById("bottom").style.display == "none")
		{document.getElementById("bottom").style.display = "block";
		document.getElementById("location").style.marginTop='40px';
		}
		
		if(document.getElementById("control").style.display == "block")
		{document.getElementById("control").style.display = "none";}
		
		if(document.getElementById("chrmenu").style.display=="block"){
			document.getElementById("chrmenu").style.display="none";
		}

	}
	
	document.getElementById("hidebutton").onclick = function() {
		if(document.getElementById("control").style.display == "none")
		{document.getElementById("control").style.display = "block";
		document.getElementById("location").style.marginTop='10px';}
		
		if(document.getElementById("bottom").style.display == "block")
		{document.getElementById("bottom").style.display = "none";}
		
		if(document.getElementById("chrmenu").style.display=="block"){
			document.getElementById("chrmenu").style.display="none";
		}
		
	}