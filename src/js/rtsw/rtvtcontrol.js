/************************************************************
Copyright © 2016-by RTSoftware Ltd, London. UK. All rights reserved

This software is the sole property or RTSoftware Ltd.
You are not permitted to re-distribute, modify or re-purpose for any reason
this without express permission from RTSoftware Ltd, UK.
************************************************************/

//
// API for the VT Control. You must include jquery in your script to use this class. 
//
// Place the following ids into your html :
//		#vtJogWheel - the jog wheel itself.
function RTVTControl(rtswProtocol, protocolId)
{

    // 
    // Callbacks
    //

    this.onGetClipLengthFrame = function(json) {
        console.error("onGetClipLengthFrame not overriden");
    }

    this.onGetClipLengthHHMMSSFF = function(json) {
        console.error("onGetClipLengthHHMMSSFF not overridden");
    }

    this.onGetClipFrameRate = function(json) {
        console.error("onGetClipFrameRate not overridden");
    }

    this.onClipPlaybackStopped = function(json) {
        console.error("onClipPlaybackStopped not overriden");
    }

    this.onReady = function() {
		trace("VTControl.onReady not overridden");
        this.getClipLengthFrame();
        this.getClipFrameRate();
	}

	//
	// Messages
	//

	// Play the VT
	this.play = function () {
		var data =
		{
			'command':'Play',	
		}

		rtswProtocol.send(protocolId, data);
	}

	// Pause the VT
	this.pause = function () {
		var data =
		{
			'command':'Pause',
		}

		rtswProtocol.send(protocolId, data);
	}

	// Rewind the VT
	this.rewind = function () {
		var data =
		{
			'command':'Rewind',
		}

		rtswProtocol.send(protocolId, data);
	}

	// Fast Forward the VT
	this.fastForward = function () {
		var data =
		{
			'command':'Forward',
		}

		rtswProtocol.send(protocolId, data);
	}

	// Jog the VT
	this.jog = function (speed) {
		var data =
		{
			'command':'Jog',
			'parameters' :
			{
				'jog': speed
			}
		}

		rtswProtocol.send(protocolId, data);
	}

	// Shuttle the VT
	this.shuttle = function (speed) {
		var data =
		{
			'command':'Shuttle',
			'parameters' :
			{
				'shuttle': speed
			}
		}

		rtswProtocol.send(protocolId, data);
	}

	// Slow Mo the VT
	this.slowMo = function (speed) {
		var data =
		{
			'command':'SlowMo',
			'parameters' :
			{
				'speed': speed
			}
		}

		rtswProtocol.send(protocolId, data);
	}

    // Use cooldown to prevent flooding Tactic with updates
    // Delay in ms
    let seekNow = 0;
    let seekDelay = 100;	// When seeking, unless immediate is true, we limit the number of seek commands that are sent per second.

    // Seek functionality
    this.seek = function(value, immediate) {

        if (seekNow >= (Date.now() - seekDelay) && !immediate) {
            return;
        }
        seekNow = Date.now();

        value = parseInt(value);

        if (!value && value !== 0) {
            console.error("Error: " + typeof(value) + " -- " + value + " could not be converted to a number.");
            return;
        }

        var data = {
            'command': 'SpoolClipToTC',
            'parameters': {
                'spoolTC': value
            }
        }

        rtswProtocol.send(protocolId, data);
    }

    // Go live
    this.goLive = function(){
        var data ={
            'command': 'GoLive',
            'parameters': {}
        }

        rtswProtocol.send(protocolId, data);
    }

    // Select channel
    this.selectChannel = function(channel){
        if(!Number.isInteger(channel) || Number.isNaN(channel))
            return console.log("Channel must be a valid integer: " + channel);

        var data ={
            'command': 'SelectChannel',
            'parameters': {
                'channel': channel 
            }
        }

        rtswProtocol.send(protocolId, data);
    }

	// Step the VT
	// Mode can take one of 4 values
	//
	//	1 - slow step fowards
	//	2 - slow step backwards
	//	3 - fast step forwards
	//  4 - fast step backwards
	this.step = function (mode) {
		var data =
		{
			'command':'Step',
			'parameters' :
			{
				'mode': mode
			}
		}

		rtswProtocol.send(protocolId, data);
	}

    // Request clip length, triggers callbackReceieve
    this.getClipLengthFrame = function() {
        var data = {
            'command': 'GetClipLengthFrame',
        }
        rtswProtocol.send(protocolId, data);
    }

    // Request clip frame rate, triggers callbackReceieve
    this.getClipFrameRate = function() {
        var data = {
            'command': 'GetClipFrameRate',
        }
        rtswProtocol.send(protocolId, data);
    }

    this.onSeek = function() {
        console.error("Warning: this.onSeek is not overridden");
    }

    this.setNumChannels = function(channels){
        if(!Number.isInteger(channels) || Number.isNaN(channels))
            return channels.log("Invalid integer for channels: " + channels);

        var channelbtns = document.querySelectorAll(".channel-btn");
        channelbtns.forEach((btn, index) => {
            var equivChannel = index + 1;

            if(channels < equivChannel || channels == 1){
                btn.classList.add("no-display");
            }
        });
    }

//
// Implementation Below
//

	rtswProtocol.addProtocol(this, "vtcontrol.rtsw.co.uk", protocolId);

	this.callbackOpen = function () {
		this.onReady();
	}

	this.callbackError = function(event) {
	}

	this.callbackClose = function (event) {
	}

	this.callbackRecieve = function (event) {
        var json = JSON.parse(event.data);
        if ((json.command == "onReady") && (this.onReady != null)) {
            this.onReady(json);
		}
        if ((json.command == "ClipEndTimecode") && (this.onGetClipLengthFrame != null)) {
            this.onGetClipLengthFrame(json);
		}
        if ((json.command == "ClipLengthHHMMSSFF") && (this.onGetClipLengthHHMMSSFF != null)) {
            // Deprecated: Use onGetClipLengthFrame and onGetClipFrameRate so we can calculate values easier
            // this.onGetClipLengthHHMMSSFF(json);
        }
        if ((json.command == "ClipFrameRate") && (this.onGetClipFrameRate != null)) {
            this.onGetClipFrameRate(json);
        }
        if ((json.command == "ClipPlaybackStatus") && (this.onClipPlaybackStopped != null)) {
            // console.log(json["parameters"]["status"]);
            if (json["parameters"]["status"] == "Paused") {
                this.onClipPlaybackStopped(json);
            }
        }
        if ((json.command == "CurrentTimeCodeUpdate") && (this.onSeek != null)) {
            this.onSeek(json);
        }
        if(json.command == "SetNumVideoChannels"){
            var channels = json["parameters"]["channels"];

            this.setNumChannels(channels);
        }
    }
}
