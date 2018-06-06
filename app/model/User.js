const ORMObject = require( "../../rsj/ORMObject" );

class ORMInheritance {}

class User extends ORMObject( ORMInheritance ) {
  
  constructor() {
    super();
    this.nom = "";
    this.prenom = ""
    this.age = "";
  }

}

module.exports = User;