"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign = void 0;
/**
 * Returns the sign of the provided number.
 *
 * @param x - A number.
 *
 * @return `1` for positive numbers, `-1` for negative numbers, or `0` for `0`.
 */
function sign(x) {
    return +(x > 0) - +(x < 0);
}
exports.sign = sign;
