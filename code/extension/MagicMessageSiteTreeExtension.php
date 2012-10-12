<?php

	class MagicMessageSiteTreeExtension extends DataObjectDecorator{
		
		function extraStatics(){
			return array(
				'db' => array(
					'HideMessages' => 'Boolean'
				),
				'has_one' => array(
					'MagicMessage' => 'MagicMessage'
				)
			);
		}
		
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