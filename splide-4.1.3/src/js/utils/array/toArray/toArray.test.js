"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toArray_1 = require("./toArray");
describe('toArray', () => {
    test('can push a provided value into an array.', () => {
        expect((0, toArray_1.toArray)(1)).toEqual([1]);
        expect((0, toArray_1.toArray)(true)).toEqual([true]);
        expect((0, toArray_1.toArray)({ a: 1 })).toStrictEqual([{ a: 1 }]);
    });
    test('should return a provided value itself if it is already an array.', () => {
        const array = [1];
        expect((0, toArray_1.toArray)(array)).toBe(array);
    });
});
