const ORMObject = require( "../../rsj/ORMObject" );
const ObjectTagger = require( "../../rsj/decorator/ObjectTagger" );

var counter = 0;

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

  @ObjectTagger.annotate({
    type: "varchar",
    maxlength: 20
  })
  get idUser() {
    return this._idUser;
  }

  @ObjectTagger.annotate({
    type: "varchar",
    maxlength: 20
  })
  get nom() {
    return this._nom;
  }

  @ObjectTagger.annotate({
    type: "varchar",
    maxlength: 20
  })
  get prenom() {
    return this._prenom;
  }

  @ObjectTagger.annotate({
    type: "number"
  })
  get age() {
    return this._age;
  }

  set idUser( userID ) {
    this._idUser = userID;
  }

  set nom( nom ) {
    this._nom = nom;
  }

  set prenom( prenom ) {
    this._prenom = prenom;
  }

  set age( age ) {
    this._age = age;
  }

}

module.exports = Personne;