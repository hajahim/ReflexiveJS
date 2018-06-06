const ORMTranslator = require( "./ORMTranslator" );

const ORMObject = classCaller =>
  class extends classCaller {

    find() {

    }

    selectAll() {
      let result = [];
      const objectName = this.constructor.name;
      result = ORMTranslator.findAll( objectName );
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
