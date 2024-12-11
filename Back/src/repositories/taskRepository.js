// repositories/taskRepository.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Task = require('../Models/Task'); // Import the Task model

class TaskRepository {
  // Create a new task in the database
  static async create(name, status, userId) {
    try {
      const taskData = await prisma.task.create({
        data: {
          name,
          status,
          userId,
        },
      });
      return new Task(taskData.id, taskData.name, taskData.status, taskData.userId); // Return Task object
    } catch (error) {
      throw new Error('Error creating task: ' + error.message);
    }
  }

  // Retrieve all tasks from the database
  static async getAll() {
    try {
      const tasks = await prisma.task.findMany();
      return tasks.map(task => new Task(task.id, task.name, task.status, task.userId)); // Return array of Task objects
    } catch (error) {
      throw new Error('Error fetching tasks: ' + error.message);
    }
  }

  // Retrieve a task by its ID
  static async findById(id) {
    try {
      const task = await prisma.task.findUnique({
        where: { id },
      });
      if (!task) return null;
      return new Task(task.id, task.name, task.status, task.userId); // Return Task object
    } catch (error) {
      throw new Error('Error fetching task by ID: ' + error.message);
    }
  }

  // Update a task's status
  static async update(id, { status, name, userId }) {
    try {
      // Prepare the update data object, including only provided fields
      const updateData = {};
      
      if (status) updateData.status = status;
      if (name) updateData.name = name;
      if (userId) updateData.userId = parseInt(userId, 10); // Ensure userId is an integer
  
      // Perform the update with dynamic fields
      const updatedTask = await prisma.task.update({
        where: { id },       // Find task by ID
        data: updateData,    // Update with the provided fields
      });
  
      // Return the updated task object
      return new Task(updatedTask.id, updatedTask.name, updatedTask.status, updatedTask.userId);
    } catch (error) {
      throw new Error('Error updating task: ' + error.message);
    }
  }
  

  // Delete a task from the database
  static async delete(id) {
    try {
      const deletedTask = await prisma.task.delete({
        where: { id },
      });
      return new Task(deletedTask.id, deletedTask.name, deletedTask.status, deletedTask.userId); // Return Task object
    } catch (error) {
      throw new Error('Error deleting task: ' + error.message);
    }
  }
}

module.exports = TaskRepository;
