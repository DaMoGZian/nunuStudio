"use strict";

function OrthographicCameraPanel(parent, obj)
{
	//Scene
	this.scene = null;

	//Panel
	Panel.call(this, parent, obj);

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

	//Camera used
	this.use = new CheckBox(this.form.element);
	this.form.addText("Use camera");
	this.use.size.set(20, 15);
	this.use.setOnChange(function()
	{
		if(self.obj !== null && self.scene !== null)
		{
			if(self.use.getValue())
			{
				self.scene.addCamera(self.obj);
			}
			else
			{
				self.scene.removeCamera(self.obj);
			}
		}
	});
	this.form.add(this.use);
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
	this.form.nextRow();
	
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

	//Order
	this.form.addText("Draw Order");
	this.order = new NumberBox(this.form.element);
	this.order.size.set(80, 18);
	this.order.setRange(0, Number.MAX_SAFE_INTEGER);
	this.order.setStep(1);
	this.order.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.order = self.order.getValue();
			self.scene.updateCameraOrder();
		}
	});
	this.form.add(this.order);
	this.form.nextRow();

	//Clear color
	this.form.addText("Clear color");
	this.clearColor = new CheckBox(this.form.element);
	this.clearColor.size.set(20, 15);
	this.clearColor.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.clearColor = self.clearColor.getValue();
		}
	});
	this.form.add(this.clearColor);
	this.form.nextRow();

	//Clear depth
	this.clearDepth = new CheckBox(this.form.element);
	this.form.addText("Clear depth");
	this.clearDepth.size.set(20, 15);
	this.clearDepth.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.clearDepth = self.clearDepth.getValue();
		}
	});
	this.form.add(this.clearDepth);
	this.form.nextRow();

	//Update form
	this.form.updateInterface();
}

//Super Prototypes
OrthographicCameraPanel.prototype = Object.create(Panel.prototype);

//Attach camera
OrthographicCameraPanel.prototype.attach = function(obj)
{
	Panel.prototype.attach.call(this, obj);
	this.scene = ObjectUtils.getScene(obj);
}

//Update panel content from attached object
OrthographicCameraPanel.prototype.updatePanel = function()
{
	Panel.prototype.updatePanel.call(this);
	
	if(this.obj !== null)
	{
		this.size.setValue(this.obj.size);
		this.mode.setSelectedIndex(this.obj.mode);
		this.use.setValue(this.scene.cameras.indexOf(this.obj) !== -1);
		this.near.setValue(this.obj.near);
		this.far.setValue(this.obj.far);
		this.offset.setValue(this.obj.offset);
		this.viewport.setValue(this.obj.viewport);
		this.order.setValue(this.obj.order);
		this.clearColor.setValue(this.obj.clearColor);
		this.clearDepth.setValue(this.obj.clearDepth);
	}
}
