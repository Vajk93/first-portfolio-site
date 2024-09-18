"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAttribute = void 0;
const array_1 = require("../../array");
/**
 * Removes attributes from the element.
 *
 * @param elms  - An element or elements.
 * @param attrs - An attribute or attributes to remove.
 */
function removeAttribute(elms, attrs) {
    (0, array_1.forEach)(elms, elm => {
        (0, array_1.forEach)(attrs, attr => {
            elm && elm.removeAttribute(attr);
        });
    });
}
exports.removeAttribute = removeAttribute;
