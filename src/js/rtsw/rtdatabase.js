/************************************************************
Copyright © 2016-by RTSoftware Ltd, London. UK. All rights reserved

This software is the sole property or RTSoftware Ltd.
You are not permitted to re-distribute, modify or re-purpose for any reason
this without express permission from RTSoftware Ltd, UK.
************************************************************/

function RTDatabase(rtswProtocol, protocolId)
{
//
// callbacks - redefined these methods to implement your own logic.
//

	var activeCallback = {}; // This is an associative map.
	var queryId = 0;

	this.onDatabaseReady = function() 
	{
		trace("RTDatabase.onDatabaseReady not overridden.");
	}

	
//
// API Calls
//

	// Open a database connection
	this.openDatabase = function(databaseName, hostName, userName, password, driverName)
	{
		var data = 
		{
			'command':'openDatabase',
			'parameters' :
			{
				'databaseName': databaseName,
				'hostName': hostName,
				'userName':  userName,
				'password':  password,
				'driverName':  driverName
			}
		}
		
		rtswProtocol.send(protocolId, data);
	}

	// Open a database connection
	this.closeDatabase = function(databaseName)
	{
		var data = 
		{
			'command':'closeDatabase',
			'parameters' :
			{
				'databaseName': databaseName
			}
		}
		
		rtswProtocol.send(protocolId, data);
	}


	// Manually send an sql command to tog. 
	this.selectQuery = function(databaseName, sqlQuery, callback)
	{
		var data = 
		{
			'command':'sqlSelect',
			'parameters' :
			{
				'Query': sqlQuery,
				'databaseName': databaseName,
				'queryId':  queryId.toString()
			}
		}
				
		activeCallback[queryId.toString()] = callback;
		queryId++;
		
		rtswProtocol.send(protocolId, data);
	}


	
	this.insertQuery = function(databaseName, sqlQuery, callback)
	{
		var data = 
		{
			'command':'sqlInsert',
			'parameters' :
			{
				'Query': sqlQuery,
				'databaseName': databaseName,
				'queryId':  queryId.toString()
			}
		}
		
		activeCallback[queryId.toString()] = callback;
		queryId++;
		
		rtswProtocol.send(protocolId, data);
	}
	

	
	
	this.updateQuery = function(databaseName, sqlQuery, callback)
	{
		var data = 
		{
			'command':'sqlUpdate',
			'parameters' :
			{
				'Query': sqlQuery,
				'databaseName': databaseName,
				'queryId':  queryId.toString()
			}
		}
		
		activeCallback[queryId.toString()] = callback;
		queryId++;
		
		rtswProtocol.send(protocolId, data);
	}
	
	
	this.deleteQuery = function(databaseName, sqlQuery, callback)
	{
		var data = 
		{
			'command':'sqlDelete',
			'parameters' :
			{
				'Query': sqlQuery,
				'databaseName': databaseName,
				'queryId':  queryId.toString()
			}
		}
				
		activeCallback[queryId.toString()] = callback;
		queryId++;
		
		rtswProtocol.send(protocolId, data);
	}	
	

	this.multipleQuery = function(databaseName, sqlArray, callback)
	{
		
		var sqlQueriesArray = "[";
		for (i=0; i<sqlArray.length; i++)
		{
			sqlQueriesArray = sqlQueriesArray + "\\\"" + sqlArray[i] + "\\\", ";
		}
	
		sqlQueriesArray = sqlQueriesArray + "]";
	
		var data = 
		{
			'command':'sqlMultipleQueries',
			'parameters' :
			{
				'Queries': sqlArray,
				'databaseName': databaseName,
				'queryId':  queryId.toString()
			}
		}

		activeCallback[queryId.toString()] = callback;

		queryId++;
		
		rtswProtocol.send(protocolId, data);
	}	

	
	
//
// Implementation below...
//
	rtswProtocol.addProtocol(this, "database.rtsw.co.uk", protocolId);


	this.callbackOpen = function () {
		this.onDatabaseReady();
	}

	this.callbackError = function(event) {
	}

	this.callbackClose = function (event) {
	}

	this.callbackRecieve = function (event) 
	{
		var json = JSON.parse(event.data);
		
		if(json.responseType == "sqlSelect")
		{
			// DOM: Do something with the data.
			
			// Parse the JSON object to get the echoed queryId.
			myQueryId = json.queryId;
			
			// Run the callback, but first check that it is indeed a function.
			if (typeof activeCallback[myQueryId] === "function") 
			{
				// Call it, since we have confirmed it is callable.
				activeCallback[myQueryId] (json);
			}
			
			// Remove the element from the map.
			delete activeCallback[myQueryId.toString()];
	
		}

		if(json.responseType == "sqlUpdate")
		{
			// DOM: Do something with the data.
			
			// Parse the JSON object to get the echoed queryId.
			myQueryId = json.queryId;
			
			// Run the callback, but first check that it is indeed a function.
			if (typeof activeCallback[myQueryId] === "function") 
			{
				// Call it, since we have confirmed it is callable.
				activeCallback[myQueryId] (json);
			}

			// Remove the element from the map.
			delete activeCallback[myQueryId.toString()];
						
		}

		if(json.responseType == "sqlInsert")
		{
			// DOM: Do something with the data.
			
			// Parse the JSON object to get the echoed queryId.
			myQueryId = json.queryId;
			
			// Run the callback, but first check that it is indeed a function.
			if (typeof activeCallback[myQueryId] === "function") 
			{
				// Call it, since we have confirmed it is callable.
				activeCallback[myQueryId](json);
			}

			// Remove the element from the map.
			delete activeCallback[myQueryId.toString()];

		}

		
		
		if(json.responseType == "sqlDelete")
		{
			// DOM: Do something with the data.
			
			// Parse the JSON object to get the echoed queryId.
			myQueryId = json.queryId;
			
			// Run the callback, but first check that it is indeed a function.
			if (typeof activeCallback[myQueryId] === "function") 
			{
				// Call it, since we have confirmed it is callable.
				activeCallback[myQueryId] (json);
			}

			// Remove the element from the map.
			delete activeCallback[myQueryId.toString()];

		}


		if(json.responseType == "sqlMultipleQueries")
		{
			// DOM: Do something with the data.
			
			// Parse the JSON object to get the echoed queryId.
			myQueryId = json.queryId;
			
			// Run the callback, but first check that it is indeed a function.
			if (typeof activeCallback[myQueryId] === "function") 
			{
				// Call it, since we have confirmed it is callable.
				activeCallback[myQueryId] (json);
			}

			// Remove the element from the map.
			delete activeCallback[myQueryId.toString()];

		}

		
	}

	
}