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
      return ORMTranslator.deleteObject( this );
    }

    update() {
        
    }

    save() {
      let result = null;
      result = new Promise( ( resolve, reject ) => {
        ORMTranslator.saveObjectToDatabase( this ).then( queryResult => {
          const userID = queryResult.recordset[0].idUser;
          const userToFind = new this.constructor( userID );
          resolve( userToFind.find() );
          reject( () => {
            throw new Error( "Object cannot be find" );
          });
        });
      });
      return result;
    }

  };

module.exports = ORMObject;
