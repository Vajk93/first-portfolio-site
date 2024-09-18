"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../../../test");
const normalizeKey_1 = require("./normalizeKey");
describe('normalizeKey', () => {
    test('can normalize a key into a standard name.', () => {
        const keys = Object.keys(normalizeKey_1.NORMALIZATION_MAP);
        const callback = jest.fn();
        keys.forEach(key => {
            expect((0, normalizeKey_1.normalizeKey)(key)).toBe(normalizeKey_1.NORMALIZATION_MAP[key]);
            callback();
        });
        expect(callback).toHaveBeenCalled();
    });
    test('can return a normalized key from a Keyboard event object.', done => {
        window.addEventListener('keydown', e => {
            expect((0, normalizeKey_1.normalizeKey)(e)).toBe('ArrowUp');
            done();
        });
        (0, test_1.fire)(window, 'keydown', { key: 'Up' });
    });
    test('should do the provided key as is if the normalization map does not include the passed key.', () => {
        expect((0, normalizeKey_1.normalizeKey)('a')).toBe('a');
        expect((0, normalizeKey_1.normalizeKey)('F1')).toBe('F1');
    });
});
