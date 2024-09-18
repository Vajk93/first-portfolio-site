"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closest = void 0;
const type_1 = require("../../type/type");
const matches_1 = require("../matches/matches");
/**
 * Starts from the provided element, searches for the first element that matches the selector in ascendants.
 *
 * @param from     - An element to search from.
 * @param selector - A selector.
 *
 * @return The found element if available, or `null`.
 */
function closest(from, selector) {
    if ((0, type_1.isFunction)(from.closest)) {
        return from.closest(selector);
    }
    let elm = from;
    while (elm && elm.nodeType === 1) {
        if ((0, matches_1.matches)(elm, selector)) {
            break;
        }
        elm = elm.parentElement;
    }
    return elm;
}
exports.closest = closest;
