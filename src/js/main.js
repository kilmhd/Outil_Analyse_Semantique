
var token = 'WyIxOCIsImE4OGZlNjYwNzg0ODU1NWNhMzEwYzM5ZDU1YzUwMmU4Il0.EIrwIQ.XdKVfnhd6d6UBWpjjYZLZGzrQek'
var params = [];
var transcUrl;
var wordUrl;

$(function(){
    loadSettingDoc(); 
});

// =====================================================================================================================
//                                      Delete File
// =====================================================================================================================
function deleteFile(){
  var temp = document.getElementById('fileupload');
  var fileInput = temp.files[0];
  var fileFind = false;
  
  $.ajax({
    url: transcUrl + 'files',
    type:'GET',

    dataType: 'json',
    enctype: 'application/json',
    processData: false,
    contentType: false,

    headers: {
      "Authentication-Token": token,
    },

    success: function(resultat){
      for(var i=0; i<resultat.length; i++){
        if(modifyText(fileInput.name) == resultat[i].filename){
          del(resultat[i].id);
          fileFind = true;
          break;
        }
      }
      if(!fileFind){
        console.log('DelFile: Fichier Inexistant')
      }
    },
    error: function(resultat){
      console.log('DelFile: Error')
    },
  });
}

// =====================================================================================================================
//                                      Transcript File
// =====================================================================================================================
function transcript(){
  var temp = document.getElementById('fileupload');
  var fileInput = temp.files[0];
  var fileFind = false;
  var fileId = -1;
  
  $.ajax({
    url: transcUrl + 'files',
    type:'GET',

    dataType: 'json',
    enctype: 'application/json',
    processData: false,
    contentType: false,

    headers: {
      "Authentication-Token": token,
    },

    success: function(resultat){
      
      for(var i=0; i<resultat.length; i++){
        if(modifyText(fileInput.name) == resultat[i].filename){
          fileId = resultat[i].id;
          fileFind = true;
          break;
        }
      }
      //if(!fileFind){
        //uploadFile(fileInput);
        loadDoc(4123)
        getProcess(fileId);
        console.log('Transcript: Fichier Inexistant')
      //} else {
      //  loadDoc(fileId);
        modifAudio(fileId);
      //  console.log('Transcript: Fichier existant')
      //}
    },
    error: function(resultat){
      console.log('Transcript: Error')
    },
  });    
}

