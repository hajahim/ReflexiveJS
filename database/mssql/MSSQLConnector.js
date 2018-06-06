const MSSQLDriver = require( "mssql" );

let Connection = null;

class MSSQLConnector {

  static getConfiguration() {
    return {
      user: "sa",
      password: "Asdcxz1+",
      server: "localhost",
      database: "RSJDatabase"
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
    debugger;
    let resolve = function() {};
    let reject = function() {};
    let queryResult = new Promise( resolve, reject );
    try {
      const connection = this.getConnection();
      connection.then( dbInstance => {
        queryResult.resolve( dbInstance.request()
          .query( query )
        )
      });
    } catch ( DatabaseQueryException ) {
      queryResult.reject( DatabaseQueryException );
      throw new Error( `Query connect exception : ${DatabaseQueryException}` );
    }
    return queryResult;
  }

}

module.exports = MSSQLConnector;