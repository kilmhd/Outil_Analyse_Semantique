// =====================================================================================================================
//                                      Upload file
// =====================================================================================================================

function uploadFile(fileInput){
    var form = new FormData();
    form.append('file', fileInput)
    form.append('content', '{"start": true, "asr_model_name": "french.studio.fr_FR"}')
    
    $.ajax({
      url: transcUrl + 'files',
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
        getProcess(resultat.id);
        //var current_progress = 0;
        //var interval = setTimeOut(function() {
        //    current_progress = getProcess(resultat.id);
        //    $("#dynamic")
        //    .css("width", current_progress + "%")
        //    .attr("aria-valuenow", current_progress)
        //    .text(current_progress + "% Complete");
        //    if (current_progress >= 100)
        //        clearInterval(interval);
        //        //loadDoc(resultat.id);
        //        //modifAudio(resultat.id);
        //}, 2500);
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
        url: transcUrl + 'processes/'+fileId,
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

        },
        error: function(resultat){
          console.log('Del: Error \n id: '+fileId)
        },
      });
}

// =====================================================================================================================
//                                      Get Transcription File
// =====================================================================================================================

function loadDoc(fileId) {
    var url = transcUrl + 'files/'+fileId+'/transcription?format=xml'
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
        wordList = xmlToTxt(resultat);
      }
    }); 
  }

// =====================================================================================================================
//                                      Change audio file
// =====================================================================================================================

function modifAudio(fileId) {
  
    $.ajax({
      url: transcUrl + 'files/'+ fileId,
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
    url: transcUrl +'processes/'+ fileId,
    type:'GET',

    dataType: 'json',
    
    headers: {
      "Authentication-Token": token,
    },

    success: function(resultat){
      console.log('Progress: Success')
      console.log(resultat.progress)
    },
    error: function(resultat){
      console.log('Progress: Error')
    }
  }); 
}
