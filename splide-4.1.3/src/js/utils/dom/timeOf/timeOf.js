"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeOf = void 0;
/**
 * Extracts the timestamp from the event object.
 *
 * @param e - An Event object.
 */
function timeOf(e) {
    return e.timeStamp;
}
exports.timeOf = timeOf;
