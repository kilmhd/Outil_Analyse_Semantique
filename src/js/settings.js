function loadSettingDoc(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4){
            getSettings(JSON.parse(this.response));
            update();
        }
    };
    xhttp.open("GET",'./src/js/settings.json' ,true);
    xhttp.send();
}

function getSettings(json){
    for (i = 0; i <json.settings.length; i++) {
          params.push(newSet(json.settings[i]));
    }
    
    var mainSet = document.getElementById('btn-para-choice');
    var x, j;

    for(j=0; j<params.length; j++){
        x = document.createElement('button');
        x.setAttribute("id", j);
        x.setAttribute("class", "btn btn-primary");
        x.setAttribute('onClick', 'modifySetInfo(this)');
        x.innerHTML = params[j].name;
        mainSet.appendChild(x);
    }
}

//Recuperation des attributs et la valeur d'une balise XML -> WORD
function newSet(para){
    return { "id": para.id,"name": para.name,"url": para.url }
}

// modify currents settings
function modifySetInfo(obj){
  var nameEdit = document.getElementById('nameModul');
  var urlEdit = document.getElementById('urlEdit');

  nameEdit.innerHTML = params[obj.id].name;
  urlEdit.value = params[obj.id].url; 
  
}

function saveSet(){
    var nameEdit = document.getElementById('nameModul');
    var urlEdit = document.getElementById('urlEdit');

    for(i=0; i<params.length; i++){
        if(nameEdit.innerHTML == params[i].name) id = i;
    }
    params[id].url = urlEdit.value;
    update();
}


function update(){
    for(var i=0; i<params.length; i++){
        if(params[i].name == "transcription") transcUrl = params[i].url;
        if(params[i].name == "WordTag") wordUrl = params[i].url;
    }
}