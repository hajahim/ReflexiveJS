const ORMObject = require( "../../rsj/ORMObject" );

class ORMInheritance {}

class Personne extends ORMObject( ORMInheritance ) {
  
  constructor() {
    super();
    this.nom = "";
    this.prenom = ""
    this.age = "";
  }

}

module.exports = Personne;