var cookieEnabled=(navigator.cookieEnabled)? true : false

//if not IE4+ nor NS6+
if (typeof navigator.cookieEnabled=="undefined" && !cookieEnabled){ 
	document.cookie="testcookie"
	cookieEnabled=(document.cookie.indexOf("testcookie")!=-1)? true : false
}

if(typeof Object.create !== 'function'){
	Object.create = function(obj){
		function F(){};
		F.prototype = obj;
		return new F();
	}
}

//need to add click functions for hide and rememberHide
;(function($,window,document,undefined) {

	var Message = {
		init: function(options,elem){
			var self = this;
			self.elem = elem;
			self.$elem = $(elem);
			
			if(typeof options === 'string'){
				
			}else{
				self.delay = options.delay;
				self.speed = options.speed;
				self.position = options.position;
				self.rounded = options.rounded;
			}
			self.options = $.extend({},$.fn.message.options, options);
			if(!readCookie('hideMessage')){
				self.show();
			}
			
		},
		show: function(){
			this.$elem.delay(this.delay).animate({'right':10},this.speed, this.showCallback);
		},
		hide: function(e){
			e.preventDefault();
			this.$elem.animate({'right':-450},this.speed);
		},
		rememberHide: function(e){
			e.preventDefault();
			this.$elem.animate({'right':-450},this.speed);
			createCookie('hideMessage',true,90);
		}
	};
		
	$.fn.message = function(options) {
		return this.each(function(){
			var message = Object.create(Message);
			message.init(options,this);
		});
	};
	
	$.fn.message.options = {
		delay: 500,
		speed: 750,
		position: 'topRight',
		rounded: false
	};


})(jQuery,window,document);

$('#magic-message').message({
	delay: 1000,
	speed: 500
});



function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}