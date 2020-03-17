const tuples = require('./tuples.js')

var syncData = [];
var cloudTab = [];
// =====================================================================================================================
//                                      File Reader
// =====================================================================================================================

//XML to Txt, récupéreation des données dans le fichier XML
function xmlToCloud(xml) {
    var Parser = new DOMParser();
    var DOM = Parser.parseFromString(xml.responseText, 'application/xml');
  
    var x = DOM.getElementsByTagName("SpeechSegment");
    getInfoCloud(x);
  }
  
  // =====================================================================================================================
  //                                      Elements Informations
  // =====================================================================================================================
  
  //Création de la liste contenant la totalité des mots du fichier
  function getInfoCloud(xmlDoc){
    for (i = 0; i <xmlDoc.length; i++) {
      for(j = 0; j < xmlDoc[i].getElementsByTagName("Word").length; j++ ){
          temp.push(xmlDoc[i].getElementsByTagName("Word")[j].childNodes[0].nodeValue);
      }
      syncData.push({"start": xmlDoc[i].getAttribute("stime"), "end": xmlDoc[i].getAttribute("etime"),"text": []});
      cloudTab = tuples.parcourirTab(tab, temp);
      syncData[i].text = temp.join(' ');
      temp = [];
    }
  }