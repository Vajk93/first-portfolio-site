"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const approximatelyEqual_1 = require("./approximatelyEqual");
describe('approximatelyEqual', () => {
    test('can tell if 2 numbers are approximately equal or not.', () => {
        expect((0, approximatelyEqual_1.approximatelyEqual)(1, 1, 1)).toBe(true);
        expect((0, approximatelyEqual_1.approximatelyEqual)(1, 0.9, 1)).toBe(true);
        expect((0, approximatelyEqual_1.approximatelyEqual)(1, 1.9, 1)).toBe(true);
        expect((0, approximatelyEqual_1.approximatelyEqual)(1, 2, 1)).toBe(false);
        expect((0, approximatelyEqual_1.approximatelyEqual)(1, 0, 1)).toBe(false);
        expect((0, approximatelyEqual_1.approximatelyEqual)(1, 2, 2)).toBe(true);
        expect((0, approximatelyEqual_1.approximatelyEqual)(1, 0, 2)).toBe(true);
    });
});
