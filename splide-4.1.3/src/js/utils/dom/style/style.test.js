"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const style_1 = require("./style");
describe('styles', () => {
    test('can set an inline style', () => {
        const div = document.createElement('div');
        (0, style_1.style)(div, 'color', 'red');
        (0, style_1.style)(div, 'backgroundColor', 'white');
        (0, style_1.style)(div, 'fontSize', '1rem');
        expect(div.style.color).toBe('red');
        expect(div.style.backgroundColor).toBe('white');
        expect(div.style.fontSize).toBe('1rem');
    });
    test('can return a computed style', () => {
        const div = document.createElement('div');
        div.style.color = 'red';
        expect((0, style_1.style)(div, 'color')).toBe('red');
    });
});
