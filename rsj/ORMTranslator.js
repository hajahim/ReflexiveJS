const StringHelpers = require( "./helpers/StringHelpers" );
const ObjectHelpers = require( "./helpers/ObjectHelpers" );
const Configuration = require( "./config/ConfigurationParser" );
const GenericSQL = require("./helpers/GenericSQL");
const currentDriver = Configuration.getCurrentDriver();
const connectorConfiguration = Configuration.getConnectionStringData();
const Connector = require( `./database/${currentDriver}` );

const DataBaseConnector = new Connector( connectorConfiguration );
const queryBuilder = new GenericSQL( Configuration.getConnectionDriver() );

class ORMTranslator {

  static findAll( objectToMap ) {
    const className = objectToMap.constructor.name;
    const result = DataBaseConnector.queryDatabase( queryBuilder.selectAllDataQuery( className ) );
    return result;
  }

  static findByParameter( objectToMap ) {
    const tableName = objectToMap.constructor.name;
    const whereClause = ObjectHelpers.generateWhereClause( objectToMap );
    const query = queryBuilder.selectByParameter( tableName, whereClause );
    return DataBaseConnector.queryDatabase( query );
  }

  static saveObjectToDatabase( currentObject ) {
    const className = currentObject.constructor.name;
    const jsonObject = {};
    const objectProperties = Object.keys( currentObject );
    objectProperties.slice( 1, objectProperties.length ).map( function( attribute ) {
      const getter = attribute.split("").slice( 1, attribute.length ).join("");
      jsonObject[getter] = currentObject[attribute];
    });
    const query = queryBuilder.insertDataQuery( className, jsonObject, currentObject.getId() );
    return DataBaseConnector.queryDatabase( query );
  }

  static deleteObject( currentObject ) {
    const tableName = currentObject.constructor.name;
    const whereClause = ObjectHelpers.generateWhereClause( currentObject );
    const query = queryBuilder.deleteQuery( tableName, whereClause );
    return DataBaseConnector.queryDatabase( query );
  }

  static updateObject( currentObject ) {
    const tableName = currentObject.constructor.name;  
    const properties = ObjectHelpers.generateWhereClause( currentObject );
    const whereClause = {};
    whereClause[ currentObject.getId() ] = currentObject[ currentObject.getId() ];
    const query = queryBuilder.updateQuery( tableName, properties, whereClause );
    return DataBaseConnector.queryDatabase( query );
  }

  static checkingObjectSubscription( objectName ) {
    let databaseQuery = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '" + objectName + "'";
    return DataBaseConnector.queryDatabase( databaseQuery );
  }

  static generateObjectQuery( tableName, objectProperties ) {
    return queryBuilder.createTableQuery( tableName, objectProperties );
  }

  static suscribeObject( objectParameter ) {
    const [ currentObject, objectProperties ] = objectParameter;
    const tableName = currentObject.name;
    const isObjectAlreadySuscribe = this.checkingObjectSubscription( tableName );
    return new Promise( ( resolve, reject ) => {
      isObjectAlreadySuscribe.then( queryResult => {
        try {
          if( queryResult.length === 0 ) {
            const queryString = this.generateObjectQuery( tableName, objectProperties )
            resolve( DataBaseConnector.queryDatabase( queryString ) )
          } else {
            resolve( )
          }
        } catch( queryException ) {
          reject();
          throw new Error( "Exception throw at : " + queryException );
        }
      });
    });
  }

}

module.exports = ORMTranslator;