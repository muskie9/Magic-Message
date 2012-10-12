<% require javascript(magicmessage/javascript/message.js) %>
<% require css(magicmessage/css/message.css) %>
<% control MagicMessage %>
<div id="magic-message-container">
	<div id="magic-message" class="typography" <% if Options %>data-widget-plugin-opts=""<% end_if %>>
			<a href="#" id="messageclose">Close</a>
			<h3>$Title</h3>
			$Message
			<a href="#" id="nomessage">Don't show again</a>
	</div>
</div>
<% end_control %>