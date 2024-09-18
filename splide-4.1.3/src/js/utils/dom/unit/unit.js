"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unit = void 0;
const type_1 = require("../../type/type");
/**
 * Appends `px` to the provided number.
 * If the value is already string, just returns it.
 *
 * @param value - A value to append `px` to.
 *
 * @return A string with the CSS unit.
 */
function unit(value) {
    return (0, type_1.isString)(value) ? value : value ? `${value}px` : '';
}
exports.unit = unit;
