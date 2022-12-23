// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usegSheetStore = defineStore('gSheet', {

  state: () => ({
    valoresHoja: [],
    gSheetLoading: false
  }),
  getters: {
    getValoresHoja(state) {
      return state.valoresHoja
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
      const values = 'A1:D100'
      fetch("https://content-sheets.googleapis.com/v4/spreadsheets/" +   idSheets + "/values/" + values + "?access_token="+ apiKey +"&key="+  apiKey)
      .then((lista)=>{
        return lista.json()
      }).then((valores)=>{
        console.log(valores)
        let tempValores = []
        valores.values.slice(1,-1).forEach(el => {
          if(el.length > 1){
            tempValores.push({
              id: el.shift(),
              nombre: el
            })
          }
        })
        this.valoresHoja = tempValores
        this.gSheetLoading = false
      }).catch(err=>{
        console.log(err.type);
        this.gSheetLoading = false
      })
      
    } // fin funcion getLista()

  }
})
