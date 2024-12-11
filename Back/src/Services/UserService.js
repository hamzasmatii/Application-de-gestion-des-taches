// services/UserService.js
const UserRepository = require('../repositories/UserRepository');  // Import the UserRepository

class UserService {
  // Create a new user
  static async createUser(nom, prenom) {
    try {
      const user = await UserRepository.create(nom, prenom);  // Use the UserRepository to create a user
      return user;
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  // Get a user by ID
  static async getUserById(id) {
    try {
      const user = await UserRepository.getById(id);  // Use the UserRepository to get a user by ID
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Error fetching user by ID: ' + error.message);
    }
  }

  // Get all users
  static async getAllUsers() {
    try {
      const users = await UserRepository.getAll();  // Use the UserRepository to get all users
      return users;
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }

  // Delete a user by ID
  static async deleteUser(id) {
    try {
      const deletedUser = await UserRepository.delete(id);  // Use the UserRepository to delete a user
      return deletedUser;
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  }
}

module.exports = UserService;
