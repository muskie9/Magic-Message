<?php

	class MagicMessage extends DataObject{
		
		static $db = array(
			'Title' => 'HTMLVarchar(255)',
			'Message' => 'HTMLText',
			'Delay' => 'Int',
			'Speed' => 'Int',
			'Position' => "Enum('TopRight,BottomRight,BottomLeft,TopLeft')",
			'Rounded' => 'Boolean',
			'AllPages' => 'Boolean'
		);
		
		static $has_one = array(
			'BackgroundImage' => 'Image'
		);
		
		static $has_many = array(
			'Pages' => 'SiteTree'
		);
		
		static $default_sort = 'Title ASC';
		
		static $summary_fields = array(
			'Title'=>'Title',
			'Message' => 'Message'
		);
		
		public function getCMSFields(){
			
			$fields = new FieldSet();
			
			$fields->push(new TextField('Title'));
			$fields->push(new CheckboxField('AllPages','Show on all pages'));
			$fields->push(new NumericField('Delay','Delay (miliseconds)'));
			$fields->push(new NumericField('Speed','Speed (slide in/out speed [miliseconds])'));
			$fields->push(new CheckboxField('Rounded','Rounded corners'));
			$fields->push(new DropdownField(
				'Position',
				'Message Position',
				$this->dbObject('Position')->enumValues()
			));
			$fields->push(new HTMLEditorField('Message'));
			
			return $fields;
			
		}
		
	}