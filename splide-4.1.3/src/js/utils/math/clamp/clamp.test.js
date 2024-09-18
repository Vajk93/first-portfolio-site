"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clamp_1 = require("./clamp");
describe('clamp', () => {
    test('can clamp a number', () => {
        expect((0, clamp_1.clamp)(0, 0, 1)).toBe(0);
        expect((0, clamp_1.clamp)(1, 0, 1)).toBe(1);
        expect((0, clamp_1.clamp)(1, 2, 3)).toBe(2);
        expect((0, clamp_1.clamp)(1, 0, 0)).toBe(0);
        expect((0, clamp_1.clamp)(3, 0, 1)).toBe(1);
        expect((0, clamp_1.clamp)(3, 4, 5)).toBe(4);
    });
});
