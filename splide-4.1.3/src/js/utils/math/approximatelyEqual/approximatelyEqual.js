"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approximatelyEqual = void 0;
const math_1 = require("../math/math");
/**
 * Checks if the provided 2 numbers are approximately equal or not.
 *
 * @param x       - A number.
 * @param y       - Another number to compare.
 * @param epsilon - An accuracy that defines the approximation.
 *
 * @return `true` if 2 numbers are considered to be equal, or otherwise `false`.
 */
function approximatelyEqual(x, y, epsilon) {
    return (0, math_1.abs)(x - y) < epsilon;
}
exports.approximatelyEqual = approximatelyEqual;
