"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const directions_1 = require("../../../constants/directions");
const test_1 = require("../../../test");
describe('Direction', () => {
    const splide = (0, test_1.init)();
    const { options } = splide;
    const { resolve, orient } = splide.Components.Direction;
    test('can provide property names for LTR.', () => {
        options.direction = directions_1.LTR;
        expect(resolve('marginRight')).toBe('marginRight');
        expect(resolve('width')).toBe('width');
        expect(resolve('paddingLeft')).toBe('paddingLeft');
    });
    test('can provide property names for TTB.', () => {
        options.direction = directions_1.TTB;
        expect(resolve('marginRight')).toBe('marginBottom');
        expect(resolve('width')).toBe('height');
        expect(resolve('paddingLeft')).toBe('paddingTop');
    });
    test('can provide property names for RTL.', () => {
        options.direction = directions_1.RTL;
        expect(resolve('marginRight')).toBe('marginLeft');
        expect(resolve('width')).toBe('width');
        expect(resolve('paddingLeft')).toBe('paddingRight');
    });
    test('can provide same property names for LTR and RTL if the axisOnly is true.', () => {
        options.direction = directions_1.RTL;
        expect(resolve('marginRight', true)).toBe('marginRight');
        expect(resolve('paddingLeft', true)).toBe('paddingLeft');
    });
    test('can orient the provided value towards the current direction.', () => {
        options.direction = directions_1.LTR;
        expect(orient(1)).toBe(-1);
        options.direction = directions_1.TTB;
        expect(orient(1)).toBe(-1);
        options.direction = directions_1.RTL;
        expect(orient(1)).toBe(1);
    });
});
