class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      if(!config) {
        throw new Exception("config isn\'t passed");
      }
      this.config = config;
      this.currentState = config.initial;
      this.prev = null;
      this.next = null;
    }
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }
    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if(!this.config.states[state]){
        throw new Exception("state isn\'t exist");
      } else {
      var buf = this.currentState;
      this.currentState = state;
      this.prev = buf;
      }
    }
    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      if(!this.config.states[this.currentState].transitions[event]) {
        throw new Exception("event in current state isn\'t exist");
      } else {
        this.prev = this.currentState;
        this.currentState = this.config.states[this.currentState].transitions[event];
      }
    }
    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currentState = this.config.initial;
    }
    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      var states = [];
      if(!event){
        var i=0;
        for(var key in this.config.states) {
          states[i] = key;
          i++;
        }
      } else {
          var i=0;
          for(var key in this.config.states) {
            if(this.config.states[key].transitions.hasOwnProperty(event)) {
              states[i] = key;
              i++;
            }
          }
      }
      return states;
    }
    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if(this.prev != null) {
        this.next = this.currentState;
        this.currentState = this.prev;
        this.prev = null;
        return true;
      } else {
          return false;
        }
    }
    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if (this.next != null) {
        this.prev = this.currentState;
        this.currentState = this.next;
        this.next = null;
        return true;
      } else {
          return false;
        }
    }
    /**
     * Clears transition history
     */
    clearHistory() {
      this.next = null;
      this.prev = null;
    }
}
module.exports = FSM;
/** @Created by Uladzimir Halushka **/
