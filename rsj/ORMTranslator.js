const MSSQLConnector = require( "../database/mssql/MSSQLConnector" );

const DataBaseConnector = MSSQLConnector;

class ORMTranslator {

  /**
   * @function convertObjectToAttributeArray
   * @param {Object} objectToMap - object to be mapped into attribute array value
   * @description convert object to attribute/value result
   * @return {Array} example [ "parameter1=value1", "parameter2=value2" ]
   */
  static convertObjectToAttributeArray( objectToMap ) {
    const objectAttributes = Object.keys( objectToMap );
    let attributeAggregator = [];
    objectAttributes.map( function( currentAttribute, index ) {
      const objectValue = objectToMap[ currentAttribute ];
      const haveNotValue = typeof( objectValue ) === "undefined" || !objectValue;
      if( haveNotValue )
        return;
      attributeAggregator.push( currentAttribute + " = " + objectValue );
    });
    return attributeAggregator;
  }

  static findAll( objectToMap ) {
    const className = objectToMap.constructor.name;
    const result = DataBaseConnector.queryDatabase( `select * from ${className}` );
    return result;
  }

  static findByParameter( objectToMap ) {
    const tableName = objectToMap.constructor.name;
    let databaseQuery = " SELECT * FROM " + tableName;
    const attributes = this.convertObjectToAttributeArray( objectToMap );
    if( attributes.length > 0 )
      databaseQuery += " WHERE " + attributes.join( " AND " );
    return DataBaseConnector.queryDatabase( databaseQuery );
  }

  static saveObjectToDatabase( currentObject ) {

  }

}

module.exports = ORMTranslator;