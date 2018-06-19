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

}

const configuration = new ConfigurationParser( "/ConnectionString.xml" );

module.exports = configuration;