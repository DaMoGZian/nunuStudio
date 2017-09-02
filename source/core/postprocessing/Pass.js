"use strict";

/**
 * A render Pass is used to render something in the graphics pipeline.
 *
 * Can be used to render a scene, apply post processing effects, merge buffers,  etc.
 *
 * @class Pass
 * @module Postprocessing
 * @constructor
 */

/**
 * If set to true, the pass is processed by the composer.
 *
 * @property enabled
 * @type {Boolean}
 */
/**
 * If set to true, the pass indicates to swap read and write buffer after rendering.
 *
 * @property needsSwap
 * @type {Boolean}
 */
/**
 * If set to true, the pass clears its buffer before rendering.
 *
 * @property clear
 * @type {Boolean}
 */
/**
 * If set to true, the result of the pass is rendered to screen.
 *
 * @property enabled
 * @type {Boolean}
 */
function Pass()
{
	this.enabled = true;
	this.needsSwap = true;
	
	this.clear = false;
	this.renderToScreen = false;
}

/**
 * Set resolution of this render pass.
 * 
 * @method setSize
 * @param {Number} width
 * @param {Number} height
 */
Pass.prototype.setSize = function(width, height){};

/**
 * Render the scene using this render pass.
 *
 * @method render
 * @param {WebGLRenderer} renderer
 * @param {WebGLRenderTarget} writeBuffer Buffer to write output.
 * @param {WebGLRenderTarget} readBuffer Input buffer.
 * @param {Number} delta Delta time in milliseconds.
 * @param {Boolean} maskActive Not used in this pass.
 * @param {Scene} scene Scene to render.
 */
Pass.prototype.render = function(renderer, writeBuffer, readBuffer, delta, maskActive, scene, camera){};

/**
 * Serialize pass to json.
 *
 * @method toJSON
 * @param {Object} meta Metadata.
 */
Pass.prototype.toJSON = function(meta){};


/**
 * Dispose this render pass.
 *
 * @method dipose
 */
Pass.prototype.dispose = function(){};