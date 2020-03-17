//Gestion des modes par booleen
//permet de savoir dans quel mode on se trouve au moment T
var completMode = false;
var followMode = false;
var correctionMode = false;
var syncData = [];
var fileTranscript = false;

function CompletMode(){
  if(followMode == true) deleteSubtitle();

  completMode = true;
  followMode = false;

  document.getElementById("completButton").disabled = true;
  document.getElementById("followButton").disabled = false;  
  
  document.getElementById("currentMode").innerHTML = "Mode Complet";
  
  if(correctionMode){
    deleteTextArea();
    correctionMode = false;
  }

  createSubtitle("complet");

  document.getElementById('wordtagimg').innerHTML = cloud;
   
  //document.getElementById("wordtagimg").innerHTML = cloud;
   

  audioPlayer.addEventListener("timeupdate", function(e){
    syncData.forEach(function(element, index, array){
        if( audioPlayer.currentTime >= element.start && audioPlayer.currentTime <= element.end ){
            subtitles.children[index].style.background = 'yellow';
        }
    });
  });
}

function FollowMode(){
  if(completMode == true) deleteSubtitle();

  completMode = false;
  followMode = true;

  document.getElementById("followButton").disabled = true;
  document.getElementById("completButton").disabled = false;
  
  document.getElementById("currentMode").innerHTML = "Mode Suivi";
  
  if(correctionMode){
    deleteTextArea();
    correctionMode = false;
  }

  createSubtitle("follow");
  audioPlayer.addEventListener("timeupdate", function(e){
    syncData.forEach(function(element, index, array){
        if( audioPlayer.currentTime >= element.start && audioPlayer.currentTime <= element.end ){
            subtitles.children[index].style.background = 'white';
            subtitles.children[index].style.opacity = 1;
        }
    });
  });  
}

function CorrectionMode(){

  if(completMode == true || followMode == true) deleteSubtitle();

  correctionMode = true;
  document.getElementById("followButton").disabled = false;
  document.getElementById("completButton").disabled = false;
  document.getElementById("currentMode").innerHTML = "Mode Correction";

  currentToOther("correctionButton", "saveButton");

  createTextArea();
}

function saveCorrection(){

  //enregistrer les modifs dans fichier XML avec les données de temps correspondant à chaques segments de texte
  var XML = new XMLWriter();

  XML.BeginNode("SegmentList");
  for (var i = 0; i < syncData.length; i++) {
      content = document.getElementById("correction_"+i).value;
      console.log(content);
      XML.BeginNode("SpeechSegment");
      XML.Attrib("stime", syncData[i].start);
      XML.Attrib("etime", syncData[i].end);
      content = content.split(" ");
      for(var j=0; j<content.length; j++){
        if(content[j] != ""){
          XML.BeginNode("Word");
          XML.WriteString(content[j]);
          XML.EndNode();
        }
      }
      XML.EndNode();  
  }
  XML.EndNode();

  var filename = document.getElementById('fileupload').files[0].name;

  //Requete pour créer/modifier le fichier de correction

  var data = new FormData();
  data.append('name', '../correction/'+filename+'.xml');
  data.append('content', '<?xml version="1.0" encoding="UTF-8"?>' + XML.ToString());

  // AJAX CALL
  var xhr = new XMLHttpRequest();
  xhr.open('POST', "./src/php/fileManager.php", true);
  xhr.send(data);

  //charge le nouveau fichier

  //modif le bouton correction
  currentToOther("saveButton", "correctionButton");
  deleteTextArea();
  correctionMode = false;
}

//Gestionniare des mode streaming et File
function modeManager(){

  if(document.getElementById('modeText').innerHTML == 'Stream'){
    document.getElementById('stream').removeAttribute("hidden");
    document.getElementById('file').setAttribute("hidden", true);
    document.getElementById('modeText').innerHTML = 'File';

  }
  else if(document.getElementById('modeText').innerHTML == 'File'){
    document.getElementById('file').removeAttribute("hidden");
    document.getElementById('stream').setAttribute("hidden", true);
    document.getElementById('modeText').innerHTML = 'Stream';
  }
}



//LOG BUTTONS
function currentToOther(pageA, pageB){
  document.getElementById(pageA).setAttribute("hidden", true);
  document.getElementById(pageB).removeAttribute("hidden");
}

function nightMode(){
  if(document.getElementById('nightMode').className == "fa fa-moon"){
    document.getElementById('nightMode').className="fa fa-sun";
  }
  else if(document.getElementById('nightMode').className == "fa fa-sun"){
    document.getElementById('nightMode').className="fa fa-moon";
  }

}
