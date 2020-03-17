var audioPlayer = document.getElementById("audio");
var subtitles = document.getElementById("txt");
var element;
var temp = [];
var tab = [];
var cloudTab = [];

// =====================================================================================================================
//                                      File Reader
// =====================================================================================================================

//XML to Txt, récupéreation des données dans le fichier XML
function xmlToTxt(xml) {
  var Parser = new DOMParser();
  var DOM = Parser.parseFromString(xml.responseText, 'application/xml');

  var x = DOM.getElementsByTagName("SpeechSegment");
  getInfo(x);
}

// =====================================================================================================================
//                                      Elements Informations
// =====================================================================================================================

//Création de la liste contenant la totalité des mots du fichier
function getInfo(xmlDoc){
  for (i = 0; i <xmlDoc.length; i++) {
    for(j = 0; j < xmlDoc[i].getElementsByTagName("Word").length; j++ ){
        temp.push(xmlDoc[i].getElementsByTagName("Word")[j].childNodes[0].nodeValue);
    }
    syncData.push({"start": xmlDoc[i].getAttribute("stime"), "end": xmlDoc[i].getAttribute("etime"),"text": []});
    //cloudTab = parcourirTab(tab, temp);
    syncData[i].text = temp.join(' ');
    temp = [];
  }
}

//Ajout des élements de la liste dans le HTML de la page
// Pour le moment si on est dans le mode "follow", on passe les mot en opacité 0, puisque on les fait apparaitre par la suite en même temps que l'audio.
function createSubtitle(mode)
{
    for (var i = 0; i < syncData.length; i++) {
        element = document.createElement('span');
        element.setAttribute("id", "c_" + i);
        if(mode == "follow") element.style.opacity = 0;
        element.innerText = syncData[i].text + " ";
        subtitles.appendChild(element);
    }
}

//Suppression des éléments ajouté dans le HTML de la page concernant les mots.
function deleteSubtitle(){
  for (var i = 0; i < syncData.length; i++) {
    subtitles.removeChild(document.getElementById("c_" + i));
  }
}

//Zone Correction
function createTextArea(){
  for (var i = 0; i < syncData.length; i++) {
    element = document.createElement('textarea');
    element.setAttribute("id", "correction_"+i);
    element.setAttribute("rows", "2");
    element.setAttribute("cols", "79");
    element.innerHTML = syncData[i].text;
    subtitles.appendChild(element);
  }
}

//Suppression des éléments ajouté dans le HTML de la page concernant les mots.
function deleteTextArea(){
  for (var i = 0; i < syncData.length; i++) {
    subtitles.removeChild(document.getElementById("correction_"+i));
  }
}


var allFile = document.getElementById("allFile");

function takeFile(list){
  for(var i=0; i<list.length;i++){
    check = document.createElement('input');
    check.setAttribute("type", "checkbox");
    check.setAttribute("id", "file_"+i);
    check.setAttribute("name", list[i].id);
    allFile.appendChild(check);

    label = document.createElement("label");
    label.setAttribute("for", list[i].id);
    label.innerHTML = list[i].filename;
    allFile.appendChild(label);    

  }
}