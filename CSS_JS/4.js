//annotations的track管理
$(function(){
//全局变量
var externals_getCheck; 
var keySet = annotations.keySet();
for(var i in keySet){
	var groups =document.createElement('div');
	groups.className="option1";
	groups.id=keySet[i];
	groups.active=0;
	groups.innerHTML=keySet[i];
	document.getElementById('choice1').appendChild(groups);
	if(keySet[i]=='Genome align'){groups.style.display='none';}
	
	var tracks=document.createElement('div');
	tracks.className="option2";
	tracks.id="group"+keySet[i];

	var trackTile=document.createElement('div');
    trackTile.className="option3";
    trackTile.innerHTML= keySet[i];
    tracks.appendChild(trackTile);

    var trackKeys = annotations.get(keySet[i]).keySet();
	for(var j in trackKeys){
		var a =document.createElement('div');
		a.className='label'
        var b =document.createElement('div');
        b.className='slabel'
		b.exist=0;
        b.id=trackKeys[j];
        b.innerHTML=trackKeys[j];

		var c =document.createElement('select');
		c.className='mlabel';
		c.id='select'+trackKeys[j];
		var t = new Option('hide', 'hide');  
        c.append(t);
		var t = new Option('pack', 'pack');    
        c.append(t);
		var t = new Option('dense', 'dense');    
        c.append(t);
        var mode=annotations.get(keySet[i]).get(trackKeys[j]).getMode();
		c.onchange=function(){
			var temp=this;
			var mode_val;
			for(t=0;t<this.length;t++){
				if(this[t].selected==true){mode_val=this[t].value;}
			}
			var group_id=this.parentNode.parentNode.id.replace("group","");
			var track_id=this.id.replace("select","");
			annotations.get(group_id).get(track_id).setMode(mode_val);
			if(mode_val=="hide"){
				var temp=document.getElementById('div'+track_id).parentNode;
				temp.removeChild(document.getElementById('div'+track_id));
        		removeTracks(group_id,track_id);
        	}
			else{
				if(document.getElementById('innerdiv'+track_id)!=null) {
				var temp=document.getElementById('innerdiv'+track_id).getElementsByTagName('canvas')[0];
				document.getElementById('innerdiv'+track_id).removeChild(temp);
				addTracks(group_id,track_id,mode_val,track_div);
				}
				
				else{
					if(document.getElementById('innerdiv'+track_id)!=null) {
						var temp=document.getElementById('div'+track_id).getElementsByTagName('canvas')[0];
						document.getElementById('innerdiv'+track_id).removeChild(temp);
						addTracks(group_id,track_id,mode_val,track_div);
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
							var track_id=this.parentNode.id.replace("div","")
							removeTracks(group_id,track_id);
							this.parentNode.parentNode.removeChild(this.parentNode);
							//$(this).parent().remove();
							annotations.get(group_id).get(track_id).setMode("hide");
							var temp=document.getElementById(track_id).parentNode.getElementsByTagName('select')[0];
							for(t=0;t<temp.length;t++){
							if(temp[t].value=='hide'){temp[t].selected=true;}
							
							if(group_id=='Genome align'){
								var track_id1=track_id+'_seq';
								removeTracks(group_id,track_id1);
								annotations.get(group_id).get(track_id1).setMode("hide");
							}
							//else{temp[t].selected=false;}
							}
						}
						addTracks(group_id,track_id,mode_val,track_div);
						document.getElementById('window').appendChild(track_div);
					}
            //为displayItems加入返回数据，在browser区域加入新track的div，把div对象和addTracks返回的对象存入displayItems
				}        	
			}
		}
		if(mode=="pack"){
			for(t=0;t<c.length;t++){
				if(c[t].value=='pack'){c[t].selected=true;}
			}
		}
		else if(mode=="dense"){
			for(t=0;t<c.length;t++){
				if(c[t].value=='dense'){c[t].selected=true;}
			}
		}
		else{
			for(t=0;t<c.length;t++){
				if(c[t].value=='hide'){c[t].selected=true;}
			}
		}
		a.appendChild(b);
		a.appendChild(c);
		tracks.appendChild(a);
		
	}
	document.getElementById('choice2').appendChild(tracks);
	tracks.style.display='none';
	groups.onclick=function(){
		var groupId="group"+this.id;
		for(var int in keySet){
			var sname="group"+keySet[int];
			document.getElementById(sname).style.display='none';
		}
		//
		if(document.getElementById('groupUser')!=null){
		document.getElementById('groupUser').style.display='none';}
		document.getElementById(groupId).style.display='block';
	}	
}


 //externals的tracks的管理
var groups =document.createElement('div');
groups.innerHTML='User';
groups.className='option1'
groups.active=0;
groups.id=externals.keySet()[0];
document.getElementById('choice1').appendChild(groups);

var tracks_user=document.createElement('div');
tracks_user.className='option2';
tracks_user.id="groupUser";

var trackTile=document.createElement('div');
trackTile.className='option3';
trackTile.innerHTML='User';
tracks_user.appendChild(trackTile);

if(externals.size()>0){
        var trackKeys_user = externals.get(externals.keySet()[0]).keySet();
        for(var j in trackKeys_user){
			var a =document.createElement('div');
			a.className='label'
			var b =document.createElement('div');
			b.className='slabel'
			b.id=trackKeys_user[j];
			b.innerHTML=trackKeys_user[j];
			/*b.onclick=function(){
				var mode;
				var temp=this.parentNode.getElementsByTagName('select')[0];
				for(t=0;t<temp.length;t++){
					if(temp[t].selected=true){mode=temp[t].value;}
				}
                if(mode=='delete'){
					var temp=this.parentNode.parentNode;
					temp.removeChild(this.parentNode);
                    //this.parentNode.removeChild(this);
					temp=document.getElementById('div'+trackKeys_user[j]);
					temp.parentNode.removeChild(temp);
                    removeExternals(this.id);
                }
            }*/
			var c =document.createElement('select');
			c.className='mlabel';
			c.id='select'+trackKeys_user[j];
			var t = new Option('hide', 'hide');  
			c.append(t);
			var t = new Option('pack', 'pack');    
			c.append(t);
			var t = new Option('dense', 'dense');    
			c.append(t);
			var t = new Option('delete', 'delete');    
			c.append(t);
			var mode=externals.get("User").get(trackKeys_user[j]).getMode();
			c.onchange=function(){
				var mode_val;
				for(t=0;t<this.length;t++){
					if(this[t].selected==true){mode_val=this[t].value;}
				}
				if(mode_val=='delete'){
					var track_id=this.id.replace('select','');
					var temp=this.parentNode.parentNode;
					temp.removeChild(this.parentNode);
                    //this.parentNode.removeChild(this);
					if(document.getElementById('div'+track_id)!=null){
					temp=document.getElementById('div'+track_id);
					temp.parentNode.removeChild(temp);}
					
                    removeExternals(track_id);
				}
				if(mode_val!='delete'){
					var track_id =this.parentNode.getElementsByTagName('div')[0].id;
					var group_id=this.parentNode.parentNode.id.replace("group","");
                    externals.get("User").get(track_id).setMode(mode_val);
                    if(mode_val=='hide'){
						document.getElementById('div'+track_id).parentNode.removeChild(document.getElementById('div'+track_id));
                        userRemoveTracks(track_id);
					}
					else{
						if(document.getElementById('div'+track_id)!=null){
							var temp=document.getElementById('div'+track_id).getElementsByTagName('canvas')[0];
							temp.parentNode.removeChild(temp);
							//document.getElementById('div'+track_id).removeChild(temp);
							userAddTracks(track_id,mode_val,track_div);
						}
						else{
							var track_div =document.createElement('div');
							track_div.className="whxdiv";
							track_div.id="div"+track_id;
							track_div.name='User';
							
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
								var track_id=this.parentNode.id.replace("div","")
								userRemoveTracks(track_id);
								this.parentNode.parentNode.removeChild(this.parentNode);
								//$(this).parent().remove();
								externals.get("User").get(track_id).setMode("hide");
								var temp=document.getElementById(track_id).parentNode.getElementsByTagName('select')[0];
								for(t=0;t<temp.length;t++){
								if(temp[t].value=='hide'){temp[t].selected=true;}
								//else{temp[t].selected=false;}
								}
							}
							userAddTracks(track_id,mode_val,track_div)
							document.getElementById('window').appendChild(track_div);
						}//else
						
					}//else
                    
				}
				
				
			}//c.onchange
			if(mode=="pack"){
				for(t=0;t<c.length;t++){
					if(c[t].value=='pack'){c[t].selected=true;}
				}
			}
			else if(mode=="dense"){
				for(t=0;t<c.length;t++){
					if(c[t].value=='dense'){c[t].selected=true;}
				}
			}
			else{
				for(t=0;t<c.length;t++){
					if(c[t].value=='hide'){c[t].selected=true;}
				}
			}
			a.appendChild(b);
			a.appendChild(c);
			tracks_user.appendChild(a);
		}
}
document.getElementById('choice2').appendChild(tracks_user);
tracks_user.style.display='none';
groups.onclick=function(){
	var groupId="groupUser";
	for(var int in keySet){
		var sname="group"+keySet[int];
		document.getElementById(sname).style.display='none';
	}
	//document.getElementById('groupUser').style.display='none';
	document.getElementById("groupUser").style.display='block';
}

document.getElementById('btn_submit').onclick=function(){
	var trackname = document.getElementById("user_trackName").value;
	var type = document.getElementById("sl").value;
	var url = document.getElementById("user_url").value;
	if(trackname==""|| url==""){
		alert("Please Enter.")
	}
	else{
		//var etks = externals.get('User').keySet();
		var samename=false;
		//for(var m in etks){
		if(externals.containsKey('User')){
			if(externals.get('User').containsKey(trackname)){
				alert('Already have a track of the same name');
				samename=true;
			}
		}
		if(samename==false){
		addExternals(trackname,url,type);
		getCheck(trackname);
		if(externals_getCheck==false){removeExternals(trackname);}
		else{
			var a =document.createElement('div');
			a.className='label'
			var b =document.createElement('div');
			b.className='slabel'
			b.id=trackname;
			b.innerHTML=trackname;
			var c =document.createElement('select');
			c.className='mlabel';
			c.id='select'+trackname;
			var t = new Option('hide', 'hide');  
			c.append(t);
			var t = new Option('pack', 'pack');    
			c.append(t);
			var t = new Option('dense', 'dense');    
			c.append(t);
			var t = new Option('delete', 'delete');    
			c.append(t);
			for(t=0;t<c.length;t++){
				if(c[t].value=='hide'){c[t].selected=true;}
			}
			c.onchange=function(){
				var mode_val;
				for(t=0;t<this.length;t++){
					if(this[t].selected==true){mode_val=this[t].value;}
				}
				if(mode_val=='delete'){
						var track_id=this.id.replace('select','');
						var temp=this.parentNode.parentNode;
						temp.removeChild(this.parentNode);
						//this.parentNode.removeChild(this);
						if(document.getElementById('div'+track_id)!=null){
						temp=document.getElementById('div'+track_id);
						temp.parentNode.removeChild(temp);}
						removeExternals(track_id);
				}
				if(mode_val!='delete'){
						var track_id =this.parentNode.getElementsByTagName('div')[0].id;
						var group_id=this.parentNode.parentNode.id.replace("group","");
						externals.get("User").get(track_id).setMode(mode_val);
						if(mode_val=='hide'){
							document.getElementById('div'+track_id).parentNode.removeChild(document.getElementById('div'+track_id));
							userRemoveTracks(track_id);
						}
						else{
							if(document.getElementById('div'+track_id)!=null){
								var temp=document.getElementById('div'+track_id).getElementsByTagName('canvas')[0];
								temp.parentNode.removeChild(temp);
								//document.getElementById('div'+track_id).removeChild(temp);
								userAddTracks(track_id,mode_val,track_div);
							}
							else{
								var track_div =document.createElement('div');
								track_div.className="whxdiv";
								track_div.id="div"+track_id;
								track_div.name='User';
								
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
									var track_id=this.parentNode.id.replace("div","")
									userRemoveTracks(track_id);
									this.parentNode.parentNode.removeChild(this.parentNode);
									//$(this).parent().remove();
									externals.get("User").get(track_id).setMode("hide");
									var temp=document.getElementById(track_id).parentNode.getElementsByTagName('select')[0];
									for(var t=0;t<temp.length;t++){
									if(temp[t].value=='hide'){temp[t].selected=true;}
									//else{temp[t].selected=false;}
									}
								}
								userAddTracks(track_id,mode_val,track_div)
								document.getElementById('window').appendChild(track_div);
							}
							
						}
						
				}//if(mode_val!='delete')
				
			}//c.onchange
			a.appendChild(b);
			a.appendChild(c);
			tracks_user.appendChild(a);
		}
		}
	}//else
	
}

//预设
var keySet = annotations.keySet();
for(var i in keySet){
    var trackKeys = annotations.get(keySet[i]).keySet();
    for(var j in trackKeys){
		var mode_val=document.getElementById('select'+trackKeys[j]).value;
		var group_id=document.getElementById(trackKeys[j]).parentNode.parentNode.id.replace("group","");
        if(mode_val!="hide"){
            var track_div=document.createElement('div');
			track_div.id="div"+trackKeys[j];
			track_div.className='whxdiv';
			track_div.name=group_id;
			
			
			var outerdiv=document.createElement('div');
			outerdiv.id="outerdiv"+trackKeys[j];
			outerdiv.className='outerdiv';
			track_div.appendChild(outerdiv);
			
			var innerdiv=document.createElement('div');
			innerdiv.id="innerdiv"+trackKeys[j];
			innerdiv.className='innerdiv';
			outerdiv.appendChild(innerdiv);
			
			var pic_div=document.createElement('div');
			pic_div.innerHTML=trackKeys[j];
			pic_div.className='pic_div'
			track_div.appendChild(pic_div);
			
			var groupname=group_id;
			var groupname=groupname.replace("_"," ");
			var description=document.createElement('div');
			description.innerHTML=groupname;
			description.className='description';
			track_div.appendChild(description);
			
			
            var btn_del=document.createElement('input');
			btn_del.setAttribute("type", "button");
			btn_del.setAttribute("class", "whxdelete");
			track_div.appendChild(btn_del);
			btn_del.parentNode.name
			btn_del.onclick=function(){
				var group_id=this.parentNode.name;
            	var track_id=this.parentNode.id.replace("div","")
            	removeTracks(group_id,track_id);
				this.parentNode.parentNode.removeChild(this.parentNode);
            	annotations.get(group_id).get(track_id).setMode("hide");
				var temp=document.getElementById(track_id).parentNode.getElementsByTagName('select')[0];
				for(var tt=0;tt<temp.length;tt++){
					if(temp[tt].value=='hide'){temp[tt].selected=true;}
				}
				if(group_id=='Genome align'){
					var track_id1=track_id+'_seq';
					removeTracks(group_id,track_id1);
					annotations.get(group_id).get(track_id1).setMode("hide");
				}
            }
			
			document.getElementById('window').appendChild(track_div);
            //为displayItems加入返回数据，在browser区域加入新track的div，把div对象和addTracks返回的对象存入displayItems
            addTracks(group_id,trackKeys[j],mode_val,track_div);
        }
    }
}

var ks = externals.keySet();
for(var i in ks){
    var trackKeys = externals.get(ks[i]).keySet();
    for(var j in trackKeys){
		var mode_val=document.getElementById('select'+trackKeys[j]).value;
		var group_id=document.getElementById(trackKeys[j]).parentNode.parentNode.id.replace("group","");
        if(mode_val!="hide"){
            var track_div=document.createElement('div');
			track_div.id="div"+trackKeys[j];
			track_div.className='whxdiv';
			track_div.name=group_id;
			
			var outerdiv=document.createElement('div');
			outerdiv.id="outerdiv"+trackKeys[j];
			outerdiv.className='outerdiv';
			track_div.appendChild(outerdiv);
			
			var innerdiv=document.createElement('div');
			innerdiv.id="innerdiv"+trackKeys[j];
			innerdiv.className='innerdiv';
			outerdiv.appendChild(innerdiv);
			
			var pic_div=document.createElement('div');
			pic_div.innerHTML=trackKeys[j];
			pic_div.className='pic_div'
			track_div.appendChild(pic_div);
			
			var groupname=group_id;
			var groupname=groupname.replace("_"," ");
			var description=document.createElement('div');
			description.innerHTML=groupname;
			description.className='description';
			track_div.appendChild(description);
			
            var btn_del=document.createElement('input');
			btn_del.setAttribute("type", "button");
			btn_del.setAttribute("class", "whxdelete");
			track_div.appendChild(btn_del);
			btn_del.parentNode.name
			btn_del.onclick=function(){
				var track_id=this.parentNode.id.replace("div","")
				userRemoveTracks(track_id);
				this.parentNode.parentNode.removeChild(this.parentNode);
				//$(this).parent().remove();
				externals.get("User").get(track_id).setMode("hide");
				var temp=document.getElementById(track_id).parentNode.getElementsByTagName('select')[0];
				for(var t=0;t<temp.length;t++){
				if(temp[t].value=='hide'){temp[t].selected=true;}}
				
            }
			
			document.getElementById('window').appendChild(track_div);
            //为displayItems加入返回数据，在browser区域加入新track的div，把div对象和addTracks返回的对象存入displayItems
            //addTracks(group_id,trackKeys[j],mode_val,track_div);
			userAddTracks(trackKeys[j],mode_val,track_div);
        }
    }
}
function getCheck(trackname){
	var req = createXMLHttpRequest();
	var querry="action=getCheck&tracks="+trackname;
	req.onreadystatechange = function(){getCheck_GetReadyStateHandler(req);};
	req.open("GET","servlet/test.do?"+querry,false);
	req.send(null);
}
function getCheck_GetReadyStateHandler(request){
	if (request.readyState == 4&&request.status == 200){
		//alert();
		var XmlNode=request.responseXML;
		//var temp=XmlNode.getElementsByTagName('ErrorList')[0].childNodes[0].nodeValue;
		var temp=XmlNode.getElementsByTagName('ErrorList')[0].childNodes[0];
		if(temp==null){externals_getCheck=true;}
		else{
			externals_getCheck=false;
			temp=XmlNode.getElementsByTagName('ErrorList')[0].childNodes[0].nodeValue;
			alert(temp);
		}
	}
}

//竖直位置线
var div=document.getElementById('whxdiv0');
div.shiftkey=0; 
var cvs = document.createElement('canvas');
cvs.id='canvasline';
cvs.style.width="100%";
cvs.style.height="100%";
cvs.style.backgroundColor='none';
cvs.width=1500;
cvs.height=document.getElementById('window').offsetHeight*2;
cvs.selectstart=0;
cvs.selectend=0;
document.getElementById('cover1').appendChild(cvs);
var podiv=document.createElement('div');
podiv.id='positiondiv';
podiv.className='positiondiv';
podiv.innerHTML
document.getElementById('cover1').appendChild(podiv);
document.getElementById('inneraxis').displaystart=656.5;

div.onmouseover=function(){
	if(this.shiftkey==0){
		var cvs=document.getElementById('canvasline');
		var ctx=cvs.getContext('2d');
		var evt = evt || window.event;
		var marginleft=document.getElementById('window').offsetLeft;
		var xlabel=mousePosition(evt).x-marginleft;
		var ylabel=12;
		var temp=((1313)/(displayarea.getEnd()-displayarea.getStart()+1))/2;
		var a=Math.round(document.getElementsByClassName('innerdiv')[0].displaystart)/2626;
		var b=Math.round((displayarea.getEnd()-displayarea.getStart()+1))
		var temp1=a*b;
		var x=(xlabel-187-temp)*(displayarea.getEnd()-displayarea.getStart()+1)/2626+parseInt(temp1+displayarea.getStart());
		var podiv=document.getElementById('positiondiv');
		x=Math.round(x+(displayarea.getEnd()-displayarea.getStart()+1)*(-656.5-innermousemove)/2626);
		podiv.innerHTML=x;
		podiv.style.marginLeft=xlabel+'px';
		ctx.clearRect(0,0,cvs.width,cvs.height);
		if(xlabel>=187&&xlabel<=1510){
			ctx.beginPath();
			ctx.setLineDash([8,2]);
			ctx.lineWidth=1;
			ctx.moveTo( xlabel,0);
			ctx.lineTo( xlabel,cvs.height);
			ctx.strokeStyle='#000';
			ctx.stroke();
			//ctx.font = '12px Century';	
			//if(xlabel>1300){xlabel=xlabel-70;}
			//ctx.fillText(x,xlabel+5,ylabel);
			ctx.closePath();
			podiv.style.display='block';
		}
		else{podiv.style.display='none';}
		
		document.getElementById('cover1').style.width=document.getElementById('window').offsetWidth+'px';
		document.getElementById('cover1').style.height=document.getElementById('window').offsetHeight+'px';
		document.getElementById('cover1').style.display='block';
	}

}
div.onmouseout=function(){
	if(this.shiftkey==0){
		document.getElementById('cover1').style.display='none';
		document.getElementById('positiondiv').style.display='none';
	}
}
var oHtml = document.getElementsByTagName("html")[0];
oHtml.onkeydown = function(ev) {  
	var div=document.getElementsByClassName('whxdiv')[0];
	var e = event || window.event || arguments.callee.caller.arguments[0]; 
	if(e&& e.keyCode == 16){
		div.shiftkey=1;
		var cvs=document.getElementById('canvasline');
		document.getElementById('positiondiv').style.display='none'
	}
}
oHtml.onkeyup = function(ev) {  
	var div=document.getElementsByClassName('whxdiv')[0];
	div.shiftkey=0;
	var cvs=document.getElementById('canvasline');
	//cvs.style.height='100%';
	//cvs.height=document.getElementById('window').offsetHeight*2;
	//ctx.clearRect(0,0,cvs.width,cvs.height);
	document.getElementById('cover1').style.display='none';
	
}

document.getElementById('cover1').onmousedown=function(){
	if(document.getElementsByClassName('whxdiv')[0].shiftkey==1){
		this.move=1;
		var cvs=document.getElementById('canvasline');
		var ctx=cvs.getContext('2d');
		var evt = evt || window.event;
		var marginleft=document.getElementById('window').offsetLeft+1;
		this.selectstart=mousePosition(evt).x-marginleft;
		ctx.clearRect(0,0,cvs.width,cvs.height);
		ctx.setLineDash([]);
	}
}
document.getElementById('cover1').onmousemove=function(){
	if(document.getElementsByClassName('whxdiv')[0].shiftkey==1&&this.move==1){
		var evt = evt || window.event;
		var marginleft=document.getElementById('window').offsetLeft+1;
		var cvs=document.getElementById('canvasline');
		var ctx=cvs.getContext('2d');
		ctx.beginPath();
		ctx.lineWidth=1;
		ctx.clearRect(0,0,cvs.width,cvs.height);
		ctx.fillStyle = "red";
		ctx.rect(this.selectstart,2,mousePosition(evt).x-marginleft-this.selectstart,cvs.height-3);
		ctx.strokeStyle='#0080FF';
		ctx.stroke();
	}
}
document.getElementById('cover1').onmouseup=function(){
 if(document.getElementsByClassName('whxdiv')[0].shiftkey==1){
  this.move=0;
  var evt = evt || window.event;
  var marginleft=document.getElementById('window').offsetLeft+1;
  this.selectend=mousePosition(evt).x-marginleft;
  
  var cvs=document.getElementById('canvasline');
  var ctx=cvs.getContext('2d');
  
  var start=this.selectstart-187;
  if(start<0){start=0;}
  var end=this.selectend-187;
  var width=displayarea.getEnd()-displayarea.getStart()+1;
  var wid=width/2626;
  var temp=-1*innermousemove/2626;
  start=Math.round(displayarea.getStart()+width*temp+start*wid);
  end=Math.round(displayarea.getStart()+width*temp+end*wid);
  width=end-start+1;
  start=parseInt(start-width/2);
  end=parseInt(end+width/2);
  innermousemove=-656.5;
  update(displayarea.getChr(),start,end);
  ctx.clearRect(0,0,cvs.width,cvs.height);
 }
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
 
//获取X轴坐标
function getX(evt){
    evt = evt || window.event;
    return mousePosition(evt).x;
}
	
zoomchange();	

});


document.getElementById('userdataexample').onclick=function(){
	document.getElementById('user_trackName').value='Example';
	document.getElementById('user_url').value='http://10.155.120.8:8080/gbslim/Ptrichocarpa_533_v4.1.gene_exons.bb';
	document.getElementById('sl').value='BB';
}


