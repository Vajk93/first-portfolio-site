"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = void 0;
const arrayLike_1 = require("../../arrayLike");
const type_1 = require("../../type/type");
const forOwn_1 = require("../forOwn/forOwn");
/**
 * Recursively merges source properties to the object.
 * Be aware that this method does not merge arrays. They are just duplicated by `slice()`.
 *
 * @param object - An object to merge properties to.
 *
 * @return A new object with merged properties.
 */
function merge(object) {
    // eslint-disable-next-line prefer-rest-params
    (0, arrayLike_1.slice)(arguments, 1).forEach(source => {
        (0, forOwn_1.forOwn)(source, (value, key) => {
            if ((0, type_1.isArray)(value)) {
                object[key] = value.slice();
            }
            else if ((0, type_1.isObject)(value)) {
                object[key] = merge({}, (0, type_1.isObject)(object[key]) ? object[key] : {}, value);
            }
            else {
                object[key] = value;
            }
        });
    });
    return object;
}
exports.merge = merge;
