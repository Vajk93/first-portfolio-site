"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../../constants/classes");
const directions_1 = require("../../../constants/directions");
const test_1 = require("../../../test");
describe('Elements', () => {
    test('can collect essential elements.', () => {
        const splide = (0, test_1.init)({}, { autoplay: true, arrows: true, progress: true });
        const { Elements } = splide.Components;
        expect(Elements.root.classList.contains(classes_1.CLASS_ROOT)).toBe(true);
        expect(Elements.track.classList.contains(classes_1.CLASS_TRACK)).toBe(true);
        expect(Elements.list.classList.contains(classes_1.CLASS_LIST)).toBe(true);
        expect(Elements.slides.length).toBe(splide.length);
        expect(Elements.prev.classList.contains(classes_1.CLASS_ARROW_PREV)).toBe(true);
        expect(Elements.next.classList.contains(classes_1.CLASS_ARROW_NEXT)).toBe(true);
        expect(Elements.bar.classList.contains(classes_1.CLASS_PROGRESS_BAR)).toBe(true);
        expect(Elements.toggle.classList.contains(classes_1.CLASS_TOGGLE)).toBe(true);
    });
    test('can assign unique IDs to root, track and list elements.', () => {
        const splide = (0, test_1.init)({}, { autoplay: true, arrows: true, progress: true });
        const { Elements } = splide.Components;
        const { id } = Elements.root;
        expect(id).not.toBe('');
        expect(Elements.track.id).toBe(`${id}-track`);
        expect(Elements.list.id).toBe(`${id}-list`);
    });
    test('can add classes to root element.', () => {
        const splide = (0, test_1.init)({ type: 'loop', direction: directions_1.RTL, isNavigation: true });
        const { classList } = splide.root;
        const contains = classList.contains.bind(classList);
        expect(contains(`${classes_1.CLASS_ROOT}--loop`)).toBe(true);
        expect(contains(`${classes_1.CLASS_ROOT}--slide`)).toBe(false);
        expect(contains(`${classes_1.CLASS_ROOT}--fade`)).toBe(false);
        expect(contains(`${classes_1.CLASS_ROOT}--rtl`)).toBe(true);
        expect(contains(`${classes_1.CLASS_ROOT}--ltr`)).toBe(false);
        expect(contains(`${classes_1.CLASS_ROOT}--ttb`)).toBe(false);
        expect(contains(`${classes_1.CLASS_ROOT}--draggable`)).toBe(true);
        expect(contains(`${classes_1.CLASS_ROOT}--nav`)).toBe(true);
        expect(contains(classes_1.CLASS_ACTIVE)).toBe(true);
    });
    test('should not collect nested slider elements.', () => {
        const html = `
      <div class="splide">
        <div class="splide__track">
          <ul class="splide__list">
            <div class="splide__slide">
              <div id="nested-splide" class="splide">
                <div id="nested-splide-track" class="splide__track">
                  <ul id="nested-splide-list" class="splide__list">
                    <div id="nested-splide-slide" class="splide__slide">
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    `;
        const splide = (0, test_1.init)({}, { html });
        const { Elements } = splide.Components;
        expect(Elements.track.id).not.toBe('nested-splide-track');
        expect(Elements.list.id).not.toBe('nested-splide-list');
        expect(Elements.slides.length).toBe(1);
    });
});
