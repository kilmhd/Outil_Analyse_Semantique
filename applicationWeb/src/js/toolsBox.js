function modifyText(str){
                  
    var newStr = ""; 
    str = str.replace('(', '');
    str = str.replace(')', '');
      
    for(var i=0; i<str.length; i++) {  
        if ( str[i] == ' ') { 
            newStr += '_'; 
        } 
        else { 
            newStr += str[i]; 
        } 
    } 

    return newStr;
}

function delSpace(str){
  return str.replace('   ',' ');
}

//Transforme une liste de listes en une simple liste contenant toutes les données
function getArrayUni(array){
    newArray = ''
    for(i=0; i<array.length;i++){
        newArray += array[i]
    }
    return newArray
}