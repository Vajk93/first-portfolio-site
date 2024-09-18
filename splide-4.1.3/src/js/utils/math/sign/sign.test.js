"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sign_1 = require("./sign");
describe('sign', () => {
    test('can return the sign of the number', () => {
        expect((0, sign_1.sign)(0)).toBe(0);
        expect((0, sign_1.sign)(1)).toBe(1);
        expect((0, sign_1.sign)(-1)).toBe(-1);
        expect((0, sign_1.sign)(100)).toBe(1);
        expect((0, sign_1.sign)(-100)).toBe(-1);
        expect((0, sign_1.sign)(0.5)).toBe(1);
        expect((0, sign_1.sign)(-0.5)).toBe(-1);
        expect((0, sign_1.sign)(Infinity)).toBe(1);
        expect((0, sign_1.sign)(-Infinity)).toBe(-1);
    });
});
