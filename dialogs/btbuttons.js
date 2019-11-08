CKEDITOR.dialog.add('btbuttonsDialog', function(editor){
	var lang = editor.lang.btbuttons;
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
									var style = element.getAttribute('class');
									if(style && style.match(/btn-[^\s]+/i))
										this.setValue(style.match(/btn-[^\s]+/i)[0].replace('outline-', '') || 'btn-primary');
								},
								commit: function(element){
									if (this.getDialog().getValueOf('tab-basic', 'outline'))
										element.setAttribute('class', 'btn ' + this.getValue().replace('-', '-outline-'));
									else
										element.setAttribute('class', 'btn ' + this.getValue());
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
								default: '',
								setup: function(element){
									if(element.getAttribute('class'))
										this.setValue(element.getAttribute('class').match(/btn-(lg|sm)/gm) || '');
								},
								commit: function(element){
									if (this.getValue())
										element.addClass(this.getValue());
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
								default: '',
								setup: function(element){
									for(const state of this.items)
										if (element.hasClass(state[1]) || element.hasAttribute(state[1]))
											return this.setValue(state[1]);
								},
								commit: function(element){
									element.removeAttributes(['disabled', 'active']);
									if (this.getValue() && !element.hasAscendant('a', true))
										element.setAttribute(this.getValue(), '');
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
									if(element.getAttribute('class'))
										this.setValue(element.getAttribute('class').match(/btn-outline-[^\s]+/i));
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
									if (this.getValue())
										element.addClass('btn-block');
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
								element.removeAttributes(['value', this.getDialog().getValueOf('tab-basic', 'state')]);
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
						default: '',
						setup: function(element){
							this.setValue(element.getAttribute('target') || '');
						},
						commit: function(element){
							if (this.getValue() && element.hasAscendant('a', true))
								element.setAttribute('target', this.getValue());
							else
								element.removeAttribute('target');
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
							if (this.getValue() && element.hasAscendant('a', true))
								element.setAttribute('download', '');
							else
								element.removeAttribute('download');
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
									this.setValue(element.getAttribute('id') || '');
								},
								commit: function(element){
									if (this.getValue())
										element.setAttribute('id', this.getValue());
									else
										element.removeAttribute('id');
								}
							},
							{
								id: 'name',
								type: 'text',
								label: 'name',
								setup: function(element){
									this.setValue(element.getAttribute('name') || '');
								},
								commit: function(element){
									if (this.getValue())
										element.setAttribute('name', this.getValue());
									else
										element.removeAttribute('name');
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
									if (this.getValue() && !element.hasAscendant('a', true))
										element.setAttribute('type', this.getValue());
									else
										element.removeAttribute('type');
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
								widths: ["0", "100%"],
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
									for (const e of this.items)
										if (element.hasAttribute(e[0]))
											return this.setValue(e[0]);
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
								widths: ["1%", "99%"],
								setup: function(element){
									this.setValue(element.getAttribute(this.getDialog().getValueOf('tab-advanced', 'event')) || '');
								},
								commit: function(element){
									if (this.getValue())
										element.setAttribute(this.getDialog().getValueOf('tab-advanced', 'event'), this.getValue());
									else
										element.removeAttribute(this.getDialog().getValueOf('tab-advanced', 'event'));
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
							element.removeAttributes(['href', 'role']);
						},
						onChange: function(){
							if (this.getValue())
								this.getDialog().getContentElement('tab-advanced', 'icon').disable();
							else
								this.getDialog().getContentElement('tab-advanced', 'icon').enable();
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
			this.commitContent(this.element);
			if (this.insertMode)
				editor.insertElement(this.element);
		}
	};
});