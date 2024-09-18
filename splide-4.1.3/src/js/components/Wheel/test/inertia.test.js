"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../../../test");
const general_test_1 = require("./general.test");
describe('Wheel', () => {
    test('should move the slider only when the delta is greater than the min threshold.', () => {
        const splide = (0, test_1.init)({ speed: 0, wheel: true, wheelMinThreshold: 50 });
        const { track } = splide.Components.Elements;
        (0, general_test_1.fireCancelable)(track, 'wheel', { deltaY: 49 });
        expect(splide.index).toBe(0);
        (0, general_test_1.fireCancelable)(track, 'wheel', { deltaY: 50 });
        expect(splide.index).toBe(0);
        (0, general_test_1.fireCancelable)(track, 'wheel', { deltaY: 51 });
        expect(splide.index).toBe(1);
        (0, general_test_1.fireCancelable)(track, 'wheel', { deltaY: -49 });
        expect(splide.index).toBe(1);
        (0, general_test_1.fireCancelable)(track, 'wheel', { deltaY: -50 });
        expect(splide.index).toBe(1);
        (0, general_test_1.fireCancelable)(track, 'wheel', { deltaY: -51 });
        expect(splide.index).toBe(0);
    });
    test('should not move the slider while the wheel component is sleeping.', () => {
        const splide = (0, test_1.init)({ speed: 0, wheel: true, wheelSleep: 500 });
        const { track } = splide.Components.Elements;
        (0, general_test_1.fireCancelable)(track, 'wheel', { deltaY: 100, timeStamp: 1000 });
        expect(splide.index).toBe(1);
        (0, general_test_1.fireCancelable)(track, 'wheel', { deltaY: 100, timeStamp: 1100 });
        expect(splide.index).toBe(1);
        (0, general_test_1.fireCancelable)(track, 'wheel', { deltaY: 100, timeStamp: 1500 });
        expect(splide.index).toBe(1);
        (0, general_test_1.fireCancelable)(track, 'wheel', { deltaY: 100, timeStamp: 1501 });
        expect(splide.index).toBe(2);
    });
});
