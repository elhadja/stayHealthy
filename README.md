# Description du projet
Cette application tend à reproduire le côté recherche et prise de rendez-vous pour les patients proposé par le service en ligne Doctolib. L'objectif du projet est de permettre aux utilisateurs de rechercher, à partir de la page d'acceuil de l'application, un type de professionnel ou alors un centre de soin à un endroit donné à l'aide d'un formulaire. 
Les résultats de la recherche seront représentés en deux parties : 
- la première sous la forme de tuiles. Chaque tuile correspondra à un résultat et contiendra un peu plus de détails .
- la deuxième partie présentera une carte contenant des markers qui permettront à l'utilisateur d'identifier sur une carte géographique la localisation des différents profesionnelles et établissements.

L'application proposera à l'utilisateur la possibilité de s'authentifier afin de gérer ses rendez-vous.L'API back fournira une API REST pour accéder à toutes ces informations. L'utilisateur non authentifié ne pourra pas avoir accès à toutes les informations. Par exemple, le calendrier et l'historique des rendez-vous ne seront pas disponible. L'utilisateur authentifié pourra gérer les évenements de son calendrier
# Technologies utilisées
- Backend:
    - nodeJs pour l'API REST
    - Jasmine pour les tests unitaires
- Front-end: 
    - Angular CLI
    - Protractor pour les tests end to end
    - [Angular-Material](https://material.angular.io/) et [Angular-Calendar](https://angular-calendar.com/) avec [Angular Bootstrap](https://ng-bootstrap.github.io/#/home) pour la mise en forme
    - [GeoApi](https://geo.api.gouv.fr/) pour code postaux des villes
    - [Leaflet](https://leafletjs.com/) avec [Nominatim](https://nominatim.org/) pour interagir avec la map

# Installer
Une connection à internet est nécessaire pour pouvoir exécuter l'application car nous utilisons la version gratuite de mongodb en ligne pour stocker nos données.
## Utiliser docker
Il se peut que si vous lancer l'application en utilisant docker vous rencontriez des problèmes lorsque vous actualiser explicitement une page. Par ailleurs un membre de l'équipe de développement a remonté qu'il n'arivait pas lancer l'application avec docker sous windows. Si vous rencontrez ce problème, nous vous récommendons de build manuellement le code source (voir la section Build le code source).
### Prérequis
- docker
### Execute
    - sudo docker-compose up 
    - sudo docker-compose up --build --force-recreate --renew-anon-volume (seulement si le code source a été modifié)
## Build le code source
### Prérequis
- nodeJs
- angular
### build
1. lancer le backend (depuis le repertoire backend)
    - npm install
    - node index.js
2. lancer le frontend (depuis le repertoire frontend)
    - npm install
    - ng serve --open (l'application sera accessible à http://localhost:4200)
