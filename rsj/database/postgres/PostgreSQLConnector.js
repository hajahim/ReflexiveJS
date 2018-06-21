const { Client } = require('pg');

let Connection = null;

class PostgreSQLConnector {

  constructor( configuration ) {
    this.configuration = configuration || this.getDefaultConfiguration();
  }

  getDefaultConfiguration() {
    return {
      user: "sa",
      password: "Asdcxz1+",
      host: "localhost",
      port: "5432",
      database: "RSJDatabase"
    }
  }

  getConnection() {
    try {
      if( Connection === null ) {
        Connection = new Client( this.configuration );
        Connection.connect();
      }
    } catch ( ConnectionDatabaseException ) {
      throw new Error( `Database connect exception : ${ConnectionDatabaseException}` );
    }
    return Connection;
  }

  queryDatabase( query ) {
    let queryResult = null;
    try {
      const connection = this.getConnection();
      queryResult = new Promise( ( resolve, reject ) => {
        connection.query( query , ( error, responseQuery ) => {
          resolve( responseQuery.rows );
        });
      }).catch( ( error ) => {
        throw new Error("Can't connect to DB : " + error) 
      });
    } catch ( DatabaseQueryException ) {
      queryResult.reject( DatabaseQueryException );
      throw new Error( `Query connect exception : ${DatabaseQueryException}` );
    }
    return queryResult;
  }

}

module.exports = PostgreSQLConnector;