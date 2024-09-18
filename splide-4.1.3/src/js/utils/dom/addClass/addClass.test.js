"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addClass_1 = require("./addClass");
describe('addClass', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="container"></div>';
    });
    test('can add a class to the element.', () => {
        const container = document.getElementById('container');
        (0, addClass_1.addClass)(container, 'active');
        expect(container.classList.contains('active')).toBe(true);
    });
    test('can add classes to the element.', () => {
        const container = document.getElementById('container');
        (0, addClass_1.addClass)(container, ['active', 'visible']);
        expect(container.classList.contains('active')).toBe(true);
        expect(container.classList.contains('visible')).toBe(true);
    });
});
