# Les Bons Artisans - Projet de gestion de produits

Ce projet est une application complète de gestion de produits avec une **API REST en Node.js/Express** utilisant **MongoDB** comme base de donnée et une **interface web en React.js**.

## Prérequis

Avant de démarrer, assurez-vous d'avoir installé les outils suivants :

- [Node.js](https://nodejs.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) ou une instance MongoDB locale

## Backend (Express & MongoDB)

1. **Accédez au dossier `server`** :

   ```bash
   cd server
   ```

2. **Installez les dépendances** :

   ```bash
   npm install
   ```

3. **Configurez les variables d'environnement** :
   Copiez le fichier .env.sample et renommez-le en .env à la racine du dossier server. Ensuite, remplissez les valeurs suivantes avec vos informations de connexion :

```
PORT=your_port
MONGO_URI=your_mongo_uri_here
DATABASE_NAME=database_name
```

- **PORT** : Le port sur lequel votre serveur Express écoutera.
- **MONGO_URI** : L'URI de connexion à votre base de données MongoDB.
- **DATABASE_NAME** : Le nom de la base de données à utiliser.

4. **Démarrer le backend** :

   ```bash
   npm run dev
   ```

   Le backend sera accessible sur `http://localhost:PORT`.

   Si vous souhaitez lancer les seeds pour remplir la base de données avec des données initiales, vous pouvez le faire avec la commande suivante :

   ```bash
   npm run seed
   ```

## Frontend (React.js)

1. **Accédez au dossier `client`** :

   ```bash
   cd client
   ```

2. **Installez les dépendances** :

   ```bash
   npm install
   ```

3. **Démarrer le frontend** :

   ```bash
   npm run start
   ```

   Le frontend sera accessible sur `http://localhost:3000`.

## Routes API (Backend)

L'API expose les routes suivantes :

- `GET /api/products` : Récupère tous les produits.
- `POST /api/products` : Ajoute un nouveau produit.
- `PUT /api/products/:id` : Modifie un produit existant.
- `DELETE /api/products/:id` : Supprime un produit.
