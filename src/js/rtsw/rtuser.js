/************************************************************
Copyright © 2016-by RTSoftware Ltd, London. UK. All rights reserved

This software is the sole property or RTSoftware Ltd.
You are not permitted to re-distribute, modify or re-purpose for any reason
this without express permission from RTSoftware Ltd, UK.
************************************************************/

function RTUser(rtswProtocol, protocolId)
{
	var messageId = 0;
	var activeCallback = {};

// Callbacks

	// Called when the User protocol has been instantiated
	this.onUserReady = function()
	{
		trace("User protocol ready");
	} 

	this.onSetUserPasswordResponse = function(json)
	{
		trace("Set User Password response recieved" + JSON.stringify(json));
	}

// Messages
	this.listUsers = function(callback)
	{
		var data =
		{	
			'command':'listUsers',
			'id': messageId.toString(),
			'parameters':
			{
			}
		}

		activeCallback[messageId.toString()] = callback;
		++messageId;

		rtswProtocol.send(protocolId, data);
	}

	this.createUser = function(username)
	{
		var data =
		{	
			'command':'createUser',
			'parameters':
			{
				'username' : username
			}
		}

		rtswProtocol.send(protocolId, data);
	}

	this.deleteUser = function(username)
	{
		var data =
		{	
			'command':'deleteUser',
			'parameters':
			{
				'username' : username
			}
		}

		rtswProtocol.send(protocolId, data);
	}

	this.setUserPassword = function(username, password)
	{
		var data =
		{	
			'command':'setUserPassword',
			'parameters':
			{
				'username' : username,
				'password' : password
			}
		}

		rtswProtocol.send(protocolId, data);
	}

	this.renameUser = function(oldUserName, newUserName)
	{
		var data =
		{
			'command': 'renameUser',
			'parameters':
			{
				'oldUserName': oldUserName,
				'newUserName': newUserName
			}
		}

		rtswProtocol.send(protocolId, data);
	}

	this.updateUser = function(userJson)
	{
		var data =
		{
			'command': 'updateUser',
			'parameters':
			{
				'user': userJson
			}
		}

		rtswProtocol.send(protocolId, data);
	}

// Implementation below

	rtswProtocol.addProtocol(this, "user.rtsw.co.uk", protocolId);

	this.callbackOpen = function()
	{
		this.onUserReady();
	} 
	
	this.callbackError = function(error)
	{
	}

	this.callbackRecieve = function(event)
	{
		var json = JSON.parse(event.data);

		if(json.response == "userList")
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
		else if(json.response == "setUserPassword")
		{
			this.onSetUserPasswordResponse(json)
		}
	} 

	this.callbackClose = function()
	{
	}
}

