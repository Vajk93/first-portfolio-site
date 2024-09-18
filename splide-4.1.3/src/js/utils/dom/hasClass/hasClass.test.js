"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hasClass_1 = require("./hasClass");
describe('hasClass', () => {
    test('can return true if the element contains the specified class.', () => {
        const container = document.createElement('div');
        container.classList.add('active');
        container.classList.add('visible');
        expect((0, hasClass_1.hasClass)(container, 'active')).toBe(true);
        expect((0, hasClass_1.hasClass)(container, 'visible')).toBe(true);
    });
    test('can return false if the element does not contain the specified class.', () => {
        const container = document.createElement('div');
        expect((0, hasClass_1.hasClass)(container, 'active')).toBe(false);
        expect((0, hasClass_1.hasClass)(container, 'visible')).toBe(false);
    });
});
