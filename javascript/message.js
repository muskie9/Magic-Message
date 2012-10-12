var cookieEnabled=(navigator.cookieEnabled)? true : false

//if not IE4+ nor NS6+
if (typeof navigator.cookieEnabled=="undefined" && !cookieEnabled){ 
	document.cookie="testcookie"
	cookieEnabled=(document.cookie.indexOf("testcookie")!=-1)? true : false
}

$(window).load(function(){
	
	if(cookieEnabled==false){//check that cookies are enabled
		$('#nomessage').hide();
	}else if(!readCookie('hideMessage')){//check if cookie exists/is valid
		$('#magic-message').delay(500).animate({'right':10}, 750);
	}else{
		$('#magic-message-container').hide();
	}
	
	$('#page, #footer').css({'position':'relative','z-index':5});
	
	
	$('#messageclose').click(function(e){
		e.preventDefault();
		$('#magic-message').animate({'right':-450},750, function(){
			
		});
	});
	
	$('#nomessage').click(function(a){
		a.preventDefault();
		$('#magic-message').animate({'right':-450},750);
		createCookie('hideMessage',true,90);
	});
	
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

/*;(function($, doc, win) {
	"use strict";
	
	var name = 'message-clip';
	
	function Message(el, opts) {
		//keep track of passed DOM elements
		this.$el  = $(el);
		this.opts = opts;
		
		//set defaults
		this.defaults = {
			delay: 500,//time before entering
			speed: 750,//animation time (enter and exit)
			position: 'topRight',//animation position (topRight, bottomRight, bottomLeft, topLeft)
			backgroundColor: '#FFFFEB',//background color of message box
			//backgroundImage: null,//background image
			borderStyle: 'solid',
			borderWidth: 1,
			borderColor: null,
			color: '#17365D',
			rounded: false,
			showCallback: function(){},
			hideCallback: function(){}
		};
		
		var meta  = this.$el.data(name+'-opts');
		this.opts = $.extend(this.defaults, opts, meta);
		this.$el.data(name, this);
		
		//keep track of sub-elements for performance
		this.$message = this.$el.find('.message');
		this.$close = this.$el.find('.message-close');
		this.$remember = this.$el.find('.no-message');
		
		this.init();
	}
	
	message.prototype.init = function() {
		var self = this;
		var opts = this.opts;
		
		var cookieName = 'hideMessage';//cookie name
		var cookieValue = true;//cookie value
		var cookieExpiry = 90;//cookie expiry in days
		
		window.on('load', function(){
			self.showbox();
		});
		
		this.$close.on('click.'+name, function(e){
			e.preventDefault();
			self.hideBox();
		});
	};
		
	//show box
	message.prototype.showBox = function(){
		this.$message.delay(opts.delay).animate({'right':0}, speed, showCallback);
	}
	
	//hide box
	message.prototype.hideBox = function(){
		this.$message.animate({'right':-450}, speed, hideCallback);
	}
	
	//remember hide
	message.prototype.rememberHide = function(){
		dontShow(cookieName,cookieValue,cookieExpiry);
	}
	
	$.fn.message = function(opts) {
		return this.each(function() {
		new message(this, opts);
	});
};

})(jQuery, document, window);

$('#message').message();

console.log($('#mywidget').data('message-clip'));
*/

