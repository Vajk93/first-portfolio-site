"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../../../test");
describe('Controller#toIndex()', () => {
    test('can convert the page index to the slide index.', () => {
        const splide = (0, test_1.init)({ perPage: 3 });
        const { toIndex } = splide.Components.Controller;
        expect(toIndex(0)).toBe(0);
        expect(toIndex(1)).toBe(3);
        expect(toIndex(2)).toBe(6);
    });
    test('can convert the page index with respecting the end index.', () => {
        const splide = (0, test_1.init)({ perPage: 3 }, { length: 4 });
        const { toIndex } = splide.Components.Controller;
        expect(toIndex(0)).toBe(0);
        expect(toIndex(1)).toBe(1);
    });
});
