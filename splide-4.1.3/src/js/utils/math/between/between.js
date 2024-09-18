"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.between = void 0;
const math_1 = require("../math/math");
/**
 * Checks if the subject number is between `x` and `y`.
 *
 * @param number    - A subject number to check.
 * @param x         - A min or max number.
 * @param y         - A max or min number.
 * @param exclusive - Optional. Whether to exclude `x` or `y`.
 */
function between(number, x, y, exclusive) {
    const minimum = (0, math_1.min)(x, y);
    const maximum = (0, math_1.max)(x, y);
    return exclusive
        ? minimum < number && number < maximum
        : minimum <= number && number <= maximum;
}
exports.between = between;
