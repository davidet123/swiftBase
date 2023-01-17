/************************************************************
Copyright © 2016-by RTSoftware Ltd, London. UK. All rights reserved

This software is the sole property or RTSoftware Ltd.
You are not permitted to re-distribute, modify or re-purpose for any reason
this without express permission from RTSoftware Ltd, UK.
************************************************************/

function RTGesture(rtswProtocol, protocolId)
{
	// Set this to the number of pixels that the user should move the mouse before a "click" turns into a "drag"
	this.dragTolerance = 5;
	var segmentMode = "none";
	var videoWidth = 1920;
	var videoHeight = 1080;
	this.videoClassOrId = null;

	this.onGestureReady = function() 
	{
		trace("Gesture.onGestureReady not overridden");
	}

	this.onGestureClose = function() 
	{
		trace("Gesture.onGestureClose not overridden");
	}

	this.onGestureError = function() 
	{
		trace("Gesture.onGestureError not overridden");
	}

	this.onVideoSizeUpdate = function(json) {
		videoWidth = json.parameters.width;
		videoHeight = json.parameters.height;
		console.log("onVideoSizeUpdate - width:" + videoWidth + " height:" + videoHeight);
	}

	this.getGestureId = function()
	{
		return protocolId;
	}

	this.setSegmentMode = function(mode)
	{
		segmentMode = mode;
	}

	this.getSegmentMode = function()
	{
		return segmentMode;
	}

//
// API Calls
//
	// Call setup to initialise the gesture library and attach it to a video window. videoClassOrId should point to a class or id to attach to e.g. '#video'
	// This will enable gestures on that window to send commands to tog.
	this.setup = function(videoClassOrId, videoStreamClass) {
		this.videoClassOrId = videoClassOrId;
		this.getVideoSize();

		$(videoClassOrId).on('mousedown mouseup mousemove touchstart touchmove touchend touchleave touchcancel', null, {videoStream: this}, function(event) 
		{ 
			event.preventDefault(); 
			event.stopPropagation();
			
			// this logic prevents mouse presses from being handled while we are performing a touch operation.
			if(event.type == "touchstart")
			{
				this.usingTouch = true;
			}
			if(event.type == "touchend")
			{
				this.usingTouch = false;
			}
			if (((event.type == "mousedown") || (event.type == "mouseup") || (event.type == "mousemove")) && (this.usingTouch == true))
			{
				return;
			}

			var offset = $(this).offset();
			var width = $(this).width();
			var height = $(this).height();
			var relx = this.lastPosX;
			var rely = this.lastPosY;
			if(videoWidth <= 0)
			{
				videoWidth = 1;
			}
			if(videoHeight <= 0)
			{
				videoHeight = 1;
			}
			var vidRatio = videoWidth / videoHeight;
			var divRatio = width / height;
			
			//determine whether the cursor is over the actual video
			var vidWidth = 0;
			var vidHeight = 0;
			var vidLeft = 0;
			var vidTop = 0;
			if(vidRatio < divRatio)
			{
				vidWidth = vidRatio * height;
				vidHeight = height;
				vidLeft = (width - vidWidth) / 2;
				vidTop = 0;
			}
			else
			{
				vidWidth = width;
				vidHeight = width / vidRatio;
				vidLeft = 0;
				vidTop = (height - vidHeight) / 2;
			}

			var webpageX = 0;
			var webpageY = 0;

			if((event.type == 'mousedown') || (event.type == 'mousemove') || (event.type == 'mouseup'))
			{
				webpageX = event.pageX;
				webpageY = event.pageY;
			}
			else
			{
				webpageX = targetEvent.pageX;
				webpageY = targetEvent.pageY;
			}

			var curPosX = webpageX - offset.left;
			var curPosY = webpageY - offset.top;

			if((curPosX >= vidLeft) && (curPosX <= (vidLeft + vidWidth)) && (curPosY >= vidTop) && (curPosY <= (vidTop + vidHeight)))
			{
				if((event.type == 'mousedown') || (event.type == 'mousemove') || (event.type == 'mouseup'))
				{
					relx = Math.floor(((curPosX - vidLeft) * 1920) / vidWidth);
					rely = Math.floor(((curPosY - vidTop) * 1080) / vidHeight);
				}
				else
				{
					// jquery doesn't handle the touches element, hence originalEvent...
					if(event.originalEvent.touches.length > 0)
					{
						var targetEvent = event.originalEvent.touches.item(0);
						relx = Math.floor(((curPosX - vidLeft) * 1920) / vidWidth);
						rely = Math.floor(((curPosY - vidTop) * 1080) / vidHeight);
					}
				}

			// Check and apply scale factors
			var scaleX = this.getBoundingClientRect().width / this.offsetWidth;
			var scaleY = this.getBoundingClientRect().height / this.offsetHeight;

			relx /= scaleX;
			rely /= scaleY;

				this.lastPosX = relx;
				this.lastPosY = rely;

				if(		(event.type == 'mousedown') || 
						(event.type == 'touchstart'))
				{
					event.data.videoStream.state = 1;
					event.data.videoStream.lastPosX = relx;
					event.data.videoStream.lastPosY = rely;
					event.data.videoStream.mouseDown(relx, rely);
					if(segmentMode === "add")
					{
						event.data.videoStream.segmentKeyerAdd(relx, rely);					
					}
					else if(segmentMode === "remove")
					{
						event.data.videoStream.segmentKeyerRemove(relx, rely);
					}
					event.data.videoStream.lastTime = new Date().getTime();
				}
				else if(	(event.type == 'mousemove') || 
							(event.type == 'touchmove'))
				{
					if(event.data.videoStream.state == 1)
					{
						if(new Date().getTime() - event.data.videoStream.lastTime > 20)
						{
							event.data.videoStream.mouseMove(relx, rely);
							if(segmentMode === "add")
							{
								event.data.videoStream.segmentKeyerAdd(relx, rely);					
							}
							else if(segmentMode === "remove")
							{
								event.data.videoStream.segmentKeyerRemove(relx, rely);
							}
							event.data.videoStream.lastTime = new Date().getTime();
						}
					}
				}
				else if(	(event.type == 'mouseup') || 
							(event.type == 'touchend') || 
							(event.type == 'touchcancel') || 
							(event.type == 'touchleave'))
				{
					event.data.videoStream.state = 0;
					event.data.videoStream.mouseUp(relx, rely);
				}
			}
		})
	}

//
// Messages
//

	// Manually send a mouse down command to tog. The width and height of the video window are 1920x1080 regardless of actual video resolution
	this.mouseDown = function(x, y) {
		var data =
		{
			'command':'MouseDown',
			'parameters':
			{
				'x':x,
				'y':y
			}
		}
		rtswProtocol.send(protocolId, data);
	}

	this.segmentKeyerAdd = function(x, y) {
		var data =
		{
			'command':'SegmentKeyerAdd',
			'parameters':
			{
				'x':x,
				'y':y
			}
		}
		console.log("Sending segment keyer add x:" + x + "   y:" + y + "   via" + protocolId);
		rtswProtocol.send(protocolId, data);
	}

	this.segmentKeyerRemove = function(x, y) {
		var data =
		{
			'command':'SegmentKeyerRemove',
			'parameters':
			{
				'x':x,
				'y':y
			}
		}
		rtswProtocol.send(protocolId, data);
	}

	this.getVideoSize = function() {
		var data =
		{
			'command' : 'GetVideoSize',
			'parameters' :
			{
			}
		}
		rtswProtocol.send(protocolId, data);
	}

	// Manually send a mouse move command to tog. The width and height of the video window are 1920x1080 regardless of actual video resolution
	this.mouseMove = function(x, y) {
		var data =
		{
			'command':'MouseMove',
			'parameters':
			{
				'x':x,
				'y':y
			}
		}

		rtswProtocol.send(protocolId, data);
	}

	// Manually send a mouse up command to tog. The width and height of the video window are 1920x1080 regardless of actual video resolution
	this.mouseUp = function(x, y) {
		var data =
		{
			'command':'MouseUp',
			'parameters':
			{
				'x':x,
				'y':y
			}
		}

		rtswProtocol.send(protocolId, data);
	}

//
// Implementation below...
//
	rtswProtocol.addProtocol(this, "gesture.rtsw.co.uk", protocolId);

	// state :  0 mouse is up
	//			1 mouse is down.
	this.state = 0;
	this.lastPosX = 0;
	this.lastPosY = 0;
	this.lastTime = 0;

	this.callbackOpen = function () {
		this.onGestureReady();
	}

	this.callbackError = function(event) {
		this.onGestureError();
	}

	this.callbackClose = function (event) {
		this.onGestureClose();
		// Remove the element hook if this callback closes.
		if(	this.videoClassOrId != null)
		{
			$(this.videoClassOrId).off('mousedown mouseup mousemove touchstart touchmove touchend touchleave touchcancel');
		}
	}

	this.callbackRecieve = function (event) {
		var json = JSON.parse(event.data);
		if(json.command === "videoSize")
		{
			this.onVideoSizeUpdate(json);
		}
	}	
}
