/************************************************************
Copyright © 2016-by RTSoftware Ltd, London. UK. All rights reserved

This software is the sole property or RTSoftware Ltd.
You are not permitted to re-distribute, modify or re-purpose for any reason
this without express permission from RTSoftware Ltd, UK.
************************************************************/

function RTClipControl(rtswProtocol, protocolId )
{
//
// callbacks - redefined these methods to implement your own logic.
//

	// onClipPageUpdate(json) - Called when the clip view changes. json contains a list of clips in the current directory.
	this.onClipPageUpdate = function(json) {
		 console.log("ClipControl.onClipPageUpdate() not overridden");
	}

    this.onUpdateClipViewIndex = function(/** @type { number } */idx) {
        console.error("Warning: this.onUpdateClipViewIndex is not overriden.");
    }

//
// messages - call these to send messages to tog.
//

	/// Request an onClipPageUpdate with the current clip list.
	this.getClipPage = function() {
		var data =
		{
			'command':'GetClipPage',
		}

		rtswProtocol.send(protocolId, data);
	}

    this.getActiveClipIndex = function() {
        let data = {
            'command': 'GetActiveClipViewIndex',
        }
        
        rtswProtocol.send(protocolId, data);
    }

	/// Returns the clip list to the previous page.
	this.clipPageBack = function() {
		var data =
		{
			'command':'ClipPageBack',
		}

		rtswProtocol.send(protocolId, data);
	}

	/// Activates a clip on the current page. ix is the button Id returned in onClipPageUpdate, not the array index.
	this.activateClip = function(ix) {
		var data =
		{
			'command':'ActivateClip',
			'parameters':
			{
				'id': ix
			}
		}

		rtswProtocol.send(protocolId, data);
	}

	this.setClipListMode = function(ix) {
		var data =
		{
			'command':'SetClipListMode',
			'parameters':
			{
				'id': ix
			}
		}

		rtswProtocol.send(protocolId, data);
	}

    this.nextClip = function() {
        var data = {
            'command': 'NextClip',
        }

        rtswProtocol.send(protocolId, data);
    }

    this.prevClip = function () {
        var data = {
            'command': "PrevClip",
        };

        rtswProtocol.send(protocolId, data);
    };

//
// internal implementation - don't mess below this line.
//

	rtswProtocol.addProtocol(this, "clipcontrol.rtsw.co.uk", protocolId);

	this.callbackOpen = function(event) {
		this.getClipPage();
	}

	this.callbackError = function (error) {
	}

	this.callbackRecieve = function (event) {
		var json = JSON.parse(event.data);
		if((json.command == "UpdateClipPage") && (this.onClipPageUpdate != null))
		{
			this.onClipPageUpdate(json);
		}
        else if ((json.command == 'UpdateClipViewIndex') && (this.onUpdateClipViewIndex != null))
        {
            const idx = json.parameters;
            this.onUpdateClipViewIndex(idx);
		}
	}
}