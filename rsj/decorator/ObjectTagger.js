const EventManager = require('../event/EventManager');

class ObjectTagger {

  static annotate( decoratorProperty ) {
    function annotateFied( target, key, descriptor ) {
      if( typeof( target.configurationField ) === "undefined" )
        target.configurationField = {};
      target.configurationField[key] = decoratorProperty;
    }
    return annotateFied;
  }

  static Entity( ojectProperties ) {
    return function decorator( Class ) {
      EventManager.trigger( "OBJECT:TYPE:CREATE", [ Class, ojectProperties ] );
      return (...args) => {
        return new Class(...args);
      };
    }
  }

  static hidden( target, key ) {
    if( typeof( target.hiddenFields ) === "undefined" )
        target.hiddenFields = {};
      target.hiddenFields[key] = "true";
  }

}

module.exports = ObjectTagger;