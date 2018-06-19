const StringHelpers = require( "./helpers/StringHelpers" );
const ObjectHelpers = require( "./helpers/ObjectHelpers" );
const Configuration = require( "./config/ConfigurationParser" );
const connectionString = Configuration.connectionConfigurationData.connectionString;
const Connector = require( `./database/${connectionString.database.driver}` );

const DataBaseConnector = Connector;

class ORMTranslator {

  static findAll( objectToMap ) {
    const className = objectToMap.constructor.name;
    const result = DataBaseConnector.queryDatabase( `SELECT * from ${className}` );
    return result;
  }

  static findByParameter( objectToMap ) {
    const tableName = objectToMap.constructor.name;
    let databaseQuery = " SELECT * FROM " + tableName;
    const whereClauseArray = ObjectHelpers.generateWhereClause( objectToMap );
    if( whereClauseArray.length > 0 )
      databaseQuery += " WHERE " + whereClauseArray.join( " AND " );
    return DataBaseConnector.queryDatabase( databaseQuery );
  }

  static saveObjectToDatabase( currentObject ) {
    const className = currentObject.constructor.name;
    const placeholder = ObjectHelpers.generateInsertPlaceholder( currentObject );
    let query = "INSERT INTO " + className + " OUTPUT Inserted." + currentObject.getId() + " VALUES (" + placeholder + ")";
    const objectProperties = Object.keys( currentObject );
    const objectValues = objectProperties.slice( 1, objectProperties.length ).map( function( attribute ) {
      return "'" + currentObject[attribute] + "'";
    });
    query = StringHelpers.replacePlaceholder( query, objectValues );
    return DataBaseConnector.queryDatabase( query );
  }

  static deleteObject( currentObject ) {
    const tableName = currentObject.constructor.name;
    let databaseQuery = " DELETE FROM " + tableName;
    const whereClauseArray = ObjectHelpers.generateWhereClause( currentObject );
    if( whereClauseArray.length > 0 )
      databaseQuery += " WHERE " + whereClauseArray.join( " AND " );
    return DataBaseConnector.queryDatabase( databaseQuery );
  }

  static updateObject( currentObject ) {
    const tableName = currentObject.constructor.name;
    let databaseQuery = " UPDATE " + tableName;
    const whereClauseArray = ObjectHelpers.generateWhereClause( currentObject );
    if( whereClauseArray.length === 0 )
      return currentObject;
    databaseQuery += " SET " + whereClauseArray.slice( 1, whereClauseArray.length ).join(" , ");
    databaseQuery += " WHERE " + currentObject.getId() + " = " + currentObject[ currentObject.getId() ];
    return DataBaseConnector.queryDatabase( databaseQuery );
  }

  static checkingObjectSubscription( objectName ) {
    let databaseQuery = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '" + objectName + "'";
    return DataBaseConnector.queryDatabase( databaseQuery );
  }

  static generateObjectQuery( tableName, objectProperties ) {
    let databaseQuery = "CREATE TABLE " + tableName + " ( ";
    const objectPropertiesAggregator = [];
    let queryValue = null;
    Object.keys( objectProperties ).map( propertyName => {
      const propertyValues = objectProperties[propertyName];
      const isPrimary = typeof( propertyValues.isPrimaryKey ) !== "undefined" && propertyValues.isPrimaryKey;
      queryValue = "";
      if( isPrimary )
        queryValue = `${propertyName} ${propertyValues.type} IDENTITY(1,1) NOT NULL PRIMARY KEY`;
      else
        queryValue = `${propertyName} ${propertyValues.type || "VARCHAR"}(${propertyValues.maxLength || ""})`;
      objectPropertiesAggregator.push( queryValue );
    });
    if( objectPropertiesAggregator.length > 0 )
      databaseQuery += objectPropertiesAggregator.join( " , " );
    databaseQuery += " ) ";
    return databaseQuery;
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