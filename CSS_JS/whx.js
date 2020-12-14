/**
 * Created by Administrator on 2019/12/26.
 */
$(function(){

    $("#div").click(function(){
        $("#box").css("display","block");
        $("#cover").css("display","block");
    });

    var keySet = annotations.keySet();
    $("#choice1").html("");

    //annotations的track管理
    for(var i in keySet){
        var groups = $('<div></div>');
        groups.html(keySet[i]);
        groups.attr("class","option1");
        groups.attr("active",0);
        groups.attr("id",keySet[i]);

        $("#choice1").append(groups);

        var tracks = $('<div></div>');
        tracks.attr("class","option2");
        tracks.attr("id","group"+keySet[i]);


        var trackTile = $('<div></div>');
        trackTile.attr("class","option3");
        trackTile.html(keySet[i]);
        tracks.append(trackTile);

        var trackKeys = annotations.get(keySet[i]).keySet();
        for(var j in trackKeys){
            var a = $('<div></div>');

            a.attr('class','label');
            var b = $('<div></div>');
            b.attr('class','slabel');
            b.attr('exist',0)
            b.attr('id',trackKeys[j]);
            b.html(trackKeys[j]);

            var c = $('<select></select>');
            c.append("<option value='hide'>hide</option>");
            c.append("<option value='pack'>pack</option>");
            c.append("<option value='dense'>dense</option>");
            c.attr('class','mlabel');
            var mode=annotations.get(keySet[i]).get(trackKeys[j]).getMode();
            c.change(function(){
                /*alert($(this).parent().children("div").attr("id"))
                alert($(this).val())
                alert($(this).parent().parent().attr('id'))*/
                var mode_val = $(this).val();
                var group_id=$(this).parent().parent().attr('id').replace("group","");
                var track_id = $(this).parent().children("div").attr("id");
                annotations.get(group_id).get(track_id).setMode(mode_val);

                //功能是当模式改成hide时，要把windows中的track删掉
                if(mode_val=="hide"){
                    $("[id='div"+track_id+"']").remove();
                    removeTracks(group_id,track_id);
                }else{
                    $("[id='div"+track_id+"']").remove();
                    //在id为window的div中添加一个div
                    var track_div=$('<div></div>')
                    track_div.attr('id',"div"+track_id);
                    track_div.attr('name',group_id);
					track_div.attr('class','whxdiv');
					var pic_div=$('<div>'+track_id+'</div>');
					pic_div.attr('class','pic_div');
					
					var groupname=group_id;
					var groupname=groupname.replace("_"," ");
					var description=$('<div>'+groupname+'</div>');
					description.attr('class','description');
					track_div.append(description);
					track_div.append(pic_div);
					
                    track_div.hover(function(){
    						$(this).css("background-color","#C7EAFE");
							$(this).children("button").css("background-color","#C7EAFE");
					},
					function(){
    				$(this).css("background-color","#FBFDFF");	
					$(this).children("button").css("background-color","#FBFDFF");	
					});
                    var btn_del = $('<button value="删除"></button>')
					btn_del.attr('class','whxdelete')
                    track_div.append(btn_del);

                    btn_del.bind('click',function(){
                        var group_id=$(this).parent().attr('name');
                        var track_id=$(this).parent().attr('id').replace("div","")
                        removeTracks(group_id,track_id);
                        $(this).parent().remove();
                        annotations.get(group_id).get(track_id).setMode("hide");
                        $("[id='"+track_id+"']").parent().children("select").find("option[value='hide']").prop("selected",true);
                    });

                    $("div[id='div"+track_id+"']").text("")
                    $("#window").append(track_div);
                    //为displayItems加入返回数据，在browser区域加入新track的div，把div对象和addTracks返回的对象存入displayItems
                    addTracks(group_id,track_id,mode_val,track_div)
                }
            })

            if(mode=="pack"){
                c.find("option[value='pack']").attr("selected",true);
            }else if(mode=="dense"){
                c.find("option[value='dense']").attr("selected",true);
            }else{
                c.find("option[value='hide']").attr("selected",true);
            }
            a.append(b);
            a.append(c);
            tracks.append(a);
        };
        $("#choice2").append(tracks);
        tracks.css("display","none");

        groups.bind('click',function(){
            var groupId = "group"+$(this).attr('id');

            for(var int in keySet){
                var sname = "group"+keySet[int];
                $("[id='"+sname+"']").css('display','none');
            }
            $("[id='groupUser']").css('display','none')
            $("[id='"+groupId+"']").css('display','block');
        })

    };

    //externals的tracks的管理
    var groups = $('<div></div>');
    groups.html("User");
    groups.attr("class","option1");
    groups.attr("active",0);
    groups.attr("id",externals.keySet()[0]);

    $("#choice1").append(groups);

    var tracks_user = $('<div></div>');
    tracks_user.attr("class","option2");
    tracks_user.attr("id","groupUser");


    var trackTile = $('<div></div>');

    trackTile.attr("class","option3");
    trackTile.html("User");
    tracks_user.append(trackTile);
    if(externals.size()>0){
        var trackKeys_user = externals.get(externals.keySet()[0]).keySet();

        for(var j in trackKeys_user){

            var a = $('<div></div>');
            a.attr('class','label');
            var b = $('<div></div>');
            b.attr('class','slabel');
            b.attr('id',trackKeys_user[j]);
            b.html(trackKeys_user[j]);
            b.click(function(){
                var mode = $(this).parent().children("select").val()
                if(mode=='del'){
                    $(this).parent().children("select").remove();
                    $(this).remove();
                    //需要加点东西
                    $("[id='div"+trackKeys_user[j]+"']").remove();
                    removeExternals($(this).attr("id"));
                }
            })

            var c = $('<select></select>');
            c.append("<option value='hide'>hide</option>");
            c.append("<option value='pack'>pack</option>");
            c.append("<option value='dense'>dense</option>");
            c.append("<option value='del'>delete</option>");
            c.attr('class','mlabel');

            var mode= externals.get("User").get(trackKeys_user[j]).getMode();
            c.change(function(){
                var mode_val = $(this).val();
                if(mode_val!="del"){
                    var track_id = $(this).parent().children("div").attr("id");
                    externals.get("User").get(track_id).setMode(mode_val);
                    if(mode_val=='hide'){
                        $("[id='div"+track_id+"']").remove();
                        userRemoveTracks(track_id);
                    }else{
						$("[id='div"+track_id+"']").remove();
                        //在id为window的div中添加一个div
                        var track_div=$('<div></div>')
                        track_div.attr('id',"div"+track_id);
                        track_div.attr('name',"User");
						track_div.attr('class','whxdiv');
						var pic_div=$('<div>'+track_id+'</div>');
						pic_div.attr('class','pic_div');
						track_div.append(pic_div);
						
						var groupname=group_id;
						var groupname=groupname.replace("_"," ");
						var description=$('<div>'+groupname+'</div>');
						description.attr('class','description');
						track_div.append(description);
						
                        var btn_del = $('<button value="删除"></button>')
					    btn_del.attr('class','whxdelete')
                        track_div.append(btn_del);
						track_div.hover(function(){
    						$(this).css("background-color","#C7EAFE");
							$(this).children("button").css("background-color","#C7EAFE");
						},
						function(){
							$(this).css("background-color","#FBFDFF");
							$(this).children("button").css("background-color","#FBFDFF");
						});
                        btn_del.bind('click',function(){
                            var track_id=$(this).parent().attr('id').replace("div","")
                            userRemoveTracks(track_id);
                            $(this).parent().remove();
                            externals.get("User").get(track_id).setMode("hide");
                            $("[id='"+track_id+"']").parent().children("select").find("option[value='hide']").prop("selected",true);
                        });

                        $("div[id='div"+track_id+"']").text("")
                        $("#window").append(track_div);
                        //为displayItems加入返回数据，在browser区域加入新track的div，把div对象和addTracks返回的对象存入displayItems
                        userAddTracks(track_id,mode_val,track_div)
                    }
                }
            })
            if(mode=="pack"){
                c.find("option[value='pack']").attr("selected",true);
            }else if(mode=="dense"){
                c.find("option[value='dense']").attr("selected",true);
            }else{
                c.find("option[value='hide']").attr("selected",true);
            }

            a.append(b);
            a.append(c);
            tracks_user.append(a);
        };
    }
        $("#choice2").append(tracks_user);
        tracks_user.css("display","none");

        groups.bind('click',function(){
            var groupId = "groupUser";

            for(var int in keySet){
                var sname = "group"+keySet[int];
                $("[id='"+sname+"']").css('display','none');
            }
            $("[id='"+groupId+"']").css('display','block');
        })


    $("#btn_submit").click(function(){
        var trackname = $("#user_trackName").val();
        var type = $("#sl").val();
        var url = $("#user_url").val();
        if(trackname==""|| url==""){
            alert("trackname或者url不能为空")
        }else{
            addExternals(trackname,url,type);
            var a = $('<div></div>');

            a.attr('class','label');
            var b = $('<div></div>');
            b.attr('class','slabel');
            b.attr('id',trackname);
            b.html(trackname);
            b.click(function(){
                var mode = $(this).parent().children("select").val()
                if(mode=='del'){
                    $(this).parent().children("select").remove();
                    $(this).remove();
					$("[id='div"+trackKeys_user[j]+"']").remove();
                    //$("#div"+trackKeys_user[j]).remove();
                    removeExternals($(this).attr("id"));
                }
            })

            var c = $('<select></select>');
            c.append("<option selected value='hide'>hide</option>");
            c.append("<option value='pack'>pack</option>");
            c.append("<option value='dense'>dense</option>");
            c.append("<option value='del'>delete</option>");
            c.attr('class','mlabel');

            c.change(function(){
                var mode_val = $(this).val();
                if(mode_val!="del"){
                    var track_id = $(this).parent().children("div").attr("id");
                    externals.get("User").get(track_id).setMode(mode_val);
                    if(mode_val=='hide'){
                        $("[id='div"+track_id+"']").remove();
                        userRemoveTracks(track_id);
                    }else{
						$("[id='div"+track_id+"']").remove();
                        //在id为window的div中添加一个div
                        var track_div=$('<div></div>')
                        track_div.attr('id',"div"+track_id);
                        track_div.attr('name',"User");
						track_div.attr('class','whxdiv');
						var pic_div=$('<div>'+track_id+'</div>');
						pic_div.attr('class','pic_div');
						track_div.append(pic_div);
						
						var groupname=group_id;
						var groupname=groupname.replace("_"," ");
						var description=$('<div>'+groupname+'</div>');
						description.attr('class','description');
						track_div.append(description);
						
                        var btn_del = $('<button value="删除"></button>')
					    btn_del.attr('class','whxdelete')
                        track_div.append(btn_del);
						track_div.hover(function(){
    						$(this).css("background-color","#C7EAFE");
							$(this).children("button").css("background-color","#C7EAFE");
						},
						function(){
							$(this).css("background-color","#FBFDFF");
							$(this).children("button").css("background-color","#FBFDFF");
						});
                        btn_del.bind('click',function(){
                            var track_id=$(this).parent().attr('id').replace("div","")
                            userRemoveTracks(track_id);
                            $(this).parent().remove();
                            externals.get("User").get(track_id).setMode("hide");
                            $("[id='"+track_id+"']").parent().children("select").find("option[value='hide']").prop("selected",true);
                        });

                        $("div[id='div"+track_id+"']").text("")
                        $("#window").append(track_div);
                        //为displayItems加入返回数据，在browser区域加入新track的div，把div对象和addTracks返回的对象存入displayItems
                        userAddTracks(track_id,mode_val,track_div)
                    }
                }
            })
            a.append(b);
            a.append(c);
            tracks_user.append(a);
        }
    });

    //预设display
	
	for(var i in keySet){
    var trackKeys = annotations.get(keySet[i]).keySet();
    for(var j in trackKeys){
        var mode_val=$("[id='"+trackKeys[j]+"']").parent().children("select").val();
        var group_id = $("[id='"+trackKeys[j]+"']").parent().parent().attr('id').replace("group","")
        if(mode_val!="hide"){
            var track_div=$('<div></div>')
            track_div.attr('id',"div"+trackKeys[j]);
			track_div.attr('class',"whxdiv");
            track_div.attr('name',group_id);
			
			var pic_div=$('<div>'+trackKeys[j]+'</div>');
			pic_div.attr('class','pic_div');
			track_div.append(pic_div);
			
			var groupname=group_id;
			var groupname=groupname.replace("_"," ");
			var description=$('<div>'+groupname+'</div>');
			description.attr('class','description');
			track_div.append(description);
			
            var btn_del = $('<button value="删除"></button>')
			btn_del.attr('class','whxdelete')
            track_div.append(btn_del);
			track_div.hover(function(){
    			$(this).css("background-color","#C7EAFE");
				$(this).children("button").css("background-color","#C7EAFE");
			},
			function(){
    			$(this).css("background-color","#FBFDFF");
				$(this).children("button").css("background-color","#FBFDFF");
			});
            btn_del.bind('click',function(){
                var group_id=$(this).parent().attr('name');
                var track_id=$(this).parent().attr('id').replace("div","")
                removeTracks(group_id,track_id);
                $(this).parent().remove();
                annotations.get(group_id).get(track_id).setMode("hide");
                $("[id='"+track_id+"']").parent().children("select").find("option[value='hide']").prop("selected",true);
            });

            $("#window").append(track_div);
            //为displayItems加入返回数据，在browser区域加入新track的div，把div对象和addTracks返回的对象存入displayItems
            addTracks(group_id,trackKeys[j],mode_val,track_div);
        }
    }
}
});