"use strict";

function OrthographicCameraPanel(parent)
{
	Panel.call(this, parent);

	//Self pointer
	var self = this;
	
	//Size
	this.form.addText("Size");
	this.size = new NumberBox(this.form.element);
	this.size.size.set(80, 18);
	this.size.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.size = self.size.getValue();
			self.obj.updateProjectionMatrix();
		}
	});
	this.form.add(this.size);
	this.form.nextRow();

	//Camera resize Mode
	this.form.addText("Resize Mode");
	this.mode = new DropdownList(this.form.element);
	this.mode.size.set(130, 18);
	this.mode.addValue("Horizontal", OrthographicCamera.RESIZE_HORIZONTAL);
	this.mode.addValue("Vertical", OrthographicCamera.RESIZE_VERTICAL);
	this.mode.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.mode = self.mode.getSelectedIndex();
		}
	});
	this.form.add(this.mode);
	this.form.nextRow();

	//Select camera as scene default
	this.default = new CheckBox(this.form.element);
	this.default.setText("Use camera");
	this.default.size.set(200, 15);
	this.default.setOnChange(function()
	{
		if(self.obj !== null)
		{
			var scene = ObjectUtils.getScene(self.obj);
			if(scene !== null)
			{
				if(self.default.getValue())
				{
					scene.addCamera(self.obj);
				}
				else
				{
					scene.removeCamera(self.obj);
				}
			}
		}
	});
	this.form.add(this.default);
	this.form.nextRow();
	
	//Distance
	this.form.addText("Clipping planes");
	this.form.nextRow();

	//Near
	this.form.addText("Near");
	this.near = new NumberBox(this.form.element);
	this.near.size.set(60, 18);
	this.near.setStep(0.1);
	this.near.setRange(0, Number.MAX_SAFE_INTEGER);
	this.near.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.near = self.near.getValue();
		}
	});
	this.form.add(this.near);

	//Far
	this.form.addText("Far");
	this.far = new NumberBox(this.form.element);
	this.far.size.set(80, 18);
	this.far.setRange(0, Number.MAX_SAFE_INTEGER);
	this.far.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.far = self.far.getValue();
		}
	});
	this.form.add(this.far);
	this.form.nextRow();

	//Viewport
	this.form.addText("Viewport");
	this.form.nextRow();

	//Offset
	this.form.addText("Position");
	this.offset = new CoordinatesBox(this.form.element);
	this.offset.setMode(CoordinatesBox.VECTOR2);
	this.offset.setStep(0.05);
	this.offset.size.set(160, 20);
	this.offset.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.offset.copy(self.offset.getValue());
		}
	});
	this.form.add(this.offset);
	this.form.nextRow();

	//Size
	this.form.addText("Size");
	this.viewport = new CoordinatesBox(this.form.element);
	this.viewport.setMode(CoordinatesBox.VECTOR2);
	this.viewport.setStep(0.05);
	this.viewport.size.set(160, 20);
	this.viewport.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.viewport.copy(self.viewport.getValue());
		}
	});
	this.form.add(this.viewport);
	this.form.nextRow();

	//Clear color
	this.clear_color = new CheckBox(this.form.element);
	this.clear_color.setText("Clear color");
	this.clear_color.size.set(200, 15);
	this.clear_color.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.clear_color = self.clear_color.getValue();
		}
	});
	this.form.add(this.clear_color);
	this.form.nextRow();

	//Clear depth
	this.clear_depth = new CheckBox(this.form.element);
	this.clear_depth.setText("Clear depth");
	this.clear_depth.size.set(200, 15);
	this.clear_depth.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.clear_depth = self.clear_depth.getValue();
		}
	});
	this.form.add(this.clear_depth);
	this.form.nextRow();

	//Update form
	this.form.updateInterface();
}

//Super Prototypes
OrthographicCameraPanel.prototype = Object.create(Panel.prototype);

//Update panel content from attached object
OrthographicCameraPanel.prototype.updatePanel = function()
{
	Panel.prototype.updatePanel.call(this);
	
	if(this.obj !== null)
	{
		this.size.setValue(this.obj.size);
		this.mode.setSelectedIndex(this.obj.mode);
		this.default.setValue(ObjectUtils.getScene(this.obj).cameras.indexOf(this.obj) !== -1);
		this.near.setValue(this.obj.near);
		this.far.setValue(this.obj.far);
		this.offset.setValue(this.obj.offset);
		this.viewport.setValue(this.obj.viewport);
		this.clear_color.setValue(this.obj.clear_color);
		this.clear_depth.setValue(this.obj.clear_depth);
	}
}
