function loadSettingDoc(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4){
            getSettings(JSON.parse(this.response));
        }
    };
    xhttp.open("GET",'./src/json/settings.json' ,true);
    xhttp.send();
}

function getSettings(json){
    params = []
    for (i = 0; i <json.length; i++) {
          params.push(newSet(json[i]));
    }
    
    var mainSet = document.getElementById('modulList');
    var x, j;

    for(j=0; j<params.length; j++){
        x = document.createElement('h6');
        x.setAttribute("class", "m-0 font-weight-bold text-primary");
        x.setAttribute("id", "name_" + params[j].name);
        x.innerHTML = params[j].name;
        mainSet.appendChild(x);

        y = document.createElement('h6');
        y.setAttribute("class", "m-0 font-weight-bold text-primary");
        y.setAttribute("id", "Mod_"+params[j].name);
        y.innerHTML = "Module Adress: ";
        mainSet.appendChild(y);

        z = document.createElement('input');
        z.setAttribute("type", "text");
        z.setAttribute("class", "form-control");
        z.setAttribute("id", params[j].name);
        z.setAttribute("value", params[j].url);
        z.setAttribute("required", "true");
        mainSet.appendChild(z);
    }
}

//Recuperation des attributs et la valeur d'une balise XML -> WORD
function newSet(para){
    return { "id": para.id,"name": para.name,"url": para.url }
}

function saveSet(){
    var modulList = document.getElementById('modulList').children;


    for(i=2, j=0; i<modulList.length, j<params.length; i+=3, j++){

        if(modulList[i].id == params[j].name) {
            params[j].url = modulList[i].value;
        }
    }

    var data = new FormData();
    data.append('name', '../json/settings.json');
    data.append('content', JSON.stringify(params));

    // AJAX CALL
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "./src/php/fileManager.php", true);
    xhr.send(data);


    setting = document.getElementById('modulList');
    for (var i = 0; i < setting.children.length; i++) {
        setting.removeChild(document.getElementById(params[i].name));
        setting.removeChild(document.getElementById("Mod_"+params[i].name));
        setting.removeChild(document.getElementById("name_" + params[i].name));
    }

    loadSettingDoc()
}