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

//var req = createXMLHttpRequest();
function update(){
	
	var querry="action="+"getAnnotations";
	req.onreadystatechange = getReadyStateHandler;
	req.open("GET","servlet/test.do?"+querry,true);

	req.send(null);
}			
function getReadyStateHandler() {
	if (req.readyState == 4){
		//annoations=req.responseText;
		//document.getElementById("window2").innerHTML="<xmp>"+annoations+"</xmp>";
		if (req.status == 200){
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
		document.getElementById("divv").innerHTML="<xmp>"+divvText+"</xmp>";
					
	} 
	else {
		document.getElementById("divv").innerHTML=req.responseText;
		}
	}
}
