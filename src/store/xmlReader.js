import { defineStore } from 'pinia'
import { collection, onSnapshot, addDoc } from "firebase/firestore"
// the firestore instance
import db from '../firebase/init.js'




export const usexmlReaderStore = defineStore('xmlReader', {
  state: () => ({
   xmlData: [],
  //  path: "../src/xml/PARCIALES_AVILA.xml",
   path: '../src/xml/test_octoparse1.xml',
  }),
  getters: {

  },
  actions: {
  getXMLFile(path, callback) {
    let request = new XMLHttpRequest()
    request.open("GET", path)
    request.setRequestHeader("Content-Type", "text/xml")
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        callback(request.responseXML)
        }
      }
      request.send()
    },
  loadXML() {
    this.xmlData = null
    const self = this
    console.log(this.path)
    
    this.getXMLFile(self.path, function(xml) {
      var x2js = new X2JS();
      self.xmlData = x2js.xml2json ( xml );
      console.log(self.xmlData)
      })
    },
  getXML() {
    fetch(this.path)
    .then(response => {
      return response.text()
    }) 
    .then(xmlString => {
      const xmlDocument = new DOMParser().parseFromString(xmlString, "text/xml")

      const items = xmlDocument.querySelector("root").querySelectorAll("items")
      console.log(xmlDocument)
      items.forEach(item => {
        const tempNombre = item.querySelector("NOMBRE").textContent.split(",")
        const data = {
          nombre: `${tempNombre[1].trimStart()} ${tempNombre[0]}`,
          posicion: parseInt(item.querySelector("POS_OFICIAL").textContent),
          dorsal: parseInt(item.querySelector("DORSAL").textContent),
          tiempo: item.querySelector("TIEMPO_OFICIAL").textContent,
          categoria: item.querySelector("Field2").textContent,
          equipo: item.querySelector("Field8").textContent,
        }
        this.xmlData.push(data)
      })
    })
  }
  }

})