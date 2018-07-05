import { ORMObject, ObjectTagger, ObjectRender } from "reflexivejs";

@ObjectTagger.Entity({
  idTravail: {
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
class Travail extends ORMObject( ObjectRender ) {

  constructor( travailID = null, libelle = null, description = null ) {
    super();
    this.idTravail = travailID;
    this.libelle = libelle;
    this.description = description;
  }

  getId() {
    return "idTravail";
  }

  @ObjectTagger.hidden
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