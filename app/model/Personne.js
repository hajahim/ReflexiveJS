const ORMObject = require( "../../rsj/ORMObject" );

class ORMInheritance {}

class Personne extends ORMObject( ORMInheritance ) {
  
  constructor( userID = null, nom = null, prenom = null, age = null ) {
    super();
    this.idUser = userID;
    this.nom = nom;
    this.prenom = prenom;
    this.age = age;
  }

  getId() {
    return "idUser";
  }

}

module.exports = Personne;