"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toArray = void 0;
const type_1 = require("../../type/type");
/**
 * Push the provided value to an array if the value is not an array.
 *
 * @param value - A value to push.
 *
 * @return An array containing the value, or the value itself if it is already an array.
 */
function toArray(value) {
    return (0, type_1.isArray)(value) ? value : [value];
}
exports.toArray = toArray;
