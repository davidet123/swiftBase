/************************************************************
Copyright © 2016-by RTSoftware Ltd, London. UK. All rights reserved

This software is the sole property or RTSoftware Ltd.
You are not permitted to re-distribute, modify or re-purpose for any reason
this without express permission from RTSoftware Ltd, UK.
************************************************************/


//
// API to allow the selection of VR, 2D, tracked, logged and pseudo cameras 
//
// Typical usage :
// 	camera = new RTCamera(rtConnection, "myCameraProtocol");
//  camera.onCameraReady = function() {
//		camera.getCameraList();
//	}
//
//  camera.onCameraList(json)
//  {
//		// find a camera from the camera list
//		..
//		camera.setCamera(cameraName, cameraType);
//	}
//
//	camera.onCameraParams(json)
//  {
//		// update the camera interface
//  }
//
//	// on user interface parameter changes
//	camera.setCameraParams(parameterList);
//  

function RTCamera(rtswProtocol, protocolId)
{
	// This timer is used to ensure that we don't spam too many setCameraParams messages at tog.
	var setCameraParamsTimer = null;
	var setCameraParamsMessage = null;

//
// Callbacks
//
	// Called when the pundit connection is open
	this.onCameraReady = function()
	{
		trace("RTCamera.onCameraReady() not overridden");
	}
	
	// Called when you need to update the keyer display	
	this.onCameraList = function(json) {
		trace("RTCamera.onCameraList() not overridden.");
	}

	// Called when you need to update the keyer display	
	this.onCameraParams = function(json) {
		trace("RTCamera.onCameraParams() not overridden.");
	}

//
// Messages
//
	// Sets the active remote camera.
	this.setCamera = function(cameraName, cameraType) {
		var data =
		{
			'command':'setCamera',
			'parameters':
			{
				'name': cameraName,
				'type': cameraType
			}
		}

		rtswProtocol.send(protocolId, data);
	}

	// Sets the parameters on the current keyer.
	this.setCameraParams = function(parameterList) {
		var data =
		{
			'command':'setCameraParams',
			'parameters':
			{
			}
		}

		for ( var key in parameterList )
		{
			data.parameters[key] = parameterList[key];
		}

		setCameraParamsMessage = data;

		if(setCameraParamsTimer == null)
		{
			setCameraParamsTimer = setTimeout(function() {
				rtswProtocol.send(protocolId, setCameraParamsMessage);
				setCameraParamsTimer = null;
				setCameraParamsMessage = null;
			}, 200); // only send messages occassionally so as not to spam tog and overload the interface
		}

		rtswProtocol.send(protocolId, data);
	}


	// Create a remote camera of the give type.
	this.createCamera = function(cameraName, cameraType) {
		var data =
		{
			'command':'createCamera',
			'parameters':
			{
				'name': cameraName,
				'type': cameraType
			}
		}

		rtswProtocol.send(protocolId, data);
	}


	// Sets the parameters on the current keyer.
	this.getCameraList = function(parameterList) {
		var data =
		{
			'command':'getCameraList',
			'parameters':
			{
			}
		}

		rtswProtocol.send(protocolId, data);
	}

	this.setCameraAnnotations = function(showGrid, showPlayers, showModel) {
		var data =
		{
			'command':'setCameraAnnotations',
			'parameters':
			{
				"showGrid" : showGrid,
				"showPlayers" : showPlayers,
				"showModel" : showModel
			}
		}

		rtswProtocol.send(protocolId, data);
	}

//
// Implementation below...
//
	rtswProtocol.addProtocol(this, "camera.rtsw.co.uk", protocolId);

	this.callbackOpen = function() {
		this.onCameraReady();
	}

	this.callbackClose = function() {

	}

	this.callbackError = function(error) {
	}

	this.callbackRecieve = function (event) {
		var json = JSON.parse(event.data);
		if((json.command == "cameraList") && (this.onCameraList != null))
		{
			this.onCameraList(json);
		}
		else if((json.command == "cameraParams") && (this.onCameraParams != null))
		{
			this.onCameraParams(json);
		}
	}
}