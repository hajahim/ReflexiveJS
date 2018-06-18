const EventEmitter = require('events');
const EventAction = require('./action/EventAction');

class EventManager extends EventEmitter {

  constructor() {
    super();
    this.on( "OBJECT:TYPE:CREATE", EventAction.notifyDatabaseObjectInstanced );
  }

  trigger( eventName, eventArgs ) {
    this.emit( eventName, eventArgs );
  }

}

const eventManager = new EventManager();

module.exports = eventManager;