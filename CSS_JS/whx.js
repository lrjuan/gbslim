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
                //在id为window的div中添加一个div
                var track_div=$('<div>我就试试</div>')
                $("#window").append(track_div);
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

            var c = $('<select></select>');
            c.append("<option value='pack'>hide</option>");
            c.append("<option value='pack'>pack</option>");
            c.append("<option value='dense'>dense</option>");
            c.attr('class','mlabel');

            var mode= externals.get("User").get(trackKeys_user[j]).getMode();
            c.change(function(){
                var mode_val = $(this).val();
                var track_id = $(this).parent().children("div").attr("id");
                externals.get("User").get(track_id).setMode(mode_val);
                //在id为window的div中添加一个div
                var track_div=$('<div>我就试试</div>')
                $("#window").append(track_div);
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
            alert("成功了")
            var a = $('<div></div>');

            a.attr('class','label');
            var b = $('<div></div>');
            b.attr('class','slabel');
            b.attr('id',trackname);
            b.html(trackname);

            var c = $('<select></select>');
            c.append("<option selected value='pack'>hide</option>");
            c.append("<option value='pack'>pack</option>");
            c.append("<option value='dense'>dense</option>");
            c.attr('class','mlabel');

            c.change(function(){
                var mode_val = $(this).val();
                var track_id = $(this).parent().children("div").attr("id");
                externals.get("User").get(track_id).setMode(mode_val);
                //在id为window的div中添加一个div
                var track_div=$('<div>我就试试</div>')
                $("#window").append(track_div);
            })
           
            a.append(b);
            a.append(c);
            tracks_user.append(a);

        }
    });

});