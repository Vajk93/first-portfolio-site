"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const append_1 = require("./append");
describe('append', () => {
    test('can append a child element to a parent element.', () => {
        const div = document.createElement('div');
        const span = document.createElement('span');
        (0, append_1.append)(div, span);
        expect(div.firstElementChild).toBe(span);
    });
    test('can append children to a parent element.', () => {
        const div = document.createElement('div');
        const span1 = document.createElement('span');
        const span2 = document.createElement('span');
        const span3 = document.createElement('span');
        (0, append_1.append)(div, [span1, span2, span3]);
        expect(div.children[0]).toBe(span1);
        expect(div.children[1]).toBe(span2);
        expect(div.children[2]).toBe(span3);
    });
});
