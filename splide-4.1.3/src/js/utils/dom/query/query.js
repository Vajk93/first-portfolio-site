"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
/**
 * Returns an element that matches the provided selector.
 *
 * @param parent   - A parent element to start searching from.
 * @param selector - A selector to query.
 *
 * @return A found element or `null`.
 */
function query(parent, selector) {
    return parent && parent.querySelector(selector);
}
exports.query = query;
