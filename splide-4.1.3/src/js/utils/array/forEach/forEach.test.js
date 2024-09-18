"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forEach_1 = require("./forEach");
describe('forEach', () => {
    test('can iterate over an array.', () => {
        const array = [1, 2, 3];
        const callback = jest.fn();
        (0, forEach_1.forEach)(array, (value, index, current) => {
            expect(value).toBe(array[index]);
            expect(current).toBe(array);
            callback();
        });
        expect(callback).toHaveBeenCalledTimes(array.length);
    });
    test('can push the provided value to a new array and iterate over it.', () => {
        const callback = jest.fn();
        (0, forEach_1.forEach)(1, (value, index, current) => {
            expect(value).toBe(1);
            expect(current).toEqual([1]);
            callback();
        });
        expect(callback).toHaveBeenCalledTimes(1);
    });
});
