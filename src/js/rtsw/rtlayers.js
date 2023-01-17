/************************************************************
Copyright © 2016-by RTSoftware Ltd, London. UK. All rights reserved

This software is the sole property or RTSoftware Ltd.
You are not permitted to re-distribute, modify or re-purpose for any reason
this without express permission from RTSoftware Ltd, UK.
************************************************************/

function RTLayers(rtswProtocol, protocolId)
{

// Messages

	this.getLayers = function()
	{
		var data =
		{
			'serverId': document.URL,
			'clientId': window.location.hostname,
			'serialNumber': 1,		
			'command': 'GetLayers',
			'parameters':{}
		}
		
		trace(JSON.stringify(data));

		rtswProtocol.send(protocolId, data);
	}

// Implementation below

	rtswProtocol.addProtocol(this, "layers.rtsw.co.uk", protocolId);

	this.callbackOpen = function()
	{
	}

	this.callbackClose = function()
	{
	}
	
	this.callbackError = function(error)
	{
	}

	this.callbackRecieve = function(event)
	{
        console.log(event);
	}
}

