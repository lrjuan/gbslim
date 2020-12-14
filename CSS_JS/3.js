// 
var annotations = new HashMap();
var externals = new HashMap(); 
var displayItems = new HashMap();
var chrLength = new HashMap();
//div ID ='displayItems'+displayItems.keySet()[i];
var displayarea=new displayArea();
var predisplay=['OMIM','ensemblGene','knownGene'];
var tempXML;

var req = createXMLHttpRequest();
var querry="action="+"getAnnotations";
req.onreadystatechange = Annotations_GetReadyStateHandler;
req.open("GET","servlet/test.do?"+querry,false);
req.send(null);

req.onreadystatechange = Externals_GetReadyStateHandler;
req.open("GET","servlet/test.do?"+"action=getExternals",false);
req.send(null);

req.onreadystatechange = Chr_GetReadyStateHandler;
req.open("GET","servlet/test.do?"+"action=getChromosomes",false);
req.send(null);

var tempwidth=document.getElementById('window').style.width=displayarea.width;
if(tempwidth>1500){
	document.getElementById('window').style.marginLeft=(tempwidth-1500)/2+'px';
	document.getElementById('control').style.marginLeft=(tempwidth-1500)/2+'px';
	document.getElementById('location').style.marginLeft=(tempwidth-1500)/2+'px';
}
else{
	document.getElementById('window').style.marginLeft=0+'px';
	document.getElementById('control').style.marginLeft=0+'px';
	document.getElementById('location').style.marginLeft=0+'px';
}
window.onresize = function(){
	displayarea.setWidth(document.body.clientWidth);
	var tempwidth=document.getElementById('window').style.width=displayarea.width;
	if(tempwidth>1500){
		document.getElementById('window').style.marginLeft=(tempwidth-1500)/2+'px';
		document.getElementById('control').style.marginLeft=(tempwidth-1500)/2+'px';
		document.getElementById('location').style.marginLeft=(tempwidth-1500)/2+'px';
	}
	else{document.getElementById('window').style.marginLeft=0+'px';
		document.getElementById('control').style.marginLeft=0+'px';
		document.getElementById('location').style.marginLeft=0+'px';}
}
//querry="action=update&width="+displayarea.getWidth()+"&chr=chr22&start="+21000000+"&end="+21500000;
//querry="action=update&width="+displayarea.getWidth()+"&chr=chr22&start="+displayarea.getStart()+"&end="+displayarea.getEnd();
//req.onreadystatechange = Update_GetReadyStateHandler;
//req.open("GET","servlet/test.do?"+querry,false);
//req.send(null);

//alert(tempXML.getElementsByTagName('Sequence')[0].childNodes[0].nodeValue);
function displayArea(){
	var obj = new Object();
  	obj.chr='Chr01';
  	obj.start=2500000;
  	obj.end=12500000;
	obj.width=document.body.clientWidth;
	//查询
 	obj.getChr = function(){
    return obj.chr;
  	}
	obj.getStart = function(){
    return Math.round(obj.start);
  	}
	obj.getEnd = function(){
    return Math.round(obj.end);
  	}
	obj.getWidth = function(){
    return obj.width;
  	}
	//修改
	obj.setChr = function(c){
    obj.chr=c;
  	}
	obj.setStart = function(s){
    obj.start=s;
  	}
	obj.setEnd = function(e){
    obj.end=e;
  	}
	obj.setWidth = function(w){
    obj.width=w;
  	}
	return obj;
}
function Annotations_GetReadyStateHandler() {
	if (req.readyState == 4&&req.status == 200){
		var a=req.responseText;	
		a=a.replace("<MetaDataExchange>","");
		a=a.replace("<AnnotationList>","");
		a=a.replace("</MetaDataExchange>","");
		a=a.replace("</AnnotationList>","");
		var b=a.split(",");
		for(var i=0;i<b.length;i++)
		{
			var c=b[i].split(":");
			if(!annotations.containsKey(c[0]))
				{
					var track=createTrack(c[1],c[2],c[3]);
					var temp=new HashMap();
					temp.put(c[1],track);
					annotations.put(c[0],temp); 
				}
			else
				{
					var track=createTrack(c[1],c[2],c[3]);
					annotations.get(c[0]).put(c[1],track);
				}
		}
	}
}

function Externals_GetReadyStateHandler() {
	if (req.readyState == 4&&req.status == 200){
		var a=req.responseText;
		
		if(a.search('<AnnotationList/>')==-1){
			a=a.replace("<MetaDataExchange>","");
			a=a.replace("<AnnotationList>","");
			a=a.replace("</MetaDataExchange>","");
			a=a.replace("</AnnotationList>","");
			var b=a.split(",");
			for(var i=0;i<b.length;i++)
			{
				var c=b[i].split(":");
				if(!externals.containsKey(c[0]))
					{
						var track=createTrack(c[1],c[2],c[3]);
						var temp=new HashMap();
						temp.put(c[1],track);
						externals.put(c[0],temp); 
					}
				else
					{
						var track=createTrack(c[1],c[2],c[3]);
						externals.get(c[0]).put(c[1],track);
					}
			}
		}
		
	}
}
function Update_GetReadyStateHandler() {
	if (req.readyState == 4&&req.status == 200){
		var XmlNode=req.responseXML;
		temp=XmlNode.getElementById('OMIM').id;
		alert(temp);
		//var str=XmlNode.getElementsByTagName('Sequence')[0].childNodes[0].nodeValue;

	}
}
function Chr_GetReadyStateHandler() {
	if (req.readyState == 4&&req.status == 200){
		var a=req.responseText;	
		a=a.replace("<MetaDataExchange>","");
		a=a.replace("<ChromosomeList>","");
		a=a.replace("</ChromosomeList>","");
		a=a.replace("</MetaDataExchange>","");
		var b=a.split(",");
		for(var i=0;i<b.length;i++)
		{
			var c=b[i].split(":");
			if(!chrLength.containsKey(c[0]))
				{
					chrLength.put(c[0],c[1]); 
				}
			else
				{
				}
		}
	}
}
function createTrack(name,mode,type){
  var obj = new Object();
  obj.name = name;
  obj.mode = mode;
  obj.type=type;
  obj.request= createXMLHttpRequest();
  obj.getName = function(){
    return obj.name;
  }
  obj.getMode = function(){
    return obj.mode;
  }
  obj.getType = function(){
    return obj.type;
  }
  obj.getRequest = function(){
    return obj.request;
  }
   obj.setMode = function(m){
    obj.mode=m;
  }
  return obj;
}

function displayitem(a,b,c,d,e){
   var obj = new Object();
   obj.name =a;
   obj.track_div=b;
   obj.XMLnode=c;
   obj.mode=d;
   obj.group=e;
   obj.setName = function (name){
      obj.name=name;
   }
   obj.getName = function (){
      return obj.name;
   }
   obj.getDiv = function(){
      return obj.track_div;
   }
   obj.getXMLnode = function(){
      return obj.XMLnode;
   }
   obj.getMode = function(){
      return obj.mode;
   }
   obj.getGroup = function(){
      return obj.group;
   }
   obj.setMode = function(aaa){
      obj.mode=aaa;
   }
   obj.setXMLnode = function(temp){
      obj.XMLnode=temp;
   }
   return obj
}
function addTracks(group,track,mode,track_div){
	if(group=='Genome align'){
		if(track.substring(track.length-3)=='seq'){
			var request = annotations.get(group).get(track).getRequest();
			querry="action=addTracks&tracks="+track+"&modes="+mode;
			request.onreadystatechange =function(){getTracks(request,track,track_div,mode,group);};
			request.open("GET","servlet/test.do?"+querry,false);
			request.send(null);
			
			var temp=track.replace('_seq','');
			var request = annotations.get(group).get(temp).getRequest();
			querry="action=addTracks&tracks="+temp+"&modes="+mode;
			request.onreadystatechange =function(){getTracks(request,temp,track_div,mode,group);};
			request.open("GET","servlet/test.do?"+querry,true);
			request.send(null);
		}
	}
	else{
		var request = annotations.get(group).get(track).getRequest();
		querry="action=addTracks&tracks="+track+"&modes="+mode;
		request.onreadystatechange =function(){getTracks(request,track,track_div,mode,group);};
		request.open("GET","servlet/test.do?"+querry,true);
		request.send(null);
	}
}
function getTracks(request,track,track_div,mode,group){
   if (request.readyState == 4&&request.status == 200) {
      var a = request.responseXML;
      var ditem = displayitem(track,track_div,a,mode,group);
	  if(group=='Genome align'){
		  if(track.substring(track.length-3)=='seq'){
			  var node=request.responseXML.getElementById(track);
			  ditem = displayitem(track,track_div,node,mode,group);
		  }
	  }
      displayItems.put(track,ditem);
	  if(group=='Gene'){draweletrack(track,mode,group);}
	  else if(group=='Variant'){drawvartrack(track,mode,group);}
	  else if(group!=null && group.substring(0,6)=='RNASeq'){drawvaltrack(track,mode,group);}
	  else if(group=='Regulation'){draweletrack(track,mode,group);}
	  else if(group=='Sequence Feature'){
		  if(track=='Repeat Mask'){draweletrack(track,mode,group);}
		  else{
		  	drawvaltrack(track,mode,group);
		  }
	  }
	  else if(group=='User'){
		  if(a.getElementsByTagName('Es').length!=0){draweletrack(track,mode,group)}
		  else if(a.getElementsByTagName('Values').length!=0){drawvaltrack(track,mode,group);}
		  else if(a.getElementsByTagName('Vs').length!=0){drawvartrack(track,mode,group);}
	 }
		  
	  else if(group=='Genome align'){
		drawgenomealigntrack(track,mode,group);
		}
   }
}
function removeTracks(group,track){
   var request = annotations.get(group).get(track).getRequest();
   querry="action=removeTracks&tracks="+track;

   request.onreadystatechange = function(){delDisplayItem(track);};
   request.open("GET","servlet/test.do?"+querry,true);
   request.send(null);
}

function delDisplayItem(track){
   displayItems.remove(track);
}

function userAddTracks(track,mode,track_div){
   var request = externals.get("User").get(track).getRequest();
   querry="action=addTracks&tracks="+track+"&modes="+mode;
   request.onreadystatechange =function(){getTracks(request,track,track_div,mode,'User');};
   request.open("GET","servlet/test.do?"+querry,true);
   request.send(null);
}

function userRemoveTracks(track){
   var request = externals.get("User").get(track).getRequest();
   querry="action=removeTracks&tracks="+track;

   request.onreadystatechange = function(){delDisplayItem(track);};
   request.open("GET","servlet/test.do?"+querry,true);
   request.send(null);
}

function addExternals(track,links,type) {
	querry="action=addExternals&tracks="+track+"&modes="+"hide"+"&links="+links+"&types="+type;
	req.open("GET","servlet/test.do?"+querry,false);
	req.send(null);
	externals.clear();
	req.onreadystatechange = Externals_GetReadyStateHandler;
	req.open("GET","servlet/test.do?"+"action=getExternals",false);
	req.send(null);
}
function removeExternals(track) {
	querry="action=removeExternals&tracks="+track;
	req.open("GET","servlet/test.do?"+querry,false);
	req.send(null);
	externals.clear();
	req.onreadystatechange = Externals_GetReadyStateHandler;
	req.open("GET","servlet/test.do?"+"action=getExternals",false);
	req.send(null);
}
function detectZoom() {
        var ratio = 0,
            screen = window.screen,
            ua = navigator.userAgent.toLowerCase();

        if (window.devicePixelRatio !== undefined) {
            ratio = window.devicePixelRatio;
        }
        else if (~ua.indexOf('msie')) {
            if (screen.deviceXDPI && screen.logicalXDPI) {
                ratio = screen.deviceXDPI / screen.logicalXDPI;
            }
        }
        else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
            ratio = window.outerWidth / window.innerWidth;
        }

        if (ratio) {
            ratio = Math.round(ratio * 100);
        }
        return ratio;
}
function getDetail(id,start,end,trackname,group){
	var request = createXMLHttpRequest();
	var querry="action=getDetail&tracks="+trackname+"&id="+id+"&start="+start+"&end="+end;
	if(group=='Variant'){querry="action=getDetail&tracks="+trackname+"&id=.&start="+start+"&end="+end;}
	request.onreadystatechange = function(){getDetail_GetReadyStateHandler(request,group,trackname);}
	request.open("GET","servlet/test.do?"+querry,true);
	request.send(null);
}
function getDetail_GetReadyStateHandler(request,group,trackname){
	if (request.readyState == 4&&request.status == 200){
		var XmlNode=request.responseXML;
		
		var div = document.createElement('div');
		div.className='detail';
		var textdiv = document.createElement('div');
		textdiv.className='textdetail';
		var button=document.createElement('input');
		button.type='button';
		button.className='detailbtn';
		//var textdiv=document.createElement('div');
		//textdiv.className='detdiv'
		document.getElementById("cover").style.display = "block";
		document.getElementById("cover").style.background='none';
		
		if(group=='Gene'||group=='Regulation'||trackname=='Repeat Mask'){
			div.id='div'+XmlNode.getElementsByTagName('Es')[0].getElementsByTagName('E')[0].id;
			div.style.top=document.getElementById('div'+XmlNode.getElementsByTagName('Es')[0].id).offsetTop+document.getElementById(XmlNode.getElementsByTagName('Es')[0].getElementsByTagName('E')[0].id).offsetTop+'px';
			div.style.left=document.getElementById(XmlNode.getElementsByTagName('Es')[0].getElementsByTagName('E')[0].id).offsetLeft+(656+innermousemove)-285+document.getElementById(XmlNode.getElementsByTagName('Es')[0].getElementsByTagName('E')[0].id).offsetWidth+'px';
			button.id='detailbtn'+XmlNode.getElementsByTagName('Es')[0].getElementsByTagName('E')[0].id;
			EsDetail(XmlNode,textdiv,group);
			
		}
		else if(group=='Variant'){
			div.id='div'+XmlNode.getElementsByTagName('Vs')[0].getElementsByTagName('V')[0].getElementsByTagName('F')[0].childNodes[0].nodeValue+' '+XmlNode.getElementsByTagName('Vs')[0].getElementsByTagName('V')[0].getElementsByTagName('T')[0].childNodes[0].nodeValue;
			div.style.top=document.getElementById('div'+XmlNode.getElementsByTagName('Vs')[0].id).offsetTop+document.getElementById(XmlNode.getElementsByTagName('Vs')[0].getElementsByTagName('V')[0].getElementsByTagName('F')[0].childNodes[0].nodeValue+' '+XmlNode.getElementsByTagName('Vs')[0].getElementsByTagName('V')[0].getElementsByTagName('T')[0].childNodes[0].nodeValue).offsetTop+'px';
			div.style.left=document.getElementById(XmlNode.getElementsByTagName('Vs')[0].getElementsByTagName('V')[0].getElementsByTagName('F')[0].childNodes[0].nodeValue+' '+XmlNode.getElementsByTagName('Vs')[0].getElementsByTagName('V')[0].getElementsByTagName('T')[0].childNodes[0].nodeValue).offsetLeft+(656+innermousemove)-240+'px';
			button.id='detailbtn'+XmlNode.getElementsByTagName('Vs')[0].getElementsByTagName('V')[0].getElementsByTagName('F')[0].childNodes[0].nodeValue+' '+XmlNode.getElementsByTagName('Vs')[0].getElementsByTagName('V')[0].getElementsByTagName('T')[0].childNodes[0].nodeValue;
			VsDetail(XmlNode,textdiv);
		}
		button.onclick=function(){
			//document.getElementById(this.id.replace('detailbtn','')).active=0;
			document.getElementById('window').removeChild(document.getElementById('div'+this.id.replace('detailbtn','')));
			document.getElementById("cover").style.display = "none";
			document.getElementById("cover").style.backgroundColor='#000';
		}
		
		var text;
		if(group=='Variant'){text='track: Variant'}
		else {text='track: '+XmlNode.getElementsByTagName('Es')[0].id;}
		var li=document.createElement('li');
		li.style.marginTop='3px';
		li.style.marginLeft='5px';
		li.style.fontSize='14px';
		li.style.fontFamily='century';
		addSpan(li,text);
		li.style.height='15px'
		li.style.listStyleType='none';
		
		div.appendChild(li);
		div.appendChild(textdiv);
		div.appendChild(button);
		//div.appendChild(textdiv);
		document.getElementById('window').appendChild(div);
	}
	
}
function addSpan(li,text){
          var span_1=document.createElement("span");
          span_1.innerHTML=text;
          li.appendChild(span_1);
}
function RMDetail(node,div){
	var text;
	var li=[]

	li[0]=document.createElement('li');
	li[0].className='detailli'
	li[0].style.marginTop='3px';
	var n=node.getElementsByTagName('Es')[0].getElementsByTagName('E')[0];
	text='id: '+n.id;
	addSpan(li[0],text);
	
	li[1]=document.createElement('li');
	li[1].className='detailli'
	li[1].style.marginTop='3px';
	var n=node.getElementsByTagName('Es')[0].getElementsByTagName('E')[0];
	text='start: '+n.getElementsByTagName('F')[0].childNodes[0].nodeValue;
	addSpan(li[1],text);
	
	li[2]=document.createElement('li');
	li[2].className='detailli'
	li[2].style.marginTop='3px';
	var n=node.getElementsByTagName('Es')[0].getElementsByTagName('E')[0];
	text='end: '+n.getElementsByTagName('T')[0].childNodes[0].nodeValue;
	addSpan(li[2],text);
	
	for(var i=0;i<li.length;i++)
	{
		div.appendChild(li[i]);
	}
}	  
function EsDetail(node,div,group){
	var text;
	var li=[]

	li[0]=document.createElement('li');
	li[0].className='detailli'
	li[0].style.marginTop='3px';
	var n=node.getElementsByTagName('Es')[0].getElementsByTagName('E')[0];
	text='id: '+n.id;
	if(group=='Gene'){text='Gene Name: '+n.id;}
	addSpan(li[0],text);
	
	li[1]=document.createElement('li');
	li[1].className='detailli'
	li[1].style.marginTop='3px';
	var n=node.getElementsByTagName('Es')[0].getElementsByTagName('E')[0];
	text='Start: '+n.getElementsByTagName('F')[0].childNodes[0].nodeValue;
	addSpan(li[1],text);
	
	li[2]=document.createElement('li');
	li[2].className='detailli'
	li[2].style.marginTop='3px';
	var n=node.getElementsByTagName('Es')[0].getElementsByTagName('E')[0];
	text='End: '+n.getElementsByTagName('T')[0].childNodes[0].nodeValue;
	addSpan(li[2],text);
	
	li[3]=document.createElement('li');
	li[3].className='detailli'
	li[3].style.marginTop='3px';
	var n=node.getElementsByTagName('Es')[0].getElementsByTagName('E')[0];
	text='Strand: '+n.getElementsByTagName('s')[0].childNodes[0].nodeValue;
	addSpan(li[3],text);
	
	var m=n.getElementsByTagName('S');
	for(var i=0;i<m.length;i++){
		li[i+4]=document.createElement('li');
		li[i+4].className='detailli'
		li[i+4].style.marginTop='3px';
		//text=m[i].getElementsByTagName('F')[0].childNodes[0].nodeValue;
		text=m[i].getAttribute('Y')+': '+m[i].getElementsByTagName('F')[0].childNodes[0].nodeValue+'-'+m[i].getElementsByTagName('T')[0].childNodes[0].nodeValue;
		text=text.replace('D','UTR&nbsp&nbsp&nbsp');
		text=text.replace('X','CDS&nbsp&nbsp&nbsp');
		text=text.replace('L','Intron');
		addSpan(li[i+4],text);
	}
	
	for(var i=0;i<li.length;i++)
	{
		div.appendChild(li[i]);
	}
}
function VsDetail(node,div){
	var text;
	text='track: '+node.getElementsByTagName('Vs')[0].id;
	var li=[]
	
	li[0]=document.createElement('li');
	li[0].className='detailli'
	li[0].style.marginTop='3px';
	var n=node.getElementsByTagName('Vs')[0].getElementsByTagName('V')[0];
	text='id: '+n.id;
	addSpan(li[0],text);
	
	li[1]=document.createElement('li');
	li[1].className='detailli'
	li[1].style.marginTop='3px';
	var n=node.getElementsByTagName('Vs')[0].getElementsByTagName('V')[0];
	text='Start: '+n.getElementsByTagName('F')[0].childNodes[0].nodeValue;
	addSpan(li[1],text);
	
	li[2]=document.createElement('li');
	li[2].className='detailli'
	li[2].style.marginTop='3px';
	text='End: '+n.getElementsByTagName('T')[0].childNodes[0].nodeValue;
	addSpan(li[2],text);
	
	li[3]=document.createElement('li');
	li[3].className='detailli'
	li[3].style.marginTop='3px';
	if(n.getElementsByTagName('B').length!=0){
		text='B: '+n.getElementsByTagName('B')[0].childNodes[0].nodeValue;
	}
	else{text='';}
	addSpan(li[3],text);
	
	var b=n.getElementsByTagName('Des')[0].childNodes[0].nodeValue.split(";");
	for(var i=0;i<b.length;i++){
		li[i+4]=document.createElement('li');
		li[i+4].className='detailli'
		li[i+4].style.marginTop='3px';
		//text=m[i].getElementsByTagName('F')[0].childNodes[0].nodeValue;
		text=b[i];
		addSpan(li[i+4],text);
	}
	
	for(var i=0;i<li.length;i++)
	{
		div.appendChild(li[i]);
	}
}
