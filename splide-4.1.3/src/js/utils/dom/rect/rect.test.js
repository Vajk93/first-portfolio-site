"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rect_1 = require("./rect");
describe('rect', () => {
    test('can return a DOMRect object.', () => {
        const div = document.createElement('div');
        expect((0, rect_1.rect)(div).width).toBe(0);
        expect((0, rect_1.rect)(div).left).toBe(0);
    });
});
