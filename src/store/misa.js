import { defineStore } from 'pinia'

import { collection, onSnapshot, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
// import { getStorage, ref, uploadBytes } from "firebase/storage";
// the firestore instance
import db from '../firebase/init.js'


export const useMisaStore = defineStore('misa', {
  state: () => ({
    // URLWebsocket: 'ws://localhost:8001',
    URLWebsocket: 'ws://192.168.28.33:8001',
    // URLWebsocket: 'ws://10.200.1.249:8001',
    dbMisaCargada: false,
    gSheetMisaCargada: false,
    textoLive: 0,
    idTextoLive: null,
    misaCargada: 0,
    cargandoMisa: false,
    control: false,
    paginaFullScreen: false,
    idDatabase: 'nGfIsKvgCm2AsOF66LP2',
    textoFullScreen: {
      texto: "",
      color: "#ffffff",
      titulo: ""
    },
    datosMisaLS: null,
    textos: [],
    textoWS: {
      texto: "",
      color: "#ffffff",
      titulo: ""
    },
    // textos: [
    //   {
    //     id: 0,
    //     titulo: "NEGRO",
    //     texto: "",
    //     tamaño: 70,
    //     color: '#000000',
    //     numero: 0
    //   },
    //   {
    //     id: 3,
    //     titulo: "Comunion",
    //     texto: "Poble de Déu, poble en marxa; junts fem camí.",
    //     tamaño: 70,
    //     color: '#f2a508',
    //     numero: 0
    //   },
    //   {
    //     id: 1,
    //     titulo: "Comunion",
    //     texto: "poble de Déu, església que avança; el regne ja està ací. ",
    //     tamaño: 70,
    //     color: '#ffffff',
    //     numero: 0
    //   },
    //   {
    //     id: 2,
    //     titulo: "Comunion",
    //     texto: "marcat sovint per tantes pors, però viu en el Crist lluminós.",
    //     tamaño: 70,
    //     color: '#ffffff',
    //     numero: 0
    //   },
    //   {
    //     id: 4,
    //     titulo: "Comunion",
    //     texto: "Camina al llarc del temps, travessa mars pregons, ",
    //     tamaño: 70,
    //     color: '#00ff00',
    //     numero: 0
    //   },
    // ] ,
    textosMisa:[
      {
        id: 0,
        idTextos:[0, 0],
        fecha: "12/12/2023",
        nombreMisa: "test1"
      },
      {
        id: 1,
        idTextos:[0,1,2,3,4],
        fecha: "5/12/2023",
        nombreMisa: "test2"
      },
    ]

  }),
  getters: {
    getTextoLive: state => state.textos.find(el => el.id == state.textoLive) ,
    getMisas: state => state.textosMisa.map(misa => {
      return {
        id: misa.id, 
        fecha: misa.fecha,
        nombreMisa: misa.nombreMisa
      }
    }),
    getMisaCargada: state => state.textosMisa.find(el => el.id == state.misaCargada)
    
  },
  actions: {
    getMisaById(id) {
      const misas = this.getMisas.map(el => el.id)
      if(!misas.includes(id)) {
        // this.setMisaCargada(0)
        id = 0
      }

      const misa = this.textosMisa.find(el => {
        return el.id === parseInt(id)
      })
      const listado = misa.idTextos
      const resultado = listado.map(id => this.textos.find(item => item.id === id))
      return resultado.filter(item => item !== undefined)
    
    },
    getTextoById(id) {
      return this.textos.find(el => el.id == id)
    },
    addTexto(texto) {
      this.textos.push(texto)
      this.textosMisa[0].idTextos.push(texto.id)
    },
    setTextoLive(id) {
      this.textoLive = id
      // this.actualizarTextoLive(id)
    },
    setMisaCargada(id) {
      this.misaCargada = id
      this.actualizarMisaCargada(id)
    },
    // actualizarMisa(payload) {

    // },
    // base de datos
    async cargartextoMisa () {
      // this.rotulos = []
      this.cargandoMisa = true

      const docSnap = onSnapshot(collection(db, 'misa'), doc => {
        doc.docChanges().forEach((change) => {
          if (change.type === "added") {
            let datos = change.doc.data()
            this.textoLive = datos.textoMisa
            this.idTextoLive = change.doc.id
            // this.misaCargada = valorTextoMisa.misaCargada
            this.textoFullScreen = datos.textoFullScreen
            this.control = datos.control
            this.paginaFullScreen = datos.paginaFullScreen
            this.cargandoMisa = false
            this.dbMisaCargada = true
            // console.log(this.textoFullScreen)
          } else if (change.type === "modified") {
            let datos = change.doc.data()
            // this.textoLive = datos.textoMisa
            // this.idTextoLive = change.doc.id
            // this.misaCargada = datos.misaCargada
            // this.textoFullScreen = datos.textoFullScreen
            this.control = datos.control
            this.paginaFullScreen = datos.paginaFullScreen
            // this.cargandoMisa = false
            // // this.actualizarRotulos(nuevo_rotulo)
          } 
        })
      })
    },
    async actualizarTextoFullScreen (payload) {
      // console.log("Actualizar fullscreen")
      const docRef = doc(db, "misa", this.idTextoLive)
      await updateDoc(docRef, {
        textoFullScreen: payload
      })

    },
    async reenviarTextoFullScreen (payload) {
      const docRef = doc(db, "misa", this.idTextoLive)
      await updateDoc(docRef, {
        textoFullScreen: null
      })
      await updateDoc(docRef, {
        textoFullScreen: payload
      })
    },

    async actualizarTextoLive (val) {      
      const docRef = doc(db, "misa", this.idTextoLive)
      // console.log(docRef)
      await updateDoc(docRef, {
        textoMisa: val
      })
    },
    async actualizarMisaCargada (val) {      
      const docRef = doc(db, "misa", this.idTextoLive)
      await updateDoc(docRef, {
        misaCargada: val
      })
    },
    async setControl (val) {   
      // console.log(this.idTextoLive) 
      // console.log(val)  
      const docRef = doc(db, "misa", this.idDatabase)
      await updateDoc(docRef, {
        control: val
      })
    },
    async setPaginaFullScreen (val) {   
      // console.log(this.idTextoLive) 
      // console.log(val)  
      const docRef = doc(db, "misa", this.idDatabase)
      await updateDoc(docRef, {
        paginaFullScreen: val
      })
    },

    updateTextoMisa (item) {
      // console.log(item)

      const texto = this.getTextoById(item.id)
      if(texto) {
        texto.texto = item.texto
        texto.tamaño = item.tamaño
        texto.color = item.color
        return true
      }
      return false
    },
    buscarMisa(id) {
      return this.textosMisa.find(el => {
        return el.id === parseInt(id)
      })
    },
    crearMisaGsheet(payload) {
      localStorage.setItem('misa', null)
      
      const encabezados = payload.slice(1)
      const textoEncabezado = encabezados.shift()
      const fecha = textoEncabezado[1]
      const nombreMisa = textoEncabezado[2] || "Misa Gsheet"
      const textos = encabezados.slice(1)
      // const encabezados = textos.shift()
      // textos.slice(1)
      // console.log(textos)

      let index = 0
      let textosMisaGSheet = {
        id: Date.now(),
        idTextos:[],
        fecha,
        nombreMisa
      }
      
      textos.forEach(el => {
        // console.log(el)
        let texto = {
          id: 0,
          titulo: "NEGRO",
          texto: "",
          tamaño: 0,
          color: '#FFFFFF',
          numero: 0
        }
        texto.id = `GS${index}`
        // console.log(el[2])
        if (el[0]) texto.numero = parseInt(el[0])
        if(el[1]) texto.texto = el[1]
        if(el[2]) {
          if(el[2] == "TRUE") texto.color = "#00FF00"
        }
        if(el[3]) texto.titulo = el[3]
        texto.tamaño = 70
        textosMisaGSheet.idTextos.push(`GS${index}`)
        if(el[2]) this.textos.push(texto)

        index++
        // console.log(this.textos)
      })
      this.textos.push({
        id: `GS${index}`,
        titulo: "NEGRO",
        texto: "",
        tamaño: 0,
        color: '#FFFFFF'
      })
      textosMisaGSheet.idTextos.push(`GS${index}`)
      // console.log(textosMisaGSheet)
      this.textosMisa.push(textosMisaGSheet)
      // console.log(this.textosMisa)
      this.misaCargada = textosMisaGSheet.id
      this.gSheetMisaCargada = true
      const data = {
        nombre: nombreMisa,
        fecha: fecha,
        now: 0,
        next: 1,
        urlWS: this.URLWebsocket
      }

      // const dataWS = JSON.parse(localStorage.getItem('misaData'))
      // console.log(dataWS)
      // if(dataWS.urlWS !== data.urlWS) data.urlWS = dataWS.urlWS
      this.datosMisaLS = data
      localStorage.setItem('misa', JSON.stringify(this.textos))
      localStorage.setItem('misaData', JSON.stringify(data))
      this.actualizarMisaCargada(textosMisaGSheet.id)

    },
    conectarWS() {
      if (this.isConnected) return;

      this.socket = new WebSocket(this.URLWebsocket);

      this.socket.addEventListener('open', () => {
        console.log('Connected to WebSocket server.');
      });

      this.socket.addEventListener('message', (event) => {

        const res = JSON.parse(event.data)
        // if (res.hasOwnProperty('partido')) {
        //   this.wsPartido = res.partido
        //   localStorage.setItem('partido', JSON.stringify(res.partido))
        // } 
        // if (res.hasOwnProperty('marcador')) {
        //   this.wsMarcador = res.marcador
        //   localStorage.setItem('marcador', JSON.stringify(res.marcador))
        // }
        this.textoWS = res
        // console.log(res)


        // this.wsData = JSON.parse(event.data)
        // localStorage.setItem('partido', JSON.stringify(this.wsData))
        // console.log(this.test)
      });

      this.socket.addEventListener('close', (event) => {
        console.log(`WebSocket closed with code: ${event.code}, reason: ${event.reason}`);
        this.socket = null;
      });
    },
    enviarWS(mensaje) {
      // console.log(mensaje)
      // Enviar mensaje al servidor
      // const mensaje = {mensaje: 'test'}
      this.socket.send(JSON.stringify(mensaje));
      // if (this.isConnected) {
      // }
    },
    setUrlWS(payload) {
      this.URLWebsocket = payload
      const data = JSON.parse(localStorage.getItem('misaData'))
      data.urlWS = payload
      localStorage.setItem('misaData', JSON.stringify(data))
    }

    

  }
})