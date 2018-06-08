const MSSQLConnector = require( "../database/mssql/MSSQLConnector" );
const StringHelpers = require( "./helpers/StringHelpers" );
const ObjectHelpers = require( "./helpers/ObjectHelpers" );

const DataBaseConnector = MSSQLConnector;

class ORMTranslator {

  static findAll( objectToMap ) {
    const className = objectToMap.constructor.name;
    const result = DataBaseConnector.queryDatabase( `select * from ${className}` );
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
    const className = objectToMap.constructor.name;
  }

}

module.exports = ORMTranslator;