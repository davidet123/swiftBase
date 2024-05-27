import { defineStore } from 'pinia'



export const useRetransmisionStore = defineStore('retransmisionStore', {
  state: () => ({
    onAir: [],
    listaRotulos: [
      {
        id: 'r01',
        numero: 1,
        titulo: 'FIJOS',
        grafico: 'g01',
        seccion: 's01',
        contenido: [
          {nombre: 'Linea1', contenido: null},
          {nombre: 'Linea2', contenido: null},
          {nombre: 'Linea3', contenido: null},
        ],
        lineasTexto: 0,
        desplegable: false,
        
      },
    ],
    desplegableElegido: null,
    rotuloActivo: 'null',
    rotuloADesactivar: null,
    control: [],
    edit: false,
    listaGraficos: [
      {
        id:'g01',
        titulo: "FIJOS",
        clase: "MOVIE",
        contenido: null,
        lineasTexto: 0,
        desplegable: false,
        opciones: {
          nombreDesplegable: null,
          rangoDesplegable: null
        }
      },
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
    seccionActiva: null,
    hoja: "CREVILLENT",
    rango: 'A1:F300',
    listaGSheet: null
  }),
  getters: {

  },
  actions: {
    setEdit(valor) {
      this.edit = valor
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
    },
    addLiveToSeccion (seccion, valor) {
      const temp = this.secciones.find(sec => sec.id === seccion)
      temp.elementoLive += valor
    },
    addGrafico (payload) {
      let id = `g${this.listaGraficos.length}`
      payload.id = id
      const index = this.listaGraficos.length -1
      this.listaGraficos.splice(index, 0,payload)
      // console.log(this.listaGraficos)
    },

    setRotuloActivo (payload) {
      this.rotuloActivo = payload
    },
    eliminarRotulo (id) {
      // console.log(payload)
      console.log(this.listaRotulos)
      const temp = this.listaRotulos.filter(el =>  el.id !== id)
      this.listaRotulos = temp
      
    },
    duplicarRotulo (payload) {
      console.log(payload)
      const nuevoRotulo = JSON.parse(JSON.stringify(payload))
      nuevoRotulo.id = this.crearID()
      this.listaRotulos.push(nuevoRotulo)
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
    setDesplagableElegido (payload) {
      this.desplegableElegido = payload
      console.log(this.desplegableElegido)
    },
    getData() {
      // this.gSheetLoading = true
      const apiKey = import.meta.env.VITE_APP_APIKEY
      const idSheets =  import.meta.env.VITE_APP_IDSHEETS
      const hoja = this.hoja
      const rango = this.rango
      const values = `${hoja}!${rango}`
      // console.log(values)
      // const values = `${hoja}!A1:F300`
      fetch("https://content-sheets.googleapis.com/v4/spreadsheets/" +   idSheets + "/values/" + values + "?access_token="+ apiKey +"&key="+  apiKey)
      .then((lista)=>{
        return lista.json()
      }).then((valores)=>{
        let tempValores = valores.values.slice()
        tempValores.shift()
        // console.log(tempValores)
        const listadodesdeGS = []
        // const fondos = ["TITULAR", "INFORMACIÓ", "INFORMACIÓ 3", "FIRMA 2 LINIES"]
        // const fondos = ["DSK_PRINCIPAL"]

        const fondos = []
        let valorId = 0
        tempValores.forEach(el => {
          if (!fondos.includes(el[0])) fondos.push(el[0])
          // console.log(el)
          let id = `Simple-${valorId}`
          const data = {
            metodo: el[0],
            id_metodo: el[1],
            numero: el[2],
            texto1: el[3] || "",
            texto2: el[4] || "",
            texto3: el[5] || "",
            label: `${el[0]} - ${el[1]} - ${el[2] || ""} - ${el[3] || ""} - ${el[4] || ""}`,
            live: false,
            id
          }
          listadodesdeGS.push(data)
          valorId++
        })

        this.listaGSheet = listadodesdeGS
        // console.log(this.listaGSheet)
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
    },
    removeOnAir (payload) {
      // console.log(payload)
      this.rotuloADesactivar = payload.id
      this.onAir = this.onAir.filter(el => el.tecla !== payload.tecla)
    }
  }

})