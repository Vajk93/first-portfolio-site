"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleClass = void 0;
const array_1 = require("../../array");
/**
 * Toggles the provided class or classes by following the `add` boolean.
 *
 * @param elm     - An element whose classes are toggled.
 * @param classes - A class or class names.
 * @param add     - Whether to add or remove a class.
 */
function toggleClass(elm, classes, add) {
    if (elm) {
        (0, array_1.forEach)(classes, name => {
            if (name) {
                elm.classList[add ? 'add' : 'remove'](name);
            }
        });
    }
}
exports.toggleClass = toggleClass;
