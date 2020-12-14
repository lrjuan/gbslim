
var clickflag = false;	
var moveflag = false;
var zflag = false;
var wheelchange=0;   //记录滚轮
var changetimes; //放缩倍数
var winwidth = document.body.clientWidth
var x1;

function zoomchange(){
	var zoomdiv = document.getElementsByClassName('outerdiv'); 
	for(var t=1;t<zoomdiv.length;t++){
	zoomdiv[t].onmouseover = function(e){
	x1=e.clientX;	
	var y1=e.clientY;
	var moveX;	
	winwidth = document.body.clientWidth;	
	var leftwidth=winwidth*0.82-1313;	
	//canvas左侧宽度
	var mWidth = e.clientX - 0.09*winwidth;
	//点击位置：当前位置减去canvas左侧空白	
	document.onkeydown = function(e){
		var key = e.keyCode?e.keyCode:e.which; 
		if(key == 90){
			zflag = true; 
		}	   
	}
	}
	zoomdiv[t].onmousewheel = function(e){
		if(zflag){
			e.preventDefault();
			var changecanvas = document.getElementsByClassName('innerdiv');
			var width = document.getElementsByClassName('innerdiv')[0].offsetWidth;
			var left;
			var mousepoint = e.clientX-0.91*winwidth+1970;
			if(e.wheelDelta){     //IE.Google +-120
				if(e.wheelDelta<0){
					width = width/2;
					wheelchange+=e.wheelDelta;
					left = mousepoint-(width/2);
				}
				if(e.wheelDelta>0){
					width = width*2;
					wheelchange+=e.wheelDelta;
					left = mousepoint-(width/2);
				}
				for(var i=0;i<changecanvas.length;i++){
					var changecas=document.getElementsByClassName('innerdiv')[i];
					var height = changecas.offsetHeight;
					changecas.style.width = width+'px';
					changecas.style.height = height+'px';
					changecas.style.left = left+'px';
					}
			}
		}
	}
	if(zoomdiv[t].addEventListener)//FF,火狐浏览器会识别该方法
    zoomdiv[t].addEventListener('DOMMouseScroll', wheel, false);
	function wheel(e){
		if(zflag){
			e.preventDefault();
			var changecanvas = document.getElementsByClassName('innerdiv');
			var width = document.getElementsByClassName('innerdiv')[0].offsetWidth;
			var left;
			var mousepoint = e.clientX-0.91*winwidth+1970;
			if(e.detail){   //firefox -+30
					if(e.detail>0){
						width = width/2;
						wheelchange+=e.detail;
						left = mousepoint-(width/2);
					}
					if(e.detail<0){
						width = width*2;
						wheelchange+=e.detail;
						left = mousepoint-(width/2);
					}
					for(var i=0;i<changecanvas.length;i++){
						var changecas = document.getElementsByClassName('innerdiv')[i];
						var height = changecas.offsetHeight;
						changecas.style.width = width+'px';
						changecas.style.height = height+'px';
						changecas.style.left = left+'px';
						}
					wheelchange=(-wheelchange)*40;
				}
			}
		}
	
	document.onkeyup = function(e){
		var key = e.keyCode?e.keyCode:e.which;
		if(key ==90){
			zflag = false;
			var changecanvas = document.getElementsByClassName('innerdiv');
			for(var i=0;i<changecanvas.length;i++){
					var changecas=document.getElementsByClassName('innerdiv')[i];
					var height = changecas.height;
					changecas.style.height = "";
					changecas.style.width = "";
					changecas.style.left = "";
					}
					
			if(wheelchange<0){
				changetimes = 1/(-wheelchange/60);
			}
			else if(wheelchange == 0){
				changetimes = 1;
				}
			else if(wheelchange>0){
				changetimes = wheelchange/60;
			}
			var start=displayarea.getStart(); 
			var end=displayarea.getEnd();
			var long=displayarea.getEnd()-displayarea.getStart();
			var midpoint;  //当前位置，以当前位置为中点缩放
			midpoint = start+long*((x1-0.91*winwidth+1313+(1313/2))/2626);
			long = parseInt(long*changetimes);
			start = Math.round(midpoint)-(long*((x1-0.91*winwidth+1313+(1313/2))/2626));
			if(start<=0){start=1;}
			end = start+long;
		    update(displayarea.getChr(),parseInt(start),parseInt(end));
			wheelchange=0;
		}
	}
}

var changediv = document.getElementsByClassName('whxdiv');
for(var k=1;k<changediv.length;k++){
	changediv[k].onmouseover = function(e){
	var leftwidth=winwidth*0.82-1313;	
	//canvas左侧宽度
	var mWidth = e.clientX - 0.09*winwidth;
	//点击位置：当前位置减去canvas左侧空白	
	if(mWidth>=0&&mWidth<=leftwidth){
		$('#window').sortable().bind('sortupdate',function(){
		});
		}
		else if(mWidth>leftwidth){
				$('#window').sortable('disable')({
					});

			}
	}
}
}

var treedataset = {
  "name":"Fabids",
  "children":
  [
    {
      "name":"Celastrales" ,
      "children":
      [
	    {
		  "name":"Celastraceae" ,
          "children":
		  [
		    {"name":"Tripterygium wilfordii"}
		  ]
		}
      ]
    },

    {
      "name":"Rosales" ,
      "children":
      [
        {
          "name":"Rosaceae",
          "children":
          [
			{"name":"Eriobotrya japonica"},
			{"name":"Malus baccata"},
			{"name":"Fragaria nilgerrensis"},
			{"name":"Prunus dulcis"},
			{"name":"Pyrus communis"},
			{"name":"Pyrus betulifolia"},
			{"name":"Cerasus serrulata"}
          ]
        },
        {
		  "name":"Moraceae",
		  "children":
		  [
		    {"name":"Morus notabilis"},
		  ]
		},
        {
		  "name":"Cannabaceae",
		  "children":
		  [
		    {"name":"Cannabis sativa"},
            {"name":"Humulus lupulus"},
            {"name":"Parasponia andersonii"},
            {"name":"Trema orientalis"}
		  ]
		},
        {
		  "name":"Rhamnaceae",
		  "children":
		  [
		    {"name":"Ziziphus jujuba"}
		  ]
		},
		{
		  "name":"Urticaceae",
		  "children":
		  [
		    {"name":"Boehmeria nivea"}
		  ]
		}
      ]
    },

    {
      "name":"Malpighiales",
      "children":
      [
        {
		  "name":"Podostemaceae",
		  "children":
		  [
		    {"name":"Cladopus chinensis"}
		  ]
		},
        {
		  "name":"Rhizophoraceae",
		  "children":
		  [
		    {"name":"Kandelia obovata"},
			{"name":"Rhizophora apiculata"}
		  ]
		},
        {
		  "name":"Salicaceae",
		  "children":
		  [
			{"name":"Populus alba"},
			{"name":"Populus euphratica"},
			{"name":"Salix brachista"},
			{"name":"Salix viminalis"},
			{"name":"Populus tremuloides"},
		    {"name":"Populus tremula"},
		    {"name":"Pbolleana"},
		    {"name":"Pdeltoides"},
		    {"name":"Ppruinosa"},
		    {"name":"Psimonii"},
		    {"name":"Spurpurea"}
		  ]
		},
		{
		  "name":"Euphorbiaceae",
		  "children":
		  [
		   {"name":"Hevea brasiliensis"},
		   {"name":"Jatropha curcas"},
		   {"name":"Manihot esculenta"},
		   {"name":"Mercurialis annua"},
		   {"name":"Ricinus communis"}
		  ]
		}
      ]
    }
  ]
}

const NODE_CLASS = "node";
const LEAF_CLASS = "leaf";

var width = 800,
    height = 730;
var cluster = d3.layout.cluster()
    .size([height-20,width-200]);
	
var diagonal = d3.svg.diagonal()
    .projection(function(d){return [d.y, d.x];}); //投影projection转换点位置，默认返回[d.x,d.y]
	
var svg = d3.select("#plantgenomes").append("svg")
	.attr("width",width)
	.attr("height",height)
	.attr("id",'planttreesvg')
	.append("g")
	.attr("transform","translate(50,10)");	

var nodes = cluster.nodes(treedataset);//计算簇布局并返回与根节点相关联的节点数组
var links = cluster.links(nodes);//返回：源-父节点和目标-子节点

console.log(nodes);
console.log(links);
	
var node = svg.selectAll(".node")
	.data(nodes)
	.enter()
	.append("g")
	//.attr("class", "node")
	.attr("class", function(d) { return d.children ? NODE_CLASS : LEAF_CLASS; })
	.attr("id",function(d) { return d.name; })
	.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
	.on('mousedown', function() {
		treetrack(this.id.replace(' ','_')+'_seq');
		treetrack(this.id.replace(' ','_'));
	})
	//.on('mouseover', function() {this.style.color='#000';})
	$(".leaf").mouseover(function(){
			$(this).css("fill","red")
		})
	$(".leaf").mouseout(function(){
		$(this).css("fill","green")
	})
	//给点加圈圈
node.append("circle")
	.attr("r", 4.5);
	
	node.append("text")
	.attr("dx", function(d) { return d.children ? 18 : 8; })
	.attr("dy", function(d) { return d.children ? -8 : 3; })
	.style("text-anchor", function(d) { return d.children ? "end" : "start"; })
	.text(function(d) { return d.name; });
	
	var link = svg.selectAll(".link")
	.data(links)
	.enter()
	.append("path")
	.attr("class","link")
	.attr("d",diagonal);

