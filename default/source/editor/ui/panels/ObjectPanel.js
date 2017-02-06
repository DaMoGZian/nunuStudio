"use strict";

function ObjectPanel(parent)
{
	Panel.call(this, parent);

	//Self pointer
	var self = this;

	//Visible
	this.visible = new CheckBox(this.form.element);
	this.visible.setText("Visible");
	this.visible.size.set(200, 15);
	this.visible.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.visible = self.visible.getValue();
		}
	});
	this.form.add(this.visible);
	this.form.nextRow();

	//Static
	this.static = new CheckBox(this.form.element);
	this.static.setText("Static Object");
	this.static.size.set(200, 15);
	this.static.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.matrixAutoUpdate = !(self.static.getValue());
		}
	});
	this.form.add(this.static);
	this.form.nextRow();

	//Cast shadow
	this.cast_shadow = new CheckBox(this.form.element);
	this.cast_shadow.setText("Cast Shadow");
	this.cast_shadow.size.set(200, 15);
	this.cast_shadow.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.castShadow = self.cast_shadow.getValue();
		}
	});
	this.form.add(this.cast_shadow);
	this.form.nextRow();

	//Receive shadow
	this.receive_shadow = new CheckBox(this.form.element);
	this.receive_shadow.setText("Receive Shadow");
	this.receive_shadow.size.set(200, 15);
	this.receive_shadow.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.receiveShadow = self.receive_shadow.getValue();
		}
	});
	this.form.add(this.receive_shadow);
	this.form.nextRow();

	//Type
	this.form.addText("Type");
	this.type = this.form.addText("null");

	//Update form
	this.form.updateInterface();
}

//Super prototypes
ObjectPanel.prototype = Object.create(Panel.prototype);

//Update panel content from attached object
ObjectPanel.prototype.updatePanel = function()
{
	Panel.prototype.updatePanel.call(this);

	if(this.obj !== null)
	{
		this.visible.setValue(this.obj.visible);
		this.static.setValue(!this.obj.matrixAutoUpdate);
		this.cast_shadow.setValue(this.obj.castShadow);
		this.receive_shadow.setValue(this.obj.receiveShadow);
		this.type.setText(this.obj.type);
	}
}
