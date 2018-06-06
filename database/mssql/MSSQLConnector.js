const sql = require('mssql')
import MSSQLDriver from "mssql";

let Connection = null;

class MSSQLConnector {

  static getConfiguration() {
    return {
      user: "",
      password: "",
      server: "",
      database: ""
    }
  }

  static getConnection() {
    try {
      if( Connection === null )
        pool = MSSQLDriver.connect( this.getConfiguration() );
    } catch ( ConnectionDatabaseException ) {
      throw new Error( `Database connect exception : ${ConnectionDatabaseException}` );
    }
    return pool;
  }

  static queryDatabase( query ) {
    const [resolve, reject] = {};
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

export default MSSQLConnector;