/*!
 *  Page - Customer Data
 *  @Lastest Update 2016-10-15
 */
var App = window.App = App || {};

App = function($,G){

    'use strict';

    // Page parameter config
    var config = {
        api: {
            userMac: {host:G.apiHost||'',url:'../assets/data/userMac.json',type:'get'},
            userTrack: {host:G.apiHost||'',url:'../assets/data/userTrack.json',type:'get'}
        }
    };

    // Page jquery object
    var $nav = $("nav"),
        $track = $("#track"),
        oTimeRange = $("#timeRange"),
        partner_no = "025xw000141";

    // 滚动请求
    var body_h = $(document).height(),
        win_height = window.screen.height;

    $(window).scroll(function() {
        loadData(1);
        fixed();
    });

    // 加载数据
    var loadData = function(type){
        var top_height = document.body.scrollTop,
            timeVal = oTimeRange.val() || new Date(),
            date = $.dateFormat(timeVal).ymd.replace(/-/g,"");

        get_user_mac(date,type);
    };

    // 创建元素
    var createEle = function(data){
        var html = "", len = data.length;
        for (var i=0; i<len; i++) {
            html += "<a class='weui-cell weui-cell_access' data-mac='"+data[i].phone_mac+"'>";
            html += "<div class='weui-cell__hd'>"+data[i].phone_range+"</div>";
            html += "<div class='weui-cell__bd'>";
            html += "<div class='weui-flex text-center'>";
            html += "<div class='weui-flex__item'>"+data[i].phone_mac+"</div>";
            html += "<div class='weui-flex__item'>"+data[i].store_time+"</div>";
            html += "</div>";
            html += "</div>";
            html += "<div class='weui-cell__ft'>"+data[i].stay_time+"</div>";
            html += "</a>";
        }
        $track.html(html);
    };

    // 获取顾客统计数据
    var get_user_mac = function(date,type){

        var api = config.api.userMac;

        $.ajax({
            url: api.host+api.url+"?partner_no="+partner_no+"&data_type=user_sex_count&count_date="+date+"&count_type="+type,
            type: api.type,
            success: function(json){
                if(json.state === 10000){
                    console.log(json);
                    createEle(json.result);
                }
            }
        });
    };

    // 获取顾客轨迹
    var getTrack = function(){
        var api = config.api.userMac;

        $.ajax({
            url: api.host+api.url+"?partner_no="+partner_no+"&data_type=user_sex_count&count_date="+date+"&count_type="+type,
            type: api.type,
            success: function(json){
                if(json.state === 10000){
                    console.log(json);
                    createEle(json.result);
                }
            }
        });
    };

    //导航条的位置控制
    var fixed = function(){
        var top = window.pageYOffset;

        if(top >= 10){
            if(!$nav.hasClass("fixed")){
                $nav.addClass("fixed");
            }
        }else{
            $nav.removeClass("fixed");
        }
    };

    var btnHandle = function(){
        var $iosMask = $('#iosMask'),
            $iosActionsheet = $('#iosActionsheet'),
            $iosDialog = $('#iosDialog');

        // 日期选择
        var d = new Date();
        oTimeRange.mobiscroll({
            showNow: true,
            rows: 5,
            onSelect: function (value, inst) {
                loadData(1);
            }
        }).val($.dateFormat(d).ymd);

        // 隐藏菜单
        function hideActionSheet() {
            $iosActionsheet.removeClass('weui-actionsheet_toggle');
            $iosMask.fadeOut(200);
        }

        $iosMask.on('click', hideActionSheet);
        $btnCancel.on('click', hideActionSheet);

        // 弹出菜单
        $track.on('click', 'a', function(){
            $iosActionsheet.addClass('weui-actionsheet_toggle').show();
            $iosMask.fadeIn(200);
        });
    };

    // Set api
    return {
        init: function(){
            loadData(1);
            btnHandle();
        },
        config: function(options,fn){
            config = $.extend(true,{},config,options);
            if (fn){ fn(); };
        }
    };
}(jQuery,window.Global||{});

$(document).ready(function() {
    App.init();
});