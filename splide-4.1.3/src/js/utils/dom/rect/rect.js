"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rect = void 0;
/**
 * Returns a DOMRect object of the provided element.
 *
 * @param target - An element.
 */
function rect(target) {
    return target.getBoundingClientRect();
}
exports.rect = rect;
