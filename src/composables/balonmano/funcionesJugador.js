import { useSwiftConnectionStore } from "@/store/swiftConnection"
const swiftConnectionStore = useSwiftConnectionStore()

export const mostrarInfoLiveTarjeta = (tipo, jugador, equipo) => {
  console.log("composable")
    let equipoAMostrar
    let metodoInfoPlayer
    let tarjetaAmarilla  = "false"
    let tarjetaRoja  = "false"
    let tarjetaAzul  = "false"

    if(equipo === "local") {
      equipoAMostrar = "HOME"
      metodoInfoPlayer = "infoPlayerHome"
    }
    if(equipo === "visitante") {
      equipoAMostrar = "AWAY"
      metodoInfoPlayer = "infoPlayerAway"
    }

    const textoTop = `${jugador.dorsal} ${jugador.nombre} ${jugador.apellido.toUpperCase()}`
    let textoBot

    if(tipo === "info_tarjeta_amarilla") {
      textoBot = "YELLOW CARD"
      tarjetaAmarilla = "true"
    }
    if(tipo === "info_tarjeta_roja") {
      textoBot = "RED CARD"
      tarjetaRoja = "true"
    }
    if(tipo === "info_tarjeta_azul") {
      textoBot = "BLUE CARD"
      tarjetaAzul = "true"
    }
    

    swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GRUPO_GOL`, "Display", "false")
    swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_GRUPO_TARJETA`, "Display", "true")
    swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_TARJETA_TOPTEXT`, "String", textoTop)
    swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_TARJETA_BOTTEXT`, "String", textoBot)
    swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_TARJETA_AMARILLA_GRUPO`, "Display", tarjetaAmarilla)
    swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_TARJETA_ROJA_GRUPO`, "Display", tarjetaRoja)
    swiftConnectionStore.rtRemote.updateFields(`MARCADOR::PLAYER_INFO_${equipoAMostrar}_TARJETA_AZUL_GRUPO`,"Display", tarjetaAzul)

    swiftConnectionStore.customMetodo("MARCADOR", `${metodoInfoPlayer}In`)
    
}