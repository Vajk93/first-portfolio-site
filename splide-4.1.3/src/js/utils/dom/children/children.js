"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.children = void 0;
const arrayLike_1 = require("../../arrayLike");
const matches_1 = require("../matches/matches");
/**
 * Finds children that has the specified tag or class name.
 *
 * @param parent   - A parent element.
 * @param selector - Optional. A selector to filter children.
 *
 * @return An array with filtered children.
 */
function children(parent, selector) {
    const children = parent ? (0, arrayLike_1.slice)(parent.children) : [];
    return selector ? children.filter(child => (0, matches_1.matches)(child, selector)) : children;
}
exports.children = children;
