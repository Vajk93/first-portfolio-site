"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasClass = void 0;
/**
 * Checks if the element contains the specified class or not.
 *
 * @param elm       - An element to check.
 * @param className - A class name that may be contained by the element.
 *
 * @return `true` if the element contains the class, or otherwise `false`.
 */
function hasClass(elm, className) {
    return elm && elm.classList.contains(className);
}
exports.hasClass = hasClass;
