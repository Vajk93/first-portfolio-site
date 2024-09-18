"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAttribute = void 0;
const array_1 = require("../../array");
const object_1 = require("../../object");
const type_1 = require("../../type/type");
const removeAttribute_1 = require("../removeAttribute/removeAttribute");
/**
 * Sets attribute/attributes to the element or elements.
 * If the value is `null` or an empty string, the attribute will be removed.
 *
 * @param elms  - An element or an array with elements.
 * @param attrs - An attribute name of an object with pairs of a name and a value.
 * @param value - A value to set.
 */
function setAttribute(elms, attrs, value) {
    if ((0, type_1.isObject)(attrs)) {
        (0, object_1.forOwn)(attrs, (value, name) => {
            setAttribute(elms, name, value);
        });
    }
    else {
        (0, array_1.forEach)(elms, elm => {
            (0, type_1.isNull)(value) || value === '' ? (0, removeAttribute_1.removeAttribute)(elm, attrs) : elm.setAttribute(attrs, String(value));
        });
    }
}
exports.setAttribute = setAttribute;
