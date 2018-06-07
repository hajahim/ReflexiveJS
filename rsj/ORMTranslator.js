const MSSQLConnector = require( "../database/mssql/MSSQLConnector" );

const DataBaseConnector = MSSQLConnector;

class ORMTranslator {

  static convertObjectToQueryString( objectToMap  ) {
    const tableName = objectToMap.constructor.name;
  }

  static findAll( objectToMap ) {
    const className = objectToMap.constructor.name;
    const result = DataBaseConnector.queryDatabase( `select * from ${className}` );
    return result;
  }

  static findByParameter( objectToMap ) {

  }

}

module.exports = ORMTranslator;