"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelToKebab = void 0;
/**
 * Converts the provided string in the camel case to the kebab case.
 *
 * @param string - A string to convert.
 */
function camelToKebab(string) {
    return string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}
exports.camelToKebab = camelToKebab;
