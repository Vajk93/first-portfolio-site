"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../../../constants/events");
const test_1 = require("../../../test");
describe('Layout', () => {
    test('can set the max width of the slider.', () => {
        const splide = (0, test_1.init)({ width: 100 });
        expect(splide.root.style.maxWidth).toBe('100px');
        splide.destroy();
    });
    test('should init the component again when options are updated.', () => {
        const splide = (0, test_1.init)({ width: 100 });
        const style = splide.root.style;
        expect(style.maxWidth).toBe('100px');
        splide.options = { width: 200 };
        expect(style.maxWidth).toBe('200px');
        splide.destroy();
    });
    test('should init the component again when the splide is refreshed.', () => {
        const splide = (0, test_1.init)({ width: 100 });
        const style = splide.root.style;
        expect(style.maxWidth).toBe('100px');
        splide.options = { width: 200 };
        splide.refresh();
        expect(style.maxWidth).toBe('200px');
        splide.destroy();
    });
    test('should update the slide height when the window is resized.', () => {
        const splide = (0, test_1.init)({ width: 1000, heightRatio: 0.5 });
        const style = splide.Components.Elements.slides[0].style;
        expect(style.height).toBe('500px');
        splide.options = { heightRatio: 0.2 };
        splide.emit(events_1.EVENT_RESIZE);
        expect(style.height).toBe('200px');
        splide.destroy();
    });
});
