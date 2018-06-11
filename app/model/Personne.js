const ORMObject = require( "../../rsj/ORMObject" );

class ORMInheritance {}

function superhero(target) {
  console.warn("MISY");
  target.isSuperhero = true
  target.power = 'flight'
}

@superhero
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