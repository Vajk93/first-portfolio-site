"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryAll = void 0;
const arrayLike_1 = require("../../arrayLike");
/**
 * Returns elements that match the provided selector.
 *
 * @param parent   - A parent element to start searching from.
 * @param selector - A selector to query.
 *
 * @return An array with matched elements.
 */
function queryAll(parent, selector) {
    return selector ? (0, arrayLike_1.slice)(parent.querySelectorAll(selector)) : [];
}
exports.queryAll = queryAll;
