/************************************************************
Copyright © 2016-by RTSoftware Ltd, London. UK. All rights reserved

This software is the sole property or RTSoftware Ltd.
You are not permitted to re-distribute, modify or re-purpose for any reason
this without express permission from RTSoftware Ltd, UK.
************************************************************/

function RTSystem(rtswProtocol, protocolId)
{

// Callbacks

	this.onReady = function()
	{
		trace("system onReady not overridden");
	}

// Messages

	this.runCommand = function(command)
	{
		var data =
		{
			'serverId':document.URL,
			'clientId':window.location.hostname,
			'serialNumber':1,		
			'command':'RunCommand',
			'parameters':
			{
				'Command':command
			}
		}
		
		trace("runCommand " + JSON.stringify(data));

		rtswProtocol.send(protocolId, data);
	}

// Implementation

	rtswProtocol.addProtocol(this, "system.rtsw.co.uk", protocolId);

	this.callbackOpen = function(event)
	{
		this.onReady(event)
	}

	this.callbackClose = function()
	{
	}

	this.callbackError = function(error)
	{
	}

	this.callbackRecieve = function(event)
	{
		var json = JSON.parse(event.data);
	}
}

