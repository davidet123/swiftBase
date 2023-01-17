//
// API for the Pundit Palette. You must include jquery in your script to use this class. 
//
// Typical usage :
// 	pundit = new RTPundit(rtConnection);
//  pundit.onPunditReady = function() {
//		pundit.setButtonSize(32, 32);
//		pundit.setPundit("MyPundit", "My/Custom/Skin/Directory");
//	}
//  
//	pundit.onPunditUpdate = function(json) {...}
//

function RTPundit(rtswProtocol, protocolId)
{
//
// Callbacks
//
	// Called when the pundit connection is open
	this.onPunditReady = function()
	{
		console.log("Pundit.onPunditReady() not overridden");
	}
	
	// Called when you need to update the pundit display	
	this.onPunditUpdate = function(json) {
		Console.log("Pundit.onPunditUpdate() not overridden.");

		for(ix = 0; ix < json['buttons'].length; ++ix)
		{
			var buttonIx = json['buttons'][ix]['id']
			var image = json['buttons'][ix]['base64Image'];
			console.log("Button " + ix + " -  id : " + buttonIx + "   base64image : " + image);
		}
	}

	// Called when you need to update some buttons on the display
	this.onButtonUpdate = function(json) {
		Console.log("Pundit.onButtonUpdate() not overridden.");

		for(ix = 0; ix < json['buttons'].length; ++ix)
		{
			var buttonIx = json['buttons'][ix]['id']
			var image = json['buttons'][ix]['base64Image'];
			console.log("Button " + ix + " -  id : " + buttonIx + "   base64image : " + image);
		}
	}

//
// Messages
//
	// Activates a graphic on the current pundit page. The Id is the id returned in onPunditUpdate
	// Setting the id to -1 will clear the button state.
	this.activateGraphic = function(ix) {
		var data =
		{
			'command':'ActivateGraphic',
			'parameters':
			{
				'id': ix
			}
		}

		rtswProtocol.send(protocolId, data);
	}

	// Run a sports graphic directly, without it needing to be on a pundit page.
	this.runSportsGraphic = function(graphic, parameterList) {
		var data =
		{
			'command':'RunSportsGraphic',
			'parameters':
			{
				'SportsGraphic': graphic
			}
		}

		for ( var key in parameterList )
		{
			data.parameters[key] = parameterList[key];
		}

		rtswProtocol.send(protocolId, data);
	}

	/** Set a particular page  to be used by this pundit instance. Different instances of Pundit() have separate pages.
	* 			@param name - 			the name of the page, as defined in page list in tactic. If the page is left empty, 
	*									the default web page preference will be used.
	*			@param iconDirectory - A directory that tog should search for images when constructing pundit icons. this
	*									directory is relative to the directory that tog serves it's webpages from.
	*/
	this.setPage = function(name, iconDirectory) {
		var data =
		{
			'command':'SetPage',
			'parameters':
			{
				'name':name,
				'iconDirectory':iconDirectory
			}
		}

		rtswProtocol.send(protocolId, data);
	}

	/** Sets the button size that you wish to use for your icons */
	this.setButtonSize = function(width, height) {
		var data =
		{
			'command':'SetButtonSize',
			'parameters':
			{
				'width':width,
				'height':height
			}
		}

		rtswProtocol.send(protocolId, data);
	}

//
// Implementation below...
//
	rtswProtocol.addProtocol(this, "pundit.rtsw.co.uk", protocolId);

	this.callbackOpen = function() {
		this.onPunditReady();
	}

	this.callbackClose = function() {

	}

	this.callbackError = function(error) {
	}

	this.callbackRecieve = function (event) {
		var json = JSON.parse(event.data);
		if((json.command == "UpdatePundit") && (this.onPunditUpdate != null))
		{
			this.onPunditUpdate(json);
		}
		else if((json.command == "UpdateButtons") && (this.onButtonUpdate != null))
		{
			this.onButtonUpdate(json);
		}
	}
}