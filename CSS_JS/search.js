// JavaScript Documentwindow.onload=function(){
var divloading=document.createElement('div');
divloading.className='fgeneonmouse';
divloading.id='ggloading';
divloading.style.left=document.getElementById('searchdiv').offsetLeft+262+'px';
divloading.style.display='none';
document.getElementById('searchdiv').appendChild(divloading);

var divloading1=document.createElement('div');
divloading1.className='ggloading';
divloading.appendChild(divloading1);
//var text='loading';
//var temp=document.createElement('li');
//temp.className='ggenedivcss'
//addSpan(temp,text);
//divloading.appendChild(temp);
	
	
var searchtxt=document.getElementById("search");
searchtxt.oninput=function(){
	var input=searchtxt.value;
	var fgbtn=document.getElementById("searchmenu");
	while(fgbtn.lastChild) //当elem下还存在子节点时 循环继续
    {
        fgbtn.removeChild(fgbtn.lastChild);
    }
				
	if(input!=''){findGene(input);}
	else{document.getElementById('searchmenu').style.display = 'none';document.getElementById('ggloading').style.display='none';document.getElementById("cover2").style.display = "none";}
}
function findGene(value){
	var req = createXMLHttpRequest();
	var querry="action=findGene&prefix="+value;
	req.onreadystatechange = function(){fgene(req);};
	req.open("GET","servlet/test.do?"+querry,true);
	req.send(null);	
}
function fgene(request){
	if (request.readyState == 4&&request.status == 200){
		var XmlNode=request.responseXML;
		var txt=XmlNode.getElementsByTagName('Gene');
		if(txt.length!=0){
			document.getElementById('searchmenu').style.display = 'block';
			var i=0;
			while(i<txt.length){
				var a = document.createElement('button');
				//a.innerHTML=txt[i].id;
				a.id='fgene'+txt[i].id;
				a.style.fontFamily='Century';
				a.style.cursor='pointer';
				a.className='fgenebutton';
				var li=document.createElement('li');
				li.style.marginTop='3px';
				li.style.marginLeft='5px';
				li.style.fontSize='14px';
				li.style.fontFamily='century';
				li.style.height='15px'
				li.style.listStyleType='none';
				addSpan(li,txt[i].id);
				var li1=document.createElement('li');
				li1.style.marginTop='3px';
				li1.style.marginLeft='5px';
				li1.style.fontSize='10px';
				li1.style.fontFamily='century';
				li1.style.height='15px'
				li1.style.listStyleType='none';
				var text=txt[i].getElementsByTagName('Chromosome')[0].childNodes[0].nodeValue+':'+txt[i].getElementsByTagName('F')[0].childNodes[0].nodeValue+'-'+txt[i].getElementsByTagName('T')[0].childNodes[0].nodeValue;
				addSpan(li1,text);
				a.onclick=function(){
					fgenebtn(this.id);
				}
				var gg=document.createElement('div');
				gg.className='fgeneonmouse';
				gg.id='fgo'+txt[i].id;
				gg.style.left=document.getElementById('searchdiv').offsetLeft+262+'px';
				document.getElementById('searchdiv').appendChild(gg);
				ggenediv(txt[i].id);
				a.onmouseover=function(){
					document.getElementById('fgo'+this.id.replace('fgene','')).style.display='block';
				}
				a.onmouseout=function(){
					document.getElementById('fgo'+this.id.replace('fgene','')).style.display = 'none';
				}
				a.appendChild(li);
				a.appendChild(li1);
				document.getElementById('searchmenu').appendChild(a);
				i++;
			}			
		}
		else{
			
			document.getElementById('searchmenu').style.display = 'none';
		}
	}
}
document.getElementById('searchmenu').style.display
function fgenebtn(txt){
	txt=txt.replace("fgene","")
	searchtxt.value=txt;
	
	var req = createXMLHttpRequest();
	var querry="action=getGene&gene="+txt;
	req.onreadystatechange = function(){ggene(req);};
	req.open("GET","servlet/test.do?"+querry,true);
	req.send(null);	
}

function ggene(request){
	if (request.readyState == 4&&request.status == 200){
		var XmlNode=request.responseXML;
		var start=XmlNode.getElementsByTagName('F')[0].childNodes[0].nodeValue;
		var end=XmlNode.getElementsByTagName('T')[0].childNodes[0].nodeValue;
		var chr=XmlNode.getElementsByTagName('Chromosome')[0].childNodes[0].nodeValue;
		var long=Math.round(end)-Math.round(start);
		start=Math.round(start)-long*2;
		if(start<0){start=0;}
		end=Math.round(end)+Math.round(long*2);
		if(Math.round(chrLength.get(chr))<end){end=chrLength.get(chr)}
		document.getElementById('searchmenu').style.display='none';
		update(chr,start,end);
	}
}

var handleScroll12 = function(){
			innermousemove=-656.5;
			var value=document.getElementById('search').value;
			if (value==''){alert('Please enter.');}
			else{
				if(value.indexOf(':')=='-1'&&value.indexOf('-')!='-1'){
					var a=value.split('-');
					var start=Math.round(a[0]);
					var end=Math.round(a[1]);	
					var width=end-start;
					if(start<width/2){
						start=start-width/2;
						end=end+width/2;
						innermousemove-=(start/(width/2))*656.5
					}
					else if(end>(chrLength.get(displayarea.getChr())-width/2)){
						start=start-width/2;
						end=end+width/2;
						innermousemove+=((end-chrLength.get(displayarea.getChr()))/(wdith/2))*(-656.5)
					}
					else{
						start=start-width/2;
						end=end+width/2;
					}	
					start=Math.round(start);
					end=Math.round(end);
					if(start<0){start=0;end=Math.round(start+width*2);}
					if(end>=chrLength.get(displayarea.getChr())){end=chrLength.get(displayarea.getChr());start=Math.round(end-width*2);}
					var r = /^\+?[0-9][0-9]*$/;
					if(r.test(start)&&r.test(end)&&(parseInt(start)<parseInt(end))&&((parseInt(end)-parseInt(start)+1)<chrLength.get(displayarea.getChr()))){
						update(displayarea.getChr(),parseInt(start),parseInt(end));			
						}
					else{alert('Incorrect input format.');}
					}
				
				else if(value.indexOf(':')=='-1'||value.indexOf('-')=='-1'|| value.indexOf(':')>value.indexOf('-')){alert('Incorrect input format.')}
				else{
					var a=value.split(':');
					chr=a[0];
					var b=a[1].split('-');
					var start=Math.round(b[0]);
					var end=Math.round(b[1]);	
					var width=end-start+1;
					if(start<width/2){
						start=start-width/2;
						end=end+width/2;
						innermousemove-=(start/(width/2))*656.5
					}
					else if(end>(chrLength.get(displayarea.getChr())-width/2)){
						start=start-width/2;
						end=end+width/2;
						innermousemove+=((end-chrLength.get(displayarea.getChr()))/(wdith/2))*(-656.5)
					}
					else{
						start=start-width/2;
						end=end+width/2;
					}	
					start=Math.round(start);
					end=Math.round(end);
					if(start<0){start=0;end=Math.round(start+width*2);}
					if(end>=chrLength.get(chr)){end=chrLength.get(chr);start=Math.round(end-width*2);}
					var keySet = chrLength.keySet();
					var r = /^\+?[0-9][0-9]*$/;
					if(r.test(start)&&r.test(parseInt(end))&&chrLength.containsKey(chr)&&(parseInt(start)<parseInt(end))&&((parseInt(end)-parseInt(start)+1)<chrLength.get(chr)))
					{
						update(chr,parseInt(start),parseInt(end));	
					}
					else{alert('Incorrect input format.');}
					}	
				}
			
			//displayarea.setChr(chr);
			//var start=;
			//var end=;
}
buttonsearch.addEventListener("click",handleScroll12);

function ggenediv(id){
	var req = createXMLHttpRequest();
	var querry="action=getGene&gene="+id;
	req.onreadystatechange = function(){ggenediv_handle(req);};
	req.open("GET","servlet/test.do?"+querry,false);
	req.send(null);	
	
}
function addSpan(li,text){
          var span_1=document.createElement("span");
              span_1.innerHTML=text;
              li.appendChild(span_1);
          }
function ggenediv_handle(request){
	if (request.readyState == 4&&request.status == 200){
		document.getElementById('ggloading').style.display='none';
		document.getElementById("cover2").style.display = "none";
		var XmlNode=request.responseXML;
		XmlNode=XmlNode.getElementsByTagName('Gene')[0];
		var div=document.getElementById('fgo'+XmlNode.id);
		
		//var lii=[];
		if(div.getElementsByTagName('li').length==0){
				var text;
				text='Chromosome: '+XmlNode.getElementsByTagName('Chromosome')[0].childNodes[0].nodeValue;
				var temp=document.createElement('li');
				temp.className='ggenedivcss'
				addSpan(temp,text);
				div.appendChild(temp);
				
				text='start: '+XmlNode.getElementsByTagName('F')[0].childNodes[0].nodeValue;
				var temp=document.createElement('li');
				temp.className='ggenedivcss'
				addSpan(temp,text);
				div.appendChild(temp);
				text='end: '+XmlNode.getElementsByTagName('T')[0].childNodes[0].nodeValue;
				var temp=document.createElement('li');
				temp.className='ggenedivcss'
				addSpan(temp,text);
				div.appendChild(temp);
				
				if(XmlNode.getElementsByTagName('TAIR_ID').length!=0){
					text='TAIR_ID: '+XmlNode.getElementsByTagName('TAIR_ID')[0].childNodes[0].nodeValue;
					var temp=document.createElement('li');
					temp.className='ggenedivcss'
					addSpan(temp,text);
					div.appendChild(temp);
				}

				if(XmlNode.getElementsByTagName('TAIR_NAME').length!=0){
					text='TAIR_NAME: '+XmlNode.getElementsByTagName('TAIR_NAME')[0].childNodes[0].nodeValue;
					var temp=document.createElement('li');
					temp.className='ggenedivcss'
					//temp.style.height='30px';
					addSpan(temp,text);
					div.appendChild(temp);
				}
				if(XmlNode.getElementsByTagName('TranscriptID').length!=0){
					text='TranscriptID: '+XmlNode.getElementsByTagName('TranscriptID')[0].childNodes[0].nodeValue;
					var temp=document.createElement('li');
					temp.className='ggenedivcss'
					addSpan(temp,text);
					div.appendChild(temp);
				}
				if(XmlNode.getElementsByTagName('Strand').length!=0){
					text='Strand: '+XmlNode.getElementsByTagName('Strand')[0].childNodes[0].nodeValue;
					var temp=document.createElement('li');
					temp.className='ggenedivcss'
					addSpan(temp,text);
					//div.appendChild(temp);
				}
				if(XmlNode.getElementsByTagName('defLine').length!=0){
					text='defLine: '+XmlNode.getElementsByTagName('defLine')[0].childNodes[0].nodeValue;
					var temp=document.createElement('li');
					temp.className='ggenedivcss'
					addSpan(temp,text);
					div.appendChild(temp);
				}
				

		}
		
		
	}
	else{
		if(document.getElementById('ggloading').style.display=='none'){
		document.getElementById('ggloading').style.display='block';
		document.getElementById("cover2").style.display = "block";
		}
	}
}