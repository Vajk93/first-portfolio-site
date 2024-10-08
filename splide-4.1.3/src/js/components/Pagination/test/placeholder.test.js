"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../../../test");
const assert_1 = require("assert");
describe('Pagination', () => {
    const html = `
    <section class="splide" aria-label="Placeholder for pagination">
      <ul class="splide__pagination pagination-placeholder"></ul>
    
      <div class="splide__track">
        <ul class="splide__list">
          <li class="splide__slide">Slide 01</li>
          <li class="splide__slide">Slide 02</li>
          <li class="splide__slide">Slide 03</li>
        </ul>
      </div>
    </section>
  `;
    test('can use a placeholder if provided.', () => {
        const splide = (0, test_1.init)({}, { html });
        const placeholder = document.querySelector('.pagination-placeholder');
        expect(placeholder).not.toBeUndefined();
        expect(splide.Components.Elements.pagination === placeholder).toBe(true);
        const { items } = splide.Components.Pagination;
        const { children } = placeholder;
        expect(items.length === children.length).toBe(true);
        expect(items[0].li === children[0]).toBe(true);
    });
    test('should toggle a placeholder according to `pagination` options.', () => {
        const splide = (0, test_1.init)({ pagination: false }, { html });
        const placeholder = document.querySelector('.pagination-placeholder');
        if (placeholder instanceof HTMLElement) {
            expect(placeholder.style.display).toBe('none');
            // Update options to show the pagination.
            splide.options = { pagination: true };
            expect(placeholder.style.display).toBe('');
        }
        else {
            (0, assert_1.fail)();
        }
    });
});
