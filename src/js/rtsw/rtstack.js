/************************************************************
Copyright © 2016-by RTSoftware Ltd, London. UK. All rights reserved

This software is the sole property or RTSoftware Ltd.
You are not permitted to re-distribute, modify or re-purpose for any reason
this without express permission from RTSoftware Ltd, UK.
************************************************************/

//
// API for the Stack.
//
function RTStack(rtswProtocol, protocolId) {
    //
    // Methods
    //

    // Restarts and plays the stack.
    this.preview = function() {
        var data = {
            'command': 'Preview',
            'parameters': {}
        }

        rtswProtocol.send(protocolId, data);
    }

    // plays the stack.
    this.play = function() {
        var data = {
            'command': 'Play',
            'parameters': {}
        }

        rtswProtocol.send(protocolId, data);
    }


    this.clear = function() {
        var data = {
            'command': 'Clear',
            'parameters': {}
        }

        rtswProtocol.send(protocolId, data);
    }

    /** Triggers an animateOff in tog without needing to go via a pundit button */
    this.animateOff = function() {
        var data = {
            'command': 'AnimateOff',
            'parameters': {}
        }

        rtswProtocol.send(protocolId, data);
    }

    this.undo = function() {
        var data = {
            'command': 'Undo',
            'parameters': {}
        }

        rtswProtocol.send(protocolId, data);
    }

    this.redo = function() {
        var data = {
            'command': 'Redo',
            'parameters': {}
        }

        rtswProtocol.send(protocolId, data);
    }

    // Inserts a pause into the stack on the current timecode.
    this.insertPause = function() {
        var data = {
            'command': 'InsertPause',
            'parameters': {}
        }

        rtswProtocol.send(protocolId, data);
    }

	/** Sets the state of the web button when toggled on the operator */
	this.setWebButtonState = function(checked){
		var data = {
			'command': 'SetWebButtonState',
			'parameters':
			{
				'checked': checked
			}
		}

		rtswProtocol.send(protocolId, data);
    }
    // Callback for SetWebButtonState received
    this.SetWebButtonStateCallback = () => console.log("No callback for SetWebButtonState!");

    //
    // Implementation below...
    //
    rtswProtocol.addProtocol(this, "stack.rtsw.co.uk", protocolId);

    this.callbackOpen = function(event) {}

    this.callbackError = function(event) {}

    this.callbackRecieve = function(event) {
        var json = JSON.parse(event.data);

        if(json.command == "SetWebButtonState"){
            this.SetWebButtonStateCallback(json.parameterList.checked);
        }
    }

    this.callbackClose = function(event) {

    }
}