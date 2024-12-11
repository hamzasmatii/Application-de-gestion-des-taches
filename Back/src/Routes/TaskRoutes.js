// routes/taskRoutes.js
const express = require('express');
const TaskController = require('../Controllers/TaskController');

const router = express.Router();

// Route pour créer une nouvelle tâche
router.post('/', TaskController.createTask);

// Route pour récupérer toutes les tâches
router.get('/', TaskController.getAllTasks);

// Route pour récupérer une tâche par son ID
router.get('/:id', TaskController.getTaskById);

// Route pour mettre à jour une tâche (par son ID)
router.put('/:id', TaskController.updateTask);

// Route pour supprimer une tâche (par son ID)
router.delete('/:id', TaskController.deleteTask);

module.exports = router;
