"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const states_1 = require("../../../constants/states");
const test_1 = require("../../../test");
describe('Media', () => {
    beforeAll(() => {
        window.matchMedia = () => ({
            matches: true,
            media: '',
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        });
    });
    test('can merge options when a breakpoint matches the media query.', () => {
        const splide = (0, test_1.init)({ perPage: 2, breakpoints: { 640: { perPage: 4 } } });
        expect(splide.options.perPage).toBe(4);
    });
    test('can destroy Splide.', () => {
        const splide = (0, test_1.init)({ breakpoints: { 640: { destroy: true } } });
        expect(splide.state.is(states_1.DESTROYED)).toBe(true);
    });
    test('can merge options for prefers-reduced-motion:reduce.', () => {
        const splide = (0, test_1.init)();
        expect(splide.options.speed).toBe(0);
        expect(splide.options.rewindSpeed).toBe(0);
        expect(splide.options.autoplay).toBe('pause');
    });
    test('can enable or disable `reducedMotion` option by `reduce()`.', () => {
        const splide = (0, test_1.init)({ speed: 1000, rewindSpeed: 2000, autoplay: true });
        const { reduce } = splide.Components.Media;
        expect(splide.options.speed).toBe(0);
        expect(splide.options.rewindSpeed).toBe(0);
        expect(splide.options.autoplay).toBe('pause');
        reduce(false);
        expect(splide.options.speed).toBe(1000);
        expect(splide.options.rewindSpeed).toBe(2000);
        expect(splide.options.autoplay).toBe(true);
        reduce(true);
        expect(splide.options.speed).toBe(0);
        expect(splide.options.rewindSpeed).toBe(0);
        expect(splide.options.autoplay).toBe('pause');
    });
});
