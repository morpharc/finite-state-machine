class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.states = config.states;
        this.activeState = this.initial = config.initial;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.activeState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(this.states[state]) {
            this.cashState = undefined;
            this.prevActiveState = this.activeState;
            this.activeState = state;
        } else {
            throw new Error();
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        let newActiveState = this.states[this.activeState].transitions[event];
        if(newActiveState){
            this.cashState = undefined;
            this.prevActiveState = this.activeState;
            this.activeState = newActiveState;
        }else{
            throw new Error();
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.activeState = this.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event == undefined){
            return Object.keys(this.states);
        }else{
            let result = [];
           for(let key in this.states){
                let value = this.states[key].transitions[event];
                if(value){
                    result.push(key);
                }
           }
           return result;
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.prevActiveState){
            this.cashState = this.activeState;
            this.activeState = this.prevActiveState;
            this.prevActiveState = undefined;
            return true;
        }
        return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.cashState){
            this.prevActiveState = this.activeState;
            this.activeState = this.cashState;
            this.cashState = undefined;
            return true;
        }
        return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.prevActiveState = undefined;
        this.cashState = undefined;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
