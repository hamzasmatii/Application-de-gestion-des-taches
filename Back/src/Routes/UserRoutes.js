// routes/userRoutes.js
const express = require('express');
const UserController = require('../Controllers/UserController');

const router = express.Router();

// Route pour créer un utilisateur
router.post('/', UserController.createUser);

// Route pour récupérer tous les utilisateurs
router.get('/', UserController.getAllUsers);

// Route pour récupérer un utilisateur par son ID
router.get('/:id', UserController.getUserById);

// Route pour supprimer un utilisateur par son ID
router.delete('/:id', UserController.deleteUser);



module.exports = router;
