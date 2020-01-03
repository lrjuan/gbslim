
getGene("A1BG");


function update(chr,start,end){
	querry="action=update&width="+displayarea.getWidth()+"&chr="+chr+"&start="+start+"&end="+end;
	req.onreadystatechange = Update_GetReadyStateHandler;
	req.open("GET","servlet/test.do?"+querry, true);
	req.send(null);	
}
function findGene(genename){
	querry="action=findGene&prefix="+genename;
	req.onreadystatechange = findGene_GetReadyStateHandler();
	req.open("GET","servlet/test.do?"+querry,false);
	req.send(null);	
}
function getGene(genename){
	querry="action=getGene&gene="+genename;
	req.onreadystatechange = getGene_GetReadyStateHandler;
	req.open("GET","servlet/test.do?"+querry,false);
	req.send(null);	
}
function findGene_GetReadyStateHandler() {
	if (req.readyState == 4&&req.status == 200){
		var XmlNode=req.responseXML;
		//alert(XmlNode);
	}
}
function getGene_GetReadyStateHandler() {
	if (req.readyState == 4&&req.status == 200){
		var XmlNode=req.responseXML;
		//alert(XmlNode);
	}
}