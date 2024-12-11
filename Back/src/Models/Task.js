// models/taskModel.js
class Task {
  constructor(id, name, status, userId) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.userId = userId;
  }

  // Method to display the task
  display() {
    return `${this.name} - Status: ${this.status}`;
  }
}

module.exports = Task;
