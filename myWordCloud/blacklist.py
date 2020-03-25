from collections import Counter
import numpy as np 

# ------------------------------------------
#          Traitement blacklist
# ------------------------------------------
def blacklist(data):
  # Ouverture du fichier contenant les mots blacklistés
    with open("./blacklist.txt","r") as fichier_blacklist:
        file_blacklist = fichier_blacklist.readlines()

    # Récupération des mots blacklistés
    # Suppression des caractères inutiles (espaces, retour à la ligne)
    blacklist = []
    for line in file_blacklist:
        blacklist.append(line.strip())
    

    liste = []
    # Suppression des caractères inutiles (espaces)
    for elem in data:
        liste.append(elem.strip())
    
      

    # Suppression des mots blacklistés
    return [item for item in liste if item not in blacklist]  