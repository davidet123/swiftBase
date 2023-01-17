/************************************************************
Copyright © 2016-by RTSoftware Ltd, London. UK. All rights reserved

This software is the sole property or RTSoftware Ltd.
You are not permitted to re-distribute, modify or re-purpose for any reason
this without express permission from RTSoftware Ltd, UK.
************************************************************/

//
// API for the Keyer. You must include jquery in your script to use this class. 
//
// Typical usage :
// 	keyer = new RTKeyer(rtConnection, "myKeyerProtocol");
//  keyer.onKeyerReady = function() {
//		keyer.setKeyerIx(0);
//		keyer.setKeyerParams(json);
//	}
//
//  keyer.onKeyerUpdate = function(json) {
//		update the keyer interface.
//  }
//  

$.getScript("/TOGWebControlDesk/js/rtsw/rtgesture.js", function()
{
   //alert("rtkeyer.js has failed to load rtgesture.js");
});

function RTKeyer(rtswProtocol, protocolId)
{
	// This timer is used to ensure that we don't spam too many setKeyerParam messages at tog.
	var setKeyerParamsTimer = null;
	var setKeyerParamsMessage = null;
	var connectionState = "";
	var errorData = "";
	var gestureKeyer = null;

//
// Callbacks
//
	// Called when the keyer connection is open
	this.onKeyerReady = function()
	{
		trace("RTKeyer.onKeyerReady() not overridden");
	}

	// Called when the keyer connection is closed
	this.onKeyerClose = function()
	{
		trace("RTKeyer.onKeyerClose() not overridden");
	}

	// Called when the keyer connection can't be opened
	this.onKeyerError = function(error)
	{
		trace("RTKeyer.onKeyerError() not overridden");
	}

	// Called when you need to update the keyer display	
	this.onKeyerUpdate = function(json)
	{
		trace("Keyer.onKeyerUpdate() not overridden.");
	}

	// Called when you need to update the keyer shown state interface
	this.onKeyerShowUpdate = function(json)
	{
		trace("Keyer.onKeyerShowUpdate() not overridden.");
	}

	this.getKeyerId = function()
	{
		return protocolId;
	}

//
// Messages
//
	// Sets the keyer being controlled.
	this.setKeyerIx = function(ix)
	{
		var data =
		{
			'command':'setKeyerIx',
			'parameters':
			{
				'id': ix
			}
		}

		rtswProtocol.send(protocolId, data);
	}

	// Sets the parameters on the current keyer.
	this.setKeyerParams = function(parameterList)
	{
		var data =
		{
			'command':'setKeyerParams',
			'parameters':
			{
			}
		}

		for ( var key in parameterList )
		{
			data.parameters[key] = parameterList[key];
		}

		setKeyerParamsMessage = data;

		if (setKeyerParamsTimer == null)
		{
			setKeyerParamsTimer = setTimeout(function()
			{
				rtswProtocol.send(protocolId, setKeyerParamsMessage);
				setKeyerParamsTimer = null;
				setKeyerParamsMessage = null;
			}, 200); // only send messages occassionally so as not to spam tog and overload the interface
		}

		rtswProtocol.send(protocolId, data);
	}

	//requests current keyer params
	this.getKeyerParams = function()
	{
		var data =
		{
			'command' : 'getKeyerParams',
			'parameters':
			{
			}
		}
		rtswProtocol.send(protocolId, data);
	}

	// Performs an automatic key calibration. The effect varies depending on which keyer is selected.
	this.autoKey = function()
	{
		var data =
		{
			'command':'autoKey',
			'parameters':
			{
			}
		}

		rtswProtocol.send(protocolId, data);
	}

	// Resets the key. The effect varies depending on which keyer is selected.
	this.resetKey = function()
	{
		var data =
		{
			'command':'resetKey',
			'parameters':
			{
			}
		}

		rtswProtocol.send(protocolId, data);
	}

	// Undo keyer change
	this.undoKeyChange = function()
	{
		var data =
		{
			'command':'undoChange',
			'parameters':
			{
			}
		}
		rtswProtocol.send(protocolId, data);
	}

	this.setShowKey = function(showKey)
	{
		var data =
		{
			'command':'setShowKey',
			'parameters':
			{
				"showKey" : showKey
			}
		}

		rtswProtocol.send(protocolId, data);	
	}

	this.getShowKey = function(showKey)
	{
		var data =
		{
			'command':'getShowKey',
			'parameters':{}
		}
		rtswProtocol.send(protocolId, data);
	}

	this.setKeyerType = function(type)
	{
		var data =
		{
			'command':'setKeyerType',
			'parameters':
			{
				"type" : type
			}
		}

		rtswProtocol.send(protocolId, data);
		this.setSegmentMode("none");//enforce that we aren't trying to send segment keyer pick data	
	}
//
// Implementation below...
//
	rtswProtocol.addProtocol(this, "keyer.rtsw.co.uk", protocolId);

	this.callbackOpen = function()
	{
		connectionState = "open";
		errorData = "";
		this.onKeyerReady();
	}

	this.callbackClose = function()
	{
		connectionState = "close";
		errorData = "";
		this.onKeyerClose();
	}

	this.callbackError = function(error)
	{
		connectionState = "error";
		errorData = error;
		this.onKeyerError(error);
	}

	this.callbackRecieve = function (event)
	{
		var json = JSON.parse(event.data);
		if ((json.command == "keyerUpdate") && (this.onKeyerUpdate != null))
		{
			this.onKeyerUpdate(json);
		}
		else if (json.command === "keyerShowState")
		{
			this.onKeyerShowUpdate(json);
		}
	}

	this.setupSegmentKeyer = function (videoElement)
	{
		if (gestureKeyer === null)
		{
			gestureKeyer = new RTGesture(rtswProtocol, protocolId + "_GestureProtocol");
			gestureKeyer.setup(videoElement);
		}
	}

	this.setSegmentMode = function(mode)
	{
		gestureKeyer.setSegmentMode(mode);
	}

	this.getSegmentMode = function()
	{ 
		return gestureKeyer.getSegmentMode();
	}
}
