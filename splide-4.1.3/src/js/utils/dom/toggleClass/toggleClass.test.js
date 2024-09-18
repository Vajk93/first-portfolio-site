"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toggleClass_1 = require("./toggleClass");
describe('toggleClass', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="container"></div>';
    });
    test('can add a class to the element.', () => {
        const container = document.getElementById('container');
        (0, toggleClass_1.toggleClass)(container, 'active', true);
        expect(container.classList.contains('active')).toBe(true);
    });
    test('can add classes to the element.', () => {
        const container = document.getElementById('container');
        (0, toggleClass_1.toggleClass)(container, ['active', 'visible'], true);
        expect(container.classList.contains('active')).toBe(true);
        expect(container.classList.contains('visible')).toBe(true);
    });
    test('can remove a class from the element.', () => {
        const container = document.getElementById('container');
        container.classList.add('active');
        expect(container.classList.contains('active')).toBe(true);
        (0, toggleClass_1.toggleClass)(container, 'active', false);
        expect(container.classList.contains('active')).toBe(false);
    });
    test('can remove classes from the element.', () => {
        const container = document.getElementById('container');
        container.classList.add('active');
        container.classList.add('visible');
        expect(container.classList.contains('active')).toBe(true);
        expect(container.classList.contains('visible')).toBe(true);
        (0, toggleClass_1.toggleClass)(container, ['active', 'visible'], false);
        expect(container.classList.contains('active')).toBe(false);
        expect(container.classList.contains('visible')).toBe(false);
    });
});
