const ORMObject = require( "../ORMObject" );

class ORMIheritance {}

class ObjectTagger {

  static annotate( decoratorProperty ) {
    function annotateFied( target, key, descriptor ) {
      if( typeof( target.configurationField ) === "undefined" )
        target.configurationField = {};
      target.configurationField[key] = decoratorProperty;
    }
    return annotateFied;
  }

  static Entity( Class ) {
    return (...args) => {
      return new Class(...args);
    };
  }

}

module.exports = ObjectTagger;