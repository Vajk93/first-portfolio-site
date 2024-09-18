"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omit = void 0;
const array_1 = require("../../array");
const ownKeys_1 = require("../ownKeys/ownKeys");
/**
 * Deletes specified own keys from the object.
 *
 * @param object - An object.
 * @param keys   - A key or keys to delete. If not specified, all own enumerable keys will be deleted.
 */
function omit(object, keys) {
    (0, array_1.forEach)(keys || (0, ownKeys_1.ownKeys)(object), key => {
        delete object[key];
    });
}
exports.omit = omit;
