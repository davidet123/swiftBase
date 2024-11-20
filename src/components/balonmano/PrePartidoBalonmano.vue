<template>
  <v-row>
    <v-col class="text-center" cols="12">
      <h4>Pre partido</h4>
    </v-col>
  </v-row>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col class="text-center" cols="2">
          <v-row>
            <v-col class="text-center">
              <BotonLive nombre="COUNTDOWN_CLOCK" @activar="activarCountDownClock"/>
              <BotonLive nombre="PRESENTACION_PARTIDO" @activar="activarPresentacionPartido"/>
              <!-- <v-text-field class="ma-0 pa-0"
              density="compact"
                label="HH:MM:SS"
              ></v-text-field> -->
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-center">
              <v-btn color="green" size="x-small" @click="cronoCountdown('Start')">START</v-btn>
              <v-btn color="blue" size="x-small" @click="cronoCountdown('Stop')">STOP</v-btn>
              <v-btn color="error" size="x-small" @click="cronoCountdown('Reset')">RESET</v-btn>
              <v-btn color="teal" size="x-small" @click="dialog=true">AJUSTAR</v-btn>
            </v-col>
          </v-row>
          <div>
            <v-dialog
              max-width="300"
              v-model="dialog"
            >
            <v-row>
              <v-col class="text-center">
                <v-card>
                  <v-card-title>
                    <h6>Ajustar Countdown</h6>

                  </v-card-title>
                  <v-card-text>
                    <v-text-field
                      label="HH:MM:SS"
                      density="compact"
                      v-model="countDownTiempo"
                    >
    
                    </v-text-field>
                    <v-btn color="success" size="x-small" @click="ajustarCoutDown">ACEPTAR</v-btn>

                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
              
            </v-dialog>
          </div>
        </v-col>
        <v-col class="text-center" cols="2">
          <BotonLive nombre="LINE_UP LOCAL" @activar="activarAlineacion"/>
          <BotonLive nombre="LINE_UP VISITANTE" @activar="activarAlineacion"/>
          <BotonLive nombre="EQUIPO ARBITRAL" @activar="activarArbitros"/>
        </v-col>
        <v-col cols="2">
            <BotonLive nombre="ESTADISTICAS" @activar="activarEstadisticas"/>
        </v-col>
        <v-col cols="2">
            <BotonLive nombre="MARCADOR INFERIOR" @activar="marcadorInferior"/>
            <BotonLive nombre="MARCADOR INICIO PARTE" @activar="marcadorInicioParte"/>
        </v-col>
        <v-col cols="2">
          <v-btn class="mr-1" size="x-small" :color="!liveBtn.copy ? 'success' : 'error'" @click="activarCopy">COPY</v-btn>
          <v-btn class="mr-1" size="x-small" :color="!liveBtn.DSKFinestraNarracio ? 'success' : 'error'" @click="activarDSKFinestra('narracion')">DSK NARRACIO</v-btn>
          <v-btn class="mr-1" size="x-small" :color="!liveBtn.DSKFinestraComentaris ? 'success' : 'error'" @click="activarDSKFinestra('comentaris')">DSK COMENTARIS</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>

  import { storeToRefs } from "pinia"
  import { useBalonmanoStore } from "../../store/balonmano"
  import { useSwiftConnectionStore } from "../../store/swiftConnection"
  import { computed, onBeforeMount, ref } from "vue"
  import BotonLive from "../simple/botonLive.vue"

  const balonmanoStore = useBalonmanoStore()
  const swiftConnectionStore = useSwiftConnectionStore()

  const { marcador, partido } = storeToRefs(balonmanoStore)

  const dialog = ref(false)

  const liveBtn = ref({
    copy: false,
    DSKFinestraNarracio: false,
    DSKFinestraComentaris: false
  })


  const activarCountDownClock = data => {
    if (data.live) {
      swiftConnectionStore.playGraphic('COUNTDOWN_CLOCK')
      swiftConnectionStore.cueGraphic('COUNTDOWN_CLOCK')
  
      swiftConnectionStore.rtRemote.updateFields("COUNTDOWN_CLOCK::COMPETICION_TEXTOTEXT","String", partido.value.competicion)
      // // swiftConnectionStore.rtRemote.updateFields("COUNTDOWN_CLOCK::JORNADATEXT","String", partido.value.pais)
      swiftConnectionStore.rtRemote.updateFields("COUNTDOWN_CLOCK::UBICACION_TEXTOTEXT","String", partido.value.lugar)
      swiftConnectionStore.rtRemote.updateFields("COUNTDOWN_CLOCK::FECHA_TEXTOTEXT","String", partido.value.fecha)
      swiftConnectionStore.rtRemote.updateFields("COUNTDOWN_CLOCK::LOGO_HOMESHDR", "Shader", partido.value.local.escudo)
      swiftConnectionStore.rtRemote.updateFields("COUNTDOWN_CLOCK::LOGO_AWAYSHDR", "Shader", partido.value.visitante.escudo)

      swiftConnectionStore.bringOn('COUNTDOWN_CLOCK')
    } else {
      swiftConnectionStore.takeOff('COUNTDOWN_CLOCK')
    }
  }
  const activarPresentacionPartido = data => {
    if (data.live) {

      const equipos = ['local', 'visitante']
      swiftConnectionStore.playGraphic('PRESENTACION_PARTIDO')
      swiftConnectionStore.rtRemote.updateFields("PRESENTACION_PARTIDO::PRESENTACION_GRUPOTEXT","String", partido.value.competicion)
      swiftConnectionStore.rtRemote.updateFields("PRESENTACION_PARTIDO::PRESENTACION_LUGARTEXT","String", partido.value.lugar)
      swiftConnectionStore.rtRemote.updateFields("PRESENTACION_PARTIDO::FECHA_TEXTOTEXT","String", partido.value.fecha)

      equipos.forEach(equipo => {
        swiftConnectionStore.rtRemote.updateFields(`PRESENTACION_PARTIDO::PRESENTACION_EQUIPO_${equipo.toUpperCase()}TEXT`,"String", partido.value[equipo].nombre)
        swiftConnectionStore.rtRemote.updateFields(`PRESENTACION_PARTIDO::PRESENTACION_ESCUDO_${equipo.toUpperCase()}SHDR`, "Shader", partido.value[equipo].escudo)
      })

      // swiftConnectionStore.cueGraphic('COUNTDOWN_CLOCK')
  
      swiftConnectionStore.bringOn('PRESENTACION_PARTIDO')
    } else {
      swiftConnectionStore.takeOff('PRESENTACION_PARTIDO')
    }
  }

  const countDownTiempo = ref(null)

  const ajustarCoutDown = () => {
    const horas = countDownTiempo.value.split(":")[0]
    const minutos = countDownTiempo.value.split(":")[1]
    const segundos = countDownTiempo.value.split(":")[2]

    swiftConnectionStore.rtRemote.updateFields("COUNTDOWN_CLOCK::clock","Hour", horas)
    swiftConnectionStore.rtRemote.updateFields("COUNTDOWN_CLOCK::clock","Minute", minutos)
    swiftConnectionStore.rtRemote.updateFields("COUNTDOWN_CLOCK::clock","Second", segundos)
    swiftConnectionStore.rtRemote.updateFields("COUNTDOWN_CLOCK::clock","Milisec", 0)
    swiftConnectionStore.rtRemote.updateFields("COUNTDOWN_CLOCK::clockTextTEXT","String", countDownTiempo.value)



    dialog.value = false

  }

  const capitalize = text => {
    return text.charAt(0).toUpperCase()
        + text.slice(1).toLowerCase()
  }
  const activarAlineacion = data => {
    if(data.live) {
      const equipo = data.nombre.split(" ")[1].toLowerCase()
      const datosEquipo = partido.value[equipo]
  
      const totalJugadores = datosEquipo.jugadores.length
  
      // if (data.live) {
  
      
      
      let jugadoresIzquierda = ""
      let dorsalesIzquierda = ""
      let jugadoresDerecha = ""
      let dorsalesDerecha = ""
      
      for(let i = 0; i<=7; i++) {
        if(datosEquipo.jugadores[i]) {
          jugadoresIzquierda += capitalize(datosEquipo.jugadores[i].nombre) + " " + datosEquipo.jugadores[i].apellido.toUpperCase()
          if(datosEquipo.jugadores[i].capitan) jugadoresIzquierda += " (C)"
          if(datosEquipo.jugadores[i].portero) jugadoresIzquierda += " (GK)"
          dorsalesIzquierda += datosEquipo.jugadores[i].dorsal
        } else {
          jugadoresIzquierda += ""
          dorsalesIzquierda += ""
        }
        jugadoresIzquierda += "~"
        dorsalesIzquierda += "~"
      }
  
      jugadoresIzquierda = jugadoresIzquierda.slice(0, -1)
      dorsalesIzquierda = dorsalesIzquierda.slice(0, -1)
      
      for(let i = 8; i < totalJugadores; i++) {
        if(datosEquipo.jugadores[i].nombre) {
          jugadoresDerecha += capitalize(datosEquipo.jugadores[i].nombre) + " " + datosEquipo.jugadores[i].apellido.toUpperCase()
          if(datosEquipo.jugadores[i].capitan) jugadoresDerecha += " (C)"
          if(datosEquipo.jugadores[i].portero) jugadoresDerecha += " (GK)"
          dorsalesDerecha += datosEquipo.jugadores[i].dorsal
        } else {
          jugadoresDerecha += ""
          dorsalesDerecha += ""
        }
        jugadoresDerecha += "~"
        dorsalesDerecha += "~"
      }
      jugadoresDerecha = jugadoresDerecha.slice(0, -1)
      dorsalesDerecha = dorsalesDerecha.slice(0, -1)

      // ENVIAR A SWIFT


      swiftConnectionStore.playGraphic('LINE_UP')
      swiftConnectionStore.cueGraphic('LINE_UP')
  
      swiftConnectionStore.rtRemote.updateFields("LINE_UP::NOMBRE_EQUIPOTEXT","String", datosEquipo.nombre)
      swiftConnectionStore.rtRemote.updateFields("LINE_UP::PAISTEXT","String", datosEquipo.pais)
      swiftConnectionStore.rtRemote.updateFields("LINE_UP::ESCUDO_EQUIPOSHDR", "Shader", datosEquipo.escudo)
      swiftConnectionStore.rtRemote.updateFields("LINE_UP::DORSAL_IZQUIERDATEXT","String", dorsalesIzquierda)
      swiftConnectionStore.rtRemote.updateFields("LINE_UP::NOMBRE_IZQUIERDATEXT","String", jugadoresIzquierda)
      swiftConnectionStore.rtRemote.updateFields("LINE_UP::DORSAL_DERECHATEXT","String", dorsalesDerecha)
      swiftConnectionStore.rtRemote.updateFields("LINE_UP::NOMBRE_DERECHATEXT","String", jugadoresDerecha)
  
      swiftConnectionStore.bringOn('LINE_UP')
    }  else {
      swiftConnectionStore.takeOff('LINE_UP')
    }
  }

  const activarArbitros = data => {
    console.log(partido.value.equipo_arbitral)
    if(data.live) {
      swiftConnectionStore.playGraphic('ARBITROS_DSK')
      // swiftConnectionStore.cueGraphic('ARBITROS_DSK')
      swiftConnectionStore.rtRemote.updateFields("ARBITROS_DSK::NOMBRE_ARBITRO_TOPTEXT","String", partido.value.equipo_arbitral.arbitro1.nombre)
      swiftConnectionStore.rtRemote.updateFields("ARBITROS_DSK::APELLIDO_ARBITRO_TOPTEXT","String", partido.value.equipo_arbitral.arbitro1.apellido)
      swiftConnectionStore.rtRemote.updateFields("ARBITROS_DSK::PAIS_ARBITRO_TOPTEXT","String", partido.value.equipo_arbitral.arbitro1.pais)
      swiftConnectionStore.rtRemote.updateFields("ARBITROS_DSK::NOMBRE_ARBITRO_BOTTEXT","String", partido.value.equipo_arbitral.arbitro2.nombre)
      swiftConnectionStore.rtRemote.updateFields("ARBITROS_DSK::APELLIDO_ARBITRO_BOTTEXT","String", partido.value.equipo_arbitral.arbitro2.apellido)
      swiftConnectionStore.rtRemote.updateFields("ARBITROS_DSK::PAIS_ARBITRO_BOTTEXT","String", partido.value.equipo_arbitral.arbitro2.pais)

      swiftConnectionStore.bringOn('ARBITROS_DSK')
    } else {
      swiftConnectionStore.takeOff('ARBITROS_DSK')
    }
  }

  const cronoCountdown = funcion => {
    swiftConnectionStore.customMetodo(swiftConnectionStore.customMetodo("COUNTDOWN_CLOCK", `clock${funcion}`))
  }

  const porcentaje = (a,b) => {
    if(b === 0) return "0%"
    const valor = Math.round(a/b*100)
    return `${valor}%`
  }

  const textoParte = parte => {
    if(parte === 1) {
      return "HALF TIME"
    } else if (parte === 2) {
      return "FULL TIME"
    }
  }

  const activarEstadisticas = data => {
    if (data.live) {
      const parteSTR = textoParte(marcador.value.parte)
      const encuentro = partido.value

      const equipos = ['local', 'visitante']
      const estadisticaLocal = [
        porcentaje(encuentro.local.estadistica_equipo.goles, encuentro.local.estadistica_equipo.tiros),
        porcentaje(encuentro.local.estadistica_equipo.paradas, encuentro.visitante.estadistica_equipo.tiros),
        encuentro.local.estadistica_equipo.penalti7m_efectuados.toString(),
        porcentaje(encuentro.local.estadistica_equipo.penalti7m_anotados, encuentro.local.estadistica_equipo.penalti7m_efectuados),
        encuentro.local.estadistica_equipo.suspensiones.toString(),
        encuentro.local.estadistica_equipo.tarjetas_amarillas.toString()
      ]
      const estadisticaVisitante = [
        porcentaje(encuentro.visitante.estadistica_equipo.goles, encuentro.visitante.estadistica_equipo.tiros),
        porcentaje(encuentro.visitante.estadistica_equipo.paradas, encuentro.local.estadistica_equipo.tiros),
        encuentro.visitante.estadistica_equipo.penalti7m_efectuados.toString(),
        porcentaje(encuentro.visitante.estadistica_equipo.penalti7m_anotados, encuentro.visitante.estadistica_equipo.penalti7m_efectuados),
        encuentro.visitante.estadistica_equipo.suspensiones.toString(),
        encuentro.visitante.estadistica_equipo.tarjetas_amarillas.toString()
      ]
      swiftConnectionStore.playGraphic('ESTADISTICAS')
      swiftConnectionStore.cueGraphic('ESTADISTICAS')


      swiftConnectionStore.rtRemote.updateFields("ESTADISTICAS::PARTE_ESTADISTICASTEXT","String", parteSTR)
      swiftConnectionStore.rtRemote.updateFields("ESTADISTICAS::MARCADORTEXT","String", `${encuentro.local.estadistica_equipo.goles} - ${encuentro.visitante.estadistica_equipo.goles}`)

      // EQUIPO_LOCAL

      swiftConnectionStore.rtRemote.updateFields("ESTADISTICAS::ESCUDO_HOMESHDR", "Shader", encuentro.local.escudo)
      swiftConnectionStore.rtRemote.updateFields("ESTADISTICAS::NOMBRE_EQUIPO_HOMETEXT","String", encuentro.local.nombre)
      for(let i = 0; i <= estadisticaLocal.length -1; i++) {
        swiftConnectionStore.rtRemote.updateFields(`ESTADISTICAS::EST_HOME_LINEA_${i+1}TEXT`,"String", estadisticaLocal[i])
      }
      // EQUIPO_VISITANTE

      swiftConnectionStore.rtRemote.updateFields("ESTADISTICAS::ESCUDO_AWAYSHDR", "Shader", encuentro.visitante.escudo)
      swiftConnectionStore.rtRemote.updateFields("ESTADISTICAS::NOMBRE_EQUIPO_AWAYTEXT","String", encuentro.visitante.nombre)
      for(let i = 0; i <= estadisticaVisitante.length -1; i++) {
        swiftConnectionStore.rtRemote.updateFields(`ESTADISTICAS::EST_AWAY_LINEA_${i+1}TEXT`,"String", estadisticaVisitante[i])
      }


      swiftConnectionStore.bringOn('ESTADISTICAS')
    } else {
      swiftConnectionStore.takeOff('ESTADISTICAS')
    }
  }

  const marcadorInferior = data => {
    if(data.live) {
      const parteSTR = textoParte(marcador.value.parte)

      swiftConnectionStore.playGraphic('MARCADOR_HALF_TIME')
      
      swiftConnectionStore.rtRemote.updateFields("MARCADOR_HALF_TIME::ESCUDO_HOMESHDR", "Shader", partido.value.local.escudo)
      swiftConnectionStore.rtRemote.updateFields("MARCADOR_HALF_TIME::NOMBRE_EQUIPO_HOMETEXT","String", partido.value.local.nombre.toUpperCase())
      swiftConnectionStore.rtRemote.updateFields("MARCADOR_HALF_TIME::GOLES_HOMETEXT","String", marcador.value.local)
      swiftConnectionStore.rtRemote.updateFields("MARCADOR_HALF_TIME::ESCUDO_AWAYSHDR", "Shader", partido.value.visitante.escudo)
      swiftConnectionStore.rtRemote.updateFields("MARCADOR_HALF_TIME::NOMBRE_EQUIPO_AWAYTEXT","String", partido.value.visitante.nombre.toUpperCase())
      swiftConnectionStore.rtRemote.updateFields("MARCADOR_HALF_TIME::GOLES_AWAYTEXT","String", marcador.value.visitante)
      
      swiftConnectionStore.rtRemote.updateFields("MARCADOR_HALF_TIME::PARTE_MARCADOR_HALF_TIMETEXT","String", parteSTR)
      
      swiftConnectionStore.bringOn('MARCADOR_HALF_TIME')
      
    } else {
      
      swiftConnectionStore.takeOff('MARCADOR_HALF_TIME')
    }
  }

  let temporizadorInicio

  const marcadorInicioParte = data => {
    if(data.live) {
      const parte = marcador.value.parte === 1 ? '1st' : '2nd'
      const tiempo = convertirSegundos(marcador.value.tiempo)

      swiftConnectionStore.playGraphic('MARCADOR_INICIO_PARTE')
      swiftConnectionStore.cueGraphic('MARCADOR_INICIO_PARTE')
      swiftConnectionStore.rtRemote.updateFields("MARCADOR_INICIO_PARTE::PARTE_MARCADOR_INICIO_TIEMPOTEXT","String", tiempoStr(marcador.value.tiempo + 1))

      temporizadorInicio = setInterval(() => {
        swiftConnectionStore.rtRemote.updateFields("MARCADOR_INICIO_PARTE::PARTE_MARCADOR_INICIO_TIEMPOTEXT","String", tiempoStr(marcador.value.tiempo + 1))
      }, 1000)

      swiftConnectionStore.rtRemote.updateFields("MARCADOR_INICIO_PARTE::ESCUDO_HOMESHDR", "Shader", partido.value.local.escudo)
      swiftConnectionStore.rtRemote.updateFields("MARCADOR_INICIO_PARTE::NOMBRE_EQUIPO_HOMETEXT","String", partido.value.local.nombre.toUpperCase())
      swiftConnectionStore.rtRemote.updateFields("MARCADOR_INICIO_PARTE::GOLES_HOMETEXT","String", marcador.value.local)
      swiftConnectionStore.rtRemote.updateFields("MARCADOR_INICIO_PARTE::ESCUDO_AWAYSHDR", "Shader", partido.value.visitante.escudo)
      swiftConnectionStore.rtRemote.updateFields("MARCADOR_INICIO_PARTE::NOMBRE_EQUIPO_AWAYTEXT","String", partido.value.visitante.nombre.toUpperCase())
      swiftConnectionStore.rtRemote.updateFields("MARCADOR_INICIO_PARTE::GOLES_AWAYTEXT","String", marcador.value.visitante)
      swiftConnectionStore.rtRemote.updateFields("MARCADOR_INICIO_PARTE::PARTE_MARCADOR_INICIO_PARTETEXT","String", parte)


      // swiftConnectionStore.rtRemote.updateFields("MARCADOR_INICIO_PARTE::INICIO_PARTE_CLOCK","Minute", tiempo.minutos)     
      // swiftConnectionStore.rtRemote.updateFields("MARCADOR_INICIO_PARTE::INICIO_PARTE_CLOCK","Second", tiempo.segundos)
      // swiftConnectionStore.rtRemote.updateFields("MARCADOR_INICIO_PARTE::INICIO_PARTE_CLOCK","Milisec", 0)

      // swiftConnectionStore.customMetodo(swiftConnectionStore.customMetodo("MARCADOR_INICIO_PARTE", `startClockInicioParte`))


      swiftConnectionStore.bringOn('MARCADOR_INICIO_PARTE')
    } else {
      swiftConnectionStore.takeOff('MARCADOR_INICIO_PARTE')
      setTimeout(() => clearInterval(temporizadorInicio), 1000)
    //   swiftConnectionStore.customMetodo(swiftConnectionStore.customMetodo("MARCADOR_INICIO_PARTE", `stopClockInicioParte`))
    //   swiftConnectionStore.customMetodo(swiftConnectionStore.customMetodo("MARCADOR_INICIO_PARTE", `resetClockInicioParte`))
    }

  }
  const convertirSegundos = tiempo => {
    const minutos = Math.floor(tiempo / 60)
    const segundos = tiempo - (minutos * 60)
    return {minutos, segundos}
  }
  const tiempoStr = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  const activarDSKFinestra = val => {
    let superior, inferior
    if(val === "narracion") {
      superior = "DANI HERMOSILLA"
      inferior = "NARRACIÓ"
      liveBtn.value.DSKFinestraNarracio = true
    }
    if(val === "comentaris") {
      superior = "Ivet Musons"
      inferior = "COMENTARIS"
      liveBtn.value.DSKFinestraComentaris = true
    }
    
    swiftConnectionStore.playGraphic('DSK_LA_FINESTRA_CURTA')
    swiftConnectionStore.cueGraphic('DSK_LA_FINESTRA_CURTA')
    
    swiftConnectionStore.rtRemote.updateFields("DSK_LA_FINESTRA_CURTA::LINEA_SUPERIORTEXT","String", superior.toUpperCase())
    swiftConnectionStore.rtRemote.updateFields("DSK_LA_FINESTRA_CURTA::LINEA_INFERIORTEXT","String", inferior.toUpperCase())
    
    swiftConnectionStore.bringOn('DSK_LA_FINESTRA_CURTA')
    
    setTimeout(() => {
      swiftConnectionStore.takeOff('DSK_LA_FINESTRA_CURTA')
      liveBtn.value.DSKFinestraNarracio = false
      liveBtn.value.DSKFinestraComentaris = false

    }, 4000)

  }

  const activarCopy = () => {
    if(!liveBtn.value.copy) {
      swiftConnectionStore.playGraphic('COPY')
      swiftConnectionStore.bringOn('COPY')
      liveBtn.value.copy = true
      setTimeout(() => {
        swiftConnectionStore.takeOff('COPY')
        liveBtn.value.copy = false
      },1500)

    }
  }


</script>