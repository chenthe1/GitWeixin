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
            userSum: {host:G.apiHost||'',url:'../assets/data/userSum.json',type:'get'},
            hourFlow: {host:G.apiHost||'',url:'../assets/data/24hourFlow.json',type:'get'},
            weekFlow: {host:G.apiHost||'',url:'../assets/data/weekFlow.json',type:'get'},
            userPhone: {host:G.apiHost||'',url:'../assets/data/userPhone.json',type:'get'}
        }
    };

    // Page jquery object
    var $nav = $("nav"),
        oDay = $("#dayFlow"),
        oWeek = $("#weekFlow"),
        oPhone = $("#phoneBrand"),
        oTimeRange = $("#timeRange"),
        partner_no = "025xw000141";


    // 统计顾客数
    var get_user_num = function(){
        var api = config.api.userSum;

        var timeVal = oTimeRange.val() || new Date(),
            date = $.dateFormat(timeVal).ymd.replace(/-/g,"");

        $.ajax({
            url: api.host+api.url+"?partner_no="+partner_no+"&data_type=user_num_count&count_date="+date+"&count_type=1",
            type: api.type,
            success: function(json){
                if(json.state === 10000){
                    $("#renFlow").text(json.result[0].user_ren_count);
                    $("#keFlow").text(json.result[0].user_ke_count);
                    $("#newCustomer").text(json.result[0].user_new_count);
                    $("#oldCustomer").text(json.result[0].user_old_count);
                    $("#curCustomer").text(json.result[0].user_cur_count);
                }
            }
        });
    };

    // 滚动请求
    var body_h = $(document).height(),
        win_height = window.screen.height,
        day_h = oDay.offset().top,
        week_h = oWeek.offset().top,
        phone_h = oPhone.offset().top;

    $(window).scroll(function() {
        loadData(1);
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
        if((phone_h<win_height+top_height) && oPhone.attr("state") == "no"){
            get_phone_data(date,type);
            oPhone.attr("state","yes");
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

    // 获取顾客手机统计数据
    var get_phone_data = function(date,type){
        var phoneChart = echarts.init(document.getElementById('phoneBrand'));
        var api = config.api.userPhone;
        phoneChart.showLoading();
        $.ajax({
            url: api.host+api.url+"?partner_no="+partner_no+"&data_type=user_phone_count&count_date="+date+"&count_type="+type,
            type: api.type,
            success: function(json){
                phoneChart.hideLoading();
                if(json.state === 10000){
                    var phone_option = get_phone_option(json.result);
                    phoneChart.setOption(phone_option);
                }
            }
        });
    };

    // 配置顾客手机饼状图
    var get_phone_option = function(data){
        var xdata = [],vdata = [],flag;
        var color = ['#32b1ff','#ff686c','#68ffad','#c9ff68'];

        for (var i = 0; i <= data.length - 1; i++) {
            xdata[i] = data[i].phone_range;
            flag = data[i].phone_count ? true : false;
            vdata.push({value:data[i].phone_count, name:data[i].phone_range,itemStyle: {normal: {label:{show:flag},color:color[i]}}});
        }

        var phone_option = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}(人) ({d}%)"
            },
            title : {
                text: '顾客手机品牌统计',
                x:'center'
            },
            legend: {
                x : 'center',
                y : 'bottom',
                data:xdata,
            },
            series : [
                {
                    name:"手机品牌",
                    type:'pie',
                    radius: '55%',
                    center : ['50%', '50%'],
                    //startAngle:0,
                    label: {
                        normal: {
                            show: true,
                            //position: 'inside',
                            formatter: '{d}%'
                        },
                        textStyle:{
                            fontSize:8
                        }
                    },
                    selectedOffset:5,
                    data:vdata
                }
            ]
        };

        return phone_option;
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
        oDay.attr("state","no");
        oWeek.attr("state","no");
        oPhone.attr("state","no");
        loadData(1);
    };

    // 日期选择器
    var btnHandle = function(){
        var d = new Date();

        oTimeRange.mobiscroll({
            showNow: true,
            rows: 5,
            onSelect: function (value, inst) {
                clearStatus();
            }
        }).val($.dateFormat(d).ymd);
    };

    // Set api
    return {
        init: function(){
            get_user_num();
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