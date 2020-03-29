
var mytoken = 'WyIxOCIsImE4OGZlNjYwNzg0ODU1NWNhMzEwYzM5ZDU1YzUwMmU4Il0.EIrwIQ.XdKVfnhd6d6UBWpjjYZLZGzrQek'
var token = ''
var params = [];
var cloud;
var fileList = [];


//Fonction prinicpale permettant le chargement des paramêtre aisin que des fichier de l'utilisateur qui sont sur le serveur
//Récupération du Token 
//Les élément fléché (<-) pourront être supprimé après l'ajout du système de login

function main(){
    params = [];
    if(document.getElementById('tokenInput').value != ''){ //<-
      token = document.getElementById('tokenInput').value; //<-
      currentToOther('login_page','wrapper') //<--
      loadSettingDoc();
      takeServerFile();
    }
}



// =====================================================================================================================
//                                      Delete File
// =====================================================================================================================
function deleteFile(){
  var resultatServer = document.getElementById("allServerFile");

  for(var i=0; i<resultatServer.children.length; i+=2){
    if(document.getElementById("file_"+i).checked){
      del(document.getElementById("file_"+i).name);
      resultatServer.removeChild(document.getElementById("file_"+i));
      resultatServer.removeChild(document.getElementById("fileID_"+i));
    }
  }
  takeServerFile();
}

// =====================================================================================================================
//                                      Transcript File
// =====================================================================================================================
function transcript(){

  deleteSubtitle();
  
  var temp = document.getElementById('fileupload');
  var fileInput = temp.files[0];
  var fileFind = false;
  var fileId = -1;
  
  document.getElementById("followButton").disabled = false;
  document.getElementById("completButton").disabled = false;
  

  $("#dynamic")
  .css("width", 0 + "%")
  .attr("aria-valuenow", 0)
  .text(0 + "% Complete");
  
  $.ajax({
    url: params[0].url + 'files',
    type:'GET',

    dataType: 'json',
    enctype: 'application/json',
    processData: false,
    contentType: false,

    headers: {
      "Authentication-Token": token,
    },

    success: function(resultat){  
      takeServerFile();          
      for(var i=0; i<resultat.length; i++){
        if(modifyText(fileInput.name) == resultat[i].filename){
          fileId = resultat[i].id;
          filename = resultat[i].filename;
          fileFind = true;
          break;
        }
      }
      if(!fileFind){
        modifAudio(fileInput);
        uploadFile(fileInput);
        
      } else {

        if(document.getElementById("correctionCheck").checked == true){
          loadFile(filename); //Chargement du fichier de correction
        }else{
          loadDoc(fileId); //Chargement du fichier sur le serveur distant
        }
        modifAudio(fileInput);
      }
    },
  });    
}

// =====================================================================================================================
//                                      Transcript File
// =====================================================================================================================
function takeServerFile(){
  var allFile = document.getElementById("allServerFile");
  
  for (var i = 0; i < allFile.children.length; i++) {
    allFile.removeChild(document.getElementById("file_" + i));
    allFile.removeChild(document.getElementById("fileID_" + i));
  }
  
  $.ajax({
    url: 'http://lst-demo.univ-lemans.fr:8000/api/v1.1/files',
    type:'GET',

    dataType: 'json',
    enctype: 'application/json',
    processData: false,
    contentType: false,

    headers: {
      "Authentication-Token": token,
    },

    success: function(resultat){
  
      
      for(var i=0; i<resultat.length;i++){
        check = document.createElement('input');
        check.setAttribute("type", "checkbox");
        check.setAttribute("id", "file_"+i);
        check.setAttribute("name", resultat[i].id);
        allFile.appendChild(check);
    
        label = document.createElement("label");
        label.setAttribute("for", resultat[i].id);
        label.setAttribute("id", "fileID_"+i);
        label.innerHTML = resultat[i].filename;
        allFile.appendChild(label);    
      }
    },
  }); 
  
  
}