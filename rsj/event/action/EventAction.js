const ORMTranslator = require("../../ORMTranslator");

class EventAction {

  static notifyDatabaseObjectInstanced( objectProperties ) {
    ORMTranslator.suscribeObject( objectProperties );
  }

}

module.exports = EventAction;