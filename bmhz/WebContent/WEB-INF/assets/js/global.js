/*!
 * Setting Page Global
 * @Author Barry
 * @Last Update 2016-10-12
 */

'use strict';

// Set Default Parameter
var Global = window.Global = Global || {};
var Error = window.Error = Error || {};

// Global Config
(function($){

	'use strict';

	// Set Global parameter
	Global = {
		rootPath: '/box',								// Root directory path
		assetsPath: '/assets',							// Assets path
		apiHost: '',									// API host
		page: {
			logout: '/login/login.html',
		}
	};

	// Set Global Ajax Setup
	$.ajaxSetup({
        dataType: 'json',
        type: 'get',
	    contentType: 'application/json'
	});

	// Set Global Ajax Error
	$(document).ajaxError(function(event,xhr,options,exc){
		console.log('=======================================');
		console.log("[ Ajax Error ("+xhr.status+" / "+exc+") ]");
		console.log("url:         \""+options.url+"\"");
		console.log("data:        \""+options.data+"\"");
		console.log("type:        \""+options.type+"\"");
		console.log("contentType: \""+options.contentType+"\"");
		console.log("dataType:    \""+options.dataType+"\"");
		console.log('=======================================');
	});

	// Loading footer template
	var loadFooter = function(){
		var $footer = $("footer");

		$.ajax({
	        url: Global.rootPath + '/assets/inc/foot.html',
			dataType: 'html',
			type:'get',
			async: false,
			success: function(html){
				$footer.html(html);
			}
	    });
	};

	// Init
	$(document).ready(function(){
		loadFooter();
	});

})(jQuery);

// jQuery Methods Extend
(function($){
	'use strict'

	$.extend({
		// Format date  @Gang 2016-06-18 10:00
		dateFormat: function(value,secs){
			var timeStamp = value || 0, oDate = value || {}, string = value || '', yy = '', mm = '', dd = '', h = '', m ='', s = '';

			if (value){
				if (typeof value === 'string'){ 						// String - YYYY-MM-DD HH:MM:SS
					oDate = new Date((value).replace(/-/g,"/"));
					timeStamp = oDate.getTime();
				}
				else if (typeof value === 'number'){					// TimeStamp
					oDate = new Date(value);
					timeStamp = value;
				}
				else if (typeof value === 'object'){					// Date Object
					oDate = value;
					timeStamp = oDate.getTime();
				}

				if (secs){
					timeStamp += secs * 1000;
					oDate = null;
					oDate = new Date(timeStamp);
				}

				yy = oDate.getFullYear();
				mm = oDate.getMonth()+1;
				dd = oDate.getDate();
				h = oDate.getHours();
				m = oDate.getMinutes();
				s = oDate.getSeconds();

				mm = (mm < 10)?'0'+mm : mm;
				dd = (dd < 10)?'0'+dd : dd;
				h = (h < 10)?'0'+h : h;
				m = (m < 10)?'0'+m : m;
				s = (s < 10)?'0'+s : s;

				string = yy+"-"+mm+"-"+dd+" "+h+":"+m+":"+s;
			}
			// console.log('oDate - '+oDate);
			// console.log('string - '+string);
			// console.log('timeStamp - '+timeStamp);

			return {timeStamp:timeStamp, stardard:oDate ,string:string, ymd: yy+'-'+mm+'-'+dd, time: h+':'+m, year:yy, month:mm, day:dd, hour:h, minute:m, second:s};
		},

		// Toast
		// toast: function(json,options){
		// 	var opts = $.extend(true, {
		// 		msg: '已完成',
		// 		icon: 'weui_icon_toast',
		// 		time: 2000
		// 	}, options);

		// 	var $toast = $('#toast'), divHtml = "";

		// 	divHtml += "<div id='toast' style='display:none'>";
		// 	divHtml += "<div class='weui_mask_transparent'></div>";
		// 	divHtml += "<div class='weui_toast'>";
		// 	divHtml += "<i class='"+opts.icon+"'></i>";
		// 	divHtml += "<p class='weui_toast_content'>"+opts.msg+"</p>";
		// 	divHtml += "</div>";
		// 	divHtml += "</div>";

		// 	// show
		// 	if ($toast.css('display') != 'none') return;

		// 	$toast.fadeIn(100);

		// 	setTimeout(function () {
		// 		$toast.fadeOut(100);
		// 	}, opts.time);
		// },

		// Loading
		// showLoad: function(options){
		// 	var opts = $.extend(true, {
		// 		msg: '数据加载中'
		// 	}, options);

		// 	var $wrap = $('body'), divHtml = "";
		// 	// var $loadingToast = $('#loadingToast');

		// 	divHtml += "<div id='loadingToast'>";
		// 	divHtml += "<div class='weui-mask_transparent'></div>";
		// 	divHtml += "<div class='weui-toast'>";
		// 	divHtml += "<i class='weui-loading weui-icon_toast'></i>";
		// 	divHtml += "<p class='weui-toast__content'>"+opts.msg+"</p>";
		// 	divHtml += "</div>";
		// 	divHtml += "</div>";

		// 	wrap.addClass("load-mask").append(divHtml);

		// 	// if ($loadingToast.css('display') != 'none') return;
		// 	// $loadingToast.fadeIn(100);
		// },

		// Check json from API Response @Barry
		checkJson: function(json,options,fn){
			var opts = $.extend(true,{
				time: 2000,
				icon: "weui-icon_toast",
				show: true
			},options);

			var $toast = $("#toast"),
				$toastMsg = $(".weui-toast__content",toast),
				$toastIcon = $("i",toast),
				rstCode = json.state;

			// Set alert content
			var icon = (rstCode === 10000) ? 'weui-icon-success-no-circle' : 'weui-icon-warn',
				msg = (rstCode === 10000) ? '已完成' : json.message;

			if ($toast.css('display') != 'none') return;

			$toastMsg.text(msg);
			$toastIcon.addClass(icon);

			$toast.fadeIn(100);
            setTimeout(function () {
                $toast.fadeOut(100);
            }, opts.time);

			if (fn){ fn(json); }

			return rstCode===10000&&true || false;
		},

		// Get url parameter
		getUrlPara: function (paramName) {
            var searchString = window.location.search.substring(1),
                i, val, params = searchString.split("&");

            for (i = 0; i < params.length; i++) {
                val = params[i].split("=");
                if (val[0] == paramName) {
                    return unescape(val[1]);
                }
            }
            return null;
        }

	});

})(jQuery);

// jQuery Object Extend
(function($){
	'use strict'

	// Package form's data to json @Gang 2016-07-01
	$.fn.packJson = function(options){
		var defaults = {
				type: 'string',			// string - json string, object - json object,
				checkbox: 'array',		// array - checkbox array, string - checkbox string
				sep: '.',				// Multi-Object split string
				filterNull: false,		// Filter null value or not
				filterHidden: false,	// Filter hidden element or not
				filterShown: false,		// Filter shown element or not
				filter: []				// Filter elements ['element name']
			},
			opts = $.extend(defaults,options),
			form = $(this),
			json = {};

		// Set element value
		var setVal = function(val,dataType){
			if (dataType === 'number'){
				val = (parseFloat(val)) ? parseFloat(val) : 0;
			}
			else if (dataType === 'array'){
				val = (val) ? val.split(',') : [];
			}
			else {}
			return val;
		};

		$(":input",form).each(function(i){

			var self = $(this),
				name = self.attr("name"),
				type = self.attr("type"),
				val = self.val(),
				checked = self.prop('checked');

			// Trim blank space
			if (type === 'text'){ val = $.trim(val); if (val === ''){ self.val(''); } }

			// Filter Button and Name is null and Filter list
			if (self.is('button') || !name || opts.filter.toString().indexOf(name)>=0){ return true; }

			// Filter Config for filterNull , filterHidden, filterShown , Data-ignore
			if ((opts.filterShown && type != 'hidden') || (opts.filterHidden && type === 'hidden') || (opts.filterNull && (!val || ((type==='checkbox'||type==='radio')&&!checked)) ) || (self.attr('data-ignore')==='true'?true:false)){ return true; }

			// Set value data
			val = setVal(val,self.attr('data-type'));

			// Set field object and key;
			var obj = json, key = name;

			// Handle Multi-Object
			if (opts.sep){
				if (name.indexOf(opts.sep) > 0){
					var arr = name.split(opts.sep);
					for (var j=0, len=arr.length; j<len; j++){
						key = arr[j];
						if (j < (len-1)){
							if (!obj[key]){ obj[key] = {}; }
							obj = obj[key];
						}
					}
				}
			}

			// Push Value
			if (type === 'checkbox'){
				if (obj[key] === undefined){ obj[key] = opts.checkbox === 'array'? [] : ''; }
				if (checked){
					if (opts.checkbox === 'array'){
						obj[key].push(val);
					}
					else {
						obj[key] += (obj[key]!=''?',':'') + val;
					}
				}
			}
			else if (type === 'radio'){
				obj[key] = checked ? val : ( obj[key] === undefined ? '' : obj[key] );
			}
			else {
				obj[key] = val;
			}

		});

		var jsonStr = JSON.stringify(json);
		// console.log(jsonStr);
		// console.log(/^\{\}$/.test(jsonStr)? '' : (opts.type === 'string'? jsonStr : json));
		return /^\{\}$/.test(jsonStr)? '' : (opts.type === 'string'? jsonStr : json);
	};

	// Check Form values are consistent with the rules @barry 2016-10-17
	$.fn.checkForm = function(options){
		var defaults = {
				type: 1, // 1-dialog, 2-icon
			},
			opts = $.extend(defaults,options),
			form = $(this),
			flag = true,
			dialog = $('#iosDialog'),
			dislogMsg = $(".weui-dialog__bd",dialog);

		// 验证规则
		var rules = {
		    "name": /^[\w~\!@#\$%\^&\*\-\u2E80-\u9FFF]{1,10}$|^[\w~\!@#\$%\^&\*\-]{1,31}$/,
			"mac": /^[\w~\!@#\$%\^&\*]{6,31}$/,
		};

		$(":input",form).each(function(i){
			var self = $(this),
				param = self.attr('data-rule'),
				msg = self.attr('data-msg'),
				val = self.val(),
				icon = $("i",self.parent().next());

			if (!rules[param]){ return true; }
			var regs = new RegExp(rules[param],'i');

			if (type === 1){
				if (!regs.test(val)) {
					flag = false;
					dislogMsg.text(msg);
			        dialog.fadeIn(200);
				}
			} else {
				icon.removeClass().addClass(regs.test(val)?"weui-icon-success":"weui-icon-warn");
			}

			return flag;
		});

		return flag;
	};

})(jQuery);

/* =============================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * =============================================
 */
+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);
