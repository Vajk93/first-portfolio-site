"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeClass = void 0;
const toggleClass_1 = require("../toggleClass/toggleClass");
/**
 * Removes classes from the element.
 *
 * @param elm     - An element to remove classes from.
 * @param classes - Classes to remove.
 */
function removeClass(elm, classes) {
    (0, toggleClass_1.toggleClass)(elm, classes, false);
}
exports.removeClass = removeClass;
