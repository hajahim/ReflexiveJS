const MSSQLDriver = require( "mssql" );

let Connection = null;

class MSSQLConnector {

  static getConfiguration() {
    return {
      user: "sa",
      password: "Asdcxz1+",
      server: "localhost",
      database: "RSJDatabase",
      options: {
        encrypt: true // Use this if you're on Windows Azure
      }
    }
  }

  static getConnection() {
    try {
      if( Connection === null )
        Connection = MSSQLDriver.connect( this.getConfiguration() );
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
        connection.then( dbInstance => {
          dbInstance.request().query( query ).then( responseQuery => {
            resolve( responseQuery.recordset );
            reject( function() {
              throw new Error("Can't connect to DB") 
            })
          });
        })
      });
    } catch ( DatabaseQueryException ) {
      queryResult.reject( DatabaseQueryException );
      throw new Error( `Query connect exception : ${DatabaseQueryException}` );
    }
    return queryResult;
  }

}

module.exports = MSSQLConnector;