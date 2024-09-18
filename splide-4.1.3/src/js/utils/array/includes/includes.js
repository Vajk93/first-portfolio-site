"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.includes = void 0;
/**
 * Checks if the array includes the value or not.
 * `Array#includes` is not supported by IE.
 *
 * @param array - An array.
 * @param value - A value to search for.
 *
 * @return `true` if the array includes the value, or otherwise `false`.
 */
function includes(array, value) {
    return array.indexOf(value) > -1;
}
exports.includes = includes;
