/**
 * Modules in this bundle
 * @license
 *
 * nunuStudio:
 *   license: MIT (http://opensource.org/licenses/MIT)
 *   author: Tentone <tentone@outlook.com>
 */

"use strict";

function Nunu(){}

Nunu.NAME = "nunuStudio";
Nunu.VERSION = "V0.8.9.17 Alpha";
Nunu.TIMESTAMP = "201701181114";

//Check if webvr is available
Nunu.webvrAvailable = function()
{
	return navigator.getVRDisplays !== undefined;
};
