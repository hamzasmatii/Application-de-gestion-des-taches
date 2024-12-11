Here's the full **README.md** with all steps added for setting up the project, including installation, database setup, and starting the servers:

```markdown
# Application de gestion des tâches

## Description

Ce projet est une application full-stack permettant de gérer les utilisateurs et leurs tâches. Il utilise **Next.js** pour le frontend et **Node.js** pour le backend, avec une base de données **PostgreSQL** pour stocker les informations des utilisateurs et des tâches. L’application permet de **visualiser les utilisateurs**, **ajouter de nouveaux utilisateurs**, et d’effectuer des opérations **CRUD** (Créer, Lire, Mettre à jour, Supprimer) sur les tâches.

### Fonctionnalités principales :
- **Affichage des utilisateurs**.
- **Ajout, mise à jour et suppression des tâches**.
- **Recherche de tâches**.
- **Gestion des utilisateurs**.

## Technologies utilisées

- **Frontend** : Next.js
- **Backend** : Node.js avec Express
- **Base de données** : PostgreSQL
- **Gestion de la base de données** : Prisma

## Prérequis

Avant d'installer le projet, assurez-vous d'avoir les éléments suivants sur votre machine :

- **Node.js** et **npm** installés. Vous pouvez les télécharger depuis [Node.js](https://nodejs.org/).
- **PostgreSQL** installé et configuré sur votre machine. Vous pouvez le télécharger depuis [PostgreSQL](https://www.postgresql.org/download/).

## Installation

### Étapes d'installation

#### 1. Clonez le repository :

Clonez ce projet dans votre répertoire local en exécutant la commande suivante dans votre terminal :

```bash
git clone https://github.com/votre-utilisateur/nom-du-repository.git
cd nom-du-repository
```

#### 2. Installez les dépendances du projet :

Une fois que vous avez cloné le repository, vous devez installer les dépendances nécessaires pour le frontend et le backend.

##### 2.1 Installation des dépendances du frontend (Next.js) :

Allez dans le répertoire du frontend et installez les dépendances en exécutant la commande suivante :

```bash
cd frontend
npm install
```

##### 2.2 Installation des dépendances du backend (Node.js avec Express) :

Allez dans le répertoire du backend et installez les dépendances en exécutant la commande suivante :

```bash
cd backend
npm install
```

#### 3. Configuration de la base de données (PostgreSQL) :

- **Créez une base de données** dans PostgreSQL (si ce n'est pas déjà fait) :

```sql
CREATE DATABASE task_manager;
```

- **Ajoutez l'URL de connexion à la base de données dans le fichier `.env`** du backend, comme suit :

```plaintext
DATABASE_URL="postgresql://postgres:123456789@localhost:5432/task_manager?schema=public"
```

#### 4. Lancer les migrations Prisma :

Prisma permet de gérer la base de données. Lancez les migrations pour configurer la base de données en exécutant la commande suivante dans le répertoire du backend :

```bash
cd backend
npx prisma migrate dev
```

#### 5. Démarrer les serveurs :

Une fois les dépendances installées et les migrations effectuées, vous pouvez démarrer les serveurs pour le frontend et le backend.

##### 5.1 Démarrer le serveur frontend (Next.js) :

Dans le répertoire du frontend, exécutez la commande suivante pour démarrer le serveur frontend :

```bash
cd frontend
npm run dev
```

Cela démarrera le serveur en mode développement et vous pourrez accéder à l'application sur `http://localhost:3000`.

##### 5.2 Démarrer le serveur backend (Node.js) :

Dans le répertoire du backend, exécutez la commande suivante pour démarrer l'API backend :

```bash
cd backend
npm start
```

Cela démarrera l'API backend, que vous pourrez consulter à `http://localhost:5000`.

## Tests et validation

### Tester l'application frontend :
- Accédez à `http://localhost:3000` dans votre navigateur.
- Vérifiez que vous pouvez afficher les utilisateurs et interagir avec les tâches.

### Tester l'API backend :
- Utilisez des outils comme Postman ou Insomnia pour tester les points de terminaison de l'API (par exemple, `http://localhost:5000/api/users`).
- Vérifiez que les opérations CRUD (Créer, Lire, Mettre à jour, Supprimer) sur les utilisateurs et les tâches fonctionnent correctement.

## Contribution

Si vous souhaitez contribuer à ce projet, veuillez suivre ces étapes :

1. Fork ce repository.
2. Créez une branche pour votre fonctionnalité (`git checkout -b ma-fonctionnalite`).
3. Effectuez vos modifications et committez-les (`git commit -am 'Ajout d\'une fonctionnalité'`).
4. Poussez vos modifications sur votre branche (`git push origin ma-fonctionnalite`).
5. Ouvrez une pull request pour que nous puissions examiner vos modifications.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus d'informations.
```

---

### Breakdown:
1. **Steps 1-5** include:
   - Cloning the repository.
   - Installing dependencies for both frontend and backend.
   - Configuring PostgreSQL.
   - Running Prisma migrations.
   - Starting both frontend (Next.js) and backend (Node.js) servers.
2. **Testing and validation** section was added for testing the app after installation and setup.
3. **Contribution** section is added for open-source contribution guidelines.
4. **License** section references the MIT license for the project. You can replace it with your own license if necessary.

This should cover the setup and ensure anyone working with the project can easily follow the steps to install, configure, and run the application.
