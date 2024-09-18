"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../../../test");
describe('Controller#isBusy', () => {
    test('can check if the slider is moving or not.', () => {
        const splide = (0, test_1.init)({ width: 200, height: 100, waitForTransition: true });
        const { Controller, Move } = splide.Components;
        expect(Controller.isBusy()).toBe(false);
        Move.move(1, 1, -1);
        expect(Controller.isBusy()).toBe(true);
        (0, test_1.fire)(splide.Components.Elements.list, 'transitionend');
        expect(Controller.isBusy()).toBe(false);
    });
    test('can check if the slider is being scrolled or not.', () => {
        const splide = (0, test_1.init)({ width: 200, height: 100, waitForTransition: true });
        const { Controller, Scroll } = splide.Components;
        expect(Controller.isBusy()).toBe(false);
        Scroll.scroll(10, 10);
        expect(Controller.isBusy()).toBe(true);
        Scroll.cancel();
        expect(Controller.isBusy()).toBe(false);
    });
    test('should always return true if `waitForTransition` is false.', () => {
        const splide = (0, test_1.init)({ width: 200, height: 100, waitForTransition: false });
        const { Controller, Move, Scroll } = splide.Components;
        expect(Controller.isBusy()).toBe(false);
        Move.move(1, 1, -1);
        expect(Controller.isBusy()).toBe(false);
        Move.cancel();
        expect(Controller.isBusy()).toBe(false);
        Scroll.scroll(10, 10);
        expect(Controller.isBusy()).toBe(false);
        Scroll.cancel();
        expect(Controller.isBusy()).toBe(false);
    });
});
