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
  var test = [['foo', 12], ['bar', 6], ['bal', 9], ['test', 65], ['mlkjhgfdsq', 10]];
  
  document.getElementById("currentMode").innerHTML = "Mode Complet";
  document.getElementById("wordtagimg").innerHTML = WordCloud(document.getElementById('wordtagimg'), { list: test } );

  createSubtitle("complet");
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
  
  document.getElementById("currentMode").innerHTML = "Mode Suivi";

  createSubtitle("follow");
  audioPlayer.addEventListener("timeupdate", function(e){
    syncData.forEach(function(element, index, array){
        if( audioPlayer.currentTime >= element.start && audioPlayer.currentTime <= element.end ){
            subtitles.children[index].style.background = 'white';
            subtitles.children[index].style.opacity = 1;
        }
        //subtitles.scrollBy(0, 1);
    });
  });  
}

function CorrectionMode(){

  if(completMode == true || followMode == true) deleteSubtitle();
  if(correctionMode == true) deleteTextArea();

  correctionMode = true;
  document.getElementById("currentMode").innerHTML = "Mode Correction";

  createTextArea();

  //Textearea remplis grave au fichier txt, creer un pop up avec bouton sauvegarder et croix de fermeture
  //Voir travailler uniquement avec le fichier XML en testant la correction et la fichier de base grace à l'ID de chaque mot
  //verif mettre span dans textarea avec id. Puis changer les id de tous les mots en cas de correction si le nombre de mot est différent.
}

//Gestionniare des mode streaming et File
function modeManager(){

  if(document.getElementById('modeText').innerHTML == 'Stream'){
    document.getElementById('audioClass').setAttribute("hidden", true);
    document.getElementById('followButton').setAttribute("hidden", true);
    document.getElementById('completButton').setAttribute("hidden", true);
    document.getElementById('formUpload').setAttribute("hidden", true);
    document.getElementById('modeText').innerHTML = 'File';

  }
  else if(document.getElementById('modeText').innerHTML == 'File'){
    document.getElementById('audioClass').removeAttribute("hidden");
    document.getElementById('followButton').removeAttribute("hidden");
    document.getElementById('completButton').removeAttribute("hidden");
    document.getElementById('formUpload').removeAttribute("hidden");
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
