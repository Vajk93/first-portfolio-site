"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const directions_1 = require("../../../constants/directions");
const test_1 = require("../../../test");
describe('Layout in the RTL mode', () => {
    test('can set margin as a gap.', () => {
        const splide = (0, test_1.init)({ direction: directions_1.RTL, gap: '2rem' });
        expect(splide.Components.Elements.slides[0].style.marginLeft).toBe('2rem');
        expect(splide.Components.Elements.slides[1].style.marginLeft).toBe('2rem');
        splide.destroy();
    });
});
