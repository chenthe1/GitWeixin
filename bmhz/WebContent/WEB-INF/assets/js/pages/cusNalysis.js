/*!
 *  Page - Customer nalysis
 *  @Lastest Update 2016-10-13
 */
var App = window.App = App || {};

App = function($,G){

    'use strict';

    // Page parameter config
    var config = {
        api: {
            userSex: {host:G.apiHost||'',url:'../assets/data/userSex.json',type:'get'},
            userFlow: {host:G.apiHost||'',url:'../assets/data/userFlow.json',type:'get'},
            userSource: {host:G.apiHost||'',url:'../assets/data/userSource.json',type:'get'},
            userStayed: {host:G.apiHost||'',url:'../assets/data/userStayed.json',type:'get'},
            userEdu: {host:G.apiHost||'',url:'../assets/data/userEducation.json',type:'get'},
            userAge: {host:G.apiHost||'',url:'../assets/data/userAge.json',type:'get'},
            userPhone: {host:G.apiHost||'',url:'../assets/data/userPhone.json',type:'get'}
        }
    };

    // Page jquery object
    var $nav = $("nav"),
        oSex = $("#userSex"),
        oEdu = $("#userEdu"),
        oAge = $("#userAge"),
        oTel = $("#userPhone"),
        oFlow = $("#userFlow"),
        oSource = $("#userSource"),
        oStayed = $("#userStayed"),
        partner_no = "025xw000141";

    // 滚动请求
    var body_h = $(document).height(),
        win_height = window.screen.height,
        sex_h = oSex.offset().top,
        edu_h = oEdu.offset().top,
        age_h = oAge.offset().top,
        tel_h = oTel.offset().top,
        flow_h = oFlow.offset().top,
        source_h = oSource.offset().top,
        stayed_h = oStayed.offset().top;

    $(window).scroll(function() {
        var type = $("#timeRange .on").data('type');
        loadData(type);
        fixed();
    });

    // 加载数据
    var loadData = function(type){
        var top_height = document.body.scrollTop,
            time = new Date(),
            date = $.dateFormat(time).ymd.replace(/-/g,"");

        if((sex_h<win_height+top_height) && oSex.attr("state") == "no"){
            get_user_sex_data(date,type);
            oSex.attr("state","yes");
        }
        if((flow_h<win_height+top_height) && oFlow.attr("state") == "no"){
            get_user_flow_data(date,type);
            oFlow.attr("state","yes");
        }
        if((source_h<win_height+top_height) && oSource.attr("state") == "no"){
            get_user_source_data(date,type);
            oSource.attr("state","yes");
        }
        if((stayed_h<win_height+top_height) && oStayed.attr("state") == "no"){
            get_user_stayed_data(date,type);
            oStayed.attr("state","yes");
        }
        if((edu_h<win_height+top_height) && oEdu.attr("state") == "no"){
            get_user_edu_data(date,type);
            oEdu.attr("state","yes");
        }
        if((age_h<win_height+top_height) && oAge.attr("state") == "no"){
            get_user_age_data(date,type);
            oAge.attr("state","yes");
        }
        if((tel_h<win_height+top_height) && oTel.attr("state") == "no"){
            get_user_phone_data(date,type);
            oTel.attr("state","yes");
        }
    };

    // 获取顾客性别统计数据
    var get_user_sex_data = function(date,type){
        var sexChart = echarts.init(document.getElementById('userSex'));
        var api = config.api.userSex;

        $.ajax({
            url: api.host+api.url+"?partner_no="+partner_no+"&data_type=user_sex_count&count_date="+date+"&count_type="+type,
            type: api.type,
            success: function(json){
                if(json.state === 10000){
                    var sex_option = get_user_sex_option(json.result[0]);
                    sexChart.setOption(sex_option);
                }
            }
        });
    };

    // 配置顾客性别饼状图
    var get_user_sex_option = function(data){
        var vData = [
            {value:0, name:'男',selected:true,itemStyle: {normal: {color: '#33b1ff'}}},
            {value:0, name:'女',itemStyle: {normal: {color: '#ff686d'}}}
        ];

        if(data.partner_no){
            vData = [
                {value:data.male_count, name:'男',selected:true,itemStyle: {normal: {color: '#33b1ff'}}},
                {value:data.female_count, name:'女',itemStyle: {normal: {color: '#ff686d'}}}
            ]
        }

        var sexOption = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            title : {
                text: '顾客性别统计',
                x:'center'
            },
            legend: {
                x : 'center',
                y : 'bottom',
                data:['男','女'],
            },
            //calculable : true,
            series : [
                {
                    type:'pie',
                    radius: '55%',
                    center : ['50%', '50%'],
                    //startAngle:0,
                    label: {
                        normal: {
                            show: true,
                            position: 'inside',
                            formatter: '{d}%'
                        },
                        // emphasis: {
                        //     show: true
                        // }
                    },
                    selectedOffset:5,
                    data:vData
                }
            ]
        };

        return sexOption;
    };

    // 获取客流量统计数据
    var get_user_flow_data = function(date,type){
        var flowChart = echarts.init(document.getElementById('userFlow'));
        var api = config.api.userFlow;

        $.ajax({
            url: api.host+api.url+"?partner_no="+partner_no+"&data_type=user_time_range_count&count_date="+date+"&count_type="+type,
            type: api.type,
            success: function(json){
                if(json.state === 10000){
                    var flow_option = get_user_flow_option(json.result);
                    flowChart.setOption(flow_option);
                }
            }
        });
    };

    // 配置客流量折线图
    var get_user_flow_option = function(data){
        var xdata = ['02','04','06','08','10','12','14','16','18','20','22','24'],
            n = {'2':"0",'4':"1",'6':"2",'8':"3",'10':"4",'12':"5",'14':"6",'16':"7",'18':"8",'20':"9",'22':"10",'24':"11"},
            vdata = [0,0,0,0,0,0,0,0,0,0,0,0];

        for (var i = 0; i <= data.length - 1; i++) {
            vdata[n[data[i].time_range]] = data[i].user_flow_count;
        }

        var flow_option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {
                    type : 'line'
                }
            },
            title : {
                text: '24小时店铺客流量趋势',
                left:'center'
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
                    name:'直接访问',
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

        return flow_option;
    };

    // 获取客流来源统计数据
    var get_user_source_data = function(date,type){
        var sourceChart = echarts.init(document.getElementById('userSource'));
        var api = config.api.userSource;

        $.ajax({
            url: api.host+api.url+"?partner_no="+partner_no+"&data_type=user_source_count&count_date="+date+"&count_type="+type,
            type: api.type,
            success: function(json){
                if(json.state === 10000){
                    var source_option = get_user_source_option(json.result);
                    sourceChart.setOption(source_option);
                }
            }
        });
    };

    // 配置客流来源柱状图
    var get_user_source_option = function(data){
        var xdata = [],vdata = [];
        var len = data.length >= 5 ? 5 : data.length;

        for (var i = 0; i <= len - 1; i++) {
            xdata[i] = data[i].from_addr;
            vdata[i] = data[i].from_addr_count;
        }

        var source_option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {
                    type : 'shadow'
                }
            },
            title : {
                text: '客流来源',
                left:'center'
            },
            grid: {
                left: "3%",
                right: "3%",
                top:45,
                bottom: 45,
                width:"90%",
                containLabel: true
            },
            // xAxis: {
            //     type : 'value',
            //     position: 'top',
            //     splitLine: {lineStyle:{type:'dashed'}},
            // },
            xAxis : [
                {
                    type : 'category',
                    axisLine: {show: false},
                    axisLabel: {show: false},
                    axisTick: {show: false},
                    splitLine: {show: false},
                    data : xdata,
                    axisLabel:{
                        interval:0 ,
                        //rotate:,
                        textStyle:{
                            fontSize:8
                        }
                    }
                }
            ],
            // yAxis: {
            //     type : 'category',
            //     axisLine: {show: false},
            //     axisLabel: {show: false},
            //     axisTick: {show: false},
            //     splitLine: {show: false},
            //     data : xdata
            // },
            yAxis : [
                {
                    name : "人数",
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'客流来源',
                    type:'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            formatter: '{c}(人)'
                        }
                    },
                    barWidth : 25,
                    itemStyle: {
                        normal:{
                            color:'#5e9dd7'
                        }
                    },
                    data:vdata
                }
            ]
        }
        return source_option;
    };

    // 获取顾客停留统计数据
    var get_user_stayed_data = function(date,type){
        var stayedChart = echarts.init(document.getElementById('userStayed'));
        var api = config.api.userStayed;
        stayedChart.showLoading();
        $.ajax({
            url: api.host+api.url+"?partner_no="+partner_no+"&data_type=user_stayed_count&count_date="+date+"&count_type="+type,
            type: api.type,
            success: function(json){
                stayedChart.hideLoading();
                if(json.state === 10000){
                    var stayed_option = get_user_stayed_option(json.result);
                    stayedChart.setOption(stayed_option);
                }
            }
        });
    };

    // 配置顾客停留柱状图
    var get_user_stayed_option = function(data){
        var xdata = [],vdata = [];

        for (var i = 0; i <= data.length - 1; i++) {
            if(data[i].stay_time_range.length < 7) {
                xdata[i] = data[i].stay_time_range + "m";
            } else {
                var times = data[i].stay_time_range.split("-");
                xdata[i] = times[0]/60 + "-" + times[1]/60 + "h";
            }
            vdata[i] = data[i].stay_time_count;
        }

        var stayed_option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {
                    type : 'shadow'
                }
            },
            title : {
                text: '顾客停留时长',
                left:'center'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                width:"90%",
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    splitLine: {show:false},
                    data : xdata,
                    axisLabel:{
                        interval:0
                    }
                }
            ],
            yAxis : [
                {
                    name : "人数",
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            formatter: '{c}(人)'
                        }
                    },
                    barWidth : 25,
                    itemStyle: {
                        normal:{
                            color:'#5e9dd7'
                        }
                    },
                    data:vdata
                }
            ]
        };

        return stayed_option;
    };

    // 获取顾客学历统计数据
    var get_user_edu_data = function(date,type){
        var eduChart = echarts.init(document.getElementById('userEdu'));
        var api = config.api.userEdu;
        eduChart.showLoading();
        $.ajax({
            url: api.host+api.url+"?partner_no="+partner_no+"&data_type=user_edu_count&count_date="+date+"&count_type="+type,
            type: api.type,
            success: function(json){
                eduChart.hideLoading();
                if(json.state === 10000){
                    var edu_option = get_user_edu_option(json.result);
                    eduChart.setOption(edu_option);
                }
            }
        });
    };

    // 配置顾客学历饼状图
    var get_user_edu_option = function(data){
        var xdata = [],vdata = [],flag=true;
        var color = ['#32b1ff','#ff686c','#68ffad','#c9ff68'];

        for (var i = 0; i <= data.length - 1; i++) {
            xdata[i] = data[i].edu_range;
            flag = data[i].edu_count ? true : false;
            vdata.push({value:data[i].edu_count, name:data[i].edu_range,itemStyle: {normal: {label:{show:flag},color:color[i]}}});
        }

        var education_option = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}(人) ({d}%)"
            },
            title : {
                text: '顾客学历统计',
                x:'center'
            },
            legend: {
                x : 'center',
                y : 'bottom',
                data:xdata,
            },
            //calculable : true,
            series : [
                {
                    name: '顾客学历',
                    type:'pie',
                    radius: '55%',
                    center : ['50%', '50%'],
                    label: {
                        normal: {
                            //show: true,
                            //position: 'inside',
                            formatter: '{d}%'
                        },
                    },
                    selectedOffset:5,
                    data:vdata
                }
            ]
        };

        return education_option;
    };

    // 获取顾客年龄统计数据
    var get_user_age_data = function(date,type){
        var ageChart = echarts.init(document.getElementById('userAge'));
        var api = config.api.userAge;
        ageChart.showLoading();
        $.ajax({
            url: api.host+api.url+"?partner_no="+partner_no+"&data_type=user_age_count&count_date="+date+"&count_type="+type,
            type: api.type,
            success: function(json){
                ageChart.hideLoading();
                if(json.state === 10000){
                    var age_option = get_user_age_option(json.result);
                    ageChart.setOption(age_option);
                }
            }
        });
    };

    // 配置顾客年龄饼状图
    var get_user_age_option = function(data){
        var xdata = [],vdata = [],flag;
        var color = ['#32b1ff','#ff686c','#68ffad','#c9ff68'];

        for (var i = 0; i <= data.length - 1; i++) {
            xdata[i] = data[i].age_range;
            flag = data[i].age_count ? true : false;
            vdata.push({value:data[i].age_count, name:data[i].age_range,itemStyle: {normal: {label:{show:flag},color:color[i]}}});
        }

        var age_option = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}(人) ({d}%)"
            },
            title : {
                text: '顾客年龄统计',
                x:'center'
            },
            legend: {
                x : 'center',
                y : 'bottom',
                data:xdata,
            },
            series : [
                {
                    name:"顾客年龄",
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

        return age_option;
    };

    // 获取顾客手机统计数据
    var get_user_phone_data = function(date,type){
        var phoneChart = echarts.init(document.getElementById('userPhone'));
        var api = config.api.userPhone;
        phoneChart.showLoading();
        $.ajax({
            url: api.host+api.url+"?partner_no="+partner_no+"&data_type=user_phone_count&count_date="+date+"&count_type="+type,
            type: api.type,
            success: function(json){
                phoneChart.hideLoading();
                if(json.state === 10000){
                    var phone_option = get_user_phone_option(json.result);
                    phoneChart.setOption(phone_option);
                }
            }
        });
    };

    // 配置顾客手机饼状图
    var get_user_phone_option = function(data){
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
    var clearStatus = function(target){
        var type = target.attr("data-type");
        if (target.hasClass('on')) { return ;}

        target.addClass('on').siblings().removeClass('on');
        oSex.attr("state","no");
        oFlow.attr("state","no");
        oSource.attr("state","no");
        oStayed.attr("state","no");
        oEdu.attr("state","no");
        oAge.attr("state","no");
        oTel.attr("state","no");

        loadData(type);
    };

    var btnHandle = function(){
        // 时间选择
        $(".time-range").on('click', function(){
            clearStatus($(this));
        });
    };

    // Set api
    return {
        init: function(){
            loadData(1);
            // getUserSex();
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