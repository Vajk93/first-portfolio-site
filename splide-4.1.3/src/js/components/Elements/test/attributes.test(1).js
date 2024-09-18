"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attributes_1 = require("../../../constants/attributes");
const test_1 = require("../../../test");
describe('Elements', () => {
    test('can assign aria attributes.', () => {
        const splide = (0, test_1.init)();
        expect(splide.root.getAttribute('role')).toBe('region');
        expect(splide.root.getAttribute('aria-roledescription')).toBe('carousel');
    });
    test('can set a role.', () => {
        const splide = (0, test_1.init)({ role: 'navigation' });
        expect(splide.root.getAttribute('role')).toBe('navigation');
    });
    test('can set aria-label.', () => {
        const splide = (0, test_1.init)({ label: 'Splide carousel' });
        expect(splide.root.getAttribute('aria-label')).toBe('Splide carousel');
    });
    test('can set aria-labelledby.', () => {
        const splide = (0, test_1.init)({ labelledby: 'heading' });
        expect(splide.root.getAttribute('aria-labelledby')).toBe('heading');
    });
    test('can remove assigned attributes.', () => {
        const splide = (0, test_1.init)({ keyboard: 'focused' });
        const { root, track, list } = splide.Components.Elements;
        splide.destroy();
        const attributes = attributes_1.ALL_ATTRIBUTES.concat('style');
        const callback = jest.fn();
        [root, track, list].forEach(elm => {
            attributes.forEach(attr => {
                expect(elm.getAttribute(attr)).toBeNull();
                callback();
            });
        });
        expect(callback).toHaveBeenCalledTimes(attributes.length * 3);
    });
    test('should not assign the role if the root element is section.', () => {
        const splide = (0, test_1.init)({}, { html: (0, test_1.buildHtml)({ tag: 'section' }) });
        expect(splide.root.getAttribute('role')).toBeNull();
    });
    test('should not remove the role attribute by soft destruction.', () => {
        const splide = (0, test_1.init)();
        expect(splide.root.getAttribute('role')).toBe('region');
        splide.destroy(false);
        expect(splide.root.getAttribute('role')).toBe('region');
    });
});
