"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assign = void 0;
const arrayLike_1 = require("../../arrayLike");
const forOwn_1 = require("../forOwn/forOwn");
/**
 * Assigns all own enumerable properties of all source objects to the provided object.
 *
 * @param object - An object to assign properties to.
 *
 * @return An object assigned properties of the sources to.
 */
function assign(object) {
    // eslint-disable-next-line prefer-rest-params, prefer-spread
    (0, arrayLike_1.slice)(arguments, 1).forEach(source => {
        (0, forOwn_1.forOwn)(source, (value, key) => {
            object[key] = source[key];
        });
    });
    return object;
}
exports.assign = assign;
