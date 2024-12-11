// services/UserService.js
import User from '../Models/User';

const API_URL = "http://localhost:5000/api/users"; // L'URL de ton API backend

export const UserService = {
  // Récupérer tous les utilisateurs
  async getAll() {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error('Erreur lors de la récupération des utilisateurs');
    }
    const data = await res.json();
    return data.map(user => new User(user.id, user.nom, user.prenom)); // Créer des objets User
  },

  // Créer un nouvel utilisateur
  async create(userData) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error("Erreur lors de la création de l'utilisateur");
    }

    const data = await res.json();
    return new User(data.id, data.nom, data.prenom); // Retourner un objet User
  },

  // Mettre à jour un utilisateur
  async update(id, userData) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error("Erreur lors de la mise à jour de l'utilisateur");
    }

    const data = await res.json();
    return new User(data.id, data.nom, data.prenom); // Retourner un objet User mis à jour
  },

  // Supprimer un utilisateur
  async delete(id) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Erreur lors de la suppression de l'utilisateur");
    }

    return { message: "Utilisateur supprimé avec succès" }; // Retourner un message de succès
  },

  // Récupérer un utilisateur par son ID
  async getById(id) {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) {
      throw new Error("Erreur lors de la récupération de l'utilisateur");
    }
    const data = await res.json();
    return new User(data.id, data.nom, data.prenom); // Retourner l'objet User
  },
};

export default UserService;
