Ext.define('FeedbackForm',{
	extend: 'Ext.form.Panel',
	border : false,
	
	initComponent : function(){
		this.store = Ext.create('Ext.data.Store', {
			fields: ['FA'],
			data: [{'FA' : 'Installation'},{'FA' :  'Interface'},{'FA' :  'Performance'},{'FA' :  'Documentation'}]
		 });
		 
		Ext.apply(this,{
			width : 400,
			defaults : {
				margin  :  '20 0 0 20'
			},
			items : [
				{
					xtype : 'textfield',
					name : 'nameField',
					fieldLabel : 'Name',
					allowBlank : false,
					anchor : '100%',
					blankText : 'This field is required',
					emptyText : 'Your name',
					vtype : 'alpha',
					maxLength : 50
				},
				{
					xtype : 'textfield',
					name : 'emailField',
					fieldLabel : 'Email',
					allowBlank : false,
					anchor : '100%',
					blankText : 'This field is required',
					emptyText : 'Your email address',
					vtype : 'email',
					maxLength : 50
				},
				{
					xtype : 'combobox',
					name : 'FAField',
					fieldLabel : 'Functional Area ',
					allowBlank : false,
					store : this.store,
					displayField : 'FA',
					anchor : '100%',
					mode : 'local',
					triggerAction : 'all'
				},
				{
					xtype : 'textareafield',
					grow : true,
					allowBlank : false,
					fieldLabel : 'Comments ',
					name      : 'comments',
					anchor    : '100%'
				},
				{
					xtype : 'container',
					layout : {
						type : 'hbox',
						pack : 'end'
					},
					items : [
						{
							xtype : 'button',
							text : 'Submit',
							scope : this,
							handler : this.submitForm
						},
						{
							xtype : 'button',
							text : 'Reset',
							margin : '0 0 0 20',
							scope : this,
							handler : this.resetForm
						}
					]
				}
			]
		});
		this.callParent(arguments);
	},
	
	afterRender: function(){
		this.callParent(arguments);
	},
	
	submitForm: function(){
		if(this.isValid()) {
			var formObj = this.getForm().getValues();
			Ext.Ajax.request({
				url: 'feedback/submit',
				method: 'GET',
				scope : this,
				params: {
					name: formObj.nameField,
					email: formObj.emailField,
					feedback : formObj.comments
				},
				success: function(status, response){
					var s = status.responseText;
					if(s == '1') {
						Ext.Msg.alert('Thank you','Your Feedback is very valuable !');
						this.resetForm();
					}
				}
			});
		}
	},
	
	resetForm: function(){
		this.getForm().reset();
	}
});