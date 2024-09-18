"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttribute = void 0;
/**
 * Returns the specified attribute value.
 *
 * @param elm  - An element.
 * @param attr - An attribute to get.
 */
function getAttribute(elm, attr) {
    return elm.getAttribute(attr);
}
exports.getAttribute = getAttribute;
