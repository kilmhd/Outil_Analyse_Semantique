
//tab : tableau de Tuple
//mot_text : mot de la transcription à traiter
function parcourirTab(tab, mot_text){
	var ok = 0; //Passe à 1 dès que le mot a été traité
	
	for(let i = 0; i < mot_text.length; i++){
		for(let j = 0; j < tab.length; j++){
			if(tab[j].mot === mot_text[i]){
				tab[j][1] += 1;
				ok = 1;
			}
		}
		
		if(ok != 1){
			tab.push([mot_text[i], 1]);
		}
		ok = 0;
	}
	return tab;	
}