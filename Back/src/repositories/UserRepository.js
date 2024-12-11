// repositories/UserRepository.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const User = require('../Models/User');  // Import the User model (for structuring data)

class UserRepository {
  // Create a new user
  static async create(nom, prenom) {
    try {
      const userData = await prisma.user.create({
        data: {
          nom,
          prenom,
        },
      });
      return new User(userData.id, userData.nom, userData.prenom);  // Return a User instance
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  // Get a user by ID
  static async getById(id) {
    try {
      const userData = await prisma.user.findUnique({
        where: { id },
      });
      if (userData) {
        return new User(userData.id, userData.nom, userData.prenom);  // Return a User instance
      }
      return null;  // Return null if no user found
    } catch (error) {
      throw new Error('Error fetching user by ID: ' + error.message);
    }
  }

  // Get all users
  static async getAll() {
    try {
      const usersData = await prisma.user.findMany();
      return usersData.map(userData => new User(userData.id, userData.nom, userData.prenom));  // Return an array of User instances
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }

  // Delete a user by ID
  static async delete(id) {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id },
      });
      return new User(deletedUser.id, deletedUser.nom, deletedUser.prenom);  // Return the deleted user as a User instance
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  }
}

module.exports = UserRepository;
