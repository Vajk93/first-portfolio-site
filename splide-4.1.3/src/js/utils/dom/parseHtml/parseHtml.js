"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseHtml = void 0;
const child_1 = require("../child/child");
/**
 * Parses the provided HTML string and returns the first element.
 *
 * @param html - An HTML string to parse.
 *
 * @return An Element on success, or otherwise `undefined`.
 */
function parseHtml(html) {
    return (0, child_1.child)(new DOMParser().parseFromString(html, 'text/html').body);
}
exports.parseHtml = parseHtml;
