"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../../../test");
describe('Sync#navigate()', () => {
    test('can make slides clickable.', () => {
        const primary = (0, test_1.init)({ speed: 0 }, { id: 'primary', mount: false });
        const secondary = (0, test_1.init)({ speed: 0, isNavigation: true }, { id: 'secondary', insertHtml: true, mount: false });
        primary.sync(secondary).mount();
        secondary.mount();
        const Slides = secondary.Components.Slides.get();
        (0, test_1.fire)(Slides[1].slide, 'click');
        expect(primary.index).toBe(1);
        expect(secondary.index).toBe(1);
        (0, test_1.fire)(Slides[5].slide, 'click');
        expect(primary.index).toBe(5);
        expect(secondary.index).toBe(5);
    });
    test('can make slides receive key inputs.', () => {
        const primary = (0, test_1.init)({ speed: 0 }, { id: 'primary', mount: false });
        const secondary = (0, test_1.init)({ speed: 0, isNavigation: true }, { id: 'secondary', insertHtml: true, mount: false });
        primary.sync(secondary).mount();
        secondary.mount();
        const Slides = secondary.Components.Slides.get();
        Slides[1].slide.focus();
        (0, test_1.keydown)('Enter', Slides[1].slide);
        expect(primary.index).toBe(1);
        expect(secondary.index).toBe(1);
        Slides[5].slide.focus();
        (0, test_1.keydown)(' ', Slides[5].slide);
        expect(primary.index).toBe(5);
        expect(secondary.index).toBe(5);
        Slides[3].slide.focus();
        (0, test_1.keydown)('Spacebar', Slides[3].slide);
        expect(primary.index).toBe(3);
        expect(secondary.index).toBe(3);
    });
});
