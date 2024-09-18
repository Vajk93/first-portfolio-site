"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.push = void 0;
const toArray_1 = require("../toArray/toArray");
/**
 * Extended `Array#push()` that accepts an item or an array with items.
 *
 * @param array - An array to push items.
 * @param items - An item or items to push.
 *
 * @return A provided array itself.
 */
function push(array, items) {
    array.push(...(0, toArray_1.toArray)(items));
    return array;
}
exports.push = push;
