 // JavaScript Document
function treetrack(track_id){
	var anno=annotations.get('Genome align');
	if (anno.containsKey(track_id)){
		var option=document.getElementById('select'+track_id);      
		var group_id='Genome align';
		annotations.get(group_id).get(track_id).setMode('dense');      
	
		if(document.getElementById('innerdiv'+track_id)!=null) {
			var temp=document.getElementById('div'+track_id).getElementsByTagName('canvas')[0];
			document.getElementById('innerdiv'+track_id).removeChild(temp);
			addTracks(group_id,track_id,'dense',track_div);
		}
		else{
			var track_div =document.createElement('div');
			track_div.className="whxdiv";
			track_div.id="div"+track_id;
			track_div.name=group_id;
			var outerdiv=document.createElement('div');
			outerdiv.id="outerdiv"+track_id;
			outerdiv.className='outerdiv';
			track_div.appendChild(outerdiv);
					
			var innerdiv=document.createElement('div');
			innerdiv.id="innerdiv"+track_id;
			innerdiv.className='innerdiv';
			outerdiv.appendChild(innerdiv);
								
			var pic_div =document.createElement('div');
			pic_div.className="pic_div";
			pic_div.innerHTML=track_id;
								
			var groupname=group_id;
			var groupname=groupname.replace("_"," ");
			var description=document.createElement('div');
			description.innerHTML=groupname;
			description.className='description';
			track_div.appendChild(description);
			track_div.appendChild(pic_div);
								
			var btn_del=document.createElement('input');
			btn_del.setAttribute("type", "button");
			btn_del.setAttribute("class", "whxdelete");
			track_div.appendChild(btn_del);
				
			btn_del.onclick=function(){
				var group_id=this.parentNode.name;
				var track_id=this.parentNode.id.replace("div","");
				var track_id1=track_id+'_seq';
				removeTracks(group_id,track_id);
				removeTracks(group_id,track_id1);
				this.parentNode.parentNode.removeChild(this.parentNode);
				document.getElementById('window').removeChild(document.getElementById('div'+track_id1));
									//$(this).parent().remove();
				annotations.get(group_id).get(track_id).setMode("hide");
				annotations.get(group_id).get(track_id1).setMode("hide");
				var temp=document.getElementById(track_id).parentNode.getElementsByTagName('select')[0];
				for(t=0;t<temp.length;t++){
					if(temp[t].value=='hide'){temp[t].selected=true;}
				}
				
				var temp=document.getElementById(track_id1).parentNode.getElementsByTagName('select')[0];
				for(t=0;t<temp.length;t++){
					if(temp[t].value=='hide'){temp[t].selected=true;}
				}
				
			}
			document.getElementById('window').appendChild(track_div);
			addTracks(group_id,track_id,'dense',track_div);
		}
	}
}

function drawgenomealigntrack(trackname,mode,group){
		
		if(trackname.substring(trackname.length-3)=='seq'){
			var canvas = document.createElement('canvas');
			canvas.width=4800;
			canvas.height=120;
			canvas.classList='outercanvas';
			canvas.id='canvas'+trackname;
			var ctx=canvas.getContext('2d');	
			//var a=displayItems.get(trackname).getXMLnode().getElementsByTagName('Seq')[0].childNodes.length;
			
			var len=displayarea.getEnd()-displayarea.getStart()+1;
			var wid=4800/(len);
			if(displayItems.get(trackname).getXMLnode().childNodes.length>0&&displayItems.get(trackname).getXMLnode().childNodes[0].nodeValue!=null){
				var arr=displayItems.get(trackname).getXMLnode().childNodes[0].nodeValue;
				var len=arr.length;
				var wid=(canvas.width)/(len);
				if(wid>10&&wid<20){
					drawpattern(ctx,len,wid,arr);			  
					}
				else if(wid>=20){
					drawpattern(ctx,len,wid,arr);
					drawletter(ctx,arr,wid);	
				}
			}
			var gbtn=document.getElementById('div'+trackname).getElementsByClassName("genebutton");						
			if(gbtn.length > 0){
				while (gbtn.length > 0) {
					gbtn[0].remove();
				}
			}
			document.getElementById('div'+trackname).style.display='none';//还原
			canvas.style.height='100%';
			innermove('innerdiv'+trackname);
			document.getElementById('innerdiv'+trackname).appendChild(canvas);
			
			document.getElementById('div'+trackname).style.height=document.getElementById('innerdiv'+trackname).offsetHeight+'px';
			//if(displayItems.get(trackname).getXMLnode().childNodes.length>0&&displayItems.get(trackname).getXMLnode().childNodes[0].nodeValue!=null){
				//trackname=trackname.replace('_seq','');
				//document.getElementById('innerdiv'+trackname).appendChild(canvas);
			//}
		}
		else{
			var canvas = document.createElement('canvas');
			canvas.width=4800;
			canvas.height=120;
			canvas.classList='outercanvas';
			canvas.id='canvas'+trackname;
			var ctx=canvas.getContext('2d');
			if(mode=='dense'){canvas.height=100;}
			var gbtn=document.getElementById('div'+trackname).getElementsByClassName("genebutton");						
			if(gbtn.length > 0){
				while (gbtn.length > 0) {
					gbtn[0].remove();
				}
			}
			var a=displayItems.get(trackname).getXMLnode().getElementsByTagName('E');
			if(a.length>0){
				for(var j=0;j<a.length;j++){	
					var tl=a[j].getElementsByTagName('S').length;
					if(tl==0&&Math.round(a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue)>displayarea.getStart()){
						var wid=(canvas.width)/(displayarea.getEnd()-displayarea.getStart()+1);
						var start=Math.round(a[j].getElementsByTagName('F')[0].childNodes[0].nodeValue);
						var end=Math.round(a[j].getElementsByTagName('T')[0].childNodes[0].nodeValue);
						if (start<displayarea.getStart()){start=displayarea.getStart()}
						var w=(end-start+2)*wid;
						var x=(start-displayarea.getStart()-1)*wid;
						if(w<1){w=1;}
						ctx.beginPath;
						ctx.fillStyle='#1f78b4';
						ctx.fillRect(x,30,w,24);
						ctx.fill();
						ctx.closePath();
					}
				}
			}	
			
			canvas.style.height='100%';
			innermove('innerdiv'+trackname);
			
			var tempname=trackname+'_seq';
			var seqcanvas=document.getElementById('canvas'+tempname);
			var wid=(canvas.width)/(displayarea.getEnd()-displayarea.getStart()+1);
			if(displayItems.get(tempname).getXMLnode().childNodes.length>0&&displayItems.get(tempname).getXMLnode().childNodes[0].nodeValue!=null&&wid>10){
				document.getElementById('innerdiv'+tempname).appendChild(canvas);
				document.getElementById('innerdiv'+trackname).appendChild(seqcanvas);
			}
			else{
				document.getElementById('innerdiv'+trackname).appendChild(canvas);	
			}//还原
			//document.getElementById('innerdiv'+trackname).appendChild(canvas);	//删掉
			document.getElementById('div'+trackname).style.height=document.getElementById('innerdiv'+trackname).offsetHeight+'px';
		}
}
function drawga(arr){
    var canvas=document.getElementById("canvas");
	canvas.width=4800;
	canvas.height=60;
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0,0,canvas.width,canvas.height);
	var len=arr.length;
	var wid=(canvas.width)/(len);
	if(wid>10&&wid<20){
		drawpattern(ctx,len,wid,arr);			  
		}
		else if(wid>=20){
			drawpattern(ctx,len,wid,arr);
			drawletter(ctx,arr,wid);	
		}
}
function getgaXML(){
	var a = request.responseXML;
    var ditem = displayitem(track,track_div,a,mode,group);
    displayItems.put(track,ditem);
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

function drawpattern(ctx,len,wid,arr){
	for(var i=0;i<len;i++){
		var rw=wid;
		var x=rw*i;
		var y=42;
		var h=20;
		var a=arr[i];
		ctx.beginPath();
		if(a=='A'){
			ctx.fillStyle='rgb(255,0,0)';//red	
			}
		else if(a=='C'){
			ctx.fillStyle='rgb(255,255,0)';//yellow	
		    }
		else if(a=='T'){
			ctx.fillStyle='rgb(0,255,55)';//green
		    }
		else if(a=='G'){
			ctx.fillStyle='rgb(30,144,255)';//blue	
		    }
		else if(a==' '){
			ctx.fillStyle='white';
		}
		else if(a=='-'){
			h=2;
			y+=9;
			rw=rw/2;
			x+=rw/2;
			ctx.fillStyle='black';
		}
		ctx.fillRect(x,y,rw,h);
		ctx.closePath();
		}
}

function drawletter(ctx,arr,wid){
	for (var j=0;j<arr.length;j++){
	ctx.font='20px Century';
	ctx.fillStyle='black';
	ctx.textAlign='center';
	ctx.fillText(arr[j],wid*j+(wid/2),60);
	}
} 