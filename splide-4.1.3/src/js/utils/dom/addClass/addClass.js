"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addClass = void 0;
const type_1 = require("../../type/type");
const toggleClass_1 = require("../toggleClass/toggleClass");
/**
 * Adds classes to the element.
 *
 * @param elm     - An element to add classes to.
 * @param classes - Classes to add.
 */
function addClass(elm, classes) {
    (0, toggleClass_1.toggleClass)(elm, (0, type_1.isString)(classes) ? classes.split(' ') : classes, true);
}
exports.addClass = addClass;
