"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.before = void 0;
const array_1 = require("../../array");
/**
 * Inserts a node or nodes before the specified reference node.
 *
 * @param nodes - A node or nodes to insert.
 * @param ref   - A reference node.
 */
function before(nodes, ref) {
    (0, array_1.forEach)(nodes, node => {
        const parent = (ref || node).parentNode;
        if (parent) {
            parent.insertBefore(node, ref);
        }
    });
}
exports.before = before;
