"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getAttribute_1 = require("./getAttribute");
describe('getAttribute', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="container"></div>';
    });
    test('can set an attribute to an element.', () => {
        const container = document.getElementById('container');
        container.setAttribute('aria-hidden', 'true');
        container.setAttribute('tabindex', '-1');
        expect((0, getAttribute_1.getAttribute)(container, 'id')).toBe('container');
        expect((0, getAttribute_1.getAttribute)(container, 'aria-hidden')).toBe('true');
        expect((0, getAttribute_1.getAttribute)(container, 'tabindex')).toBe('-1');
    });
});
