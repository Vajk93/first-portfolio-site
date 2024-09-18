"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../../../test");
describe('Autoplay', () => {
    describe.each([
        ['mouseenter', 'mouseleave'],
        ['focusin', 'focusout'],
    ])('autoToggle', (pauseEvent, resumeEvent) => {
        const interval = 1000;
        const intervalAndBuffer = 1100;
        let splide;
        let Autoplay;
        beforeEach(() => {
            splide = (0, test_1.init)({ autoplay: true, interval });
            Autoplay = splide.Components.Autoplay;
        });
        test(`can pause autoplay when the slider detects ${pauseEvent}.`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(splide.index).toBe(0);
            (0, test_1.fire)(splide.root, pauseEvent);
            expect(Autoplay.isPaused()).toBe(true);
            yield (0, test_1.wait)(intervalAndBuffer);
            expect(splide.index).toBe(0);
            yield (0, test_1.wait)(intervalAndBuffer);
            expect(splide.index).toBe(0);
        }));
        test(`can replay autoplay when the slider detects ${resumeEvent} with resetting the progress.`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(splide.index).toBe(0);
            // Wait for 500ms
            yield (0, test_1.wait)(interval / 2);
            (0, test_1.fire)(splide.root, pauseEvent);
            expect(Autoplay.isPaused()).toBe(true);
            yield (0, test_1.wait)(intervalAndBuffer);
            expect(splide.index).toBe(0);
            (0, test_1.fire)(splide.root, resumeEvent);
            expect(Autoplay.isPaused()).toBe(false);
            // Remaining around 500ms
            yield (0, test_1.wait)((interval / 2) + 100);
            // Still 0 because the progress has been reset
            expect(splide.index).toBe(0);
            // Wait for rest 500ms
            yield (0, test_1.wait)((interval / 2));
            expect(splide.index).toBe(1);
        }));
        test(`can resume autoplay when the slider detects ${resumeEvent} without resetting the progress.`, () => __awaiter(void 0, void 0, void 0, function* () {
            splide = (0, test_1.init)({ autoplay: true, interval, resetProgress: false });
            Autoplay = splide.Components.Autoplay;
            expect(splide.index).toBe(0);
            // Wait for 500ms
            yield (0, test_1.wait)(interval / 2);
            (0, test_1.fire)(splide.root, pauseEvent);
            expect(Autoplay.isPaused()).toBe(true);
            yield (0, test_1.wait)(intervalAndBuffer);
            expect(splide.index).toBe(0);
            (0, test_1.fire)(splide.root, resumeEvent);
            expect(Autoplay.isPaused()).toBe(false);
            // Remaining around 500ms
            yield (0, test_1.wait)((interval / 2) + 100);
            expect(splide.index).toBe(1);
        }));
    });
    test('should not pause autoplay if the `pauseOnHover` is false.', () => {
        const splide = (0, test_1.init)({ autoplay: true, pauseOnHover: false });
        const { root } = splide;
        const { Autoplay } = splide.Components;
        expect(Autoplay.isPaused()).toBe(false);
        (0, test_1.fire)(root, 'mouseenter');
        expect(Autoplay.isPaused()).toBe(false);
    });
    test('should not pause autoplay if the `pauseOnFocus` is false.', () => {
        const splide = (0, test_1.init)({ autoplay: true, pauseOnFocus: false });
        const { root } = splide;
        const { Autoplay } = splide.Components;
        expect(Autoplay.isPaused()).toBe(false);
        (0, test_1.fire)(root, 'focusin');
        expect(Autoplay.isPaused()).toBe(false);
    });
    test('should not start autoplay on `mouseleave` if the slider has focus.', () => {
        const splide = (0, test_1.init)({ autoplay: true });
        const { root } = splide;
        const { Autoplay } = splide.Components;
        (0, test_1.fire)(root, 'mouseenter');
        (0, test_1.fire)(root, 'focusin');
        expect(Autoplay.isPaused()).toBe(true);
        (0, test_1.fire)(root, 'mouseleave');
        expect(Autoplay.isPaused()).toBe(true);
        (0, test_1.fire)(root, 'focusout');
        expect(Autoplay.isPaused()).toBe(false);
    });
    test('should not start autoplay on `focusout` if the mouse is on the slider.', () => {
        const splide = (0, test_1.init)({ autoplay: true });
        const { root } = splide;
        const { Autoplay } = splide.Components;
        (0, test_1.fire)(root, 'mouseenter');
        (0, test_1.fire)(root, 'focusin');
        expect(Autoplay.isPaused()).toBe(true);
        (0, test_1.fire)(root, 'focusout');
        expect(Autoplay.isPaused()).toBe(true);
        (0, test_1.fire)(root, 'mouseleave');
        expect(Autoplay.isPaused()).toBe(false);
    });
    test('should not start autoplay on `focusout` and `mouseleave` if autoplay is manually paused.', () => {
        const splide = (0, test_1.init)({ autoplay: true });
        const { root } = splide;
        const { Autoplay } = splide.Components;
        // Manually pause autoplay.
        Autoplay.pause();
        expect(Autoplay.isPaused()).toBe(true);
        (0, test_1.fire)(root, 'mouseenter');
        (0, test_1.fire)(root, 'focusin');
        (0, test_1.fire)(root, 'mouseleave');
        (0, test_1.fire)(root, 'focusout');
        // These events should not start autoplay.
        expect(Autoplay.isPaused()).toBe(true);
    });
});
