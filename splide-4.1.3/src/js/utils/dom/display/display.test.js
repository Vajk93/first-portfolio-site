"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const display_1 = require("./display");
describe('display', () => {
    test('can set a new display value.', () => {
        const div = document.createElement('div');
        (0, display_1.display)(div, 'none');
        expect(div.style.display).toBe('none');
        (0, display_1.display)(div, 'flex');
        expect(div.style.display).toBe('flex');
        (0, display_1.display)(div, '');
        expect(div.style.display).toBe('');
    });
});
