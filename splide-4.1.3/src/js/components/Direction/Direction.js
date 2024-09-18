"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Direction = exports.ORIENTATION_MAP = void 0;
const arrows_1 = require("../../constants/arrows");
const directions_1 = require("../../constants/directions");
/**
 * The translation map for directions.
 *
 * @since 3.0.0
 */
exports.ORIENTATION_MAP = {
    width: ['height'],
    left: ['top', 'right'],
    right: ['bottom', 'left'],
    x: ['y'],
    X: ['Y'],
    Y: ['X'],
    ArrowLeft: [arrows_1.ARROW_UP, arrows_1.ARROW_RIGHT],
    ArrowRight: [arrows_1.ARROW_DOWN, arrows_1.ARROW_LEFT],
};
/**
 * The component that absorbs the difference among directions.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Direction component object.
 */
function Direction(Splide, Components, options) {
    /**
     * Resolves the provided property name.
     *
     * @param prop      - A property name to translate.
     * @param axisOnly  - Optional. If `ture`, returns the same property for LTR and RTL.
     * @param direction - Optional. Specify the direction. The default value is the `direction` option.
     */
    function resolve(prop, axisOnly, direction) {
        direction = direction || options.direction;
        const index = direction === directions_1.RTL && !axisOnly ? 1 : direction === directions_1.TTB ? 0 : -1;
        return exports.ORIENTATION_MAP[prop] && exports.ORIENTATION_MAP[prop][index]
            || prop.replace(/width|left|right/i, (match, offset) => {
                const replacement = exports.ORIENTATION_MAP[match.toLowerCase()][index] || match;
                return offset > 0 ? replacement.charAt(0).toUpperCase() + replacement.slice(1) : replacement;
            });
    }
    /**
     * Orients the value towards the current direction.
     *
     * @param value - A value to orient.
     *
     * @return The oriented value.
     */
    function orient(value) {
        return value * (options.direction === directions_1.RTL ? 1 : -1);
    }
    return {
        resolve,
        orient,
    };
}
exports.Direction = Direction;
