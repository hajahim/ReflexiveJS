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
    const whereClausseArray = ObjectHelpers.generateWhereClause( objectToMap );
    if( whereClausseArray.length > 0 )
      databaseQuery += " WHERE " + whereClausseArray.join( " AND " );
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
    const whereClausseArray = ObjectHelpers.generateWhereClause( currentObject );
    if( whereClausseArray.length > 0 )
      databaseQuery += " WHERE " + whereClausseArray.join( " AND " );
    return DataBaseConnector.queryDatabase( databaseQuery );
  }

}

module.exports = ORMTranslator;