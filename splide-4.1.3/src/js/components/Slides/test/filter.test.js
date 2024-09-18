"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../../constants/classes");
const test_1 = require("../../../test");
describe('Slides#filter()', () => {
    const splide = (0, test_1.init)();
    const { Slides } = splide.Components;
    const all = Slides.get();
    test('can filter slides by the index.', () => {
        expect(Slides.filter(2)[0]).toBe(Slides.get()[2]);
    });
    test('can filter slides by indices.', () => {
        expect(Slides.filter([0, 2, 4])).toEqual([all[0], all[2], all[4]]);
    });
    test('can filter slides by the CSS selector.', () => {
        const first = Slides.filter(`.${classes_1.CLASS_SLIDE}:first-child`)[0];
        const last = Slides.filter(`.${classes_1.CLASS_SLIDE}:last-child`)[0];
        expect(first).toBe(all[0]);
        expect(last).toBe(all[all.length - 1]);
    });
    test('can filter slides by the predicate function.', () => {
        const filtered = Slides.filter((Slide, index) => {
            return index < 5;
        });
        expect(filtered.length).toBe(5);
        expect(filtered[filtered.length - 1]).toBe(all[filtered.length - 1]);
    });
});
