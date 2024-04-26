import { defineStore } from "pinia";

export const useSimpleStore = defineStore('simpleStore', {
  state: () => ({
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