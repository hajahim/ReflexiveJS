const ORMTranslator = require( "./ORMTranslator" );

const ORMObject = classCaller =>
  class extends classCaller {

    find() {
      return ORMTranslator.findByParameter( this );
    }

    findAll() {
      return ORMTranslator.findAll( this );
    }

    delete() {

    }

    update() {
        
    }

    save() {

    }

  };

module.exports = ORMObject;
