var postgreSQLDriver = require('pg-promise');

let Connection = null;

class PostgreSQLConnector {

  static getConfiguration() {
    return {
      user: "sa",
      password: "Asdcxz1+",
      host: "localhost",
      port: "5432",
      database: "RSJDatabase"
    }
  }

  static getConnection() {
    try {
      if( Connection === null )
        Connection = postgreSQLDriver( this.getConfiguration() );
    } catch ( ConnectionDatabaseException ) {
      throw new Error( `Database connect exception : ${ConnectionDatabaseException}` );
    }
    return Connection;
  }

  static queryDatabase( query ) {
    let queryResult = null;
    try {
      const connection = this.getConnection();
      queryResult = new Promise( ( resolve, reject ) => {
        connection.one( query ).then( responseQuery => {
          resolve( responseQuery );
        })
        reject( function() {
          throw new Error("Can't connect to DB") 
        })
      });
    } catch ( DatabaseQueryException ) {
      queryResult.reject( DatabaseQueryException );
      throw new Error( `Query connect exception : ${DatabaseQueryException}` );
    }
    return queryResult;
  }

}

module.exports = PostgreSQLConnector;