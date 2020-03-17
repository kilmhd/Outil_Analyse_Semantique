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
      error: function(resultat){
        console.log('Upload: Error')
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
          console.log('Del: Success')
          alert("Le fichier à bien été supprimé !")

        },
        error: function(resultat){
          console.log('Del: Error \n id: '+fileId)
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
        console.log('loadDoc: Success')
        console.log(resultat)
        //wordList = xmlToTxt(resultat);
      },
      error: function(resultat){
        //console.log(resultat)
        console.log('loadDoc: Error')
        $("#dynamic")
            .css("width", 100 + "%")
            .attr("aria-valuenow", 100)
            .text(100 + "% Complete");
        wordList = xmlToTxt(resultat);
      }
    }); 
  }

  // =====================================================================================================================
//                                      Get Transcription File (On Server)
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
      console.log('loadDoc: Success')
      console.log(resultat)
      //wordList = xmlToTxt(resultat);
    },
    error: function(resultat){
      //console.log(resultat)
      console.log('loadDoc: Error')
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

function modifAudio(fileId) {
  
  $.ajax({
    url: params[0].url + 'download/'+ fileId,
    type:'GET',

    dataType: 'json',
    processData: false,
    contentType: false,

    headers: {
      "Authentication-Token": token,
    },

    success: function(resultat){
      console.log('ModifA: Success')
      document.getElementById('audio').src = resultat.filename;
      console.log(resultat)
    },
    error: function(resultat){
      console.log('ModifA: Error')
    }
  }); 
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
      console.log('Progress: Success')
      modifprogressValue(resultat.progress);
    },
    error: function(resultat){
      console.log('Progress: Error')
      
    }
  }); 
}

function modifprogressValue(value){
    progress = value
}