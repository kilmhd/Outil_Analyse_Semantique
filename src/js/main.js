
var token = 'WyIxOCIsImE4OGZlNjYwNzg0ODU1NWNhMzEwYzM5ZDU1YzUwMmU4Il0.EIrwIQ.XdKVfnhd6d6UBWpjjYZLZGzrQek'
var params = [];
var cloud;
var fileList = [];

$(function(){
    loadSettingDoc();  
});

$(document).ready(function () {
  $("#checkboxList").CreateMultiCheckBox({ width: '230px', defaultText : 'Select Below', height:'250px' });
});

// =====================================================================================================================
//                                      Delete File
// =====================================================================================================================
function deleteFile(){
  var resultat = document.getElementById("allFile").children;
  console.log(resultat)

  for(var i=0; i<resultat.length; i+=2){
    if(document.getElementById("file_"+i).checked){
      del(document.getElementById("file_"+i).name);
      console.log(document.getElementById("file_"+i).name)
    }
  }

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
      takeFile(resultat);
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
      takeFile(resultat);
            
      for(var i=0; i<resultat.length; i++){
        if(modifyText(fileInput.name) == resultat[i].filename){
          fileId = resultat[i].id;
          filename = resultat[i].filename;
          fileFind = true;
          break;
        }
      }
      if(!fileFind){
        uploadFile(fileInput);
        modifAudio(fileId);
        console.log('Transcript: Fichier Inexistant')
      } else {

        if(document.getElementById("correctionCheck").checked == true){
          loadFile(filename);
          console.log('loadFile')
        }else{
          loadDoc(fileId);
          console.log('loadDoc')
        }
        modifAudio(fileId);
        console.log('Transcript: Fichier existant')
      }
    },
    error: function(resultat){
      console.log('Transcript: Error')
    },
  });    
}
