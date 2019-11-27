CKEDITOR.dialog.add('btbuttonsDialog', function(editor){
	var lang = editor.lang.btbuttons,
		style = /btn-[d-w].[^\s]+/g,
		state = /active|disabled/;
	return {
		title: lang.title,
		minWidth: 450,
		minHeight: 200,
		contents: [
			{
				id: 'tab-basic',
				label: lang.tabBasic,
				elements: [
					{
						id: 'txt',
						type: 'text',
						required: true,
						label: lang.txtLabel,
						setup: function(element){
							this.setValue(element.getText().trim());
						},
						commit: function(element){
							element.setText(this.getValue() || 'Button');
						}
					},
					{
						type: 'hbox',
						children: [
							{
								id: 'style',
								type: 'select',
								label: lang.styleLabel,
								items: [
									[lang.btnPrimary, 'btn-primary'],
									[lang.btnSecondary, 'btn-secondary'],
									[lang.btnSuccess, 'btn-success'],
									[lang.btnDanger, 'btn-danger'],
									[lang.btnWarning, 'btn-warning'],
									[lang.btnInfo, 'btn-info'],
									[lang.btnLight, 'btn-light'],
									[lang.btnDark, 'btn-dark'],
									[lang.btnLink, 'btn-link']
								],
								default: 'btn-primary',
								setup: function(element){
									if(element.matchClass(style))
										this.setValue(element.matchClass(style)[0].replace('outline-', '') || 'btn-primary');
								},
								commit: function(element){
									if (!element.hasClass(this.getValue()))
										element.toggleClass(this.getValue(), style);
								}
							},
							{
								id: 'size',
								type: 'select',
								label: lang.sizeLabel,
								items: [
									[lang.btnSM, 'btn-sm'],
									[lang.btnN, ''],
									[lang.btnLG, 'btn-lg']
								],
								setup: function(element){
									this.setValue(element.matchClass(/btn-(lg|sm)/g) || '');
								},
								commit: function(element){
									if (!element.hasClass(this.getValue()))
										element.toggleClass(this.getValue(), /btn-(lg|sm)/g);
								}
							},
							{
								id: 'state',
								type: 'select',
								label: lang.stateLabel,
								items: [
									[lang.active, 'active'],
									[lang.notSet, ''],
									[lang.disabled, 'disabled']
								],
								setup: function(element){
									this.setValue(element.matchAttribute(state) || element.matchClass(state) || '');
								}
							}
						]
					},
					{
						type: 'hbox',
						children: [
							{
								id: 'outline',
								type: 'checkbox',
								label: lang.outlinelLabel,
								setup: function(element){
									this.setValue(element.matchClass(/btn-outline-[^\s]+/));
								},
								commit: function(element){
									if (this.getValue())
										element.toggleClass(this.getDialog().getValueOf('tab-basic', 'style').replace('-', '-outline-'), style);
								}
							},
							{
								id: 'block',
								type: 'checkbox',
								label: lang.blockLabel,
								setup: function(element){
									this.setValue(element.hasClass('btn-block'));
								},
								commit: function(element){
									element.toggleClass((this.getValue() != element.hasClass('btn-block')) ? 'btn-block' : null);
								}
							}
						]
					}
				]
			},

			{
				id: 'tab-link',
				label: lang.tabLink,
				elements: [
					{
						id: 'url',
						type: 'text',
						label: 'URL',
						setup: function(element){
							this.setValue(element.getAttribute('href'));
						},
						commit: function(element){
							if (this.getValue()){
								element.renameNode('a');
								element.setAttributes({'href': this.getValue(), 'role': 'button'});
								element.removeAttributes(['value', 'disabled', 'active']);
								if (this.getDialog().getValueOf('tab-basic', 'state'))
									element.addClass(this.getDialog().getValueOf('tab-basic', 'state'));
							}
						}
					},
					{
						id: 'target',
						type: 'select',
						label: lang.targetLabel,
						items: [
							[lang.notSet, ''],
							[lang.targetBlank, '_blank'],
							[lang.targetTop, '_top'],
							[lang.targetSelf, '_self'],
							[lang.targetParent, '_parent']
						],
						setup: function(element){
							this.setValue(element.getAttribute('target') || '');
						},
						commit: function(element){
							if (element.is('a') && element.getAttribute('target') != (this.getValue() || null))
								element.toggleAttribute('target', this.getValue());
						}
					},
					{
						id: 'download',
						type: 'checkbox',
						label: lang.downloadLabel,
						setup: function(element){
							this.setValue(element.hasAttribute('download'));
						},
						commit: function(element){
							if (element.is('a') && element.hasAttribute('download') != this.getValue())
								element.toggleAttribute('download');
						}
					}
				]
			},

			{
				id: 'tab-advanced',
				label: lang.tabAdvanced,
				elements: [
					{
						id: 'icon',
						type: 'text',
						label: lang.icon,
						setup: function(element){
							if (element.getFirst().$.nodeName == 'SPAN')
								this.setValue(element.getFirst().getAttribute('class'));
						},
						commit: function(element){
							if(this.getValue() && !this.getDialog().getValueOf('tab-advanced', 'input')){
								var icon = editor.document.createElement('span');
								icon.setHtml('&nbsp;');
								icon.insertBefore(element.getFirst());
								icon.setAttribute('class', this.getValue());
							}
						}
					},
					{
						type: 'hbox',
						children: [
							{
								id: 'id',
								type: 'text',
								label: 'id',
								setup: function(element){
									this.setValue(element.getId() || '');
								},
								commit: function(element){
									if (element.getId() != (this.getValue() || null))
										element.toggleAttribute('id', this.getValue());
								}
							},
							{
								id: 'name',
								type: 'text',
								label: 'name',
								setup: function(element){
									this.setValue(element.getNameAtt() || '');
								},
								commit: function(element){
									if (element.getNameAtt() != (this.getValue() || null))
										element.toggleAttribute('name', this.getValue());
								}
							},
							{
								id: 'type',
								type: 'select',
								width: '100%',
								label: 'type',
								items: [
									['button'],
									['submit'],
									['reset'],
									['checkbox'],
									['radio'],
								],
								default: 'button',
								setup: function(element){
									this.setValue(element.getAttribute('type') || 'button');
								},
								commit: function(element){
									if (element.getAttribute('type') != (this.getValue() || null))
										element.toggleAttribute('type', this.getValue());
								}
							}
						]
					},
					{
						type: 'hbox',
						widths: ['25%', '75%'],
						children: [
							{
								id: 'event',
								type: 'select',
								widths: ['0', '100%'],
								labelLayout: 'horizontal',
								items: [
									['onchange'],
									['onclick'],
									['onmouseover'],
									['onmouseout'],
									['onkeydown'],
									['onload']
								],
								default: 'onclick',
								setup: function(element){
									this.setValue(element.matchAttribute(new RegExp(this.getValues().join('|'))) || 'onclick');
								},
								onChange: function(){
									this.getDialog().getContentElement('tab-advanced', 'evalue').setup(this.getDialog().element);
								}
							},
							{
								id: 'evalue',
								type: 'text',
								label: '=',
								labelLayout: 'horizontal',
								labelStyle: 'display:block;padding: 4px 6px;',
								widths: ['1%', '99%'],
								setup: function(element){
									this.setValue(element.getAttribute(this.getDialog().getValueOf('tab-advanced', 'event')) || '');
								},
								commit: function(element){
									var event = this.getDialog().getValueOf('tab-advanced', 'event');
									if (element.getAttribute(event) != (this.getValue() || null))
										element.toggleAttribute(event, this.getValue());
								},
								onChange: function(){
									this.commit(this.getDialog().element);
								}
							}
						]
					},
					{
						id: 'input',
						type: 'checkbox',
						label: lang.inputTagLabel,
						setup: function(element){
						    this.setValue(element.is('input'));
						},
						commit: function(element){
							if (this.getDialog().getValueOf('tab-link', 'url'))
								return;
							if (this.getValue()){
						        element.renameNode('input');
						        element.setAttribute('value', element.getText());
						    }else{
						        element.removeAttribute('value');
						        element.renameNode('button');
							}
							element.rmClass(state).removeAttributes(['href', 'role', 'target', 'disabled', 'active']);
							if (this.getDialog().getValueOf('tab-basic', 'state'))
								element.setAttribute(this.getDialog().getValueOf('tab-basic', 'state'), '');
						},
						onChange: function(){
							if (this.hasFocus() || this.isChanged())
								this.getDialog().getContentElement('tab-advanced', 'icon').toggleState();
						}
					}
				]
			}
		],

		onShow: function(){
			var element = editor.getSelection().getStartElement();
			if (element)
				element = element.getAscendant({'button':1, 'a':1, 'input':1}, true);
			if (!element){
				element = editor.document.createElement('button');
				this.insertMode = true;
			}else
				this.insertMode = false;
			this.element = element;
			if (!this.insertMode)
				this.setupContent(this.element);
		},

		onOk: function(){
			this.element.toggleClass(!this.element.hasClass('btn') ? 'btn' : null);
			this.commitContent(this.element);
			if (this.insertMode)
				editor.insertElement(this.element);
		}
	};
});