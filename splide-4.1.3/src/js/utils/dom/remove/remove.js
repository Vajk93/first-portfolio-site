"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = void 0;
const array_1 = require("../../array");
/**
 * Removes the provided node from its parent.
 *
 * @param nodes - A node or nodes to remove.
 */
function remove(nodes) {
    (0, array_1.forEach)(nodes, node => {
        if (node && node.parentNode) {
            node.parentNode.removeChild(node);
        }
    });
}
exports.remove = remove;
