"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
const utils_1 = require("../../utils");
/**
 * The function providing a super simple state system.
 *
 * @param initialState - Specifies the initial state.
 */
function State(initialState) {
    /**
     * The current state.
     */
    let state = initialState;
    /**
     * Sets a new state.
     *
     * @param value - A new state value.
     */
    function set(value) {
        state = value;
    }
    /**
     * Checks if the current state matches the provided one.
     *
     * @param states - A state to check.
     *
     * @return `true` if the current state is the provided one.
     */
    function is(states) {
        return (0, utils_1.includes)((0, utils_1.toArray)(states), state);
    }
    return { set, is };
}
exports.State = State;
