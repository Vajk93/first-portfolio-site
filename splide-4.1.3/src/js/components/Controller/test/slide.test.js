"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../../../test");
describe('Controller#go()', () => {
    test('can move the slider to the next and previous slide.', () => {
        const splide = (0, test_1.init)({ speed: 0 });
        splide.go('>');
        expect(splide.index).toBe(1);
        splide.go('>');
        expect(splide.index).toBe(2);
        splide.go('>');
        expect(splide.index).toBe(3);
        splide.go('<');
        expect(splide.index).toBe(2);
        splide.go('<');
        expect(splide.index).toBe(1);
        splide.go('<');
        expect(splide.index).toBe(0);
    });
    test('can move the slider to the next and previous page.', () => {
        const splide = (0, test_1.init)({ perPage: 2, speed: 0 });
        splide.go('>');
        expect(splide.index).toBe(2);
        splide.go('>');
        expect(splide.index).toBe(4);
        splide.go('>');
        expect(splide.index).toBe(6);
        splide.go('<');
        expect(splide.index).toBe(4);
        splide.go('<');
        expect(splide.index).toBe(2);
        splide.go('<');
        expect(splide.index).toBe(0);
    });
    test('should not move the slider if there is no slide before/after the current location.', () => {
        const splide = (0, test_1.init)({ speed: 0 }, { length: 2 });
        splide.go('<');
        splide.go('<');
        expect(splide.index).toBe(0);
        splide.go('>');
        splide.go('>');
        expect(splide.index).toBe(1);
        splide.go('>');
        splide.go('>');
        expect(splide.index).toBe(1);
    });
    test('should not move the slider if it reaches the end index.', () => {
        // The end index is 1
        const splide = (0, test_1.init)({ perPage: 3 }, { length: 4 });
        expect(splide.index).toBe(0);
        splide.go('>');
        expect(splide.index).toBe(1);
        splide.go('>');
        expect(splide.index).toBe(1);
    });
    test('can increase the slide index by + or decrease it by -.', () => {
        const splide = (0, test_1.init)({ speed: 0 });
        splide.go('+');
        expect(splide.index).toBe(1);
        splide.go('+2');
        expect(splide.index).toBe(3);
        splide.go('+3');
        expect(splide.index).toBe(6);
        splide.go('-');
        expect(splide.index).toBe(5);
        splide.go('-2');
        expect(splide.index).toBe(3);
        splide.go('-3');
        expect(splide.index).toBe(0);
        splide.go('-');
        expect(splide.index).toBe(0);
    });
    test('can move the slider to the specified index.', () => {
        const splide = (0, test_1.init)({ speed: 0 });
        splide.go(2);
        expect(splide.index).toBe(2);
        splide.go(4);
        expect(splide.index).toBe(4);
        splide.go(100);
        expect(splide.index).toBe(splide.length - 1);
        splide.go(-100);
        expect(splide.index).toBe(0);
    });
});
