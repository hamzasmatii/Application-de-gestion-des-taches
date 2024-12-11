// controllers/userController.js
const UserService = require('../Services/UserService');

class UserController {
  // Créer un utilisateur
  static async createUser(req, res) {
    const { nom, prenom } = req.body;
    try {
      const user = await UserService.createUser(nom, prenom); // Appel au service pour créer l'utilisateur
      res.status(201).json(user); // Répond avec l'utilisateur créé
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur: ' + error.message });
    }
  }

  // Récupérer un utilisateur par son ID
  static async getUserById(req, res) {
    const { id } = req.params;
    const parsedId = parseInt(id, 10);  // Parse ID as integer

    try {
      const user = await UserService.getUserById(parsedId); // Use parsed integer ID
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.status(200).json(user); // Return the user found
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur: ' + error.message });
    }
  }

  // Récupérer tous les utilisateurs
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers(); // Appel au service pour récupérer tous les utilisateurs
      res.status(200).json(users); // Répond avec la liste des utilisateurs
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs: ' + error.message });
    }
  }

  // Supprimer un utilisateur par ID
  static async deleteUser(req, res) {
    let { id } = req.params;

    // Convertir l'ID en entier
    id = parseInt(id, 10);

    // Vérifier si l'ID est valide
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID d\'utilisateur invalide' });
    }

    try {
      const deletedUser = await UserService.deleteUser(id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé pour suppression' });
      }
      res.status(200).json({ message: 'Utilisateur supprimé avec succès' }); // Confirme la suppression
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur: ' + error.message });
    }
  }

  static async getAllUsersWithTasks(req, res) {
    try {
      const users = await UserService.getAllUsersWithTasks();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  

}

module.exports = UserController;
