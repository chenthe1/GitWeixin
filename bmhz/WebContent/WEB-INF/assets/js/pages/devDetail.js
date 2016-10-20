/*!
 *  Page - Customer Data
 *  @Lastest Update 2016-10-18
 */
var App = window.App = App || {};

App = function($,G){

    'use strict';

    // Page parameter config
    var config = {
        api: {
            devList: {host:G.apiHost||'',url:'../assets/data/devList.json',type:'get'},
            devRange: {host:G.apiHost||'',url:'../assets/data/devRange.json',type:'get'},
            update: {host:G.apiHost||'',url:'../assets/data/update.json',type:'post'}
        }
    };

    // Page Url para
    var para = {
        id: $.getUrlPara('id')
    };

    // Page jquery object
    var $devList = $("#devList"),
        $form = $("#form"),
        $shop = $("#shop"),
        $slider = $("#slider"),
        partner_no = "025xw000141";

    // 创建元素
    var createEle = function(data){
        var len = data.length,
            html = "";

        for(var i=0; i<len; i++){
            // use to list
            html += "<a class='weui-cell weui-cell_access' data-id='"+data[i].id+"' href='javascript:;'>";
            html += "<div class='weui-cell__hd'>";
            html += "<span class='icon icon-small'><span class='icon-phone'></span></span>";
            html += "</div>";
            html += "<div class='weui-cell__bd'><p>"+data[i].name+"</p></div>";
            html += "<div class='weui-cell__ft'></div>";
            html += "</a>";
        }

        $devList.html(html);
    };

    // 获取设备列表
    var get_dev_list = function(){
        var api = config.api.devList;

        $.ajax({
            url: api.host+api.url+"?partner_no="+partner_no,
            type: api.type,
            success: function(json){
                if(json.state === 10000){
                    createEle(json.result);
                }
            }
        });
    };

    // 获取单个设备探测范围
    var get_dev_range = function(mac){
        var api = config.api.devRange;

        $.ajax({
            url: api.host+api.url+"?partner_no="+partner_no+"&mac="+mac,
            type: api.type,
            success: function(json){
                if(json.state === 10000){
                    // set slider value
                    $slider.slider({
                        min: 0,
                        max: 100,
                        value: json.result[0].range,
                        formatter: function(value) {
                            return value;
                        }
                    });

                    $("#sliderVal").text(json.result[0].range);
                }
            }
        });
    };

    // 设置店名
    var setName = function(){
        var api = config.api.update;
        $("#loadingToast").show();

        $.ajax({
            url: api.host+api.url+"?partner_no="+partner_no,
            type: api.type,
            // data: $form.packJson(),
            data: '{"name":"'+1+'","id":"'+2+'"}',
            success: function(json){
                $("#loadingToast").hide();
                $.checkJson(json);
                if(json.state === 10000){

                }
            }
        });
    };

    // 设置范围
    var setRange = function(){
        var api = config.api.update;
        $("#loadingToast").show();

        $.ajax({
            url: api.host+api.url+"?partner_no="+partner_no,
            type: api.type,
            // data: $form.packJson(),
            data: '{"range":"'+1+'","mac":"'+2+'"}',
            success: function(json){
                $("#loadingToast").hide();
                $.checkJson(json);
                if(json.state === 10000){

                }
            }
        });
    };

    // 校验表单值
    var checkVal = function(target){
        setInterval(function(){
             $.scrollTo($(".error").first(),-102);
        },300);
    };

    var btnHandle = function(){
        // ios
        var $btnName = $("#btnName"),
            $btnRange = $("#btnRange"),
            $iosDialog = $("#iosDialog"),
            $nameDialog = $("#nameDialog"),
            $rangeDialog = $("#rangeDialog");

        $("[name='name']").on('keyup', function(){
            var t = $(this),
                val = t.val(),
                icon = $("i",t.parent().next()),
                reg = /^[\w~\!@#\$%\^&\*]{2,31}$/;

            setTimeout(function(){
                icon.removeClass().addClass(reg.test(val)?"weui-icon-success":"weui-icon-warn");
            },100);
        });

        // 店铺名表单显示&隐藏
        $shop.on('click', function(){
            $nameDialog.fadeIn(200);
        });
        $nameDialog.on('click', '.weui-dialog__btn', function(){
            $nameDialog.fadeOut(200);
        });

        // 更新店铺名
        $btnName.on('click', function(){
            var r = $nameDialog.checkForm();
            if (r) { setName(); }
        });

        // 更新范围
        $btnRange.on('click', function(){
            var r = $rangeDialog.checkForm();
            if (r) { setRange(); }
        });

        // 探测范围显示&隐藏
        $devList.on('click', 'a', function(){
            var val = $(this).attr("data-id");

            if (val) { get_dev_range(val); }
            $rangeDialog.fadeIn(200);
        });

        $rangeDialog.on('click', '.weui-dialog__btn', function(){
            $rangeDialog.fadeOut(200);
        });

        // slider
        $slider.on("slide", function(slideEvt) {
            $("#sliderVal").text(slideEvt.value);
        });

        // 弹框信息提示
        $iosDialog.on('click', '.weui-dialog__btn', function(){
            $iosDialog.fadeOut(200);
        });
    };

    // Set api
    return {
        init: function(){
            get_dev_list();
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