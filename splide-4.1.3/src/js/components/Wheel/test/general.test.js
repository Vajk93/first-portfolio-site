"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fireCancelable = void 0;
const test_1 = require("../../../test");
describe('Wheel', () => {
    test('can navigate the slider by the mouse wheel.', () => {
        const splide = (0, test_1.init)({ speed: 0, wheel: true });
        const { track } = splide.Components.Elements;
        fireCancelable(track, 'wheel', { deltaY: 100 });
        expect(splide.index).toBe(1);
        fireCancelable(track, 'wheel', { deltaY: 100 });
        expect(splide.index).toBe(2);
        fireCancelable(track, 'wheel', { deltaY: 100 });
        expect(splide.index).toBe(3);
        fireCancelable(track, 'wheel', { deltaY: -100 });
        expect(splide.index).toBe(2);
        fireCancelable(track, 'wheel', { deltaY: -100 });
        expect(splide.index).toBe(1);
        fireCancelable(track, 'wheel', { deltaY: -100 });
        expect(splide.index).toBe(0);
    });
    test('should be inactive if the `wheel` option is falsy.', () => {
        const splide = (0, test_1.init)({ speed: 0, wheel: false });
        const { track } = splide.Components.Elements;
        fireCancelable(track, 'wheel', { deltaY: 100 });
        expect(splide.index).toBe(0);
        fireCancelable(track, 'wheel', { deltaY: 100 });
        expect(splide.index).toBe(0);
    });
});
function fireCancelable(elm, event, data = {}) {
    (0, test_1.fire)(elm, event, data, { cancelable: true });
}
exports.fireCancelable = fireCancelable;
