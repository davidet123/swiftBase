/* import {RTConnection, trace} from "@/js/rtsw/rtsw"
import RTRemote from "@/js/rtsw/rtremote"
import RTVideoStream from "@/js/rtsw/rtvideostream"; */

const url = "ws:localhost:5555"
export let videoStream
export let rtRemote

export function OpenConnection()
{
  const rtConnection = new RTConnection(url, 5, 2);
  
  rtConnection.onOpen = function() {
    trace("Connection opened");
    videoStream = new RTVideoStream(rtConnection, "videoProtocol", "myVideoId");
    rtRemote = new RTRemote(rtConnection, "remote");
    rtRemote.getStatus("Project","Current")
    console.log(rtRemote)
    // return {videoStream, rtRemote}
  }
  rtConnection.onClose = function() {
    trace("Connection Closed, try again…");
    // If the connection closes, attempt to reopen it.
    OpenConnection();
    }
}

// export default {OpenConnection, rtRemote, videoStream}