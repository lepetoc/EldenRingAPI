
# Elden Ring Build Planner

Bienvenue dans Elden Ring Build Planner, une application qui permet aux joueurs de créer, enregistrer et partager leurs propres builds pour le jeu Elden Ring.

## Configuration

### Prérequis

Assurez-vous d'avoir Node.js installé sur votre machine.

### Étapes pour configurer l'application

1.  Clonez ce dépôt :

-   `git clone https://github.com/votre-utilisateur/elden-ring-build-planner.git` 
    
-   Installez les dépendances :
    
-   `npm install` 
    
-   Configurez les variables d'environnement :
    
    -   Créez un fichier `.env` à la racine du projet.
    -   Ajoutez les variables suivantes :
        ``` 
        PORT=3000
        API_BASE_URL=https://api-elden-ring.com
        DATABASE_URL=your_database_url 
        ```
        
-   Lancez l'application :
1.  `npm start` 
    
L'application sera accessible à l'adresse `http://localhost:3000`.

## Utilisation

### Page d'accueil

En arrivant sur la page principale, vous verrez les derniers builds partagés par la communauté. Utilisez la barre de recherche pour trouver des builds spécifiques et marquez vos favoris.

### Inscription et Connexion

Pour créer et enregistrer vos propres builds, vous devez vous inscrire et vous connecter. Cliquez sur les boutons correspondants pour accéder à ces fonctionnalités.

### Création de Build

Sur la page de création de build, renseignez les objets, sélectionnez une classe de base et ajoutez des tags pour faciliter la recherche par d'autres utilisateurs.

### Partage de Builds

Une fois votre build terminé, choisissez de le rendre public ou privé. Les builds publics seront visibles par la communauté, tandis que les builds privés resteront accessibles uniquement pour vous.

## API externe Elden Ring

Cette application utilise une API externe publique d'Elden Ring pour récupérer les données des objets du jeu. Les informations sur les objets sont récupérées en temps réel pour permettre une expérience à jour et complète pour les utilisateurs.

Pour toute assistance supplémentaire, veuillez consulter la documentation ou contacter notre équipe de support.

----------

Profitez de l'Elden Ring Build Planner pour planifier et partager vos créations dans le monde d'Elden Ring. Amusez-vous à créer les builds parfaits pour vos aventures dans le jeu !
