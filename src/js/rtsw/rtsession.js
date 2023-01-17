/************************************************************
Copyright Â© 2016-by RTSoftware Ltd, London. UK. All rights reserved

This software is the sole property or RTSoftware Ltd.
You are not permitted to re-distribute, modify or re-purpose for any reason
this without express permission from RTSoftware Ltd, UK.
************************************************************/

function RTSession(rtswProtocol, protocolId)
{
	var messageId = 0;
	var activeCallback = {};

// Callbacks

	// Called when the session protocol has been instantiated
	this.onSessionReady = function()
	{
		trace("Session protocol ready");
	} 

// Messages
	this.listSessions = function(userName, callback)
	{
		var data =
		{	
			'command':'listSessions',
			'id': messageId.toString(),
			'parameters':
			{
				'userName': userName
			}
		}

		activeCallback[messageId.toString()] = callback;
		++messageId;

		rtswProtocol.send(protocolId, data);
	}

	this.createSession = function(sessionName)
	{
		var data =
		{
			'command': 'createSession',
			'parameters':
			{
				'sessionName': sessionName
			}
		}

		rtswProtocol.send(protocolId, data);
	}

	this.deleteSession = function(sessionName)
	{
		var data =
		{
			'command': 'deleteSession',
			'parameters':
			{
				'sessionName': sessionName
			}
		}

		rtswProtocol.send(protocolId, data);
	}

	this.renameSession = function(oldSessionName, newSessionName)
	{
		var data =
		{
			'command': 'renameSession',
			'parameters':
			{
				'oldSessionName': oldSessionName,
				'newSessionName': newSessionName
			}
		}

		rtswProtocol.send(protocolId, data);
	}

	this.updateSession = function(sessionJson)
	{
		var data =
		{
			'command': 'updateSession',
			'parameters':
			{
				'session': sessionJson
			}
		}

		rtswProtocol.send(protocolId, data);
	}
	

	this.runApplication = function(applicationName,executableName,parameters)
	{
		var parameter;

		var data =
		{	
			'command': 'RunApplication',
			'parameters': 
			{
				'applicationName': applicationName,
				'executableName': executableName,
				'parameters': parameters
			}
		}
		
		trace(JSON.stringify(data));

		rtswProtocol.send(protocolId, data);
	}

	this.startApplication = function(applicationName,executableName,parameters)
	{
		var parameter;

		var data =
		{
			'command': 'StartApplication',
			'parameters': 
			{
				'applicationName': applicationName,
				'executableName': executableName,
				'parameters': parameters
			}
		}
		
		trace(JSON.stringify(data));

		rtswProtocol.send(protocolId, data);
	}

	this.monitorApplication = function(applicationName)
	{
		var parameter;

		var data =
		{
			'command': 'MonitorApplication',
			'parameters': 
			{
				'applicationName': applicationName
			}
		}
		
		trace(JSON.stringify(data));

		rtswProtocol.send(protocolId, data);
	}

	this.stopApplication = function(applicationName)
	{
		var parameter;

		var data =
		{	
			'command': 'StopApplication',
			'parameters': 
			{
				'applicationName': applicationName
			}
		}
		
		trace(JSON.stringify(data));

		rtswProtocol.send(protocolId, data);
	}

// Implementation below

	rtswProtocol.addProtocol(this, "session.rtsw.co.uk", protocolId);

	this.callbackOpen = function()
	{
		this.onSessionReady();
	} 
	
	this.callbackError = function(error)
	{
	}

	this.callbackRecieve = function(event)
	{
		var json = JSON.parse(event.data);

		if(json.response == "sessionList")
		{
			responseId = json.id;

			if (typeof activeCallback[responseId] === "function") 
			{
				// Call it, since we have confirmed it is callable.
				activeCallback[responseId] (json);
			}
			
			// Remove the element from the map.
			delete activeCallback[responseId];
		}
	} 

	this.callbackClose = function()
	{
	}
}
