// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usegSheetStore = defineStore('gSheet', {

  state: () => ({
    valoresHoja: [],
    gSheetLoading: false,
    valoresMisaGSheet: null,
    gSheetMisaLoading: false,
    listaCrevillent: null,
    listaGSheet: null,
    configSimple: null
  }),
  getters: {
    getValoresHoja(state) {
      return state.valoresHoja
    },
    getValoresMisaGSheet(state) {
      return state.valoresMisaGSheet
    }

  },
  actions: {
    getLista() {
      // id de la hoja de calculo
      // idSheets = '1sbZtJvR5q_1rdDF34sWNaylH-1j_41gSCgEYYZRRIU8';
      //// nuestra      APIKey
      // apiKey = 'AIzaSyDL9yj6t6e5P0d-YVmbx9ms4VmoOE_l2E4'; 
      // rango de la hoja de calculo que queremos leer
      // values = 'A2:AZ100';
      // fetch es un método nativo para hacer peticiones http
      // en el navegador 
      this.gSheetLoading = true
      const apiKey = import.meta.env.VITE_APP_APIKEY
      const idSheets =  import.meta.env.VITE_APP_IDSHEETS
      const values = 'RSS!A1:D300'
      fetch("https://content-sheets.googleapis.com/v4/spreadsheets/" +   idSheets + "/values/" + values + "?access_token="+ apiKey +"&key="+  apiKey)
      .then((lista)=>{
        return lista.json()
      }).then((valores)=>{
        // console.log(valores.values)
        // console.log(valores.values.slice())
        let tempValores = valores.values.slice() // TODOS LOS VALORES
        // console.log(tempValores)
        // valores.values.slice(1,-1).forEach(el => {
        //   // console.log(el)
        //   // if(el.length > 1){
        //   //   console.log(el)
        //   //   tempValores.push({
        //   //     id: el.shift(),
        //   //     nombre: el
        //   //   })
        //   // }
        //   tempValores.push(el)
        // })
        this.valoresHoja = tempValores
        this.gSheetLoading = false
      }).catch(err=>{
        console.log(err);
        this.gSheetLoading = false
      })
      
    }, // fin funcion getLista()
    getConfigSimple() {
      const data = JSON.parse(localStorage.getItem('configSimple'))
      if(data) this.configSimple = data
    },
    setConfigSimple(payload) {
      if(payload) this.configSimple = payload
    },
    getGseetData() {
      this.gSheetLoading = true
      const apiKey = import.meta.env.VITE_APP_APIKEY
      const idSheets =  import.meta.env.VITE_APP_IDSHEETS
      const hoja = this.configSimple.pagina
      const rango = this.configSimple.rango
      const values = `${hoja}!${rango}`
      console.log(values)
      // const values = `${hoja}!B1:F300`
      fetch("https://content-sheets.googleapis.com/v4/spreadsheets/" +   idSheets + "/values/" + values + "?access_token="+ apiKey +"&key="+  apiKey)
      .then((lista)=>{
        return lista.json()
      }).then((valores)=>{
        let tempValores = valores.values.slice()
        tempValores.shift()
        console.log(tempValores)
        const listadodesdeGS = []
        // const fondos = ["TITULAR", "INFORMACIÓ", "INFORMACIÓ 3", "FIRMA 2 LINIES"]
        // const fondos = ["DSK_PRINCIPAL"]

        const fondos = []
        let valorId = 0
        tempValores.forEach(el => {
          if (!fondos.includes(el[0])) fondos.push(el[0])
          console.log(fondos)
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
        console.log(this.listaGSheet)
        // localStorage.setItem('listadoCrevillent', JSON.stringify(this.listaCrevillent))
        localStorage.setItem('listaGSheet', JSON.stringify(this.listaGSheet))
        this.gSheetLoading = false
      }).catch(err=>{
        console.log(err);
        this.gSheetLoading = false
      })

    },
    getListaCrevillent() {
      // id de la hoja de calculo
      // idSheets = '1sbZtJvR5q_1rdDF34sWNaylH-1j_41gSCgEYYZRRIU8';
      //// nuestra      APIKey
      // apiKey = 'AIzaSyDL9yj6t6e5P0d-YVmbx9ms4VmoOE_l2E4'; 
      // rango de la hoja de calculo que queremos leer
      // values = 'A2:AZ100';
      // fetch es un método nativo para hacer peticiones http
      // en el navegador 
      this.gSheetLoading = true
      const apiKey = import.meta.env.VITE_APP_APIKEY
      const idSheets =  import.meta.env.VITE_APP_IDSHEETS
      const values = 'TORRENT!B1:F300'
      fetch("https://content-sheets.googleapis.com/v4/spreadsheets/" +   idSheets + "/values/" + values + "?access_token="+ apiKey +"&key="+  apiKey)
      .then((lista)=>{
        return lista.json()
      }).then((valores)=>{
        let tempValores = valores.values.slice() 
        const listadodesdeGS = []
        const fondos = ["TITULAR", "INFORMACIÓ", "INFORMACIÓ 3", "FIRMA 2 LINIES"]
        let valorId = 0
        tempValores.forEach(el => {
          let id = `Simple-${valorId}`
          const data = {
            fondo: el[0],
            numero: el[1],
            texto1: el[2] || "",
            texto2: el[3] || "",
            texto3: el[4] || "",
            label: `${fondos[el[0]]} - ${el[1]} - ${el[2] || ""} - ${el[3] || ""} - ${el[4] || ""}`,
            live: false,
            id
          }
          listadodesdeGS.push(data)
          valorId++
        })

        this.listaCrevillent = listadodesdeGS
        // console.log(this.listaCrevillent)
        localStorage.setItem('listadoCrevillent', JSON.stringify(this.listaCrevillent))
        this.gSheetLoading = false
      }).catch(err=>{
        console.log(err);
        this.gSheetLoading = false
      })
      
    }, 
    async getListaMisa() {
      this.gSheetMisaLoading = true
      const apiKey = import.meta.env.VITE_APP_APIKEY
      const idSheets =  import.meta.env.VITE_APP_IDSHEETS
      const values = 'MISSA!A1:E300'
      fetch("https://content-sheets.googleapis.com/v4/spreadsheets/" +   idSheets + "/values/" + values + "?access_token="+ apiKey +"&key="+  apiKey)
      .then((lista)=>{
        return lista.json()
      }).then((valores)=>{
        let tempValores = valores.values.slice() // TODOS LOS VALORES
        this.valoresMisaGSheet = tempValores
        this.gSheetMisaLoading = false
      }).catch(err=>{
        console.log(err);
        this.gSheetMisaLoading = false
      })
      
    }, 


  }
})
