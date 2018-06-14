class ObjectTagger {

  static annotate( decoratorProperty ) {
    function annotateFied( target, key, descriptor ) {
      if( typeof( target.configurationField ) === "undefined" )
        target.configurationField = {};
      target.configurationField[key] = decoratorProperty;
    }
    return annotateFied;
  }

}

module.exports = ObjectTagger;