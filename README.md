# Description du projet
Cette application tend à reproduire le coté recherche et prise de rendez-vous pour les patients proposé par le service en ligne Doctolib. L'objectif du projet est de permettre aux utilisateurs de rechercher, à partir de la page d'acceuil de l'application, un type de professionnel ou alors un centre de soin à un endroit donné à l'aide d'un formulaire. 
Les résultats de la recherche seront représentés en deux parties, la première sous la forme de tuiles. Chaque tuile correspondra à un résultat et contiendra un peu plus de détails .
La deuxième partie présentera une carte contenant des markers qui permettront à l'utilisateur d'itentifier sur une carte géographique la localisation des différents profesionnelles et établissements.
L'application proposera à l'utilisateur la possibilité de s'authentifier afin de gérer ses rendez-vous.L'API back fournira une API REST pour accéder à toutes ces informations. L'utilisateur non authentifié ne pourra pas avoir accès à toutes les informations. Par exemple, le calendrier et l'historique des rendez-vous ne seront pas disponible. L'utilisateur authentifié pourra gérer les évenements de son calendrier
# Technologies utilisées
- Backend:
-- nodeJs pour l'API REST
-- Jasmine pour les tests unitaires
- Frontend: 
-- Angular et Bootstrap
-- API pour code postaux
-- API pour la map

# Installer
## Utiliser docker
### prérecquis
- docker
### execute
    - sudo docker-compose up 
    - sudo docker-compose up --build --force-recreate --renew-anon-volume (seulement après modification du code)
## Build le code source
### prérecquis
- nodeJs
- angular
### build
1. lancer le backend (dépuis le repertoir backend)
-- npm install
-- node index.js
2. lancer le frontend (dépuis le repertoir frontend)
-- npm install
-- ng serve --open (l'application sera accessible à http://localhost:4200)
