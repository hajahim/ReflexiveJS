const ORMTranslator = require( "./ORMTranslator" );

const ORMObject = classCaller =>
  class extends classCaller {

    find() {

    }

    selectAll() {
      let result = [];
      result = ORMTranslator.findAll( this );
      return result;
    }

    delete() {

    }

    update() {
        
    }

    save() {

    }

  };

module.exports = ORMObject;
