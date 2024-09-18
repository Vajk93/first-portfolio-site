"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = void 0;
const array_1 = require("../../array");
/**
 * Formats a string.
 *
 * @param string       - A string to format.
 * @param replacements - A replacement or replacements.
 *
 * @return A formatted string.
 */
function format(string, replacements) {
    (0, array_1.forEach)(replacements, replacement => {
        string = string.replace('%s', `${replacement}`);
    });
    return string;
}
exports.format = format;
