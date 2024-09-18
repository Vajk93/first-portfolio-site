"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.append = void 0;
const array_1 = require("../../array");
/**
 * Appends children to the parent element.
 *
 * @param parent   - A parent element.
 * @param children - A child or children to append to the parent.
 */
function append(parent, children) {
    (0, array_1.forEach)(children, parent.appendChild.bind(parent));
}
exports.append = append;
