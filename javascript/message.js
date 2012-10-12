var cookieEnabled=(navigator.cookieEnabled)? true : false

//if not IE4+ nor NS6+
if (typeof navigator.cookieEnabled=="undefined" && !cookieEnabled){ 
	document.cookie="testcookie"
	cookieEnabled=(document.cookie.indexOf("testcookie")!=-1)? true : false
}

//need to add click functions for hide and rememberHide
;(function($,window,document,undefined) {
	"use strict";
	
	var name = 'magic-message';
	
	function Message(elem, options) {
		this.$elem = $(elem);
		
		this.defaults = {
			delay: 500,
			speed: 750,
			position: 'topRight',
			rounded: false,
			hideExpiry: 90,//in days
			messageCookie: 'magicMessage',
			showCallback: function(){},
			hideCallback: function(){}
		};
		
		var meta = this.$elem.data(name+'-options');
		this.options = $.extend(this.defaults,options,meta);
		
		this.$elem.data(name,this);
		
		this.$close = this.$elem.find('#messageclose');
		this.$hide = this.$elem.find('#nomessage');
		
		this.init();
			
	}
	
	Message.prototype.init = function(){
		var self = this;
		
		//add entering action here
		if(cookieEnabled==false){//check that cookies are enabled
			$('#nomessage').hide();
		}else if(!readCookie('hideMessage')){//check if cookie exists/is valid
			$('#magic-message').delay(this.options.delay).animate({'right':10}, this.options.speed, this.options.showCallback);
		}else{
			$('#magic-message-container').hide();
		}
		
		this.$close.on('click.'+name,function(e){
			e.preventDefault();
			self.hideMessage();
		});
		
		this.$hide.on('click.'+name,function(e){
			e.preventDefault();
			self.rememberHideMessage();
		});
		
	}
	
	Message.prototype.hideMessage = function(){
		this.$elem.animate({'right':-450},this.options.speed,this.options.hideCallback);
	}
	
	Message.prototype.rememberHideMessage = function(){
		this.$elem.animate({'right':-450},this.options.speed,this.options.hideCallback);
		createCookie(this.options.messageCookie,true,this.options.hideExpiry);
	}
		
	$.fn.message = function(options) {
		return this.each(function(){
			new Message(this, options);
		});
	};

})(jQuery,window,document);

$('#magic-message').message({
	delay: 1000,
	speed: 500
});

console.log($('#magic-message').data('magic-message'));

function createCookie(name,value,days) {
	console.log(name+','+value+','+days);
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