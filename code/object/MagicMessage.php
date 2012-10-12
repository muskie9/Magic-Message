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
			
			// Image - custom upload
			$ImageField = new UploadField('BackgroundImage', 'Image');
			$ImageField->getValidator()->allowedExtensions = array('jpg', 'gif', 'png');
			$ImageField->setFolderName('Uploads/MagicMessage');
			
			return new FieldList(
				new TextField('Title'),
				new CheckboxField('AllPages','Show on all pages'),
				new NumericField('Delay','Delay (miliseconds)'),
				new NumericField('Speed','Speed (slide in/out speed [miliseconds])'),
				new CheckboxField('Rounded','Rounded corners'),
				new DropdownField(
					'Position',
					'Message Position',
					$this->dbObject('Position')->enumValues()
				),
				$ImageField,
				new HTMLEditorField('Message')
			);
			
		}
		
		public function TitlePadding(){
			$width = $this->BackgroundImage()->getWidth();
			return $width+15;
		}
		
		// Set permissions, allow all users to access
		function canCreate($member=null) {return true;}
		function canView($member=null) {return true;} 
		function canEdit($member=null) {return true;} 
		function canDelete($member=null) {return true;}
		
	}