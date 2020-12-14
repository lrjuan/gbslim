var innermousedown=0;
var innermousestart=0;
function innermove(id){
	var div=document.getElementById(id);
	div.onmousedown=function(){
		innermousedown=1;
		var evt = evt || window.event;
		innermousestart=mousePosition(evt).x;
	}
}
document.onmousemove=function(){
	if(innermousedown==1){
		var evt = evt || window.event;
		var position=mousePosition(evt).x;
		var move=position-innermousestart;
		var a=document.getElementsByClassName('innerdiv');
		
		for(var i=0;i<a.length;i++){
			var temp=move+innermousemove;
			a[i].style.marginLeft=temp+'px';
		}
		
		var scroll1 = document.getElementById("scroll1");
		var width = scroll1.clientWidth||scroll1.offsetWidth;
		var bar1 = document.getElementById('bar1');
		var temp=(displayarea.getEnd()-displayarea.getStart()+1)/4+displayarea.getStart()-1;
		var a=(temp)/Math.round(chrLength.get(displayarea.getChr()));
		var left=width*a-(innermousemove+move+656.5)/1313*bar1.offsetWidth;
		if(left<0){left=0;}
		if(left>(scroll1.offsetWidth-bar1.offsetWidth)){left=scroll1.offsetWidth-bar1.offsetWidth;}
		bar1.style.left=left+'px';
	}
}
document.onmouseup=function(){
	if(innermousedown==1){
		var evt = evt || window.event;
		var position=mousePosition(evt).x;
		var move=position-innermousestart;
		
		var start=displayarea.getStart();
		var end=displayarea.getEnd();
		var length=displayarea.getEnd()-displayarea.getStart()+1;
		var temp=Math.round(length*move/2626);
		start-=temp;
		end-=temp;

		innermousedown=0;
		innermousestart=0;
		//innermousemove=0;
		if(start>=1 && end<chrLength.get(displayarea.getChr())){
			if(innermousemove>= -656.5){
				var tem=innermousemove/(-2626);
				tem+=start/length;
				if(tem<0.25){
					start=1;
					end=length;
					innermousemove=tem*(-2626);
				}
				else{
					start-=(0.25-innermousemove/(-2626))*length;
					end-=(0.25-innermousemove/(-2626))*length;
					if(start<1){
						start=1;
						end=length;
					}
					innermousemove=-656.5;
				}
			}
			else if(innermousemove< -656.5){
				var tem=innermousemove/(-2626);
				tem+=(end-chrLength.get(displayarea.getChr()))/length;
				if(tem>0.25){
					end=chrLength.get(displayarea.getChr())-1;
					start=end-length;
					innermousemove=tem*(-2626);
				}
				else{
					start+=(innermousemove/(-2626)-0.25)*length;
					end+=(innermousemove/(-2626)-0.25)*length;
					if(end>chrLength.get(displayarea.getChr())){
						end=chrLength.get(displayarea.getChr());
						start=end-length+1;
					}
					innermousemove=-656.5;
				}
			}
			update(displayarea.getChr(),Math.round(start),Math.round(end));
		}
		else if(start<1){
			innermousemove=innermousemove-(start)/length*2626;
			if(innermousemove>0){innermousemove=0;}
			update(displayarea.getChr(),1,length);
		}
		else if(end>chrLength.get(displayarea.getChr())){
			innermousemove=innermousemove-(end-chrLength.get(displayarea.getChr()))/length*2626;
			end=chrLength.get(displayarea.getChr());
			if(innermousemove<-1313){innermousemove=-1315;}
			update(displayarea.getChr(),end-length,end);
		}
	}
}

function buttoncheck(button,start){
	if(button.startpo>=start){
		if(button.startpo<start+1313){
			//button.style.width=button.endpo-button.startpo+'px';
			if(button.endpo>start+1313){
				button.style.marginLeft=button.startpo+'px';
				button.style.width=1313-(button.startpo-start)+'px';
				button.style.display='block';
			}
			else{
				button.style.marginLeft=button.startpo+'px';
				button.style.width=button.endpo-button.startpo+'px';
				button.style.display='block';
			}
		}
		else{button.style.display='none';}
	}
	else{
		if(button.endpo<start){
			button.style.display='none';	
		}
		else if(button.endpo>start+1313){
			button.style.marginLeft=start+'px';
			button.style.width='1313px';
			button.style.display='block';
		}
		else{
			button.style.marginLeft=start+'px';
			button.style.width=button.endpo-button.startpo+1-(start-button.startpo)+'px';
			button.style.display='block';
		}
	}
}	
