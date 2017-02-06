"use strict";

function SpotLightPanel(parent, obj)
{
	Panel.call(this, parent, obj);

	//Self pointer
	var self = this;

	//Color
	this.form.addText("Color");
	this.color = new ColorChooser(this.form.element);
	this.color.size.set(80, 18);
	this.color.setOnChange(function()
	{
		if(self.obj !== null)
		{
			var color = self.color.getValue();
			self.obj.color.setRGB(color.r, color.g, color.b);
		}
	});
	this.form.add(this.color);
	this.form.nextRow();

	//Penumbra
	this.form.addText("Penumbra");
	this.penumbra = new Slider(this.form.element);
	this.penumbra.size.set(160, 18);
	this.penumbra.position.set(65, 110);
	this.penumbra.setRange(0, 1);
	this.penumbra.setStep(0.01);
	this.penumbra.updateInterface();
	this.penumbra.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.penumbra = self.penumbra.getValue();
			self.penumbraText.setText(self.obj.penumbra);
		}
	});
	this.form.add(this.penumbra);
	this.form.nextRow();

	//Angle
	this.form.addText("Angle");
	this.angle = new Slider(this.form.element);
	this.angle.size.set(160, 18);
	this.angle.setRange(0, 1.57);
	this.angle.setStep(0.01);
	this.angle.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.angle = self.angle.getValue();
			self.angleText.setText(self.obj.angle);
		}
	});
	this.form.add(this.angle);
	this.form.nextRow();
	
	//Visible
	this.visible = new CheckBox(this.form.element);
	this.form.addText("Visible");
	this.visible.size.set(20, 15);
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
	this.form.addText("Static Object");
	this.static.size.set(20, 15);
	this.static.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.matrixAutoUpdate = !(self.static.getValue());
		}
	});
	this.form.add(this.static);
	this.form.nextRow();

	//Shadow map
	this.form.addText("Shadows");
	this.form.nextRow();

	//Cast shadow
	this.castShadow = new CheckBox(this.form.element);
	this.form.addText("Cast Shadows");
	this.castShadow.size.set(20, 15);
	this.castShadow.position.set(5, 85);
	this.castShadow.updateInterface();
	this.castShadow.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.castShadow = self.castShadow.getValue();
		}
	});
	this.form.add(this.castShadow);
	this.form.nextRow();

	//Shadow resolution
	this.form.addText("Resolution");
	this.shadowWidth = new DropdownList(this.form.element);
	this.shadowWidth.size.set(60, 18);
	this.shadowWidth.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.shadow.mapSize.width = self.shadowWidth.getValue();
			self.obj.updateShadowMap();
		}
	});
	this.form.add(this.shadowWidth);
	this.form.addText("x", true);
	this.shadowHeight = new DropdownList(this.form.element);
	this.shadowHeight.size.set(60, 18);
	this.shadowHeight.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.shadow.mapSize.height = self.shadowHeight.getValue();
			self.obj.updateShadowMap();
		}
	});
	this.form.add(this.shadowHeight);
	this.form.nextRow();
	for(var i = 5; i < 13; i++)
	{
		var size = Math.pow(2, i);
		this.shadowWidth.addValue(size.toString(), size);
		this.shadowHeight.addValue(size.toString(), size);
	}

	//Shadowmap camera near
	this.form.addText("Near");
	this.shadowNear = new NumberBox(this.form.element);
	this.shadowNear.size.set(60, 18);
	this.shadowNear.setStep(0.1);
	this.shadowNear.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.shadow.camera.near = self.shadowNear.getValue();
			self.obj.updateShadowMap();
		}
	});
	this.form.add(this.shadowNear);
	this.form.nextRow();
	
	//Shadowmap camera far
	this.form.addText("Far");
	this.shadowFar = new NumberBox(this.form.element);
	this.shadowFar.size.set(60, 18);
	this.shadowFar.setStep(0.1);
	this.shadowFar.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.shadow.camera.far = self.shadowFar.getValue();
			self.obj.updateShadowMap();
		}
	});
	this.form.add(this.shadowFar);
	this.form.nextRow();

	//Update form
	this.form.updateInterface();
}

//Super prototypes
SpotLightPanel.prototype = Object.create(Panel.prototype);

//Update panel content from attached object
SpotLightPanel.prototype.updatePanel = function()
{
	Panel.prototype.updatePanel.call(this);

	if(this.obj !== null)
	{
		this.color.setValue(this.obj.color.r, this.obj.color.g, this.obj.color.b);
		this.angle.setValue(this.obj.angle);
		this.penumbra.setValue(this.obj.penumbra);
		this.visible.setValue(this.obj.visible);
		this.static.setValue(!this.obj.matrixAutoUpdate);
		
		this.castShadow.setValue(this.obj.castShadow);
		this.shadowWidth.setValue(this.obj.shadow.mapSize.width);
		this.shadowHeight.setValue(this.obj.shadow.mapSize.height);
		this.shadowNear.setValue(this.obj.shadow.camera.near);
		this.shadowFar.setValue(this.obj.shadow.camera.far);
	}
}
