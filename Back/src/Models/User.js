class User {
  constructor(id, nom, prenom) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
  }

  // Method to display the user information
  display() {
    return `${this.nom} ${this.prenom}`;
  }
}

module.exports = User;
