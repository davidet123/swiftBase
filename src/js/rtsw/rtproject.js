/************************************************************
Copyright © 2016-by RTSoftware Ltd, London. UK. All rights reserved

This software is the sole property or RTSoftware Ltd.
You are not permitted to re-distribute, modify or re-purpose for any reason
this without express permission from RTSoftware Ltd, UK.
************************************************************/

function RTProject(rtswProtocol, protocolId)
{

// Callbacks

	this.onGetDirectoryListing = function(directoryName,data)
	{
	}

	this.onGetFile = function(fileName,data)
	{
	}

	this.onGetStackList = function(fileName,data)
	{
	}

	this.onReady = function()
	{
		trace("project onReady not overridden");
	}

// Messages

	this.populateParameterTable = function(selectedGraphicName,selectedMethodName)
	{
		// STUB
	}

	this.getStackList = function()
	{
		var data =
		{
			'serverId':document.URL,
			'clientId':window.location.hostname,
			'serialNumber':1,		
			'command':'GetStackList',
			'parameters':
			{
			}
		}
		
		trace("getStackList " + JSON.stringify(data));

		rtswProtocol.send(protocolId, data);
	}

	this.putFile = function(fileName,fileContents)
	{
		var data =
		{
			'serverId':document.URL,
			'clientId':window.location.hostname,
			'serialNumber':1,		
			'command':'PutFile',
			'parameters':
			{
				'FileName':fileName,
				'FileContents':fileContents
			}
		}
		
		trace("getStackList " + JSON.stringify(data));

		rtswProtocol.send(protocolId, data);
	}

	this.getDirectoryListing = function(directoryName,fileNameFilter)
	{
		var data =
		{
			'serverId':document.URL,
			'clientId':window.location.hostname,
			'serialNumber':1,		
			'command':'GetDirectoryListing',
			'parameters':
			{
				'DirectoryName':directoryName,
				'FileNameFilter':fileNameFilter
			}
		}
		
		trace("getDirectoryListing " + JSON.stringify(data));

		rtswProtocol.send(protocolId, data);
	}

	this.getFile = function(fileName)
	{
		var data =
		{
			'serverId':document.URL,
			'clientId':window.location.hostname,
			'serialNumber':1,		
			'command':'GetFile',
			'parameters':
			{
				'FileName':fileName
			}
		}
		
		trace("getFile " + JSON.stringify(data));

		rtswProtocol.send(protocolId, data);
	}

	this.deleteFile = function(fileName)
	{
		var data =
		{
			'serverId':document.URL,
			'clientId':window.location.hostname,
			'serialNumber':1,		
			'command':'DeleteFile',
			'parameters':
			{
				'FileName':fileName
			}
		}
		
		trace("deleteFile " + JSON.stringify(data));

		rtswProtocol.send(protocolId, data);
	}

// Implementation

	rtswProtocol.addProtocol(this, "project.rtsw.co.uk", protocolId);

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

		if (json.command == "GetDirectoryListing")
		{
			this.onGetDirectoryListing(json.directoryName,json.data);
		}
		else if (json.command == "GetFile")
		{
			this.onGetFile(json.fileName,json.data);
		}
		else if (json.command == "GetStackList")
		{
			this.onGetStackList(json.data);
		}
	}
}

