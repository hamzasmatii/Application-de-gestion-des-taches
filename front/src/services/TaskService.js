// services/TaskService.js
import Task from '../Models/Task';

const API_URL = "http://localhost:5000/api/tasks"; // Replace with your API URL for tasks

export const TaskService = {
  // Récupérer toutes les tâches
  async getAll() {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error('Erreur lors de la récupération des tâches');
    }
    const data = await res.json();
    return data.map(task => new Task(task.id, task.name, task.status, task.userId)); // Créer des objets Task
  },

  // Créer une nouvelle tâche
  async create(taskData) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
  
    if (!res.ok) {
      const errorText = await res.text(); // Capture le texte de la réponse en cas d'erreur
      console.error('Erreur de la réponse:', errorText); // Affiche l'erreur dans la console
      throw new Error("Erreur lors de la création de la tâche: " + errorText); // Ajouter plus de détails à l'erreur
    }
  
    const data = await res.json();
    return new Task(data.id, data.name, data.status, data.userId); // Retourner un objet Task
  }
  ,

  // Mettre à jour une tâche
  async update(id, taskData) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
  
    // Ensure the response is ok (status in the range 200-299)
    if (!res.ok) {
      const resBody = await res.text();  // Read the response body as text first
      throw new Error(`Erreur lors de la mise à jour de la tâche: ${resBody}`);
    }
  
    // Read the response as JSON only after confirming it's ok
    const data = await res.json();
    return new Task(data.id, data.name, data.status, data.userId); // Return updated Task object
  }
  
  ,

  // Supprimer une tâche
  async delete(id) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Erreur lors de la suppression de la tâche");
    }

    return { message: "Tâche supprimée avec succès" }; // Retourner un message de succès
  },

  // Récupérer une tâche par son ID
  async getById(id) {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) {
      throw new Error("Erreur lors de la récupération de la tâche");
    }
    const data = await res.json();
    return new Task(data.id, data.name, data.status, data.userId); // Retourner l'objet Task
  },
};

export default TaskService;
