class User {
    constructor(id, nom, prenom) {
      this.id = id;
      this.nom = nom;
      this.prenom = prenom;
    }
  
    // Méthode pour afficher l'utilisateur
    display() {
      return `${this.nom} (${this.prenom})`;
    }
  }
  
  export default User;