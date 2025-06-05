import Retransmision from '@/views/retransmision/Retransmision.vue'
import { generarId } from '@/composables/idGenerator'
import { defineStore } from 'pinia'



export const useRetransmisionStore = defineStore('retransmisionStore', {
  state: () => ({
    dragGrafico: false,
    dragRotulo: false,
    retransmisionActiva: null,
    guardado: true,
    listadoRetransmisiones: [],
    nombreRetransmision: "Test retrans1",
    error: null,
    onAir: [],
    listaRotulos: [
      // {
      //   id: 'r01',
      //   numero: 1,
      //   titulo: 'FIJOS',
      //   grafico: 'g01',
      //   seccion: 's01',
      //   contenido: [
      //     {nombre: 'Linea1', contenido: null},
      //     {nombre: 'Linea2', contenido: null},
      //     {nombre: 'Linea3', contenido: null},
      //   ],
      //   lineasTexto: 0,
      //   desplegable: false,
        
      // },
    ],
    desplegableElegido: null, // NUMERO ROTULO ELEGIDO EN EL DESPLEGABLE
    rotuloDesplegable: null, // NUMERO E ID ROTULO ELEGIDO EN EL DESPLEGABLE
  
    rotuloActivo: null,
    rotuloLive: null,
    listaRotulosLive: [],
    rotuloADesactivar: null,
    control: [],
    edit: false,
    camposSwift: null,
    listaGraficos: [
      // {
      //   id:'g01',
      //   titulo: "DIRECTE",
      //   nombre: "Grafico1",
      //   clase: "MOVIE",
      //   contenido: null,
      //   lineasTexto: 0,
      //   desplegable: false,
      //   datosGSheet: {
      //     hoja: null,
      //     rango: null,
      //     graficos: []
      //   }
      // },
      // {
      //   id:'g02',
      //   titulo: "LISTA",
      //   nombre: "LISTA",
      //   clase: "LISTA",
      //   contenido: null,
      //   lineasTexto: 0,
      //   desplegable: true,
      //   datosGSheet: {
      //     hoja: 'CREVILLENT_OK',
      //     rango: 'A1:F100',
      //     graficos: [],
      //     elegido: null
      //   },
      //   nombreCampoSwift: []
      // },
      // {
      //   "titulo": "BANDA_UNICA",
      //   "nombre": "BANDA_UNICA",
      //   "clase": "DSK",
      //   "lineasTexto": "1",
      //   "desplegable": false,
      //   "nombreCampoSwift": [
      //       {
      //           "id": 0,
      //           "nombreSwift": "TITULAR"
      //       },
      //       {
      //           "id": 1,
      //           "nombreSwift": "TEXTO2"
      //       }
      //   ],
      //   "datosGSheet": {
      //       "hoja": null,
      //       "rango": null,
      //       "graficos": [],
      //       elegido: null
      //   },
      //   "id": "g3"
      // },
      // {
      //   "titulo": "BANDA_DOBLE",
      //   "nombre": "BANDA_DOBLE",
      //   "clase": "DSK",
      //   "lineasTexto": "1",
      //   "desplegable": false,
      //   "nombreCampoSwift": [
      //       {
      //           "id": 0,
      //           "nombreSwift": "TITULAR"
      //       },
      //       {
      //           "id": 1,
      //           "nombreSwift": "TEXTO2"
      //       }
      //   ],
      //   "datosGSheet": {
      //       "hoja": null,
      //       "rango": null,
      //       "graficos": [],
      //       elegido: null
      //   },
      //   "id": "g3"
      // },
      // {
      //   id:'g02',
      //   titulo: "1 LINEA",
      //   clase: "DSK",
      //   lineasTexto: 1,
      //   desplegable: false,
      //   opciones: {
      //     nombreDesplegable: null,
      //     rangoDesplegable: null
      //   }
      // },
      // {
      //   id:'g03',
      //   titulo: "2 LINEA",
      //   clase: "DSK",
      //   lineasTexto: 1,
      //   desplegable: false,
      //   opciones: {
      //     nombreDesplegable: null,
      //     rangoDesplegable: null
      //   }
      // },
      // {
      //   id:'g04',
      //   titulo: "2 LINEA TITULAR",
      //   clase: "DSK",
      //   lineasTexto: 2,
      //   desplegable: false,
      //   opciones: {
      //     nombreDesplegable: null,
      //     rangoDesplegable: null
      //   }
      // },
      // {
      //   id:'g05',
      //   titulo: "3 LINEA",
      //   clase: "DSK",
      //   lineasTexto: 3,
      //   desplegable: false,
      //   opciones: {
      //     nombreDesplegable: null,
      //     rangoDesplegable: null
      //   }
      // },
      // {
      //   id:'g06',
      //   titulo: "LISTA",
      //   clase: "DESPLEGABLE",
      //   lineasTexto: 0,
      //   desplegable: true,
      //   opciones: {
      //     nombreDesplegable: null,
      //     rangoDesplegable: null
      //   }
      // },
      {
        id:'gAdd',
        titulo: "+",
        clase: "ADD",
        lineasTexto: 0,
        desplegable: false,
        opciones: {
          nombreDesplegable: null,
          rangoDesplegable: null
        }
      },
    ],
    secciones: [
      {
        id:'s01',
        activo: false,
        titulo: "INICIO",
        elementoLive: 0,
        orden: 0
      },
      // {
      //   id:'s02',
      //   activo: true,
      //   titulo: "LISTADO",
      //   elementoLive: false
      // },
      // {
      //   id:'s03',
      //   activo: true,
      //   titulo: "COPY",
      //   elementoLive: false
      // },
      {
      id:'splus',
      activo: false,
      titulo: "AÑADIR",
      elementoLive: false,
      orden: 100
      },
      
    ],
    seccionActiva: 's01',
    listaGSheet: null
  }),
  getters: {

  },
  actions: {
    setDragGrafico (valor) {
      this.dragGrafico = valor
      this.guardado = false
    },
    setDragRotulo (valor) {
      this.dragRotulo = valor
      this.guardado = false
    },
    setGuardado (valor) {
      this.guardado = valor
    },
    setEdit(valor) {
      this.edit = valor
      this.guardado = false
    },
    setSeccionActiva (payload) {
      this.seccionActiva = payload
    },
    addSeccion (titulo) {
      let id = `s-${generarId()}`
      const item = {
        id,
        activo: false,
        titulo,
        elementoLive: 0,
        orden: this.secciones.length - 1
      }
      const index = this.secciones.length -1
      this.secciones.splice(index, 0,item)
      this.seccionActiva = id
      this.guardado = false
    },
    eliminarSeccion(id) {
      const temp = this.secciones.filter(el =>  el.id !== id)
      console.log(temp)
      this.secciones = temp
      this.guardado = false
    },
    addLiveToSeccion (seccion, valor) {
      const temp = this.secciones.find(sec => sec.id === seccion)
      temp.elementoLive += valor
      this.guardado = false
    },
    addGrafico (payload) {
      // let id = `g${this.listaGraficos.length}`
      let id = `g-${generarId()}`
      payload.id = id
      const index = this.listaGraficos.length -1
      this.listaGraficos.splice(index, 0,payload)
      this.guardado = false
    },
    eliminarGrafico (id) {
      const temp = this.listaGraficos.filter(el =>  el.id !== id)
      this.listaGraficos = temp
      this.guardado = false
      
    },

    setRotuloActivo (payload) {
      // console.log("setrotuloactivo")
      this.rotuloActivo = payload
    },
    setRotuloLive (payload) {
      this.rotuloLive = payload
      this.guardado = false
    },
    editListaRotulosLive(id, live) {
      if(!live) {
        if(!this.listaRotulosLive.includes(id)) {
          this.listaRotulosLive.push(id)
        }
      } else if (live) {
        this.listaRotulosLive = this.listaRotulosLive.filter(el=> el !== id)
      }
      this.guardado = false
    },
    eliminarRotulo (id) {
      const temp = this.listaRotulos.filter(el =>  el.id !== id)
      this.listaRotulos = temp
      this.rotuloLive = null
      this.guardado = false
      
    },
    duplicarRotulo (payload) {
      const nuevoRotulo = JSON.parse(JSON.stringify(payload))
      const numero = this.listaRotulos.length + 1
      nuevoRotulo.numero = numero
      console.log(nuevoRotulo)
      nuevoRotulo.id = this.crearID()
      this.listaRotulos.push(nuevoRotulo)
      this.setRotuloActivo(nuevoRotulo.id)
      this.guardado = false
      // console.log(this.rotuloActivo)
      console.log(this.listaRotulos)
    },
    crearID() {
      let fin = false
      const ids = this.listaRotulos.map(el => el.id)
      let indice = 1
      let nuevaId
      while(!fin) {
        nuevaId = `r${indice}`
        if(!ids.includes(nuevaId)) fin = true
        indice++
      }
      return nuevaId
    },
    setDesplagableElegido (datos, idRotulo, desplegableElegido) {
      console.log(idRotulo)

      const grafico = this.listaGraficos.find(el => el.titulo === datos.grafico)
      if(!grafico) {
        this.error = "NO EXISTE EL GRAFICO " + datos.grafico
        this.desplegableElegido = null
        return
      }
      const rotulo = this.listaRotulos.find(el => el.id === idRotulo)
      rotulo.lineasTexto = grafico.lineasTexto
      rotulo.contenido = datos.contenido
      rotulo.titulo = datos.grafico
      rotulo.numeroDesplegable = desplegableElegido

      this.desplegableElegido = desplegableElegido
      this.rotuloDesplegable = {idRotulo, desplegableElegido}

      this.error = null
      this.guardado = false
    },

    async getData(url) {
      // try {
        const res = await fetch(url)
        const data = await res.json()
        let tempValores = data
        if(!data.length) {
          tempValores = data.values.slice()
          }
        const encabezados = tempValores.shift()
        // console.log(tempValores)
        const fondos = []
        let valorId = 0
        const listado = []
        
        
        if(Array.isArray(tempValores)) {
          tempValores.forEach(el => {
            if (!fondos.includes(el[0])) fondos.push(el[0])
            let id = `Simple-${valorId}`
            const nuevoElemento = {
              grafico: el[0],
              id_grafico: el[1],
              numero: el[2],
              // texto1: el[3] || "",
              // texto2: el[4] || "",
              // texto3: el[5] || "",
              label: `${el[2] || ""} - ${el[3] || ""} - ${el[4] || ""}`,
              live: false,
              id,
              contenido: {}
            }
            const tempContenido = {}
            nuevoElemento.contenido[encabezados[3]] = el[3] || ""
            nuevoElemento.contenido[encabezados[4]] = el[4] || ""
            nuevoElemento.contenido[encabezados[5]] = el[5] || ""
            listado.push(nuevoElemento)
            valorId++
          })



          // console.log(listado)

          return listado
          

          
          // this.listaGSheet = listado
          // errorText.value = null
          // datos.value = data
          // encabezados.value = datos.value.shift()
        } else {
          // encabezados.value = null
          // datos.value = null
          // errorText.value = data.error
          // parar()
          
        }

      // } catch (error) {
      //   console.log(error)

      // }

    },



    async getDataGS(hoja, rango) {
      // this.gSheetLoading = true
      const apiKey = import.meta.env.VITE_APP_APIKEY
      const idSheets =  import.meta.env.VITE_APP_IDSHEETS
      const values = `${hoja}!${rango}`
      const url = "https://content-sheets.googleapis.com/v4/spreadsheets/" +   idSheets + "/values/" + values + "?access_token="+ apiKey +"&key="+  apiKey
      // console.log(url)
      try {
        const res = await this.getData(url)
        this.listaGSheet = res
        

      } catch (error) {
        console.log(err);
        this.gSheetLoading = false

      }
    },
    async getDataExcel (pagina, rango) {
      const url = `http://localhost:8500/excel/${pagina.toUpperCase()}`
      console.log(url)

      try {
        const res = await this.getData(url)
        this.listaGSheet = res
        console.log(res)

      } catch (error) {
        console.log(error);
        this.gSheetLoading = false

      }      

    },
    addOnAir (payload) {
      // const temp = [...this.onAir]
      // temp.push(payload)
      // this.onAir = [...temp]
      this.onAir.push(payload)
      this.guardado = false
    },
    removeOnAir (payload) {
      this.rotuloADesactivar = payload.id
      this.onAir = this.onAir.filter(el => el.tecla !== payload.tecla)
      this.guardado = false
    },

    cargarRetransmisiones() {
      const listadoRetransmisiones = JSON.parse(localStorage.getItem('listadoRetransmisiones')) 
      if(listadoRetransmisiones) this.listadoRetransmisiones = listadoRetransmisiones
    },
    guardarRetransmision() {
      let buscarRetrans = this.listadoRetransmisiones.find(el => el.nombreRetransmision === this.nombreRetransmision)
      
      
      let retransmision = {
        idRetransmision: this.idRetransmision,
        nombreRetransmision: this.nombreRetransmision,
        error: this.error,
        onAir: this.onAir,
        listaRotulos: this.listaRotulos,
        desplegableElegido: this.desplegableElegido,
        rotuloActivo: this.rotuloActivo,
        rotuloLive: this.rotuloLive,
        listaRotulosLive: this.listaRotulosLive,
        rotuloADesactivar: this.rotuloADesactivar,
        control: this.control,
        edit: this.edit,
        camposSwift: this.camposSwift,
        listaGraficos: this.listaGraficos,
        secciones: this.secciones,
        seccionActiva: this.seccionActiva,
        listaGSheet: this.listaGSheet
        
      }
      // console.log(retransmision)

      if(!buscarRetrans) {
        this.listadoRetransmisiones.push(retransmision)

      } else {
        buscarRetrans.idRetransmision = this.idRetransmision
        buscarRetrans.nombreRetransmision = this.nombreRetransmision,
        buscarRetrans.error = this.error,
        buscarRetrans.onAir = this.onAir,
        buscarRetrans.listaRotulos = this.listaRotulos,
        buscarRetrans.desplegableElegido = this.desplegableElegido,
        buscarRetrans.rotuloActivo = this.rotuloActivo,
        buscarRetrans.rotuloLive = this.rotuloLive,
        buscarRetrans.listaRotulosLive = this.listaRotulosLive,
        buscarRetrans.rotuloADesactivar = this.rotuloADesactivar,
        buscarRetrans.control = this.control,
        buscarRetrans.edit = this.edit,
        buscarRetrans.camposSwift = this.camposSwift,
        buscarRetrans.listaGraficos = this.listaGraficos,
        buscarRetrans.secciones = this.secciones,
        buscarRetrans.seccionActiva = this.seccionActiva,
        buscarRetrans.listaGSheet = this.listaGSheet

        // console.log(buscarRetrans)
      }
      this.guardado = true

      localStorage.setItem('listadoRetransmisiones', JSON.stringify(this.listadoRetransmisiones))
      localStorage.setItem('retransmisionActiva', JSON.stringify(this.retransmisionActiva))
    },
    cargarRetransmision(id) {
      // console.log(this.listadoRetransmisiones)
      // console.log(id)
      const retransmision = this.listadoRetransmisiones.find(el => {
        // console.log(el.idRetransmision,  id)
        return el.idRetransmision === id
      })
      if(retransmision) {

        this.nombreRetransmision = retransmision.nombreRetransmision
        this.idRetransmision = retransmision.idRetransmision
        this.error = retransmision.error
        this.onAir = retransmision.onAir
        this.listaRotulos = retransmision.listaRotulos
        this.desplegableElegido = retransmision.desplegableElegido
        this.rotuloActivo = retransmision.rotuloActivo
        this.rotuloLive = retransmision.rotuloLive
        this.listaRotulosLive = retransmision.listaRotulosLive
        this.rotuloADesactivar = retransmision.rotuloADesactivar
        this.control = retransmision.control
        this.edit = retransmision.edit
        this.camposSwift = retransmision.camposSwift
        this.listaGraficos = retransmision.listaGraficos
        this.secciones = retransmision.secciones
        this.seccionActiva = retransmision.seccionActiva
        this.listaGSheet = retransmision.listaGSheet
        this.retransmisionActiva = id

      }
      

      // console.log(retransmision)
    },
    eliminarRetransmision (id) {
      // const retransmision = this.listadoRetransmisiones.find(el => el.idRetransmision === id)
      // if(retransmision) {
      //   console.log(retransmision.idRetransmision == id) 
      // }
      // console.log(this.listadoRetransmisiones)
      this.listadoRetransmisiones = this.listadoRetransmisiones.filter(el => el.idRetransmision !== id)
      localStorage.setItem('listadoRetransmisiones', JSON.stringify(this.listadoRetransmisiones))

    },
    crearRetransmision (nombre) {
      this.guardado = false
      this.retransmisionActiva = Date.now()
      this.idRetransmision = this.retransmisionActiva

      this.nombreRetransmision = nombre

      this.error = null
      this.onAir = []
      this.listaRotulos = []
      this.desplegableElegido = null
      this.rotuloActivo = null
      this.rotuloLive = null
      this.listaRotulosLive = []
      this.rotuloADesactivar = null
      this.control = []
      this.edit = false
      this.camposSwift = null
      this.listaGraficos = [{
        id:'gAdd',
        titulo: "+",
        clase: "ADD",
        lineasTexto: 0,
        desplegable: false,
        opciones: {
          nombreDesplegable: null,
          rangoDesplegable: null
        }
      }]
      this.secciones = [
        {
          id:'s01',
          activo: false,
          titulo: "INICIO",
          elementoLive: 0,
          orden: 0
        },
        {
        id:'splus',
        activo: false,
        titulo: "AÑADIR",
        elementoLive: false,
        orden: 100
        },
      ]
      this.seccionActiva = 's01'
      this.listaGSheet = null
      
      this.guardarRetransmision()
    }
  }

})