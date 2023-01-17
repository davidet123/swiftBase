/************************************************************
Copyright © 2016-by RTSoftware Ltd, London. UK. All rights reserved

This software is the sole property or RTSoftware Ltd.
You are not permitted to re-distribute, modify or re-purpose for any reason
this without express permission from RTSoftware Ltd, UK.
************************************************************/

function RTMirror(rtswProtocol, protocolId)
{

// Callbacks

	this.onMessage = function(message)
	{
	} 

// Messages
	this.sendMessage = function(message)
	{
		var data =
		{	
			'command':'Mirror',
			'parameters':
			{
				'Message':message,
			}
		}

		rtswProtocol.send(protocolId, data);
	}

// Implementation below

	rtswProtocol.addProtocol(this, "mirror.rtsw.co.uk", protocolId);

	this.callbackOpen = function()
	{
	} 
	
	this.callbackError = function(error)
	{
	}

	this.callbackRecieve = function(event)
	{
		var json = JSON.parse(event.data);

		if(json.command == "Mirror")
		{
			this.onMessage(json.parameters['Message'])
		}
	} 

	this.callbackClose = function()
	{
	}
}

