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

function countWord(str){
    
}