# Mic-Platform_V2
this the new version of mic platform

# Solution à faire : Proposée par Mariem
## 1/ je vous fournit une version stable qui contient globalement les fonctionnalités existantes et fonctionnelles travaillé avant par Mariem et Ghassen
## 2/ AmenAllah ajout son traville comme il faut et ou il faut dans cette version (je veux une version bien sans erreur et fonctionnelle) 
## 3/ AmenAllah force le commit dans la premiere repo (repo il 9adima) 
## 4/ Mariem va tester le pull de la nouvelle version 
## 5/ si cv et tout fonctionne bien dans l'ancienne repo , on termine avec 
  sinon on travaille sur la nouvelle repo et on y ajout Ghassen 
## 6/ voici une explication du hard commit qui peut vous aider (AmenAllah) 
# Git Commit: Forcer un Commit avec `--force` et `--hard`

Ce guide explique comment utiliser les commandes Git pour effectuer un commit "forcé" ou réécrire l'historique d'un dépôt Git en utilisant les options `--force` et `--hard`. Ces actions peuvent être utiles pour résoudre certains conflits, mais doivent être utilisées avec précaution, surtout en collaboration avec d'autres développeurs.

## Qu'est-ce qu'un commit forcé (`--force`) ?

Un commit forcé en Git est une opération qui permet d'envoyer des modifications dans le dépôt distant, même si ces modifications écrasent les changements déjà présents dans le dépôt distant.

La commande `git push --force` permet de pousser vos commits locaux vers le dépôt distant en ignorant les divergences éventuelles, ce qui peut réécrire l'historique de la branche distante.

### Pourquoi utiliser `--force` ?

- Réécriture de l'historique (par exemple, après un rebase ou un amendement de commit).
- Résolution de conflits dans l'historique qui ne peuvent pas être résolus autrement.
- Suppression de commits erronés ou inutiles.

### Commande pour forcer un push

```bash
git push --force
```

### Remarque de Mariem apres test :
#### 17/11/2024
# Partie Member  : 
1- Partie assignment :  Débordement lorsque la description est long de l'assignment ce qui fais que le btn seeMore n'apparait pas   
2- Partie Session : non fonctionnelle navigation probleme car y a pas d'execution de requete   
# Partie Instructor  :
1 - Partie assignment : il card hethi mta3 il member mouch instructor   
    remarque sur ui les deux btn aligné update & cancel fil for edition d'un assignment   
2-  na9is boutton ihizik lil page mta3 add assignment  
3 - ajout mta3 assignment fil ui mta3 il mobile ti5dim fil ui mta3 desktop ma ti5dimich   
#### 18/11/2024 
# Partie Instructor  :
## Partie assignment :  
   1- assignment card for instructor ne doit pas contenir aucune information concernant les responses   
   2- remarque sur ui les deux btn aligné update & cancel fil for edition d'un assignment  
   3- apres l'ajout d'un assignment normalement une redirection automatique vers assignments  
# Partie Member  :
## Partie assignment : 
  1- ajoute un padding en haut (pas necessaire de faire maintenant c pas obligatoire)
  2- lorsque le member a déjà une reponse normalement la partie du submit n'apparait pas (à verifier)   
  3- Partie Session : non fonctionnelle navigation probleme car y a pas d'execution de requete   

#### 19/11/2024   
# Coté fonctionnalité :
1- le nom du fichier "departements" à corriger : faute d'orthographe  
2- le folder "CRUDDepartement" n'existe pas dans le projet meme dans github (verification)  
3- pour back-end department il ne contient que : (departmentController)   
          afficher_All   
          create_Departement   
          get_Departments_names_and_ids   
    dans github et dans ma version local lorsque j'ai fait le pull (donc verifie)    
4- le folder "CRUDInstructors" n'existe pas dans le projet meme dans github (verification)     
5- lors de la suppression d'un instructor , il sera supprimer du department associé   
6- remarque orthographe : departementController mais c pas grave    
7- lors de la modification d'un instructor (dans la fct : "update_Instructor") , pas de pris en compte de modification du password    

8- juste des captures pour mieux comprendre :    
[![Capture-d-cran-2024-11-19-223210.png](https://i.postimg.cc/FHpjq4N1/Capture-d-cran-2024-11-19-223210.png)](https://postimg.cc/mPczzKcG)

[![Capture-d-cran-2024-11-19-223115.png](https://i.postimg.cc/d008cxV6/Capture-d-cran-2024-11-19-223115.png)](https://postimg.cc/9Dv4G1Tw)
    
#### 19/11/2024  2eme fois 
# Coté fonctionnalité :
1- le nom du fichier "departements" à corriger : faute d'orthographe  
3- pour back-end department il ne contient que : (departmentController)   
          afficher_All   
          create_Departement   
          get_Departments_names_and_ids   
    dans github et dans ma version local lorsque j'ai fait le pull (donc verifie)    
5- lors de la suppression d'un instructor , il sera supprimer du department associé   
6- remarque orthographe : departementController mais c pas grave    
7- lors de la modification d'un instructor (dans la fct : "update_Instructor") , pas de pris en compte de modification du password 
8- traiti il cas hethi awka ma sarich ajout w affichali ajouter avec sucess . bil3ani jarabit isem dep mouch mil liste ali fil back-end 
ba3id hethom i5dim il fonctionnalité mta3 il envoie mta3 mail à faire 9abal il meet.






