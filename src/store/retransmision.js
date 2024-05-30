import Retransmision from '@/views/retransmision/Retransmision.vue'
import { defineStore } from 'pinia'



export const useRetransmisionStore = defineStore('retransmisionStore', {
  state: () => ({
    guardado: true,
    listadoRetransmisiones: [],
    nombreRetransmision: "Test retrans",
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
    desplegableElegido: null,
    rotuloActivo: 'null',
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
      {
        id:'g02',
        titulo: "LISTA",
        nombre: "LISTA",
        clase: "LISTA",
        contenido: null,
        lineasTexto: 0,
        desplegable: true,
        datosGSheet: {
          hoja: 'CREVILLENT_OK',
          rango: 'A1:F100',
          graficos: [],
          elegido: null
        },
        nombreCampoSwift: []
      },
      {
        "titulo": "BANDA_UNICA",
        "nombre": "BANDA_UNICA",
        "clase": "DSK",
        "lineasTexto": "1",
        "desplegable": false,
        "nombreCampoSwift": [
            {
                "id": 0,
                "nombreSwift": "TITULAR"
            },
            {
                "id": 1,
                "nombreSwift": "TEXTO2"
            }
        ],
        "datosGSheet": {
            "hoja": null,
            "rango": null,
            "graficos": [],
            elegido: null
        },
        "id": "g3"
      },
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
        elementoLive: 0
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
      elementoLive: false
      },
      
    ],
    seccionActiva: 's01',
    listaGSheet: null
  }),
  getters: {

  },
  actions: {
    setEdit(valor) {
      this.edit = valor
      this.guardado = false
    },
    setSeccionActiva (payload) {
      this.seccionActiva = payload
    },
    addSeccion (titulo) {
      let id = `s${this.secciones.length}`
      const item = {
        id,
        activo: false,
        titulo,
        elementoLive: 0
      }
      const index = this.secciones.length -1
      this.secciones.splice(index, 0,item)
      this.seccionActiva = id
      this.guardado = false
    },
    addLiveToSeccion (seccion, valor) {
      const temp = this.secciones.find(sec => sec.id === seccion)
      temp.elementoLive += valor
      this.guardado = false
    },
    addGrafico (payload) {
      let id = `g${this.listaGraficos.length}`
      payload.id = id
      const index = this.listaGraficos.length -1
      this.listaGraficos.splice(index, 0,payload)
      this.guardado = false
    },

    setRotuloActivo (payload) {
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
      nuevoRotulo.id = this.crearID()
      this.listaRotulos.push(nuevoRotulo)
      this.guardado = false
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

      this.desplegableElegido = desplegableElegido
      this.error = null
      this.guardado = false
    },
    getData(hoja, rango) {
      // this.gSheetLoading = true
      const apiKey = import.meta.env.VITE_APP_APIKEY
      const idSheets =  import.meta.env.VITE_APP_IDSHEETS
      const values = `${hoja}!${rango}`
      fetch("https://content-sheets.googleapis.com/v4/spreadsheets/" +   idSheets + "/values/" + values + "?access_token="+ apiKey +"&key="+  apiKey)
      .then((lista)=>{
        return lista.json()
      }).then((valores)=>{
        let tempValores = valores.values.slice()
        const encabezados = tempValores.shift()
        const listadodesdeGS = []

        const fondos = []
        let valorId = 0
        tempValores.forEach(el => {
          if (!fondos.includes(el[0])) fondos.push(el[0])
          let id = `Simple-${valorId}`
          const data = {
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
          data.contenido[encabezados[3]] = el[3] || ""
          data.contenido[encabezados[4]] = el[4] || ""
          data.contenido[encabezados[5]] = el[5] || ""
          listadodesdeGS.push(data)
          valorId++
        })

        this.listaGSheet = listadodesdeGS
        // localStorage.setItem('listadoCrevillent', JSON.stringify(this.listaCrevillent))
        // localStorage.setItem('listaGSheet', JSON.stringify(this.listaGSheet))
        // this.gSheetLoading = false
      }).catch(err=>{
        console.log(err);
        this.gSheetLoading = false
      })

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
      const buscarRetrans = this.listadoRetransmisiones.find(el => el.nombreRetransmision === this.nombreRetransmision)
      
      
      let retransmision = {
        nombreRetransmision: this.nombreRetransmision,
        idRetransmision: Date.now(),
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
      
      if(!buscarRetrans) {
        this.listadoRetransmisiones.push(retransmision)
        this.idRetransmision = retransmision.idRetransmision

      } else {
        retransmision.idRetransmision = this.idRetransmision
      }
      console.log(this.listadoRetransmisiones)
      this.guardado = true

      localStorage.setItem('listadoRetransmisiones', JSON.stringify(this.listadoRetransmisiones))
    },
    cargarRetransmision(id) {
      console.log(id)
      const retransmision = this.listadoRetransmisiones.find(el => el.idRetransmision === id)
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

      }

      console.log(retransmision)
    }
  }

})