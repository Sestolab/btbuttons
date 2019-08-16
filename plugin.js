CKEDITOR.plugins.add('btbuttons', {
	requires: 'dialog',
	lang: 'en,ru,uk',
	icons: 'btbuttons',

	init: function(editor){
		editor.addCommand('btbuttons', new CKEDITOR.dialogCommand('btbuttonsDialog', {
			allowedContent: 'button[!class,type]; a[!href,!class,target,role]; input[!class,!value,!type]'
		}));

		editor.ui.addButton('btbuttons', {
			label: editor.lang.btbuttons.label,
			command: 'btbuttons'
		});

		if (editor.contextMenu){
			editor.addMenuGroup('btbuttonsGroup');
			editor.addMenuItem('btbuttonsItem', {
				label: editor.lang.btbuttons.label,
				icon: this.path + 'icons/btbuttons.png',
				command: 'btbuttons',
				group: 'btbuttonsGroup'
			});

			editor.contextMenu.addListener(function(element){
				if (element.getAscendant({'button':1, 'a':1, 'input':1}, true))
					return { btbuttonsItem: CKEDITOR.TRISTATE_OFF };
			});
		}

		CKEDITOR.dialog.add('btbuttonsDialog', this.path + 'dialogs/btbuttons.js');
	}
});