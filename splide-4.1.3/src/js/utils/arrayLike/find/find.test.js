"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const find_1 = require("./find");
describe('find', () => {
    test('can find a value in an array-like object that satisfies the predicate function.', () => {
        const arrayLike = { length: 3, 0: '1', 1: '2', 2: '3' };
        expect((0, find_1.find)(arrayLike, value => value === '2')).toBe('2');
        expect((0, find_1.find)(arrayLike, (value, index) => index > 1)).toBe('3');
    });
    test('can find a value in an array that satisfies the predicate function.', () => {
        const array = [1, 2, 3];
        expect((0, find_1.find)(array, value => value === 2)).toBe(2);
        expect((0, find_1.find)(array, (value, index) => index > 1)).toBe(3);
    });
});
