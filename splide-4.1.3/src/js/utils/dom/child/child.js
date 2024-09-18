"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.child = void 0;
const children_1 = require("../children/children");
/**
 * Returns a child element that matches the specified tag or class name.
 *
 * @param parent   - A parent element.
 * @param selector - A selector to filter children.
 *
 * @return A matched child element if available, or otherwise `undefined`.
 */
function child(parent, selector) {
    return selector ? (0, children_1.children)(parent, selector)[0] : parent.firstElementChild;
}
exports.child = child;
