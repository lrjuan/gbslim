// 
var annotations = new HashMap();
var externals = new HashMap(); 
var displayItems = new HashMap();
//div ID ='displayItems'+displayItems.keySet()[i];
var displayarea=new displayArea();
var tempXML;

var req = createXMLHttpRequest();
var querry="action="+"getAnnotations";
req.onreadystatechange = Annotations_GetReadyStateHandler;
req.open("GET","servlet/test.do?"+querry,false);
req.send(null);

req.onreadystatechange = Externals_GetReadyStateHandler;
req.open("GET","servlet/test.do?"+"action=getExternals",false);
req.send(null);

querry="action=update&width="+displayarea.getWidth()+"&chr="+displayarea.getChr()+"&start="+displayarea.getStart()+"&end="+displayarea.getEnd();
req.onreadystatechange = Update_GetReadyStateHandler;
req.open("GET","servlet/test.do?"+querry,false);
req.send(null);
//alert(tempXML.getElementsByTagName('Sequence')[0].childNodes[0].nodeValue);
//init();
function displayArea(){
	var obj = new Object();
  	obj.chr='chrM';
  	obj.start=1;
  	obj.end=500;
	obj.width=document.body.clientWidth;
	//查询
 	obj.getChr = function(){
    return obj.chr;
  	}
	obj.getStart = function(){
    return obj.start;
  	}
	obj.getEnd = function(){
    return obj.end;
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
		var temp=XmlNode.getElementsByTagName('Start')[0].childNodes[0].nodeValue;
		displayarea.setStart(temp);
		temp=XmlNode.getElementsByTagName('End')[0].childNodes[0].nodeValue;
		displayarea.setEnd(temp);
		temp=XmlNode.getElementsByTagName('Chromosome')[0].childNodes[0].nodeValue;
		displayarea.setChr(temp);
		//alert(displayarea.getChr()+displayarea.getStart()+displayarea.getEnd());
		//temp=XmlNode.getElementsByTagName('E')[0].getElementsByTagName('T')[0].childNodes[0].nodeValue;
		//alert(temp);
		//var str=XmlNode.getElementsByTagName('Sequence')[0].childNodes[0].nodeValue;
		tempXML=XmlNode;
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
function refresh(){
	var str='Annotations:\n';
    var keySet = annotations.keySet();
    for(var i in keySet){ 
        str+=keySet[i]+":\n";
		var temp=annotations.get(keySet[i]); 
		var	tempkey = temp.keySet();
		for(var j in tempkey)
		{
			str+='    '+temp.get(tempkey[j]).getName()+':'+temp.get(tempkey[j]).getMode()+':'+temp.get(tempkey[j]).getType()+'\n';
		}
    }
	str+='\n\nExternals:\n';
	var keySet = externals.keySet();
    for(var i in keySet){ 
        str+=keySet[i]+":\n";
		var temp=externals.get(keySet[i]); 
		var	tempkey = temp.keySet();
		for(var j in tempkey)
		{
			str+='    '+temp.get(tempkey[j]).getName()+':'+temp.get(tempkey[j]).getMode()+':'+temp.get(tempkey[j]).getType()+'\n';
		}
    }
	
	alert(str);
}
function init(){
	var dpitem=new displayitem();
	dpitem.setName('OMIM');
	displayItems.put('OMIM',dpitem); 
	//alert(displayItems.get('OMIM').getMode());
	dpitem.createXML();
	update_displayItems();
	//alert(dpitem.XMLnode.getElementsByTagName('Sequence')[0].childNodes[0].nodeValue);
}
/*
function displayitem(){
	var name;
	var XMLnode;
	this .setName = function (name){
		this.name=name;
	}
	this .getName = function (){		
		return this.name;
	}
	this .createXML=function(){
		var querry="action=update&width="+width+"&chr="+chr+"&start="+start+"&end="+end;
		req.onreadystatechange =Update_GetReadyStateHandler;
		req.open("GET","servlet/test.do?"+querry,false);
		req.send(null);
		this.XMLnode=tempXML;
		tempXML=null;
	}
}

function update_displayItems(){
	var keySet = displayItems.keySet();
	var win=document.getElementById("window");
    for(var i in keySet){ 
		var div = document.createElement('div');
		div.id='displayItems'+keySet[i];
		div.innerHTML=keySet[i];
		//div.style.border='1px solid #000';
		div.className='displayItemsDiv';
		win.appendChild(div);
	}
}
*/
window.onresize = function(){
	displayarea.setWidth(document.body.clientWidth);
}





function add(){
	addExternals('BBB','http://localhost:8080/pgbdata/AAAA.hg19.sorted.gdf.gz','VCF');
}

function remove(){
	if(externals.size()==0){
		alert('externals为空');
	}
	else{
		var keySet= externals.get("User").keySet(); 
		for(var i in keySet){
		//alert(externals.get("User").get(keySet[i]).getName());
			removeExternals(externals.get('User').get(keySet[i]).getName());
		}
		externals.clear();
		alert('删除成功');
	}
	
	
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