"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const focus_1 = require("./focus");
describe('focus', () => {
    test('can make an element focused if it is focusable.', () => {
        const div = document.createElement('div');
        div.tabIndex = 0;
        document.body.appendChild(div);
        expect(document.activeElement).not.toBe(div);
        (0, focus_1.focus)(div);
        expect(document.activeElement).toBe(div);
    });
});
