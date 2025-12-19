# Eco Bliss Bath 🧼

## Description du projet

Eco Bliss Bath est une start-up spécialisée dans la vente de produits de beauté écoresponsables dont le produit principal est un savon solide. La boutique prépare un site de vente en ligne.

Prérequis pour exécuter le projet : Node.js, Docker, NPM et Cypress.


## Objectifs de la campagne de tests

Les objectifs de cette campagne de tests automatisés sont les suivants :

- Vérifier le bon fonctionnement de la **connexion utilisateur**
- Vérifier la **gestion du panier**, fonctionnalité centrale du parcours client
- Détecter les anomalies métier côté backend
- Faciliter les tests de **régression** lors des futures évolutions de l’application

---

## Périmètre des tests

## Fonctionnalités testées

- Connexion utilisateur (authentification)
- Panier (ajout de produits et cohérence des données)
- API TEST
- Smock tests

## Installation

1. **Téléchargez ou clonez le dépôt**  
  
2. **Back-end:** 

depuis un terminal ouvert dans le dossier du projet, saisir la commande :

  _docker-compose up_  pour lancer le back-end
  
  _docker-compose down_  pour stopper le back-end

3. **Front-end:**  

depuis un terminal ouvert dans le dossier du projet, saisir la commande :  
  
  _npm install_  
    
  _npm start_  
  
Ouvrez le site depuis la page (http://localhost:8080)  
   
4. **Cypress:**  

depuis un terminal ouvert dans le dossier du projet, saisir la commande :  
  
  _npx cypress open_   pour l'exécution des tests dans cypress  
    
  _npx cypress run_   pour l'exécution des tests dans le terminal  


## Données de connexion au site Web 🔒

    identifiant: test2@test.fr 
    mot de passe: testtest

## API

Documentation API (swagger): (http://localhost:8081/api/doc)
