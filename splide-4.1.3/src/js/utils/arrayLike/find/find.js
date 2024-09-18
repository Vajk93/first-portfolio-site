"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.find = void 0;
const slice_1 = require("../slice/slice");
/**
 * The find method for an array or array-like object, works in IE.
 * This method is not performant for a huge array.
 *
 * @param arrayLike - An array-like object.
 * @param predicate - The predicate function to test each element in the object.
 *
 * @return A found value if available, or otherwise `undefined`.
 */
function find(arrayLike, predicate) {
    return (0, slice_1.slice)(arrayLike).filter(predicate)[0];
}
exports.find = find;
