import { defineStore } from "pinia";

export const useSimpleStore = defineStore('simpleStore', {
  state: () => ({
    simpleWs: null,
    connectionState: null,
    excelData: null,
    URLWebsocket: 'ws://localhost:8001',
    listadoBotonesLive: [],
    listado: ['DIRECTE', 'RETORS'],
    listadoSimple: [
      {id:0, nombre: 'DIRECTE', numero:null},
      {id:1, nombre: 'RETORS', numero:null},
    ],
    retransmisionesSimple: [
      {id:0, nombre: "MISSA TORRENT", lista: [0,1]},
      {id:1, nombre: "GALANIA MAGDALENA", lista: [0,1]},
    ],
    retransmisionActiva: null,
    retransmisionCrevillent: [
      {numero:0,
      nombre: "DIRECTE",
      id: "DirecteGFI",
      live: false
    },
    
    //   {numero:0,
    //   nombre: "DIRECTE_LOC",
    //   id: "DirecteTorrLoc",
    //   live: false
    // },
    //   {numero:0,
    //   nombre: "DIRECTE_PARROQUIA",
    //   id: "DirecteTorrParroquia",
    //   live: false
    // },
    //   {numero:0,
    //   nombre: "DSK_CHUS",
    //   id: "DskChusTorr",
    //   live: false
    // },
    //   {numero:0,
    //   nombre: "DSK_CRISTINA",
    //   id: "DskCrisTorr",
    //   live: false
    // },
    //   {numero:0,
    //   nombre: "RETORS",
    //   id: "RetorsTorr",
    //   live: false
    // },
    ],
    retransmisionSimple: null,
    listaCrevillent: [
      {
        numero: 2,
        nombre: 'Crev02_titular'
      },
      {
        numero: 3,
        nombre: 'Crev03_titular'
      },
      {
        numero: 4,
        nombre: 'Crev04_titular'
      },
      {
        numero: 5,
        nombre: 'Crev05_titular'
      },
    ]
  }),
  getters: {
    getListaRetransmisiones: state => state.retransmisionesSimple
  },
  actions: {
    conectarSimpleWs() {
      console.log("conetcaod simple")
      // Crea una nueva conexión.
      this.simpleWs = new WebSocket(this.URLWebsocket);
      // this.actualizarExcel()
      // let state = document.querySelector(".websocketOff")
      const self = this

      // console.log(this.socket)
      
      // Abre la conexión
      this.simpleWs.addEventListener('open', function (event) {
        self.connectionState = event.currentTarget.readyState
        self.simpleWs.send('Conexión websocket establecida');
        self.actualizarExcel()
      })
      this.simpleWs.addEventListener('close', function(event) {
        self.connectionState = event.currentTarget.readyState
        console.log(event)
        self.valor = 0
        // incializar_vumetro(0)
        // state.classList.remove("websocketOn")
        // state.classList.add("websocketOff")
      })
      this.simpleWs.addEventListener('error', function (event) {
        // incializar_vumetro(0)
        self.connectionState = event.currentTarget.readyState
        self.valor = 0
        self.socket.close()
      })
      
      // Escucha por mensajes
      this.simpleWs.addEventListener('message', function (event) {
        // console.log(JSON.parse(event.data))

        const datos = JSON.parse(event.data)
        
        // console.log(datos["!ref"])
        const rango = datos["!ref"]

        // console.log(rango.split(":"))

        const match = rango.split(":")[1].match(/^([A-Za-z]+)([0-9]+)$/)

        const letra = rango.split(":")[1].charAt(0)
        const fila = parseInt(rango.split(":")[1].substring(1))

        const columna = letra.charCodeAt(0) - 64

        const encabezados = []

        for (let i = 1; i <= columna; i++) {
          const letraActual = String.fromCharCode(i + 64)
          encabezados.push(datos[`${letraActual}1`].v)
        }

        const resultado = []

        for (let i = 2; i <= fila; i++) {
          const tempRes = {}
          for (let j = 1; j <= columna; j++) {
            const letraActual = String.fromCharCode(j + 64)
            const tempTexto = datos[`${letraActual}${i}`]
            let texto = ""
            // console.log(letraActual)
            // console.log(texto)
            if(!tempTexto) {
              texto=""
            } else {
              texto = tempTexto.v
            }
            // const key = encabezados[j]
            tempRes[encabezados[j-1]] = texto
            // if(texto.hasOwnProperty("v")) console.log(texto.v)
          }
          resultado.push(tempRes)
        }
        self.excelData = resultado
        console.log(self.excelData)
        // incializar_vumetro(event.data)
        // self.valor = parseFloat(event.data)
        // console.log(JSON.parse(event.data))
        self.texto = JSON.parse(event.data)
        // console.log(JSON.parse(event.data))
        // Añadir valores al array
        self.dataValue = Math.floor(event.data * self.factorVolumen)
        if (self.recording) {
          // chartjsArray.push(dataValue)
          self.arrayValues.push({x:Date.now(), y: self.dataValue})
          // localCounter++
        }

        if (self.valor >= self.maxValue) {
          self.maxValue = parseFloat(event.data)
        }
      
      });

    },
    actualizarExcel() {
      console.log(this.simpleWs)
      this.simpleWs.send("actualizarExcel")
    },
    getListaCrevillent() {
      const lista = JSON.parse(localStorage.getItem('listadoCrevillent')) 
      if(lista) this.listaCrevillent = lista
      const listadoBotonesLive = JSON.parse(localStorage.getItem('listadoCrevillent')) 
      if(listadoBotonesLive) this.listadoBotonesLive = listadoBotonesLive
    },

    getConfigSimple() {
      const lista = JSON.parse(localStorage.getItem('configSimple')) 
      this.retransmisionSimple = [...lista.elementos]
      console.log(this.retransmisionSimple)

    },

    addItemCrevillent(payload) {
      this.listaCrevillent.push(payload)
      localStorage.setItem('listadoCrevillent', JSON.stringify(this.listaCrevillent))
    },
    updateListaCrevillent(payload) {
      // console.log(payload)
      if(payload) {
        this.listaCrevillent = payload
        localStorage.setItem('listadoCrevillent', JSON.stringify(this.listaCrevillent))
      }
    },
    addItem(id, item, numero) {
      const newId = Date.now()
      const data = {
        id: newId,
        nombre: item,
        numero: numero
      }
      this.listadoSimple.push(data)
      const retransmision = this.retransmisionesSimple.find(el => el.id == id)
      retransmision.lista.push(newId)
      this.setSimpleLS()
      // this.setRetransmisionesSimple(payload)
    },
    addRetransmision(item){
      const data = {
        id: Date.now(),
        nombre: item,
        lista: []
      }
      this.retransmisionesSimple.push(data)
      this.setRetransmisionesSimple(this.retransmisionesSimple)
      return data.id
    },
    getRetransById(id) {
      return this.retransmisionesSimple.find(el => el.id === id)
    },
    getElementoById(id) {
      return this.listadoSimple.find(el => el.id == id)
    },
    getListado(payload){
      const retransmision = this.retransmisionesSimple.find(el => el.nombre === payload)
      const lista = []
      retransmision.lista.forEach(item => {
        const rotulo = this.listadoSimple.find(el => el.id === item)
        lista.push(rotulo)
      })

    },
    eliminarRotulo(idLista, idRetrans) {
      const nuevo_listado = this.listadoSimple.filter(el => el.id !== idLista)
      
      this.listadoSimple = nuevo_listado
      const retransmision = this.retransmisionesSimple.find(el => el.id === idRetrans)
      const index = retransmision.lista.indexOf(idLista)
      const nuevaRetrans = retransmision.lista.filter(el => el !== idLista)
      retransmision.lista = nuevaRetrans
      this.setSimpleLS()
    },
    cargarLS() {
      const lista = JSON.parse(localStorage.getItem('simple'))
      if(lista) this.listadoSimple = lista.simple
      const retransmisiones = JSON.parse(localStorage.getItem('retransmisionesSimple')) 
      if(retransmisiones) this.retransmisionesSimple = retransmisiones
    },
    setSimpleLS() {
      // this.listado.push(payload)
      const data = {simple: this.listadoSimple}
      localStorage.setItem('simple', JSON.stringify(data))
      const retrans = {retransmisionesSimple: this.retransmisionesSimple}
      localStorage.setItem('retransmisionesSimple', JSON.stringify(this.retransmisionesSimple))
    },
    setRetransmisionesSimple(payload) {
      const data = {retransmisiones: payload}
      localStorage.setItem('retransmisionesSimple', JSON.stringify(data))
    },
    updateSimpleElement(id, nombre, numero) {
      const item = this.listadoSimple.find(el => el.id === id)
      item.nombre = nombre
      item.numero = numero
      this.setSimpleLS()
    }
  }
})