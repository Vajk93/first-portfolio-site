"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forOwn = void 0;
const ownKeys_1 = require("../ownKeys/ownKeys");
/**
 * Iterates over the provided object by own enumerable keys with calling the iteratee function.
 *
 * @param object   - An object to iterate over.
 * @param iteratee - An iteratee function that takes `value` and `key` as arguments.
 * @param right    - If `true`, the method iterates over the object from the end like `forEachRight()`.
 *
 * @return A provided object itself.
 */
function forOwn(object, iteratee, right) {
    if (object) {
        (right ? (0, ownKeys_1.ownKeys)(object).reverse() : (0, ownKeys_1.ownKeys)(object)).forEach(key => {
            key !== '__proto__' && iteratee(object[key], key);
        });
    }
    return object;
}
exports.forOwn = forOwn;
