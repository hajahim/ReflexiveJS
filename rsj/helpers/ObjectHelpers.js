class ObjectHelpers {

  /**
   * @function generateWhereClause
   * @param {Object} objectToMap - object to be mapped into attribute array value
   * @description convert object to attribute/value result
   * @return {Array} example [ "parameter1=value1", "parameter2=value2" ]
   */
  static generateWhereClause( objectToMap ) {
    const objectAttributes = Object.keys( objectToMap );
    let attributeAggregator = [];
    objectAttributes.map( function( currentAttribute, index ) {
      const objectValue = objectToMap[ currentAttribute.slice( 1, currentAttribute.length ) ];
      const haveNotValue = typeof( objectValue ) === "undefined" || !objectValue;
      if( haveNotValue )
        return;
      attributeAggregator.push( currentAttribute.slice( 1, currentAttribute.length ) + " = " + "'" + objectValue + "'" );
    });
    return attributeAggregator;
  }

  static generateInsertPlaceholder( objectToMap ) {
    let lengthAttributeFilled = this.generateWhereClause( objectToMap ).length;
    let query = [];
    if( lengthAttributeFilled === 0 )
      throw new Error( "Please fill field" );
    for( let increment = 0 ; increment < lengthAttributeFilled ; increment++ ) {
      query.push( "{" + increment + "}" );
    }
    return query.join(",");
  }

  static convertQueryResultToObject( queryResult, objectType ) {
    const newObject = new objectType.constructor();
    const objectAttributes = Object.keys( newObject );
    objectAttributes.map( attribute => {
      newObject[ attribute.slice( 1, attribute.length ) ] = queryResult[ attribute.slice( 1, attribute.length ) ];
    });
    return newObject;
  }

  static getterNameProperty( attributeName ) {
    return "get" + attributeName.charAt(0).toUpperCase() + attributeName.slice(1);
  }

  static setterNameProperty( attributeName ) {
    return "set" + attributeName.charAt(0).toUpperCase() + attributeName.slice(1);
  }

  static findProperty( objectToMap, propertyName ) {
    let method = null;
    try {
      method = objectToMap[ propertyName ];
    } catch( methodNotFoundException ) {
      throw new Error( "Method not found exception : " + methodNotFoundException );
    }
    return method;
  }

}

module.exports = ObjectHelpers;