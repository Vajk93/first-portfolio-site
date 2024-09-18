"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forEach = void 0;
const toArray_1 = require("../toArray/toArray");
/**
 * The extended `Array#forEach` method that accepts a single value as an argument.
 *
 * @param values   - A value or values to iterate over.
 * @param iteratee - An iteratee function.
 */
function forEach(values, iteratee) {
    (0, toArray_1.toArray)(values).forEach(iteratee);
}
exports.forEach = forEach;
