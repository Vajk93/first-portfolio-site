"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeKey = exports.NORMALIZATION_MAP = void 0;
const arrows_1 = require("../../../constants/arrows");
const type_1 = require("../../type/type");
/**
 * The map to associate a non-standard name to the standard one.
 *
 * @since 4.0.0
 */
exports.NORMALIZATION_MAP = {
    Spacebar: ' ',
    Right: arrows_1.ARROW_RIGHT,
    Left: arrows_1.ARROW_LEFT,
    Up: arrows_1.ARROW_UP,
    Down: arrows_1.ARROW_DOWN,
};
/**
 * Normalizes the key.
 *
 * @param key - A string or a KeyboardEvent object.
 *
 * @return A normalized key.
 */
function normalizeKey(key) {
    key = (0, type_1.isString)(key) ? key : key.key;
    return exports.NORMALIZATION_MAP[key] || key;
}
exports.normalizeKey = normalizeKey;
