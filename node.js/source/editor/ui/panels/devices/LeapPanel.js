"use strict";

function LeapPanel(parent, obj)
{
	Panel.call(this, parent, obj);

	//Self pointer
	var self = this;

	//Mode
	this.form.addText("Mode");
	this.mode = new DropdownList(this.form.element);
	this.mode.size.set(80, 18);
	this.mode.addValue("Desk", Script.INIT);
	this.mode.addValue("HMD", Script.LOOP);
	this.mode.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.mode = self.mode.getSelectedIndex();
		}
	});
	this.form.add(this.mode);
	this.form.nextRow();

	//Debug model
	this.debugModel = new CheckBox(this.form.element);
	this.form.addText("Debug model");
	this.debugModel.size.set(20, 15);
	this.debugModel.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.debugModel = self.debugModel.getValue();
		}
	});
	this.form.add(this.debugModel);
	this.form.nextRow();

	//Gestures Enabled
	this.gesturesEnabled = new CheckBox(this.form.element);
	this.form.addText("Gestures Enabled");
	this.gesturesEnabled.size.set(20, 15);
	this.gesturesEnabled.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.gesturesEnabled = self.gesturesEnabled.getValue();
		}
	});
	this.form.add(this.gesturesEnabled);
	this.form.nextRow();

	//Poses Enabled
	this.posesEnabled = new CheckBox(this.form.element);
	this.form.addText("Poses Enabled");
	this.posesEnabled.size.set(20, 15);
	this.posesEnabled.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.posesEnabled = self.posesEnabled.getValue();
		}
	});
	this.form.add(this.posesEnabled);

	//Update form
	this.form.updateInterface();
}

//Super prototypes
LeapPanel.prototype = Object.create(Panel.prototype);

//Update panel content from attached object
LeapPanel.prototype.updatePanel = function()
{
	Panel.prototype.updatePanel.call(this);
	
	if(this.obj !== null)
	{
		this.mode.setSelectedIndex(this.obj.mode);
		this.debugModel.setValue(this.obj.debugModel);
		this.gesturesEnabled.setValue(this.obj.gesturesEnabled);
		this.posesEnabled.setValue(this.obj.posesEnabled);
	}
}
