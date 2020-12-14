// JavaScript Document
var flag = true;
var blasttype='blastn';
document.getElementById('button'+blasttype).style.borderColor='#309F7E';
document.getElementById('button'+blasttype).style.color='#309F7E';
var btnblast=document.getElementsByClassName('blastselect');
for(var i=0;i<btnblast.length;i++){
	btnblast[i].onclick=function(){
		if(this.value!=blasttype){
			this.style.borderColor='#309F7E';
			this.style.color='#309F7E';
			document.getElementById('button'+blasttype).style.color='';	
			document.getElementById('button'+blasttype).style.border='1px solid #B2B2B2';
			blasttype=this.value;
		}
	}
	btnblast[i].onmouseover=function(){
		if(this.value!=blasttype){
			this.style.borderColor='#309F7E';
			this.style.color='#309F7E';
		}
	}
	btnblast[i].onmouseout=function(){
		if(this.value!=blasttype){
			this.style.borderColor='';
			this.style.color='';
		}
	}
}
//loading界面

//blast

function createXMLHttpRequest() {
	var xmlHttp = false;
	if (window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
		} 
	else if (window.ActiveXObject) {
		try{
			xmlHttp = new ActiveXObject("Msxm12.XMLHTTP");
		}
		catch(e1){
			try{
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch(e2){}
		}
	}
	return xmlHttp;
}
document.getElementById('btnblast').onclick=function(){
	var req = createXMLHttpRequest();
	if(blasttype=='blastn'){
		var db=document.getElementById('databaseselect').value;
		var seq=document.getElementById('seqsearch').value;
		var seqfrom=document.getElementById('seqsearchfrom').value;
		var seqto=document.getElementById('seqsearchto').value;
		var seqfromto=true;
		if(seqfrom!=''&&seqto!=''){
			if(/^\d+$/.test(seqfrom)&&/^\d+$/.test(seqto)){
				var start=parseInt(seqfrom);
				var end=parseInt(seqto);
				if(start>=0&&end<=seq.length-1&&start<end){
					seq=seq.substring(start,end+1);
				}
				else{
					alert("Incorrect input in Query subrange.");
					seqfromto=false;
				}
			}
			else{
				alert("Incorrect input in Query subrange.");
				seqfromto=false;
			}
		}

		var querry="action="+blasttype+"&seq="+seq+"&database="+db+"&args=";
		querry=querry+'task '+document.getElementById('programselect').value;
		var maxtarget=document.getElementById('maxtarget').value;
		if(maxtarget!='default'){querry=querry+',max_target_seqs '+maxtarget;}
			
		var evalue=document.getElementById('evalue').value;
		querry=querry+',evalue '+evalue;
			
		var wordsize=document.getElementById('wordsize').value;
		if(wordsize!='default'){querry=querry+',word_size '+wordsize;}
			
			//var maxmatch=document.getElementById('maxmatch').value;
		var matchscores=document.getElementById('matchscores').value;
		if(matchscores!='default'){
			var a=matchscores.split(',');
			querry=querry+',reward '+a[0];
			querry=querry+',penalty '+a[1];
		}	
		var gapcost=document.getElementById('gapcost').value;
		if(gapcost!='linear'){
			var b=gapcost.split(',');
			querry=querry+',gapopen '+b[0];
			querry=querry+',gapextend '+b[1];
		}
	}
	if(seqfromto){
		req.onreadystatechange =function(){Blast_GetReadyStateHandler(req);}
		req.open("GET","servlet/test.do?"+querry,true);	
	}
	req.send(null);
}
function Blast_GetReadyStateHandler(req){
	if (req.readyState == 4&&req.status == 200){
		document.getElementById('cover').style.display="none";
		document.getElementById('uploading').style.display='none';
		
		var pattern = /></g;
		var pattern1 = /<\//;
		var pattern2 = />/;
		var pattern3 = /<.*?>/;
		var pattern4 = /<.*?\/>/;
		var pattern5 = /<\/.*?>/;
		var pattern6 = /<.*?>.*<\/.*?>/;
						
		var divvText=req.responseText.replace(pattern, ">\n<");
		var divvTexts=divvText.split("\n");
		var tabtemp=0;
		for(var divvidx=0;divvidx<divvTexts.length;divvidx++){
				if(pattern6.test(divvTexts[divvidx])){
					for(var tabnum=0;tabnum<tabtemp;tabnum++){
						divvTexts[divvidx]="\t"+divvTexts[divvidx];	
					}		
					divvTexts[divvidx]=divvTexts[divvidx].replace(pattern1, "\t<\/");
					divvTexts[divvidx]=divvTexts[divvidx].replace(pattern2, ">\t");
				} 
				else if(pattern4.test(divvTexts[divvidx])){
					for(var tabnum=0;tabnum<tabtemp;tabnum++){
						divvTexts[divvidx]="\t"+divvTexts[divvidx];	
					}		
				}
				else if(pattern5.test(divvTexts[divvidx])){
					tabtemp=tabtemp-1;
					for(var tabnum=0;tabnum<tabtemp;tabnum++){
						divvTexts[divvidx]="\t"+divvTexts[divvidx];	
					}		
				} 
				else if(pattern3.test(divvTexts[divvidx])){
					for(var tabnum=0;tabnum<tabtemp;tabnum++){
						divvTexts[divvidx]="\t"+divvTexts[divvidx];	
					}		
					tabtemp=tabtemp+1;
				}		
		}
		divvText=divvTexts.join("\n");	
		
		var text=divvText.replace("<DataExchange>","");
		text=text.replace("<blast>","");
		text=text.replace("</blast>","");
		text=text.replace("</DataExchange>","");
		document.getElementById("result").style.display='block';
		//document.getElementById("cover1").style.display='block';
		document.getElementById("resulttext").scrollTop=0;
		document.getElementById("resulttext").innerHTML="<xmp>"+text+"</xmp>";
		//document.getElementById('result').innerHTML=text;
	}
	else{
		document.getElementById('cover').style.display="block";
		document.getElementById('uploading').style.display="block";
	}
}

//document.getElementById('resultdelete').onclick=function(){
//	document.getElementById("resulttext").innerHTML="";
//	document.getElementById("result").style.display='none';
//	document.getElementById("cover1").style.display='none';
//}

document.getElementById('seqclear').onclick=function(){
	document.getElementById('seqsearch').value="";
}
/*
document.getElementById('algorithmparameters').onclick=function(){
	if(document.getElementById('parameters').style.display=='none'){
		document.getElementById('parameters').style.display="block";
	}
	else{
		document.getElementById('parameters').style.display="none";
	}
}*/