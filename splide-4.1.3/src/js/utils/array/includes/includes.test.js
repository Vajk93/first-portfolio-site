"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const includes_1 = require("./includes");
describe('includes', () => {
    const array = [1, 2, 3];
    test('can check if the array includes a certain value or not.', () => {
        expect((0, includes_1.includes)(array, 1)).toBe(true);
        expect((0, includes_1.includes)(array, 2)).toBe(true);
        expect((0, includes_1.includes)(array, 3)).toBe(true);
        expect((0, includes_1.includes)(array, 5)).toBe(false);
        expect((0, includes_1.includes)(array, 'a')).toBe(false);
        expect((0, includes_1.includes)(array, true)).toBe(false);
    });
});
