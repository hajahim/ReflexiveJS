const ORMObject = require( "../../rsj/ORMObject" );
const ObjectRender = require( "../../rsj/generator/ObjectRender" );
const ObjectTagger = require( "../../rsj/decorator/ObjectTagger" );

@ObjectTagger.Entity({
  idUser: {
    isPrimaryKey: true
  },
  nom: {
    type: "VARCHAR",
    maxLength: 20
  },
  prenom: {
    type: "VARCHAR",
    maxLength: 20
  },
  age: {
    type: "INT"
  }
})
class Personne extends ORMObject( ObjectRender ) {

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

  get idUser() {
    return this._idUser;
  }

  get nom() {
    return this._nom;
  }

  get prenom() {
    return this._prenom;
  }

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