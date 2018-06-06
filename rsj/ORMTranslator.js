const MSSQLConnector = require( "../database/mssql/MSSQLConnector" );

const DataBaseConnector = MSSQLConnector;

class ORMTranslator {

  static convertObjectToQueryString( classToMap  ) {
    
  }

  static findAll( classToMap ) {
    const result = DataBaseConnector.queryDatabase( `select * from ${classToMap}` );
    return result;
  }

}

module.exports = ORMTranslator;