"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const between_1 = require("./between");
describe('between', () => {
    test('can check a number is between 2 numbers inclusively.', () => {
        expect((0, between_1.between)(0, 0, 1)).toBe(true);
        expect((0, between_1.between)(1, 0, 1)).toBe(true);
        expect((0, between_1.between)(1, 2, 3)).toBe(false);
        expect((0, between_1.between)(1, 0, 2)).toBe(true);
        expect((0, between_1.between)(1, 2, 0)).toBe(true);
    });
    test('can check a number is between 2 numbers exclusively.', () => {
        expect((0, between_1.between)(0, 0, 1, true)).toBe(false);
        expect((0, between_1.between)(1, 0, 1, true)).toBe(false);
        expect((0, between_1.between)(1, 2, 3, true)).toBe(false);
        expect((0, between_1.between)(1, 0, 2, true)).toBe(true);
        expect((0, between_1.between)(1, 2, 0, true)).toBe(true);
    });
});
