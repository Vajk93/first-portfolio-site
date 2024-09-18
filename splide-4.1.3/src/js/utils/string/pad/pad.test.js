"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pad_1 = require("./pad");
describe('pad', () => {
    test('can pad a number with 0.', () => {
        expect((0, pad_1.pad)(1)).toBe('01');
        expect((0, pad_1.pad)(5)).toBe('05');
    });
    test('should not pad if the number is greater than 9.', () => {
        expect((0, pad_1.pad)(10)).toBe('10');
        expect((0, pad_1.pad)(11)).toBe('11');
    });
});
