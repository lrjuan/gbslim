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

//querry="action=update&width="+displayarea.getWidth()+"&chr=chr22&start="+21000000+"&end="+21500000;
//querry="action=update&width="+displayarea.getWidth()+"&chr=chr22&start="+displayarea.getStart()+"&end="+displayarea.getEnd();
//req.onreadystatechange = Update_GetReadyStateHandler;
//req.open("GET","servlet/test.do?"+querry,false);
//req.send(null);

//alert(tempXML.getElementsByTagName('Sequence')[0].childNodes[0].nodeValue);
function displayArea(){
	var obj = new Object();
  	obj.chr='Chr01';
  	obj.start=10000000;
  	obj.end=20000000;
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
   var request = annotations.get(group).get(track).getRequest();
   querry="action=addTracks&tracks="+track+"&modes="+mode;
   request.onreadystatechange =function(){getTracks(request,track,track_div,mode,group);};
   request.open("GET","servlet/test.do?"+querry,true);
   request.send(null);
}
function getTracks(request,track,track_div,mode,group){
   if (request.readyState == 4&&request.status == 200) {
      var a = request.responseXML;
      var ditem = displayitem(track,track_div,a,mode,group);
      displayItems.put(track,ditem);
	  //alert(group);
	  
	  if(group=='Gene'){draweletrack(track,mode,group);}
	  else if(group=='Variant'){drawvartrack(track,mode,group);}
	  else if(group.substring(0,6)=='RNASeq'){drawvaltrack(track,mode,group);}
	  else if(group=='Regulation'){draweletrack(track,mode,group);}
	  
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
   request.onreadystatechange =function(){getTracks(request,track,track_div);};
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
window.onresize = function(){
	displayarea.setWidth(document.body.clientWidth);
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