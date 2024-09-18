"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const push_1 = require("./push");
describe('push', () => {
    test('can push an item to an array.', () => {
        expect((0, push_1.push)([], 1)).toEqual([1]);
        expect((0, push_1.push)([1], 2)).toEqual([1, 2]);
    });
    test('can push items to an array.', () => {
        expect((0, push_1.push)([], [1, 2, 3])).toEqual([1, 2, 3]);
        expect((0, push_1.push)([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
    });
    test('should return the provided array itself.', () => {
        const array = [];
        expect((0, push_1.push)(array, 1)).toBe(array);
    });
});
