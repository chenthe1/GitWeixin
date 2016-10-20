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
            devRange: {host:G.apiHost||'',url:'../assets/data/devRange.json',type:'get'},
            update: {host:G.apiHost||'',url:'../assets/data/update.json',type:'post'}
        }
    };

    // Page Url para
    var para = {
        id: $.getUrlPara('id')||0
    };

    // Page jquery object
    var $slider = $("#slider"),
        partner_no = "025xw000141";

    // 获取单个设备探测范围
    var get_dev_range = function(){
        var api = config.api.devRange;

        $.ajax({
            url: api.host+api.url+"?partner_no="+partner_no+"&id="+para.id,
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

    // 删除设备
    var delDevice = function(){
        var api = config.api.update;
        $("#loadingToast").show();

        $.ajax({
            url: api.host+api.url+"?partner_no="+partner_no,
            type: api.type,
            data: '{"id":"'+para.id+'"}',
            success: function(json){
                $("#loadingToast").hide();
                $.checkJson(json);
                if(json.state === 10000){
                    // back prev page
                    location.href=history.go(-1);
                }
            }
        });
    };

    // 设置范围
    var setRange = function(){
        var api = config.api.update;
        $("#loadingToast").show();
        var range = $("#sliderVal").text();

        $.ajax({
            url: api.host+api.url+"?partner_no="+partner_no,
            type: api.type,
            data: '{"id":"'+para.id+'","range":"'+range+'"}',
            success: function(json){
                $("#loadingToast").hide();
                $.checkJson(json);
                if(json.state === 10000){
                    // refresh page
                    get_dev_range();
                }
            }
        });
    };

    var btnHandle = function(){
        // jquery object
        var $btnRange = $("#btnRange"),
            $btnSubmit = $("#btnSubmit"),
            $btnDelete = $("#btnDelete"),
            $btnDevice = $("#btnDevice"),
            $delDialog = $("#delDialog"),
            $iosDialog = $("#iosDialog"),
            $rangeDialog = $("#rangeDialog");

        // 更新范围
        $btnSubmit.on('click', function(){
            var r = $rangeDialog.checkForm();
            if (r) { setRange(); }
        });

        // 探测范围显示&隐藏
        $btnRange.on('click', function(){
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

        // 删除设备弹框
        $btnDelete.on('click', function(){
            $delDialog.fadeIn(200);
        });
        $btnDevice.on('click', function(){
            delDevice();
        });
    };

    // Set api
    return {
        init: function(){
            get_dev_range();
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