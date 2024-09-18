"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.measure = void 0;
const type_1 = require("../../type/type");
const create_1 = require("../create/create");
const rect_1 = require("../rect/rect");
const remove_1 = require("../remove/remove");
/**
 * Attempts to convert the provided value to pixel as the relative value to the parent element.
 *
 * @param parent - A parent element.
 * @param value  - A value to convert.
 *
 * @return A converted value in pixel. Unhandled values will become 0.
 */
function measure(parent, value) {
    if ((0, type_1.isString)(value)) {
        const div = (0, create_1.create)('div', { style: `width: ${value}; position: absolute;` }, parent);
        value = (0, rect_1.rect)(div).width;
        (0, remove_1.remove)(div);
    }
    return value;
}
exports.measure = measure;
