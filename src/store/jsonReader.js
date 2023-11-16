import { defineStore } from 'pinia'
import { collection, onSnapshot, addDoc } from "firebase/firestore"
// the firestore instance
import db from '../firebase/init.js'




export const usejsonReaderStore = defineStore('jsonReader', {
  state: () => ({
   data: null
  }),
  getters: {

  },
  actions: {
    getJson() {
       fetch('/src/json/testmaraton1.json')
        .then((response) => response.json())
        .then((json) => {
          this.data = json
        // console.log(this.data)
      });
    }

  }

})