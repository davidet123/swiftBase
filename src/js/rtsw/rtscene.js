/************************************************************
Copyright © 2016-by RTSoftware Ltd, London. UK. All rights reserved

This software is the sole property or RTSoftware Ltd.
You are not permitted to re-distribute, modify or re-purpose for any reason
this without express permission from RTSoftware Ltd, UK.
************************************************************/

//
// API for the Scene.
//
function RTScene(rtswProtocol, protocolId)
{
	// Called when the pundit connection is open
	this.onSceneReady = function()
	{
		trace("RTScene.onSceneReady() not overridden");
	}
	
//
// Methods
//
	// Load from the given scene
	this.loadScene = function(sceneName) {
		var data = 
		{
			'command':'LoadScene',
			'parameters':
			{
				'scene':sceneName
			}
		}

		rtswProtocol.send(protocolId, data);
	}

	// Save the current settings to the given scene
	this.saveScene = function(sceneName) 
	{
		var data = 
		{
			'command':'SaveScene',
			'parameters':
			{
				'scene':sceneName
			}
		}

		rtswProtocol.send(protocolId, data);
	}


	// Save the current settings to the given scene
	this.makeGlobal = function() 
	{
		var data = 
		{
			'command':'MakeGlobal',
			'parameters':
			{
			}
		}

		rtswProtocol.send(protocolId, data);
	}

//
// Implementation below...
//
	rtswProtocol.addProtocol(this, "scene.rtsw.co.uk", protocolId);

	this.callbackOpen = function(event) {
		if(this.onSceneReady != null)
		{
			this.onSceneReady();
		}
	}

	this.callbackError = function(event) {
	}

	this.callbackRecieve = function (event) {
		var json = JSON.parse(event.data);
	}

	this.callbackClose = function (event) {	
	}
}