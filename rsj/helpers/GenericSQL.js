class GenericSQL {

  constructor( driverName ) {
    this.knexInstance = require('knex')({
      client: driverName
    });
  }

  createTableQuery( tableName, properties ) {
    const queryCreate = this.knexInstance.schema.withSchema('public').createTable( tableName, function (table) {
      Object.keys( properties ).map( propertyName => {
        const propertyValues = properties[propertyName];
        const isPrimary = typeof( propertyValues.isPrimaryKey ) !== "undefined" && propertyValues.isPrimaryKey;
        if( isPrimary )
          table.increments( `${propertyName}` );
        else if( propertyValues.type === "VARCHAR" )
          table.string( `${propertyName}` );
        else
          table.integer( `${propertyName}` );
      });
    });
    return queryCreate.toString();
  }

  insertDataQuery( tableName, values, idName ) {
    return this.knexInstance( tableName ).returning( idName ).insert( values ).toString();
  }

  selectByParameter( tableName, whereClause ) {
    return this.knexInstance( tableName ).select( '*' ).where( whereClause ).toString();
  }

  deleteQuery( tableName, whereClause ) {
    return this.knexInstance( tableName ).where( whereClause ).del().toString();
  }

  updateQuery( tableName, properties, whereClause ) {
    return this.knexInstance( tableName ).where( whereClause ).update( properties );
  }

}

module.exports = GenericSQL;