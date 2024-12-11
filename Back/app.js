// app.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/Routes/UserRoutes');  // Importation des routes des utilisateurs
const taskRoutes = require('./src/Routes/TaskRoutes');  // Importation des routes des tâches

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // Permet de traiter les données JSON dans le corps de la requête

// Utilisation des routes
app.use('/api/users', userRoutes); // Routes pour les utilisateurs
app.use('/api/tasks', taskRoutes); // Routes pour les tâches

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
