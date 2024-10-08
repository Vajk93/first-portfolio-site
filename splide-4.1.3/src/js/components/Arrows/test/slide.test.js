"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../../../constants/events");
const test_1 = require("../../../test");
describe('Arrows', () => {
    const splide = (0, test_1.init)({ arrows: true, speed: 0 });
    const { Arrows } = splide.Components;
    const { next, prev } = Arrows.arrows;
    const { i18n } = splide.options;
    test('can generate arrows.', () => {
        expect(prev instanceof HTMLButtonElement).toBe(true);
        expect(next instanceof HTMLButtonElement).toBe(true);
    });
    test('can navigate the slider.', () => {
        (0, test_1.fire)(next, 'click');
        expect(splide.index).toBe(1);
        (0, test_1.fire)(next, 'click');
        expect(splide.index).toBe(2);
        (0, test_1.fire)(prev, 'click');
        expect(splide.index).toBe(1);
        (0, test_1.fire)(prev, 'click');
        expect(splide.index).toBe(0);
    });
    test('can disable arrows if there is no slide to go to.', () => {
        expect(prev.disabled).toBe(true);
        expect(next.disabled).toBe(false);
        // Go to the last slide.
        splide.go(splide.length - 1);
        expect(prev.disabled).toBe(false);
        expect(next.disabled).toBe(true);
    });
    test('should not disable arrows if the slider position is not approximately same with each limit.', () => {
        splide.go(0);
        expect(prev.disabled).toBe(true);
        expect(next.disabled).toBe(false);
        splide.Components.Move.translate(-10);
        splide.emit(events_1.EVENT_MOVED);
        // Index should be still 0
        expect(splide.index).toBe(0);
        expect(prev.disabled).toBe(false);
        expect(next.disabled).toBe(false);
    });
    test('can update aria attributes.', () => {
        expect(prev.getAttribute('aria-label')).toBe(i18n.prev);
        expect(next.getAttribute('aria-label')).toBe(i18n.next);
    });
});
