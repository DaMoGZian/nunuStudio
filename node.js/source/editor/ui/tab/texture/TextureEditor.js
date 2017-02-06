"use strict";

function TextureEditor(parent, closeable, container, index)
{
	TabElement.call(this, parent, closeable, container, index, "Texture", "editor/files/icons/misc/image.png");

	var self = this;

	this.Texture = null;

	//Dual division
	this.division = new DualDivisionResizable(this.element);
	this.division.setOnResize(function()
	{
		self.updateInterface();
	});
	this.division.tabPosition = 0.5;
	this.division.tabPositionMin = 0.3;
	this.division.tabPositionMax = 0.7;

	//Canvas
	this.canvas = new Canvas(this.division.divA);

	//Renderer
	this.renderer = new THREE.WebGLRenderer({canvas: this.canvas.element, antialias: Settings.render.antialiasing});
	this.renderer.setSize(this.canvas.size.x, this.canvas.size.y);
	this.renderer.shadowMap.enabled = false;

	//Camera
	this.camera = new OrthographicCamera(1.2, 1, OrthographicCamera.RESIZE_VERTICAL);

	//Scene
	this.scene = new THREE.Scene();

	//Background
	var alpha = new Texture("editor/files/alpha.png");
	alpha.wrapS = THREE.RepeatWrapping;
	alpha.wrapT = THREE.RepeatWrapping;
	alpha.magFilter = THREE.Nearest;
	alpha.minFilter = THREE.Nearest;
	alpha.repeat.set(5, 5);

	this.background = new THREE.Sprite(new THREE.SpriteMaterial({map: alpha}));
	this.background.position.set(0, 0, -2);
	this.background.scale.set(2.5, 2.5, 0);
	this.scene.add(this.background);

	//Sprite
	this.sprite = new THREE.Sprite(new THREE.SpriteMaterial());
	this.sprite.position.set(0, 0, -1);
	this.scene.add(this.sprite);

	//Form
	this.form = new Form(this.division.divB);
	this.form.position.set(10, 5);
	this.form.spacing.set(5, 5);

	this.form.addText("Texture Editor");
	this.form.nextRow();

	//Name
	this.form.addText("Name");
	this.name = new TextBox(this.form.element);
	this.name.size.set(200, 18);
	this.name.setOnChange(function()
	{
		if(self.texture !== null)
		{
			self.texture.name = self.name.getText();
			self.updateMaterial();
			Editor.updateObjectViews();
		}
	});
	this.form.add(this.name);
	this.form.nextRow();

	//WrapS
	this.form.addText("Wrap Hor.");
	this.wrapS = new DropdownList(this.form.element);
	this.wrapS.size.set(120, 18);
	this.wrapS.addValue("Clamp to Edge", THREE.ClampToEdgeWrapping);
	this.wrapS.addValue("Repeat", THREE.RepeatWrapping);
	this.wrapS.addValue("Repeat Mirrored", THREE.MirroredRepeatWrapping);
	this.wrapS.setOnChange(function()
	{
		if(self.texture !== null)
		{
			self.texture.wrapS = self.wrapS.getValue();
			self.updateMaterial();
		}
	});
	this.form.add(this.wrapS);
	this.form.nextRow();

	//WrapT
	this.form.addText("Wrap Vert.");
	this.wrapT = new DropdownList(this.form.element);
	this.wrapT.size.set(120, 18);
	this.wrapT.addValue("Clamp to Edge", THREE.ClampToEdgeWrapping);
	this.wrapT.addValue("Repeat", THREE.RepeatWrapping);
	this.wrapT.addValue("Repeat Mirrored", THREE.MirroredRepeatWrapping);
	this.wrapT.setOnChange(function()
	{
		if(self.texture !== null)
		{
			self.texture.wrapT = self.wrapT.getValue();
			self.updateMaterial();
		}
	});
	this.form.add(this.wrapT);
	this.form.nextRow();

	//Repeat
	this.form.addText("Repeat");
	this.repeat = new CoordinatesBox(this.form.element);
	this.repeat.setMode(CoordinatesBox.VECTOR2);
	this.repeat.size.set(120, 18);
	this.repeat.setValue(1, 1, 0);
	this.repeat.setOnChange(function()
	{
		if(self.texture !== null)
		{
			var value = self.repeat.getValue();
			self.texture.repeat.set(value.x, value.y);
			self.updateMaterial();
		}
	});
	this.form.add(this.repeat);
	this.form.nextRow();

	//Minification filter
	this.form.addText("Min. filter");
	this.minFilter = new DropdownList(this.form.element);
	this.minFilter.size.set(150, 18);
	this.minFilter.addValue("Nearest", THREE.NearestFilter);
	this.minFilter.addValue("Linear", THREE.LinearFilter);
	this.minFilter.addValue("MIP Nearest Nearest", THREE.NearestMipMapNearestFilter);
	this.minFilter.addValue("MIP Nearest Linear", THREE.NearestMipMapLinearFilter);
	this.minFilter.addValue("MIP Linear Nearest", THREE.LinearMipMapNearestFilter);
	this.minFilter.addValue("MIP Linear Linear", THREE.LinearMipMapLinearFilter);
	this.minFilter.setOnChange(function()
	{
		if(self.texture !== null)
		{
			self.texture.minFilter = self.minFilter.getValue();
			self.updateMaterial();
		}
	});
	this.form.add(this.minFilter);
	this.form.nextRow();

	//Magnification filter
	this.form.addText("Mag. filter");
	this.magFilter = new DropdownList(this.form.element);
	this.magFilter.size.set(150, 18);
	this.magFilter.addValue("Nearest", THREE.NearestFilter);
	this.magFilter.addValue("Linear", THREE.LinearFilter);
	this.magFilter.setOnChange(function()
	{
		if(self.texture !== null)
		{
			self.texture.magFilter = self.magFilter.getValue();
			self.updateMaterial();
		}
	});
	this.form.add(this.magFilter);
	this.form.nextRow();

	//Flip Y
	this.form.addText("Flip Y");
	this.flipY = new CheckBox(this.form.element);
	this.flipY.size.set(20, 15);
	this.flipY.setOnChange(function()
	{
		if(self.texture !== null)
		{
			self.texture.flipY = self.flipY.getValue();
			self.updateMaterial();
		}
	});
	this.form.add(this.flipY);
	this.form.nextRow();
}

TextureEditor.prototype = Object.create(TabElement.prototype);

//Update test material
TextureEditor.prototype.updateMaterial = function()
{
	this.sprite.material.map.needsUpdate = true;

	//TODO <ADD CHANGE TO HISTORY>
}

//Check if texture is attached to tab
TextureEditor.prototype.isAttached = function(texture)
{
	return this.texture === texture;
}

//Activate
TextureEditor.prototype.activate = function()
{
	Editor.setState(Editor.STATE_IDLE);
	Editor.resetEditingFlags();
	
	//Mouse.setCanvas(this.canvas.element);
}

//Update object data
TextureEditor.prototype.updateMetadata = function()
{
	if(this.texture !== null)
	{
		//Set name
		if(this.texture.name !== undefined)
		{
			this.setName(this.texture.name);
		}

		//If not found close tab
		if(Editor.program.textures[this.texture.uuid] === undefined)
		{
			this.close();
		}
	}
}

//Attach texure
TextureEditor.prototype.attach = function(texture)
{
	this.texture = texture;
	this.updateMetadata();

	//Update sprite material
	this.sprite.material.map = texture;
	this.sprite.material.needsUpdate = true;

	//Update form
	this.name.setText(texture.name);
	this.wrapT.setValue(texture.wrapT);
	this.wrapS.setValue(texture.wrapS);
	this.repeat.setValue(texture.repeat);
	this.magFilter.setValue(texture.magFilter);
	this.minFilter.setValue(texture.minFilter);
	this.flipY.setValue(texture.flipY);
};

//Update
TextureEditor.prototype.update = function()
{
	this.division.update();
	this.renderer.render(this.scene, this.camera);
}

//Update
TextureEditor.prototype.updateInterface = function()
{
	//Visibility
	if(this.visible)
	{
		this.element.style.visibility = "visible";
	}
	else
	{
		this.element.style.visibility = "hidden";
	}
	
	//Dual division
	this.division.visible = this.visible;
	this.division.size.copy(this.size);
	this.division.updateInterface();

	//Canvas
	this.canvas.visible = this.visible;
	this.canvas.size.set(this.division.divA.offsetWidth, this.division.divA.offsetHeight);
	this.canvas.updateInterface();
	
	//Renderer
	this.renderer.setSize(this.canvas.size.x, this.canvas.size.y);
	this.camera.aspect = this.canvas.size.x/this.canvas.size.y;
	this.camera.mode = (this.camera.aspect > 1) ? OrthographicCamera.RESIZE_HORIZONTAL : OrthographicCamera.RESIZE_VERTICAL;
	this.camera.updateProjectionMatrix();

	//Update form
	this.form.visible = this.visible;
	this.form.updateInterface();

	//Element
	this.element.style.top = this.position.y + "px";
	this.element.style.left = this.position.x + "px";
	this.element.style.width = this.size.x + "px";
	this.element.style.height = this.size.y + "px";
}
