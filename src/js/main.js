
// let url = "ws://192.168.22.52:5555"
// let url = "ws://192.168.50.200:5555"
let url = "ws:localhost:5555"
/* let myWebSocket = new WebSocket(url, 'rtsw.co.uk');
console.log(myWebSocket)
 */

let boton1 = document.getElementById("boton1");
let boton2 = document.getElementById("boton2");
let boton3 = document.getElementById("boton3");
let textName = document.getElementById("testName");

let rtConnection;
let rtRemote;
let videoStream;

let streaming = false



let grafico = "Vumetro"
let node = "valor_vumetro"

let limpiar =  () => {
  rtRemote.playGraphic(grafico);
  rtRemote.playMethod("takeOff")
};

let insertar = () => {
  console.log("Textname => " + textName)
  rtRemote.playGraphic(grafico);
  rtRemote.updateFields(grafico + "::" + node + "TEXT", "String", 0);
  for(let i = 15; i >= 0; i--) {
    animarVumetro(i);
  }
  // rtRemote.updateFields(grafico + "::rectangle1TRFM", "Display", false);
  /* rtRemote.updateFields(grafico + "::dskTextTEXT", "Size", 40); */
  rtRemote.playMethod(grafico + "::bringOn")
  // empezar()
  // streaming = true
}

const empezar = () => {
  streaming = !streaming
}

let mostrarValor = (valor) => {
  // rtRemote.playGraphic(grafico);
  
  rtRemote.updateFields(grafico + "::" + node + "TEXT", "String", valor);
  rtRemote.updateFields(grafico + "::valor2TEXT", "String", transform(valor));
  
  // console.log(transform(valor))
  console.log(valor)
}
const animarVumetro = valor => {
  console.log(valor)
  // rtRemote.updateFields(grafico + "::rectangle1TRFM", "Display", true); 
  rtRemote.updateFields(grafico + "::n1_DUPL", "NumDuplicates", transform(valor));
}

let mover = () => {
  for (let i = 540; i >= 0; i--) {
    rtRemote.updateFields(grafico + "::group3", "Translate", "960," + i);

  }
}

const transform = valor => {
  const min = 0
  const maxOut = 15
  const maxIn = 100
  let percent = (valor) / (maxIn)
  return Math.round(percent * (maxOut))
}

// videoProtocol = new RTVideoStream(url, "videoStream1", "#myVideoId")

// var rtConnection = new RTConnection("ws://192.168.1.15");


// Captura audio

let frameRate = 0
let recording = false

navigator.mediaDevices.getUserMedia({
  audio: true,
  video: true
})
  .then(function(stream) {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    console.log(microphone)
    const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

    let factorVolumen = 0.7;
    
    let valorVumetro = 0;
    
    

    analyser.smoothingTimeConstant = 0.8;
    analyser.fftSize = 1024;

    microphone.connect(analyser);
    analyser.connect(scriptProcessor);
    scriptProcessor.connect(audioContext.destination);
    scriptProcessor.onaudioprocess = function() {
      const array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      // analyser.getByteTimeDomainData(array);
      const arraySum = array.reduce((a, value) => a + value, 0);
      const average = arraySum / array.length;
      // console.log(Math.round(average));
      
     
      // demo.setAttribute('data-val', average*factorVolumen); // AÑADIR VALORES PARA PINTAR RECUADROS DEL VOLUMEN

      valorVumetro = average*factorVolumen;
      dataValue = parseInt(Math.floor(valorVumetro * factorVolumen))
      // console.log(dataValue)

      if (streaming) {

        if (frameRate % 10 == 0) {
  
          // valorVumetroEl.innerHTML = Math.round(valorVumetro * 100) / 100 + 60;
          if (recording) {
            // newDataPoints.push({y: parseFloat((valorVumetro * factorVolumen).toFixed(2))})
            // newDataPoints.push({y: parseInt(Math.floor(valorVumetro * factorVolumen))})
            // newChart.updateData(parseInt(Math.floor(valorVumetro * factorVolumen)))
          }
          // console.log(newDataPoints)
          // valorVumetroEl.innerHTML =(valorVumetro * factorVolumen).toFixed(2)
          mostrarValor(valorVumetro.toFixed(2))
        }
        animarVumetro(valorVumetro)
        frameRate ++
      }

      if (frameRate == 299) {
        frameRate = 0;
      };
      // colorPids(average);
      /* let demoInput = document.getElementById('demoInput');
      demoInput.oninput = function(e){
      console.log(this.value);
  }; */
    };
  })
  .catch(function(err) {
    console.error(err);
  });


function OpenConnection()
{
  // create a connection to Swift. With no parameters,
  // it assumes that Swift is running on the same IP
  // and PORT that this web page was served from.
  rtConnection = new RTConnection(url, 5, 2);
  
  rtConnection.onOpen = function() {
    // console.log("Conection opened")
    trace("Connection opened");
    // Create a clip control protocol plugin via
    // the rtConnection we have established.
    videoStream = new RTVideoStream(rtConnection, "videoProtocol", "myVideoId");

    rtRemote = new RTRemote(rtConnection, "remote");

    rtRemote.getStatus("Project","Current")
    
    boton1.addEventListener("click", insertar)
    boton2.addEventListener("click", limpiar)
    boton3.addEventListener("click", empezar)
    
    

  /* The video streaming protocol allows video to be streamed from Swift to a <video> tag in
a html web page.
The video is streamed with low latency, meaning that interaction is possible without lag.
The underlying protocol used is an open standard, but is quite complex to implement
into a non-web application. However, it is completely wrapped up inside of the javascript
protocol, so you do not need to know the details of how it works in order to use video
streaming.
If you wish to implement video streaming into a non-web application using the web
socket interface, please contact RTSoftware support for advice.
When creating the video stream protocol, as well as the normal rtswProtocol an
protocolId arguments, you also pass in a videoId. This is the id of a <video> tag in the
html file that you are using.
For example,
<video id=”myVideoId”/>
videoProtocol = new RTVideoStream(rtswProtocol, “videoStream1”, “#myVideoId”)
The protocol will then do the rest of the work to establish the video connection to Swift,
and start streaming video.
If you want to close the stream, call
videoProtocol.close()
You will need to open a new protocol to start streaming again. */


    /* Note: the nodeName can be specified as <parentNodeName>::<nodeName>. To find a node
for a particular graphic you can use the object node for the graphic as the parent node. For
example, SwiftCaption_OBJ::titleText_TRFM would update the node titleText_TRFM in the
SwiftCaption graphic.
Note: the nodeName/fieldName/value triple can be repeated to update multiple node afields
with a single command on a single frame. 
rotocol.UpdateField (nodeName,fieldname,value)
*/
    // rtRemote.playMethod("bringOn");

    //setTimeout(rtRemote.playMethod("takeOff"), 5000);
    // rtRemote.endTransaction();

    
    /* rtRemote.updateFields ("text1","String",1); */
    /* rtRemoteControl = new RTRemoteControl(rtConnection,
  "remoteControl"); */
  }
  rtConnection.onClose = function() {
    trace("Connection Closed, try again…");
    // If the connection closes, attempt to reopen it.
    OpenConnection();
    }
}
OpenConnection();


/* console.log(rtRemote)
console.log(rtRemote.getStatus("Project","Current")); 
1.000000,1.000000,1.000000,1.000000~1,0,0,1~1,0,0,1~1,0,0,1~1,0,0,1~1,0,0,1~1,0,0,1~1,0,0,1~1,0,0,1~1,0,0,1~1,0,0,1~1,0,0,1~1,0,0,1~1,0,0,1~1,0,0,1
redOn = ~1,0.1843,0.1176,0.9
redOff = ~0.251, 0.0471,0.0314, 0.9
yellowOn = ~1,0.8431,0.0196, 0.9
yelllowOff = ~0.251,0.2078, 0, 0.9
greenOn = ~0.2078,1,0.1176, 0.9
greenOff = ~0.051,0.251,0.0314, 0.9

0.2078, 1, 0.1176, 0.9~0.2078, 1, 0.1176, 0.9~0.2078, 1, 0.1176, 0.9~0.2078, 1, 0.1176, 0.9~0.2078, 1, 0.1176, 0.9~0.2078, 1, 0.1176, 0.9~0.2078, 1, 0.1176, 0.9~0.2078, 1, 0.1176, 0.9~1, 0.8431, 0.0196, 0.9~1, 0.8431, 0.0196, 0.9~1, 0.8431, 0.0196, 0.9~1,0.1843,0.1176, 0.9~1,0.1843,0.1176, 0.9

0.9~~0.2078, 1, 0.1176, 0.9~0.2078, 1, 0.1176, 0.9~0.2078, 1, 0.1176, 0.9~0.2078, 1, 0.1176, 0.9~0.2078, 1, 0.1176, 0.9~0.2078, 1, 0.1176, 0.9~0.2078, 1, 0.1176, 0.9~0.2078, 1, 0.1176, 0.9~0.2078, 1, 0.1176, 0.9~1, 0.8431, 0.0196, 0.9~1, 0.8431, 0.0196, 0.9~1, 0.8431, 0.0196, 0.9   0.2078, 1, 0.1176, 0.9~1,0.1843,0.1176, 0.9~1,0.1843,0.1176,0.9
0.251, 0.0471, 0.0314, 0.9~0.251, 0.0471, 0.0314, 0.9~0.251, 0.2078, 0, 0.9~0.251, 0.2078, 0, 0.9~0.251, 0.2078, 0, 0.9~0.051, 0.251, 0.0314, 0.9~0.051, 0.251, 0.0314, 0.9~0.051, 0.251, 0.0314, 0.9~0.051, 0.251, 0.0314, 0.9~0.051, 0.251, 0.0314, 0.9~0.051, 0.251, 0.0314, 0.9~0.051, 0.251, 0.0314, 0.9~0.051, 0.251, 0.0314, 0.9~0.051, 0.251, 0.0314, 0.9~0.051, 0.251, 0.0314, 0.9

On
0.2078,1,0.1176, 0.9~0.2078,1,0.1176, 0.9~0.2078,1,0.1176, 0.9~0.2078,1,0.1176, 0.9~0.2078,1,0.1176, 0.9~0.2078,1,0.1176, 0.9~0.2078,1,0.1176, 0.9~0.2078,1,0.1176, 0.9~0.2078,1,0.1176, 0.9~0.2078,1,0.1176, 0.9~1,0.8431,0.0196, 0.9~1,0.8431,0.0196, 0.9~1,0.8431,0.0196, 0.9~1,0.1843,0.1176,0.9~1,0.1843,0.1176,0.9
Off
0.051,0.251,0.0314, 0.9~0.051,0.251,0.0314, 0.9~0.051,0.251,0.0314, 0.9~0.051,0.251,0.0314, 0.9~0.051,0.251,0.0314, 0.9~0.051,0.251,0.0314, 0.9~0.051,0.251,0.0314, 0.9~0.051,0.251,0.0314, 0.9~0.051,0.251,0.0314, 0.9~0.051,0.251,0.0314, 0.9~0.251,0.2078, 0, 0.9~0.251,0.2078, 0, 0.9~0.251,0.2078, 0, 0.9~0.251, 0.0471,0.0314, 0.9~0.251, 0.0471,0.0314, 0.9
*/

