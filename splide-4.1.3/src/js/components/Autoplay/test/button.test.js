"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../../constants/classes");
const test_1 = require("../../../test");
describe('Autoplay toggle button.', () => {
    test('should be active if `autoplay` option is `true`.', () => {
        const splide = (0, test_1.init)({ autoplay: true }, { autoplay: true });
        const { toggle } = splide.Components.Elements;
        expect(toggle.classList.contains(classes_1.CLASS_ACTIVE)).toBe(true);
    });
    test('should be inactive if `autoplay` option is `false`.', () => {
        const splide = (0, test_1.init)({ autoplay: 'pause' }, { autoplay: true });
        const { toggle } = splide.Components.Elements;
        expect(toggle.classList.contains(classes_1.CLASS_ACTIVE)).toBe(false);
    });
    test('can start/pause autoplay and update the button status.', () => {
        const splide = (0, test_1.init)({ autoplay: true }, { autoplay: true });
        const { Autoplay } = splide.Components;
        const { toggle } = splide.Components.Elements;
        expect(Autoplay.isPaused()).toBe(false);
        (0, test_1.fire)(toggle, 'click');
        expect(Autoplay.isPaused()).toBe(true);
        expect(toggle.classList.contains(classes_1.CLASS_ACTIVE)).toBe(false);
        (0, test_1.fire)(toggle, 'click');
        expect(Autoplay.isPaused()).toBe(false);
        expect(toggle.classList.contains(classes_1.CLASS_ACTIVE)).toBe(true);
        (0, test_1.fire)(toggle, 'click');
        expect(Autoplay.isPaused()).toBe(true);
        expect(toggle.classList.contains(classes_1.CLASS_ACTIVE)).toBe(false);
    });
    test('should not be inactive("Play" button) when the autoplay is just paused.', () => {
        const splide = (0, test_1.init)({ autoplay: true }, { autoplay: true });
        const { Autoplay } = splide.Components;
        const { toggle } = splide.Components.Elements;
        expect(Autoplay.isPaused()).toBe(false);
        (0, test_1.fire)(splide.Components.Elements.root, 'focusin');
        expect(Autoplay.isPaused()).toBe(true); // Paused but not stopped
        expect(toggle.classList.contains(classes_1.CLASS_ACTIVE)).toBe(true);
        // Clicks the "pause" button, which stops the autoplay
        (0, test_1.fire)(toggle, 'click');
        expect(Autoplay.isPaused()).toBe(true);
        expect(toggle.classList.contains(classes_1.CLASS_ACTIVE)).toBe(false);
        // Resumes autoplay but it still stops
        (0, test_1.fire)(splide.Components.Elements.root, 'focusout');
        expect(Autoplay.isPaused()).toBe(true);
        expect(toggle.classList.contains(classes_1.CLASS_ACTIVE)).toBe(false);
    });
});
