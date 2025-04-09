import { defineStore } from 'pinia'
import { collection, onSnapshot, addDoc } from "firebase/firestore"
// the firestore instance
import db from '../firebase/init.js'




export const usexmlReaderStore = defineStore('xmlReader', {
  state: () => ({
   xmlData: [],
   path: "../src/xml/PARCIALES_AVILA.xml",
  //  path: '../src/xml/test_octoparse1.xml',
  }),
  getters: {

  },
  actions: {

    // async getTiempoXML () {
    //   const urlPalma = 'https://www.aemet.es/xml/municipios_h/localidad_h_46187.xml'
    //   const datos = await fetch(urlPalma)
    //   console.log(datos)
    // },

  async getXml () {
    // const url = "https://localhost:8000/test_octoparse.xml"
    const url = "src/xml/PARCIALES_AVILA.xml"
    try {
      const res = await fetch(url)
      const content = await(res.text())
      const parser = new DOMParser()
      let xml = parser.parseFromString(content, "text/xml")
      // this.parseXML(xml)
      const resultado = this.xml2json(xml)
      console.log(xml, resultado.ClassResult)
    } catch (e) {
      console.log(e)
    }

  },
  parseXML(xml) {
    const classResult = xml.querySelectorAll('ClassResult')
    console.log(classResult)
    classResult.forEach(result => {

      const clase = result.querySelector('ShortName')
      const persons = result.querySelectorAll('PersonResult')
      persons.forEach(person => {
        const result = person.querySelector('Result')
        console.log(result)
      })
      // console.log(persons)
    })





  },

  xml2json(xml, tab) {
    var X = {
       toObj: function(xml) {
          var o = {};
          if (xml.nodeType==1) {   // element node ..
             if (xml.attributes.length)   // element with attributes  ..
                for (var i=0; i<xml.attributes.length; i++)
                   o["@"+xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue||"").toString();
             if (xml.firstChild) { // element has child nodes ..
                var textChild=0, cdataChild=0, hasElementChild=false;
                for (var n=xml.firstChild; n; n=n.nextSibling) {
                   if (n.nodeType==1) hasElementChild = true;
                   else if (n.nodeType==3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                   else if (n.nodeType==4) cdataChild++; // cdata section node
                }
                if (hasElementChild) {
                   if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                      X.removeWhite(xml);
                      for (var n=xml.firstChild; n; n=n.nextSibling) {
                         if (n.nodeType == 3)  // text node
                            o["#text"] = X.escape(n.nodeValue);
                         else if (n.nodeType == 4)  // cdata node
                            o["#cdata"] = X.escape(n.nodeValue);
                         else if (o[n.nodeName]) {  // multiple occurence of element ..
                            if (o[n.nodeName] instanceof Array)
                               o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                            else
                               o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                         }
                         else  // first occurence of element..
                            o[n.nodeName] = X.toObj(n);
                      }
                   }
                   else { // mixed content
                      if (!xml.attributes.length)
                         o = X.escape(X.innerXml(xml));
                      else
                         o["#text"] = X.escape(X.innerXml(xml));
                   }
                }
                else if (textChild) { // pure text
                   if (!xml.attributes.length)
                      o = X.escape(X.innerXml(xml));
                   else
                      o["#text"] = X.escape(X.innerXml(xml));
                }
                else if (cdataChild) { // cdata
                   if (cdataChild > 1)
                      o = X.escape(X.innerXml(xml));
                   else
                      for (var n=xml.firstChild; n; n=n.nextSibling)
                         o["#cdata"] = X.escape(n.nodeValue);
                }
             }
             if (!xml.attributes.length && !xml.firstChild) o = null;
          }
          else if (xml.nodeType==9) { // document.node
             o = X.toObj(xml.documentElement);
          }
          else
             alert("unhandled node type: " + xml.nodeType);
          return o;
       },
       toJson: function(o, name, ind) {
          var json = name ? ("\""+name+"\"") : "";
          if (o instanceof Array) {
             for (var i=0,n=o.length; i<n; i++)
                o[i] = X.toJson(o[i], "", ind+"\t");
             json += (name?":[":"[") + (o.length > 1 ? ("\n"+ind+"\t"+o.join(",\n"+ind+"\t")+"\n"+ind) : o.join("")) + "]";
          }
          else if (o == null)
             json += (name&&":") + "null";
          else if (typeof(o) == "object") {
             var arr = [];
             for (var m in o)
                arr[arr.length] = X.toJson(o[m], m, ind+"\t");
             json += (name?":{":"{") + (arr.length > 1 ? ("\n"+ind+"\t"+arr.join(",\n"+ind+"\t")+"\n"+ind) : arr.join("")) + "}";
          }
          else if (typeof(o) == "string")
             json += (name&&":") + "\"" + o.toString() + "\"";
          else
             json += (name&&":") + o.toString();
          return json;
       },
       innerXml: function(node) {
          var s = ""
          if ("innerHTML" in node)
             s = node.innerHTML;
          else {
             var asXml = function(n) {
                var s = "";
                if (n.nodeType == 1) {
                   s += "<" + n.nodeName;
                   for (var i=0; i<n.attributes.length;i++)
                      s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue||"").toString() + "\"";
                   if (n.firstChild) {
                      s += ">";
                      for (var c=n.firstChild; c; c=c.nextSibling)
                         s += asXml(c);
                      s += "</"+n.nodeName+">";
                   }
                   else
                      s += "/>";
                }
                else if (n.nodeType == 3)
                   s += n.nodeValue;
                else if (n.nodeType == 4)
                   s += "<![CDATA[" + n.nodeValue + "]]>";
                return s;
             };
             for (var c=node.firstChild; c; c=c.nextSibling)
                s += asXml(c);
          }
          return s;
       },
       escape: function(txt) {
          return txt.replace(/[\\]/g, "\\\\")
                    .replace(/[\"]/g, '\\"')
                    .replace(/[\n]/g, '\\n')
                    .replace(/[\r]/g, '\\r');
       },
       removeWhite: function(e) {
          e.normalize();
          for (var n = e.firstChild; n; ) {
             if (n.nodeType == 3) {  // text node
                if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                   var nxt = n.nextSibling;
                   e.removeChild(n);
                   n = nxt;
                }
                else
                   n = n.nextSibling;
             }
             else if (n.nodeType == 1) {  // element node
                X.removeWhite(n);
                n = n.nextSibling;
             }
             else                      // any other node
                n = n.nextSibling;
          }
          return e;
       }
    };
    if (xml.nodeType == 9) // document node
       xml = xml.documentElement;
    var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
    return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
 },
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
      console.log(xmlString)
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