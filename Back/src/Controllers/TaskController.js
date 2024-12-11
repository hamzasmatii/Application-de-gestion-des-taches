// controllers/taskController.js
const TaskService = require('../Services/TaskService');
const Status = require('../Models/StatusEnum');  // Importation de l'énumération Status


class TaskController {
  // Créer une nouvelle tâche
  static async createTask(req, res) {
    const { name, status, userId } = req.body;

    // Vérifier que le statut est valide
    if (!Status.isValid(status)) {
      return res.status(400).json({ message: 'Statut invalide' });
    }

    try {
      // Créer la tâche via le service
      const task = await TaskService.createTask(name, status, userId);
      return res.status(201).json(task);  // Retourner la tâche créée
    } catch (error) {
      return res.status(500).json({ message: 'Erreur lors de la création de la tâche: ' + error.message });
    }
  }

  // Récupérer toutes les tâches
  static async getAllTasks(req, res) {
    try {
      const tasks = await TaskService.getAllTasks();
      return res.status(200).json(tasks);  // Retourner la liste des tâches
    } catch (error) {
      return res.status(500).json({ message: 'Erreur lors de la récupération des tâches: ' + error.message });
    }
  }

  // Récupérer une tâche par son ID
  static async getTaskById(req, res) {
    const { id } = req.params;
    const parsedId = parseInt(id, 10);  // Parse ID as integer

    // Vérifier si l'ID est valide (si ce n'est pas un nombre)
    if (isNaN(parsedId)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    try {
      const task = await TaskService.getTaskById(parsedId);  // Use parsed integer ID
      if (!task) {
        return res.status(404).json({ message: 'Tâche non trouvée' });
      }
      return res.status(200).json(task);  // Retourner la tâche trouvée
    } catch (error) {
      return res.status(500).json({ message: 'Erreur lors de la récupération de la tâche: ' + error.message });
    }
  }

  // Mettre à jour une tâche
  static async updateTask(req, res) {
    const { id } = req.params; // Extract task ID from the URL
    const { status, name, userId } = req.body; // Extract fields from the request body

    // Validate inputs (you can use your own validation logic or a library like Joi or express-validator)
    if (!Status.isValid(status)) {
      return res.status(400).json({ message: 'Statut invalide' });
    }
    if (userId && isNaN(parseInt(userId, 10))) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const parsedId = parseInt(id, 10); // Parse the ID to an integer
    if (isNaN(parsedId)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    try {
      // Call the service to update the task
      const updatedTask = await TaskService.update(parsedId, { status, name, userId });

      // Return the updated task as a response
      return res.status(200).json(updatedTask);
    } catch (error) {
      // Catch any errors that occur during the update process
      return res.status(500).json({ message: 'Error updating task: ' + error.message });
    }
  }

  // Supprimer une tâche
  static async deleteTask(req, res) {
    let { id } = req.params;

    // Convertir l'ID en entier
    id = parseInt(id, 10);

    // Vérifier si l'ID est valide
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID de tâche invalide' });
    }

    try {
      const deletedTask = await TaskService.deleteTask(id);
      if (!deletedTask) {
        return res.status(404).json({ message: 'Tâche non trouvée pour suppression' });
      }
      return res.status(200).json({ message: 'Tâche supprimée avec succès' });  // Retourner un message de confirmation
    } catch (error) {
      return res.status(500).json({ message: 'Erreur lors de la suppression de la tâche: ' + error.message });
    }
  }
}

module.exports = TaskController;

