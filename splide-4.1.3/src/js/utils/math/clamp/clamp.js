"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clamp = void 0;
const math_1 = require("../math/math");
/**
 * Clamps a number.
 *
 * @param number - A subject number to check.
 * @param x      - A min or max number.
 * @param y      - A min or max number.
 *
 * @return A clamped number.
 */
function clamp(number, x, y) {
    const minimum = (0, math_1.min)(x, y);
    const maximum = (0, math_1.max)(x, y);
    return (0, math_1.min)((0, math_1.max)(minimum, number), maximum);
}
exports.clamp = clamp;
