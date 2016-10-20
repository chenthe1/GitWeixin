/*!
 *  Page - DayFlow
 *  @Lastest Update 2016-10-14
 */
var App = window.App = App || {};

App = function($,G){

    'use strict';

    // Page parameter config
    var config = {
        api: {
            hourFlow: {host:G.apiHost||'',url:'../assets/data/24hourFlow.json',type:'get'},
            weekFlow: {host:G.apiHost||'',url:'../assets/data/weekFlow.json',type:'get'},
            userPhone: {host:G.apiHost||'',url:'../assets/data/userPhone.json',type:'get'}
        }
    };

    // Page jquery object
    var $nav = $("nav"),
        oDay = $("#dayFlow"),
        oWeek = $("#weekFlow"),
        oTimeRange = $("#timeRange"),
        oRadio = $(".radio-check"),
        oSelect = $("#statType"),
        partner_no = "025xw000141";

    // 滚动请求
    var body_h = $(document).height(),
        win_height = window.screen.height,
        day_h = oDay.offset().top,
        week_h = oWeek.offset().top;

    $(window).scroll(function() {
        loadData(7);
        fixed();
    });

    // 加载数据
    var loadData = function(type){
        var top_height = document.body.scrollTop,
            timeVal = oTimeRange.val() || new Date(),
            date = $.dateFormat(timeVal).ymd.replace(/-/g,"");

        if((day_h<win_height+top_height) && oDay.attr("state") == "no"){
            get_24hour_data(date,type);
            oDay.attr("state","yes");
        }
        if((week_h<win_height+top_height) && oWeek.attr("state") == "no"){
            get_week_data(date,type);
            oWeek.attr("state","yes");
        }
    };

    // 获取24小时统计数据
    var get_24hour_data = function(date,type){
        var dayChart = echarts.init(document.getElementById('dayFlow'));
        var api = config.api.hourFlow;

        $.ajax({
            url: api.host+api.url+"?partner_no="+partner_no+"&data_type=user_time_range_count&count_date="+date+"&count_type="+type,
            type: api.type,
            success: function(json){
                if(json.state === 10000){
                    var day_option = get_24hour_option(json.result);
                    dayChart.setOption(day_option);
                }
            }
        });
    };

    // 配置24小时折线图
    var get_24hour_option = function(data){
        var ldata = ['人流量','客流量','新顾客','老顾客'],
            xdata = ['1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'],
            vdata = [],
            color = ['#32b1ff','#ff686c','#68ffad','#c9ff68'];

        // for (var i = 0; i <= data.length - 1; i++) {
        //     vdata[n[data[i].time_range]] = data[i].user_flow_count;
        //     // ldata[i] = data[i].time_range;
        // }
        vdata = data;

        var hour_option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {
                    type : 'line'
                }
            },
            title : {
                text: '24小时统计图',
                left:'center'
            },
            legend: {
                x : 'center',
                y : '30px',
                data: ldata
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data :xdata,
                    axisLabel:{
                        rotate: 90,
                        interval:0
                    }
                }
            ],
            yAxis : [
                {
                    name : "人数",
                    type : "value"
                }
            ],
            series : vdata
        };

        return hour_option;
    };

    // 获取一周统计数据
    var get_week_data = function(date,type){
        var weekChart = echarts.init(document.getElementById('weekFlow'));
        var api = config.api.weekFlow;

        $.ajax({
            url: api.host+api.url+"?partner_no="+partner_no+"&data_type=user_time_range_count&count_date="+date+"&count_type="+type,
            type: api.type,
            success: function(json){
                if(json.state === 10000){
                    var week_option = get_week_option(json.result);
                    weekChart.setOption(week_option);
                }
            }
        });
    };

    // 配置一周折线图
    var get_week_option = function(data){
        var ldata = ['人流量','客流量'],
            xdata = ['周一','周二','周三','周四','周五','周六','周日'],
            vdata = [0,0,0,0,0,0,0];

        for (var i = 0; i < data.length; i++) {
            vdata[i] = data[i].user_flow_count;
        }

        var week_option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {
                    type : 'line'
                }
            },
            title : {
                text: '周趋势图',
                left:'center'
            },
            legend: {
                x: 'center',
                y: 'bottom',
                data: ldata
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data :xdata,
                    axisLabel:{
                        interval:0
                    }
                }
            ],
            yAxis : [
                {
                    name : "人数",
                    type : "value"
                }
            ],
            series : [
                {
                    name:'人流量',
                    type:'line',
                    areaStyle: {normal: {color:'#e7f3fc'}},
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal:{
                            color:'#5e9dd7'
                        }
                    },
                    data:vdata
                }
            ]
        };

        return week_option;
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

    // 清除导航状态，并获取数据
    var clearStatus = function(){
        var type = $(".radio-check:checked").val();
        oDay.attr("state","no");
        oWeek.attr("state","no");
        loadData(type);
    };


    var btnHandle = function(){
        var d = new Date();
        // 日期选择器
        oTimeRange.mobiscroll({
            showNow: true,
            rows: 5,
            onSelect: function (value, inst) {
                clearStatus();
            }
        }).val($.dateFormat(d).ymd);
        // 对比时间
        oRadio.on('click', function(){
            clearStatus();
        });
        // 对比类型
        oSelect.on('click', function(){
            clearStatus();
        });
    };

    // Set api
    return {
        init: function(){
            loadData(7);
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