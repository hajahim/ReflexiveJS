const ORMTranslator = require( "./ORMTranslator" );
const ObjectHelpers = require( "./helpers/ObjectHelpers" );

const ORMObject = classCaller =>
  class extends classCaller {

    find() {
      return new Promise( ( resolve, reject ) => {
        ORMTranslator.findByParameter( this ).then( queryResult => {
          resolve( ObjectHelpers.convertQueryResultToObject( queryResult.recordset[0], this ) );
          reject( () => {
            throw new Error( "Query Exception" );
          });
        });
      });
    }

    findAll() {
      return new Promise( ( resolve, reject ) => {
        ORMTranslator.findAll( this ).then( queryResult => {
          const retour = [];
          queryResult.recordset.map( resultRow => {
            retour.push( ObjectHelpers.convertQueryResultToObject( resultRow, this ) );
          });
          resolve( retour );
          reject( () => {
            throw new Error( "Query Exception" );
          });
        });
      });
    }

    delete() {
      return new Promise( ( resolve, reject ) => {
        ORMTranslator.findByParameter( this ).then( queryResult => {
          ORMTranslator.deleteObject( this ).then( () => {
            resolve( ObjectHelpers.convertQueryResultToObject( queryResult.recordset[0], this ) );
            reject( () => {
            throw new Error( "Query Exception" );
          });
          });
        });
      });
    }

    update() {
      return new Promise( ( resolve, reject ) => {
        ORMTranslator.updateObject( this ).then( () => {
          this.find().then( queryResult => {
            resolve( queryResult );
            reject( () => {
              throw new Error( "Query Exception" );
            });
          });
        });
      });
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
