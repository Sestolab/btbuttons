CKEDITOR.plugins.add('btbuttons', {
	requires: 'dialog,smethods',
	lang: 'en,ru,uk',
	icons: 'btbuttons,rmbtbuttons',

	init: function(editor){
		editor.addCommand('btbuttons', new CKEDITOR.dialogCommand('btbuttonsDialog', {
			allowedContent: 'button[!class,type]; a[!href,!class,target,role]; input[!class,!value,!type]'
		}));
		editor.addCommand('rmbtbuttons', {
			exec: function(editor){
				editor.getSelection().getStartElement().rmClass(/(btn([^\s]+|\b))|(active|disabled)/g).removeAttributes(['role', 'type']);
			}
		});

		editor.ui.addButton('btbuttons', {
			label: editor.lang.btbuttons.label,
			command: 'btbuttons'
		});

		if (editor.contextMenu){
			editor.addMenuGroup('btbuttonsGroup');
			editor.addMenuItems({
				btbuttonsItem: {
					label: editor.lang.btbuttons.label,
					icon: 'btbuttons',
					command: 'btbuttons',
					group: 'btbuttonsGroup'
				},
				btbuttonsRemove: {
					label: editor.lang.btbuttons.remove,
					icon: 'rmbtbuttons',
					command: 'rmbtbuttons',
					group: 'btbuttonsGroup'
				}
			});

			editor.contextMenu.addListener(function(element){
				if (element.is('button', 'a', 'input') && !element.hasClass('badge'))
					return {
						btbuttonsItem: CKEDITOR.TRISTATE_OFF,
						btbuttonsRemove: element.hasClass('btn') ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
					};
			});
		}

		CKEDITOR.dialog.add('btbuttonsDialog', this.path + 'dialogs/btbuttons.js');
	}
});