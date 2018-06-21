const fs = require('fs');
const parser = require('xml2json');

class ConfigurationParser {

  constructor( filePath ) {
    this.connectionConfigurationData = {};
    this.filePath = filePath;
    this.readConfiguration();
  }
  
  readConfiguration() {
    this.connectionConfigurationData = JSON.parse( parser.toJson( fs.readFileSync( __dirname + this.filePath ) ) );
  }

  getConnectionDriver() {
    const connectionString = this.connectionConfigurationData.connectionString;
    return connectionString.database.connectorConfig;
  }

  getConnectionConfiguration() {
    const connectionString = this.connectionConfigurationData.connectionString;
    const connectionName = this.getConnectionDriver();
    const connectionArrayConfig = connectionString.connector;
    for( let i = 0 ; i < connectionArrayConfig.length ; i++ ) {
      let connectionConfig = connectionArrayConfig[i];
      if( connectionConfig.name.toLowerCase() === connectionName.toLowerCase() )
        return connectionConfig;
    };
    return false;
  }

  getCurrentDriver() {
    const connectionString = this.connectionConfigurationData.connectionString;
    return connectionString.database.driver;
  }

  getConnectionStringData() {
    const currentConfiguration = this.getConnectionConfiguration();
    const arrayConfiguration = currentConfiguration.connectionString.split(";");
    return JSON.parse( `{ ${arrayConfiguration.join(",").replace(/'/g, '"')} }` );
  }

  getSpecificity() {
    return JSON.parse( `${this.getConnectionConfiguration().specificity.replace(/'/g, '"')}` );
  }

}

const configuration = new ConfigurationParser( "/ConnectionString.xml" );

module.exports = configuration;