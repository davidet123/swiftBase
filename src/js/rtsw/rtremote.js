/************************************************************
Copyright © 2016-by RTSoftware Ltd, London. UK. All rights reserved

This software is the sole property or RTSoftware Ltd.
You are not permitted to re-distribute, modify or re-purpose for any reason
this without express permission from RTSoftware Ltd, UK.
************************************************************/
// import {trace} from './rtsw.js'


function RTRemote(rtswProtocol, protocolId)
{

// Messages

	this.startTransaction = function(graphicName)
	{
		var data =
		{
			'serverId': document.URL,
			'clientId': window.location.hostname,
			'serialNumber': 1,		
			'command': 'StartTransaction',
			'parameters':
			{
			}
		}
		
		trace(JSON.stringify(data));

		rtswProtocol.send(protocolId, data);
	}

	this.endTransaction = function(graphicName)
	{
		var data =
		{
			'serverId': document.URL,
			'clientId': window.location.hostname,
			'serialNumber': 1,		
			'command': 'EndTransaction',
			'parameters':
			{
			}
		}
		
		trace(JSON.stringify(data));

		rtswProtocol.send(protocolId, data);
	}

	this.playGraphic = function(graphicName)
	{
		var data =
		{
			'serverId': document.URL,
			'clientId': window.location.hostname,
			'serialNumber': 1,		
			'command': 'PlayGraphic',
			'parameters': 
			{
				'graphicName': graphicName,
			}
		}
		
		trace(JSON.stringify(data));

		rtswProtocol.send(protocolId, data);
	}

	this.playMethod = function(methodName, parameterList)
	{
		var data =
		{
			'serverId': document.URL,
			'clientId': window.location.hostname,
			'serialNumber': 1,		
			'command': 'PlayMethod',
			'parameters':
			{
				'': methodName,
			}
		}

		for ( var key in parameterList )
		{
			var value = parameterList[key];
			if (typeof value === 'number')
				data.parameters[key] = value.toString();
			else if (typeof value === 'boolean')
				data.parameters[key] = value.toString();
			else if (typeof value === 'string')
				data.parameters[key] = value;
			else
				data.parameters[key] = value;
		}
    // console.log(data)
		
		trace(JSON.stringify(data));

		rtswProtocol.send(protocolId, data);
	}

	this.loadProject = function(projectPath)
	{
		var data =
		{
			'serverId': document.URL,
			'clientId': window.location.hostname,
			'serialNumber': 1,		
			'command': 'LoadProject',
			'parameters':
			{
				'projectPath': projectPath,
			}
		}
		
		trace(JSON.stringify(data));

		rtswProtocol.send(protocolId, data);
	}

	this.manageProject = function(command,projectPath)
	{
		var data =
		{
			'serverId': document.URL,
			'clientId': window.location.hostname,
			'serialNumber': 1,		
			'command': 'ManageProject',
			'parameters': 
			{
				'command': command,
				'projectPath': projectPath
			}
		}
		
		trace(JSON.stringify(data));

		rtswProtocol.send(protocolId, data);
	}

	this.startLayoff = function(directoryName,fileName)
	{
		var data =
		{
			'serverId': document.URL,
			'clientId': window.location.hostname,
			'serialNumber': 1,		
			'command': 'StartLayoff',
			'parameters': 
			{
				'directoryName': directoryName,
				'fileName': fileName
			}
		}
		
		trace(JSON.stringify(data));

		rtswProtocol.send(protocolId, data);
	}

	this.endLayoff = function()
	{
		var data =
		{
			'serverId': document.URL,
			'clientId': window.location.hostname,
			'serialNumber': 1,		
			'command': 'EndLayoff',
			'parameters': 
			{
			}
		}
		
		trace(JSON.stringify(data));

		rtswProtocol.send(protocolId, data);
	}
		
	this.clear = function()
	{
		var data = 
		{
			'serverId': document.URL,
			'clientId': window.location.hostname,
			'serialNumber': 1,
			'command': 'Clear',
			'parameters': 
			{
			}
		};
		
		rtswProtocol.send(protocolId, data);
	};

	this.validate = function(parameterList)
	{
		var i;
		var parameter;

		var data =
		{
			'serverId': document.URL,
			'clientId': window.location.hostname,
			'serialNumber': 1,		
			'command': 'Validate',
			'parameters': 
			{
			}
		}

		for ( var key in parameterList )
		{
			var value = parameterList[key];
			if (typeof value === 'number')
				data.parameters[key] = value.toString();
			else if (typeof value === 'boolean')
				data.parameters[key] = value.toString();
			else if (typeof value === 'string')
				data.parameters[key] = value;
			else
				data.parameters[key] = value;
		}
		
		trace(JSON.stringify(data));

		rtswProtocol.send(protocolId, data);
	}

	this.getStatus = function(type,filter)
	{
		var parameter;

		var data =
		{
			'serverId': document.URL,
			'clientId': window.location.hostname,
			'serialNumber': 1,		
			'command': 'GetStatus',
			'parameters':
			{
				'type': type,
				'filter': filter
			}
		}

    // console.log()
		
		trace(JSON.stringify(data));

		rtswProtocol.send(protocolId, data);
    // console.log(res)
    // return 
    // console.log(JSON.stringify(data))
    return JSON.stringify(data)
	}

	this.updateFields = function(nodeName,afieldName,afieldValue)
	{
		var i;
		var parameter;

		var data =
		{
			'serverId': document.URL,
			'clientId': window.location.hostname,
			'serialNumber': 1,		
			'command': 'UpdateFields',
			'parameters': 
			[
				// 'nodeName': nodeName,
				// 'afieldName': afieldName,
				// 'afieldValue': afieldValue
			]
		}

		data.parameters.push("nodeName");
		data.parameters.push(nodeName);
		data.parameters.push("afieldName");
		data.parameters.push(afieldName);
		data.parameters.push("afieldValue");
		data.parameters.push(afieldValue);
		
		trace(JSON.stringify(data));

		rtswProtocol.send(protocolId, data);
	}

	this.runApplication = function(applicationName,executableName,parameters)
	{
		var parameter;

		var data =
		{
			'serverId': document.URL,
			'clientId': window.location.hostname,
			'serialNumber': 1,		
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
			'serverId': document.URL,
			'clientId': window.location.hostname,
			'serialNumber': 1,		
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
			'serverId': document.URL,
			'clientId': window.location.hostname,
			'serialNumber': 1,		
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
			'serverId': document.URL,
			'clientId': window.location.hostname,
			'serialNumber': 1,		
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

	rtswProtocol.addProtocol(this, "remote.rtsw.co.uk", protocolId);

	this.callbackOpen = function()
	{
	}

	this.callbackClose = function()
	{
	}
	
	this.callbackError = function(error)
	{
    console.log(error)
	}

	this.callbackRecieve = function(event)
	{
    // console.log(event)
    // const response = JSON.parse(event.data);
    // console.log(response)
    // if (typeof response.status === "undefined") return;
    // if (response.status == "") return;
    // return JSON.parse(event);
	}
}

// export default RTRemote
