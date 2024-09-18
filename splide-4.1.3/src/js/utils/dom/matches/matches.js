"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matches = void 0;
const type_1 = require("../../type/type");
/**
 * Checks if the element can be selected by the provided selector or not.
 *
 * @param elm      - An element to check.
 * @param selector - A selector to test.
 *
 * @return `true` if the selector matches the element, or otherwise `false`.
 */
function matches(elm, selector) {
    return (0, type_1.isHTMLElement)(elm) && (elm['msMatchesSelector'] || elm.matches).call(elm, selector);
}
exports.matches = matches;
