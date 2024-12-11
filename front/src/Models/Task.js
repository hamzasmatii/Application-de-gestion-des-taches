class Task {
    constructor(id, name, status, userId) {
      this.id = id;
      this.name = name;
      this.status = status;
      this.userId = userId;
    }
  
    // Method to display task information
    display() {
      return `${this.name} - Status: ${this.status} (User ID: ${this.userId})`;
    }
  }
  
  export default Task;
  