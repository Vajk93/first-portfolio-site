"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slice = void 0;
/**
 * The slice method for an array-like object.
 *
 * @param arrayLike - An array-like object.
 * @param start     - Optional. A start index.
 * @param end       - Optional. A end index.
 *
 * @return An array with sliced elements.
 */
function slice(arrayLike, start, end) {
    return Array.prototype.slice.call(arrayLike, start, end);
}
exports.slice = slice;
