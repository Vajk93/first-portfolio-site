"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../../../test");
const defaults_1 = require("../../../constants/defaults");
describe('Splide', () => {
    test('can merge options to defaults.', () => {
        const splide = (0, test_1.init)({ width: 200, height: 200 });
        const { options } = splide;
        expect(options.width).toBe(200);
        expect(options.height).toBe(200);
        expect(options.type).toBe(defaults_1.DEFAULTS.type);
        expect(options.speed).toBe(defaults_1.DEFAULTS.speed);
    });
    test('can merge options provided by the data attribute.', () => {
        const data = { width: 100, height: 100, type: 'loop', waitForTransition: false };
        const splide = (0, test_1.init)({ width: 200, height: 200 }, { json: JSON.stringify(data) });
        const { options } = splide;
        expect(options.width).toBe(100);
        expect(options.height).toBe(100);
        expect(options.type).toBe('loop');
        expect(options.waitForTransition).toBe(false);
    });
});
