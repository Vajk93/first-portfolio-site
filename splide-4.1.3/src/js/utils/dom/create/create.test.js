"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = require("./create");
describe('create', () => {
    test('can create an element by a tag name.', () => {
        const div = (0, create_1.create)('div');
        const iframe = (0, create_1.create)('iframe');
        expect(div instanceof HTMLDivElement).toBe(true);
        expect(iframe instanceof HTMLIFrameElement).toBe(true);
    });
    test('can create an element with setting attributes.', () => {
        const iframe = (0, create_1.create)('iframe', { width: 100, height: 200 });
        expect(iframe.getAttribute('width')).toBe('100');
        expect(iframe.getAttribute('height')).toBe('200');
    });
});
