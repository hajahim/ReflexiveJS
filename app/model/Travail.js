const ORMObject = require( "../../rsj/ORMObject" );
const ObjectTagger = require( "../../rsj/decorator/ObjectTagger" );

class ORMInheritance {}

@ObjectTagger.Entity({
  idTravail: {
    type: "INT",
    isPrimaryKey: true
  },
  libelle: {
    type: "VARCHAR",
    maxLength: 20
  },
  description: {
    type: "VARCHAR",
    maxLength: 100
  }
})
class Travail extends ORMObject( ORMInheritance ) {

  constructor( travailID = null, libelle = null, description = null ) {
    super();
    this.idTravail = travailID;
    this.libelle = libelle;
    this.description = description;
  }

  getId() {
    return "idTravail";
  }

  get idTravail() {
    return this._idTravail;
  }

  get libelle() {
    return this._libelle;
  }

  get description() {
    return this._description;
  }

  set idTravail( travailID ) {
    this._idTravail = travailID;
  }

  set libelle( libelle ) {
    this._libelle = libelle;
  }

  set description( description ) {
    this._description = description;
  }

}

module.exports = Travail;