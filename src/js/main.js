
var token = 'WyIxOCIsImE4OGZlNjYwNzg0ODU1NWNhMzEwYzM5ZDU1YzUwMmU4Il0.EIrwIQ.XdKVfnhd6d6UBWpjjYZLZGzrQek'
var params = [];
var cloud;
var fileList = [];


$(function(){
    loadSettingDoc(); 
});

function main(){
    currentToOther('login_page','wrapper')
    loadSettingDoc();
    takeServerFile();
}



// =====================================================================================================================
//                                      Delete File
// =====================================================================================================================
function deleteServerFile(){
  var resultatServer = document.getElementById("allServerFile").children;

  for(var i=0; i<resultatServer.length; i+=2){
    if(document.getElementById("file_"+i).checked){
      del(document.getElementById("file_"+i).name);
      console.log(document.getElementById("file_"+i).name)
    }
  }
  takeServerFile();
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
        uploadFile(fileInput);
        modifAudio(fileInput);
      } else {

        if(document.getElementById("correctionCheck").checked == true){
          loadFile(filename);
        }else{
          loadDoc(fileId);
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
  
      var allFile = document.getElementById("allServerFile");
      for(var i=0; i<resultat.length;i++){
        check = document.createElement('input');
        check.setAttribute("type", "checkbox");
        check.setAttribute("id", "file_"+i);
        check.setAttribute("name", resultat[i].id);
        allFile.appendChild(check);
    
        label = document.createElement("label");
        label.setAttribute("for", resultat[i].id);
        label.innerHTML = resultat[i].filename;
        allFile.appendChild(label);    
      }
    },
  }); 
  
  
}