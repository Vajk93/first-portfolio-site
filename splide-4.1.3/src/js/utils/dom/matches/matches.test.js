"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matches_1 = require("./matches");
describe('children', () => {
    beforeEach(() => {
        document.body.innerHTML = `
      <div id="container">
        <span id="span1" class="active"></span>
        <button id="button1" class="active"></button>
        <span id="span2"></span>
        <button id="button2"></button>
        <span id="span3"></span>
        <button id="button3"></button>
      </div>
    `;
    });
    test('can test if the selector matches the element or not.', () => {
        const container = document.getElementById('container');
        expect((0, matches_1.matches)(container, 'div')).toBe(true);
        expect((0, matches_1.matches)(container, '#container')).toBe(true);
        expect((0, matches_1.matches)(container, 'span')).toBe(false);
        const span = container.firstElementChild;
        expect((0, matches_1.matches)(span, 'span')).toBe(true);
        expect((0, matches_1.matches)(span, '#span1')).toBe(true);
        expect((0, matches_1.matches)(span, '.active')).toBe(true);
        expect((0, matches_1.matches)(span, '#container .active')).toBe(true);
        expect((0, matches_1.matches)(span, '#container')).toBe(false);
        expect((0, matches_1.matches)(span, '#span2')).toBe(false);
    });
});
