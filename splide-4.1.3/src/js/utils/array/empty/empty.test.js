"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const empty_1 = require("./empty");
describe('empty', () => {
    test('can empty an array.', () => {
        const array = [1, 2, 3];
        (0, empty_1.empty)(array);
        expect(array[0]).toBeUndefined();
        expect(array.length).toBe(0);
    });
});
