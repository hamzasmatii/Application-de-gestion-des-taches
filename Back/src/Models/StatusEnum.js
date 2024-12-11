
class Status {
    static EN_COURS = "EN_COURS";  
    static TERMINEE = "TERMINEE";  
    static EN_ATTENTE = "EN_ATTENTE"; 
  
    // Méthode pour vérifier si un statut est valide
    static isValid(status) {
      return [this.EN_COURS, this.TERMINEE, this.EN_ATTENTE].includes(status);
    }
  
    // Méthode pour récupérer tous les statuts possibles
    static getAllStatuses() {
      return [this.EN_COURS, this.TERMINEE, this.EN_ATTENTE];
    }
  }
  
  module.exports = Status;
  