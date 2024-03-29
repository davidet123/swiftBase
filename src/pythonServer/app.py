#!/usr/bin/env python

import asyncio
import websockets
import pyaudio
import time
import audioop

#Initialisation for PyAudio
CHUNK = 1024
FORMAT = pyaudio.paInt16
CHANNELS = 2
RATE = 44100
RECORD_SECONDS = 5
inputdevice = 0
#Object
p = pyaudio.PyAudio()
info = p.get_host_api_info_by_index(0)
numdevices = info.get('deviceCount')

for i in range(0, numdevices):
    if (p.get_device_info_by_host_api_device_index(0, i).get('maxInputChannels')) > 0:
        print("Input Device id ", i, " - ", p.get_device_info_by_host_api_device_index(0, i).get('name'))

inputdevice = int(input("Elige canal: "))

stream = p.open(format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK, input_device_index=inputdevice)
max_value = [0]*3
done = False
current_section = 0


def captureAudio():

	#Limits CPU usage to max 10 times per second
	#Not required here because already the for loop takes averages over some time
	#clock.tick(10)
    total=0
    #Now we read data from device for around one second
    for i in range(0,2):
              #l,data = inp.read()
        data=stream.read(CHUNK)
        #oreo_sound.append(data)
        if True:
          reading=audioop.max(data, 2)
          total=total+reading
        time.sleep(.0001)

        #any scaling factor
    return total/100
    # max_value[current_section] = max(max_value[current_section], total)


async def echo(websocket):
    # async for message in websocket:
    #     await websocket.send(captureAudio())
    async for message in websocket:
      print("Recibido: ", message)
      while True:
          # message = await str(captureAudio())
          # total=0
          # #Now we read data from device for around one second
          # for i in range(0,2):
          #           #l,data = inp.read()
          #     data=stream.read(CHUNK)
          #     #oreo_sound.append(data)
          #     if True:
          #       reading=audioop.max(data, 2)
          #       total=total+reading
          #     time.sleep(.0001)

          #     #any scaling factor
          # total=total/100
          valor = captureAudio()
          # print(valor)  
          await websocket.send(str(valor))
          await asyncio.sleep(0)
          # max_value[current_section] = max(max_value[current_section], total)
       

async def main():
    async with websockets.serve(echo, "localhost", 8081):
        await asyncio.Future()  # run forever

asyncio.run(main())