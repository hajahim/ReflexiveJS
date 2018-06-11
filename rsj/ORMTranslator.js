const MSSQLConnector = require( "../database/mssql/MSSQLConnector" );
const StringHelpers = require( "./helpers/StringHelpers" );
const ObjectHelpers = require( "./helpers/ObjectHelpers" );

const DataBaseConnector = MSSQLConnector;

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

  static checkingObjectSubscription( currentObject ) {
    const tableName = currentObject.constructor.name;
    let databaseQuery = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '" + tableName + "'";
    return DataBaseConnector.queryDatabase( databaseQuery );
  }

  static createTable( currentObject ) {
    const tableName = currentObject.constructor.name;
    let databaseQuery = "CREATE TABLE " + tableName + " ( ";
    const prototypeReading = currentObject.constructor.toString();
  }

}

module.exports = ORMTranslator;