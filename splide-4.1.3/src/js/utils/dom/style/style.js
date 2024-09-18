"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.style = void 0;
const type_1 = require("../../type/type");
/**
 * Applies inline styles to the provided element by an object literal.
 *
 * @param elm   - An element to apply styles to.
 * @param prop  - An object literal with styles or a property name.
 * @param value - A value to set.
 */
function style(elm, prop, value) {
    if ((0, type_1.isUndefined)(value)) {
        return getComputedStyle(elm)[prop];
    }
    if (!(0, type_1.isNull)(value)) {
        elm.style[prop] = `${value}`;
    }
}
exports.style = style;
