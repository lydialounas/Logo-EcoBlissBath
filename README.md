# Eco Bliss Bath 🧼

## Description du projet

Eco Bliss Bath est une start-up spécialisée dans la vente de produits de beauté écoresponsables dont le produit principal est un savon solide. La boutique prépare un site de vente en ligne.

Prérequis pour exécuter le projet : Node.js, Docker, NPM et Cypress.

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

## Objectifs de la campagne de tests

Les objectifs de cette campagne de tests automatisés sont les suivants :

- Vérifier le bon fonctionnement de la **connexion utilisateur**
- Vérifier la **gestion du panier**, fonctionnalité centrale du parcours client
- Détecter les anomalies métier côté backend
- Faciliter les tests de **régression** lors des futures évolutions de l’application

 

## Fonctionnalités testées

- Connexion utilisateur (authentification)
- Panier (ajout de produits et cohérence des données)
- API TEST
- Smock tests

## Organisation des tests

J’ai organisé Cypress selon les bonnes pratiques :

E2E/
 ├── API-Tests/
 ├── Testfonctionel/
 └── Smocktest/


 ## PRINCIPALES ANOMALIES IDENTIFIÉES 

 -BUG MÉTIER MAJEUR : Stock ignoré

L’API accepte de commander :

stock = 0

stock < 0

quantité > stock

➡️ L’API renvoie 200 OK
➡️ Le produit est ajouté malgré un stock invalide

C’est le comportement le plus critique.

- Statuts HTTP incorrects

Le backend renvoie toujours 200, même :

en cas d’erreur

en cas de produit inexistant

en cas de données invalides

Cypress considère le test comme PASS, mais la logique métier est fausse.

- Faille XSS dans les avis

L’endpoint /reviews accepte :

<script>alert("XSS")</script>


➡️ Aucune sanitation
➡️ Risque de vol de session
➡️ Fail sécurité bloquante

❗ 4. Absence de validation (commande + avis) coté backend 

Les champs :

Nom

Adresse

Ville

Code postal

…ne sont pas validés.

➡️ Risque de commandes invalides.

❗ 5. Panier incohérent

## IMPACT SUR LE DÉPLOIEMENT 

Je ne recommande pas la mise en production dans cet état. NON GO
