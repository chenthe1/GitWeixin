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
            shopList: {host:G.apiHost||'',url:'../assets/data/shopList.json',type:'get'},
            update: {host:G.apiHost||'',url:'../assets/data/update.json',type:'post'},
        }
    };

    // Page jquery object
    var $shop = $("#shopList"),
        $shopMenu = $("#shopMenu"),
        $form = $("#form"),
        partner_no = "025xw000141";

    // 创建元素
    var createEle = function(data){
        var len = data.length,
            html = "", html2 = "";

        for(var i=0; i<len; i++){
            // use to list
            html += "<a class='weui-cell weui-cell_access' href='"+data[i].id+"'>";
            html += "<div class='weui-cell__hd'>";
            html += "<span class='icon icon-small'><span class='icon-desktop'></span></span>";
            html += "</div>";
            html += "<div class='weui-cell__bd'><p>"+data[i].name+"</p></div>";
            html += "<div class='weui-cell__ft'></div>";
            html += "</a>";
            // use to dropdown
            html2 += "<li>";
            html2 += "<a href='javascript:;' class='shop' data-id='"+data[i].id+"'>"+data[i].name+"</a>";
            html2 += "</li>";
        }

        $shop.html(html);
        $shopMenu.html(html2);
    };

    // 获取店铺列表
    var get_shop_list = function(){
        var api = config.api.shopList;

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

    // Dialog
    // var dialog = function(bd){
    //     var dislogMsg = $(".weui-dialog__bd",$dialog);

    //     dislogMsg.text(bd);
    //     $dialog.fadeIn(200);

    //     $dialog.on('click', '.weui-dialog__btn', function(){
    //         $dialog.fadeOut(200);
    //     });
    // };

    // 验证表单
    // var checkForm = function(){
    //     var flag = true;

    //     var mac = $("[name='mac']"),
    //         name = $("[name='name']");

    //     var reg1 = /^[\w~\!@#\$%\^&\*\-\u2E80-\u9FFF]{1,10}$|^[\w~\!@#\$%\^&\*\-]{1,31}$/,
    //         reg2 = /^[\w~\!@#\$%\^&\*]{6,31}$/;

    //     if(!reg1.test(mac.val())){
    //         dialog(mac.attr("data-bd"));
    //         return false;
    //     }
    //     if(!reg2.test(name.val())){
    //         dialog(name.attr("data-bd"));
    //         return false;
    //     }

    //     return flag;
    // };

    // 提交表单
    var setForm = function(){
        var api = config.api.update;
        $("#loadingToast").show();

        $.ajax({
            url: api.host+api.url+"?partner_no="+partner_no,
            type: api.type,
            data: $form.packJson(),
            // data: '{"name":"'+1+'","mac":"'+2+'"}',
            success: function(json){
                $("#loadingToast").hide();
                $.checkJson(json);
                if(json.state === 10000){
                    $form[0].reset();
                    get_shop_list();
                }
            }
        });
    };

    var btnHandle = function(){
        // ios
        var $iosMask = $('#iosMask'),
            $iosActionsheet = $('#iosActionsheet'),
            $iosDialog = $('#iosDialog'),
            $btnAdd = $("#btnAdd"),
            $btnCancel = $("#btnCancel"),
            $btnSubmit = $("#btnSubmit"),
            $btnDropdown = $(".dropdown-btn");

        // 隐藏菜单
        function hideActionSheet() {
            $iosActionsheet.removeClass('weui-actionsheet_toggle');
            $iosMask.fadeOut(200);
        }

        $iosMask.on('click', hideActionSheet);
        $btnCancel.on('click', hideActionSheet);

        // 显示菜单
        $btnAdd.on("click", function(){
            $iosActionsheet.addClass('weui-actionsheet_toggle').css({"height":"90%"}).show();
            $iosMask.fadeIn(200);
        });

        // 提交表单
        $btnSubmit.on('click', function(){
            var r = $form.checkForm();
            if (r) { setForm(); }
        });

        // 弹框信息提示
        $iosDialog.on('click', '.weui-dialog__btn', function(){
            $iosDialog.fadeOut(200);
        });

        // dropdown
        $('.dropdown-toggle').dropdown();

        // 下拉选择
        $shopMenu.on('click', '.shop', function(){
            $("[name='name']").val($(this).text());
            $("[name='id']").val($(this).attr('data-id'));
        });
    };

    // Set api
    return {
        init: function(){
            get_shop_list();
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