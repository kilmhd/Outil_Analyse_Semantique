var progress;

// =====================================================================================================================
//                                      Upload file
// =====================================================================================================================

function uploadFile(fileInput){
    var form = new FormData();
    form.append('file', fileInput)
    form.append('content', '{"start": true, "asr_model_name": "french.studio.fr_FR"}')
    
    $.ajax({
      url: params[0].url + 'files',
      type:'POST',

      dataType: 'json',
      enctype: 'application/json',
      autoUpload: true,
      processData: false,
      contentType: false,
      data: form,

      headers: {
        "Authentication-Token": token,
      },

      success: function(resultat){
        console.log('Upload: success')
        console.log(resultat)
        var processId = resultat.processes[0].id;
        
        var interval = setInterval(function() {
            getProcess(processId);
            $("#dynamic")
            .css("width", progress + "%")
            .attr("aria-valuenow", progress)
            .text(progress + "% Complete");
            if (progress >= 100){
                clearInterval(interval);
                loadDoc(resultat.id);
                modifAudio(resultat.id);
            }
        }, 2500);

      },
    });
}

// =====================================================================================================================
//                                      Delete File
// =====================================================================================================================

function del(fileId){
    $.ajax({
        url: params[0].url + 'files/'+fileId,
        type:'DELETE',
    
        dataType: 'json',
        enctype: 'application/json',
        processData: false,
        contentType: false,
    
        headers: {
          "Authentication-Token": token,
        },
    
        success: function(resultat){
          alert("Le fichier à bien été supprimé !")

        },
      });
}

// =====================================================================================================================
//                                      Get Transcription File (On Server)
// =====================================================================================================================

function loadDoc(fileId) {
    var url = params[0].url + 'files/'+fileId+'/transcription?format=xml'
    $.ajax({
      url: url,
      type:'GET',
  
      dataType: 'json',
      processData: false,
      contentType: false,
  
      headers: {
        "Authentication-Token": token,
      },
  
      success: function(resultat){
      },
      error: function(resultat){
        $("#dynamic")
            .css("width", 100 + "%")
            .attr("aria-valuenow", 100)
            .text(100 + "% Complete");
        wordList = xmlToTxt(resultat);
      }
    }); 
  }

  // =====================================================================================================================
//                                      Get Transcription local
// =====================================================================================================================

function loadFile(filename) {
  var url = './src/correction/'+filename+'.xml'
  $.ajax({
    url: url,
    type:'GET',

    dataType: 'json',
    processData: false,
    contentType: false,

    headers: {
      "Authentication-Token": token,
    },

    success: function(resultat){
      console.log(resultat)
    },
    error: function(resultat){
      $("#dynamic")
          .css("width", 100 + "%")
          .attr("aria-valuenow", 100)
          .text(100 + "% Complete");
      wordList = xmlToTxt(resultat);
    }
  }); 
}

// =====================================================================================================================
//                                      Change audio file
// =====================================================================================================================

function modifAudio(file) {
  
  var data = new FormData();
  data.append('name', file.name);
  data.append('file', file);

  // AJAX CALL
  var xhr = new XMLHttpRequest();
  xhr.open('POST', "./src/php/copyFile.php", true);
  xhr.send(data);
      
  document.getElementById('audio').src = "./src/audio/"+file.name+".mp3";
 
}

// =====================================================================================================================
//                                      Get Progress
// =====================================================================================================================

function getProcess(fileId) {
  $.ajax({
    url: params[0].url +'processes/'+ fileId,
    type:'GET',
    
    headers: {
      "Authentication-Token": token,
    },

    success: function(resultat){
      modifprogressValue(resultat.progress);
    },
  }); 
}

function modifprogressValue(value){
    progress = value
}

// =====================================================================================================================
//                                      Get wordCLoud
// =====================================================================================================================

function getWordCloud(list) {

  $.ajax({
    url: params[1].url,
    type:'POST',
    contentType: 'application/json',
    dataType : 'json',
    data: JSON.stringify({"myList": list}),
    
    
    headers: {
    },

    success: function(resultat){
      console.log('wordCLoud: Success')
    },
    error: function(resultat){ 
      document.getElementById("twinImg").setAttribute('src', 'data:image/png;base64,' + resultat.responseText);
    }
  }); 
}