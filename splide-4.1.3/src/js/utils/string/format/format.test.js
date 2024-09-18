"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const format_1 = require("./format");
describe('format', () => {
    test('can replace %s with provided replacements', () => {
        expect((0, format_1.format)('%s results', 10)).toBe('10 results');
        expect((0, format_1.format)('%s/%s', [1, 10])).toBe('1/10');
    });
});
