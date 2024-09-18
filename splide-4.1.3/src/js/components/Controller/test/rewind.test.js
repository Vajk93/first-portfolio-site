"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../../../test");
describe('Controller#go()', () => {
    test('can rewind the slider.', () => {
        const splide = (0, test_1.init)({ rewind: true, speed: 0 });
        splide.go('<');
        expect(splide.index).toBe(splide.length - 1);
        splide.go('>');
        expect(splide.index).toBe(0);
        splide.go('-');
        expect(splide.index).toBe(splide.length - 1);
        splide.go('+');
        expect(splide.index).toBe(0);
    });
    test('can rewind the slider, using the end index.', () => {
        // The end index is 1.
        const splide = (0, test_1.init)({ rewind: true, perPage: 3, speed: 0 }, { length: 4 });
        splide.go('<');
        expect(splide.index).toBe(1);
        splide.go('>');
        expect(splide.index).toBe(0);
    });
});
