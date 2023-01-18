/************************************************************
Copyright � 2016-by RTSoftware Ltd, London. UK. All rights reserved

This software is the sole property or RTSoftware Ltd.
You are not permitted to re-distribute, modify or re-purpose for any reason
this without express permission from RTSoftware Ltd, UK.
************************************************************/

// VideoStream API. To create, do something like this :
//
// var rtConnection = new RTConnection("ws://192.168.1.15");
// rtswProtocol.callbackConnected = function()
// {
// 		videoStream = new VideoStream(rtConnection, "videoProtocol", "#video")
// }

// import {trace} from './rtsw'

function RTVideoStream(rtswProtocol, protocolId, paramVideoId)
{

//
// API
//

	// closes the video stream and cleans up.
	this.close = function()	
	{
		this.closing = true;
	//	this.socket.close();
		if(this.peerConnection != null)
		{
			this.peerConnection.close();
			this.peerConnection = null;
			var video = document.getElementById(this.videoId);
			video.src = "";
		}
	}

//
// Implementation Below
//

	
	if(typeof(paramVideoId)==='undefined') paramVideoId = "video";
	this.peerConnection = null;
	this.videoId = paramVideoId;
	this.closing = false;

//
// webrtc
//
	this.onRemoteTrack = function(event) {
		var video = document.getElementById(this.videoId);
		video.srcObject = event.streams[0];
    // console.log(event.streams[0])
	}

	this.onAnswer = function(event)
	{
		trace("Sending " + event.type);
		trace (this.peerConnection);
		this.peerConnection.setLocalDescription(event);
		var data =
		{
			'type': event.type,
			'sdp': event.sdp
		}
		rtswProtocol.send(protocolId, data);
	}
	
	this.onIceCandidate = function(event)
	{
		if(event.candidate == null)
		{
			trace("Last Ice Candidate Discovered, we are done.");
		}
		else
		{
			var data =
			{
				'type':'icecandidate',
				'candidate':
				{
					'sdpMid':event.candidate.sdpMid,
					'sdpMLineIndex':event.candidate.sdpMLineIndex,
					'candidate':event.candidate.candidate
				}
			}

			trace("Sending ice candidate " + event.candidate.candidate);
			rtswProtocol.send(protocolId, data);
		}
	}

	this.onPeerConnectionError = function(err)
	{
		trace("There was an error establishing the video connection");
	}

	this.createPeerConnection = function() {
		var servers = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};

		try {
			this.peerConnection = new RTCPeerConnection(servers);
			this.peerConnection.onicecandidate = this.onIceCandidate.bind(this); 
		} catch (e) {
			console.log("Failed to create PeerConnection, exception: " + e.message);
		}
  
		this.peerConnection.ontrack = this.onRemoteTrack.bind(this);
	}

//
// Implementation below...
//

	rtswProtocol.addProtocol(this, "video.rtsw.co.uk", protocolId);

	this.callbackOpen = function () {
		this.createPeerConnection();
	}

	this.callbackError = function (error) {
		trace("Socket error - " + error);
	}

	this.callbackRecieve = function (event) {
		var json = JSON.parse(event.data);

		if(json.type == "offer")
		{
			trace("Recieved offer");
			var session_description = new RTCSessionDescription(json);
			this.peerConnection.setRemoteDescription(session_description);
			this.peerConnection.createAnswer(this.onAnswer.bind(this), this.onPeerConnectionError.bind(this));
		}
		else if(json.type == "icecandidate")
		{
			trace("Recieved ICE candidate " + json.candidate.candidate);
			this.peerConnection.addIceCandidate(new RTCIceCandidate(json.candidate));
		}
		else
		{
			trace("Unhandled message : " + event.data)
		}
	}	

	this.callbackClose = function(event)
	{
		if(this.peerConnection != null)
		{
			this.peerConnection.close();
			this.peerConnection = null;
			var video = document.getElementById(this.videoId);
			video.src = "";
		}
	}
}

// export default RTVideoStream