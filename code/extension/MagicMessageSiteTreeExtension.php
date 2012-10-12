<?php

	class MagicMessageSiteTreeExtension extends DataExtension{
		
		static $db = array(
			'HideMessages' => 'Boolean'
		);
		
		static $has_one = array(
			'MagicMessage' => 'MagicMessage'
		);

		
		public function updateCMSFields(FieldList $fields) {
			
			$manager = new DropdownField(
				'MagicMessageID',
				'Magic Message',
				DataObject::get('MagicMessage')->map('ID','Title','Select a message to show')
			);
			
			// show messages
			$fields->addFieldToTab('Root.Content.Message', $manager);
	
		}
		
	}