<?php

	class MagicMessageManager extends ModelAdmin{
		
		public static $managed_models = array(
			'MagicMessage'
		);
		
		static $url_segment = 'magic-message';
		static $menu_title = 'Magic Message';
		
	}