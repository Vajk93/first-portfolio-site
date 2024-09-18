"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prevent = void 0;
/**
 * Call the `preventDefault()` of the provided event.
 *
 * @param e               - An Event object.
 * @param stopPropagation - Optional. Whether to stop the event propagation or not.
 */
function prevent(e, stopPropagation) {
    e.preventDefault();
    if (stopPropagation) {
        e.stopPropagation();
        e.stopImmediatePropagation();
    }
}
exports.prevent = prevent;
