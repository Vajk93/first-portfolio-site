"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../../constants/classes");
const test_1 = require("../../../test");
describe('Focus', () => {
    test('can add the status class to the root when focus comes into it by a key.', () => {
        const splide = (0, test_1.init)({}, { arrows: true });
        (0, test_1.fire)(document, 'keydown');
        (0, test_1.fire)(splide.root, 'focusin');
        expect(splide.root.classList.contains(classes_1.CLASS_FOCUS_IN)).toBe(true);
    });
    test('can remove the status class from the root when detecting pointerdown.', () => {
        const splide = (0, test_1.init)({}, { arrows: true });
        (0, test_1.fire)(document, 'keydown');
        (0, test_1.fire)(splide.root, 'focusin');
        expect(splide.root.classList.contains(classes_1.CLASS_FOCUS_IN)).toBe(true);
        (0, test_1.fire)(splide.root, 'mousedown');
        (0, test_1.fire)(splide.root, 'focusin');
        expect(splide.root.classList.contains(classes_1.CLASS_FOCUS_IN)).toBe(false);
    });
    test('should not add the status class when focus comes into the root by pointing devices.', () => {
        const splide = (0, test_1.init)({}, { arrows: true });
        (0, test_1.fire)(document, 'mousedown');
        (0, test_1.fire)(splide.root, 'focusin');
        expect(splide.root.classList.contains(classes_1.CLASS_FOCUS_IN)).toBe(false);
    });
});
