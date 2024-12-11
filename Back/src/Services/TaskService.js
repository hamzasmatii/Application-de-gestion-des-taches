// services/taskService.js
const TaskRepository = require('../repositories/taskRepository');
const Status = require('../Models/StatusEnum'); // Import Status Enum

class TaskService {
  // Create a new task
  static async createTask(name, status, userId) {
    try {
      if (!Status.isValid(status)) {
        throw new Error('Invalid status');
      }
      return await TaskRepository.create(name, status, userId);
    } catch (error) {
      throw new Error('Error creating task: ' + error.message);
    }
  }

  // Get all tasks
  static async getAllTasks() {
    try {
      return await TaskRepository.getAll();
    } catch (error) {
      throw new Error('Error fetching tasks: ' + error.message);
    }
  }

  // Get a task by ID
  static async getTaskById(id) {
    try {
      const task = await TaskRepository.findById(id);
      if (!task) {
        throw new Error('Task not found');
      }
      return task;
    } catch (error) {
      throw new Error('Error fetching task by ID: ' + error.message);
    }
  }

  // Update a task's status
  static async update(id, { status, name, userId }) {
    try {
      // Call the repository method to update the task
      const updatedTask = await TaskRepository.update(id, { status, name, userId });

      // Optionally transform the data or add any other service logic
      return updatedTask;
    } catch (error) {
      throw new Error('Error in TaskService: ' + error.message);
    }
  }
  

  // Delete a task
  static async deleteTask(id) {
    try {
      return await TaskRepository.delete(id);
    } catch (error) {
      throw new Error('Error deleting task: ' + error.message);
    }
  }
}

module.exports = TaskService;
