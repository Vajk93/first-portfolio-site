"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const type_1 = require("../../type/type");
const addClass_1 = require("../addClass/addClass");
const append_1 = require("../append/append");
const setAttribute_1 = require("../setAttribute/setAttribute");
/**
 * Creates a HTML element.
 *
 * @param tag    - A tag name.
 * @param attrs  - Optional. An object with attributes to apply the created element to, or a string with classes.
 * @param parent - Optional. A parent element where the created element is appended.
 */
function create(tag, attrs, parent) {
    const elm = document.createElement(tag);
    if (attrs) {
        (0, type_1.isString)(attrs) ? (0, addClass_1.addClass)(elm, attrs) : (0, setAttribute_1.setAttribute)(elm, attrs);
    }
    parent && (0, append_1.append)(parent, elm);
    return elm;
}
exports.create = create;
