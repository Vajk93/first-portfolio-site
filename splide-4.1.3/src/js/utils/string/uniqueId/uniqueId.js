"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueId = void 0;
const pad_1 = require("../pad/pad");
/**
 * Stores unique IDs.
 *
 * @since 3.0.0
 */
const ids = {};
/**
 * Returns a sequential unique ID as "{ prefix }-{ number }".
 *
 * @param prefix - A prefix for the ID.
 */
function uniqueId(prefix) {
    return `${prefix}${(0, pad_1.pad)((ids[prefix] = (ids[prefix] || 0) + 1))}`;
}
exports.uniqueId = uniqueId;
