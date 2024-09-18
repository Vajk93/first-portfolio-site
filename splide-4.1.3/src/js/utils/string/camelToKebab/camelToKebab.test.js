"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const camelToKebab_1 = require("./camelToKebab");
describe('camelToKebab', () => {
    test('can convert a string in the camel case to the kebab case.', () => {
        expect((0, camelToKebab_1.camelToKebab)('maxWidth')).toBe('max-width');
        expect((0, camelToKebab_1.camelToKebab)('borderLeftWidth')).toBe('border-left-width');
        expect((0, camelToKebab_1.camelToKebab)('listStyleType')).toBe('list-style-type');
        expect((0, camelToKebab_1.camelToKebab)('ButtonElement')).toBe('button-element');
    });
    test('should do nothing if the string is already described in the kebab case.', () => {
        expect((0, camelToKebab_1.camelToKebab)('max-width')).toBe('max-width');
        expect((0, camelToKebab_1.camelToKebab)('border-left-width')).toBe('border-left-width');
    });
});
