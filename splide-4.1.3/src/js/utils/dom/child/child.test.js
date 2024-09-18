"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_1 = require("./child");
describe('child', () => {
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
    test('can return the child that matches the specified selector.', () => {
        const container = document.getElementById('container');
        const span1 = (0, child_1.child)(container, 'span');
        expect(span1.id).toBe('span1');
        const span2 = (0, child_1.child)(container, '#span2');
        expect(span2.id).toBe('span2');
        const active = (0, child_1.child)(container, '.active');
        expect(active.id).toBe('span1');
    });
    test('can return the firstElementChild if the selector is omitted.', () => {
        const container = document.getElementById('container');
        const span1 = (0, child_1.child)(container);
        expect(span1.id).toBe('span1');
    });
    test('should rerun undefined if no element is found.', () => {
        const container = document.getElementById('container');
        const elm = (0, child_1.child)(container, 'nothing');
        expect(elm).toBeUndefined();
    });
});
