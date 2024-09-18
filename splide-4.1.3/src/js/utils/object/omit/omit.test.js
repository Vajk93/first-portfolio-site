"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const omit_1 = require("./omit");
describe('omit', () => {
    function hasOwn(object, key) {
        return Object.prototype.hasOwnProperty.call(object, key);
    }
    test('can delete specified key.', () => {
        const object = { a: 1, b: 2, c: 3 };
        expect(hasOwn(object, 'a')).toBe(true);
        expect(hasOwn(object, 'b')).toBe(true);
        (0, omit_1.omit)(object, 'a');
        expect(hasOwn(object, 'a')).toBe(false);
        (0, omit_1.omit)(object, 'b');
        expect(hasOwn(object, 'b')).toBe(false);
    });
    test('can delete specified keys.', () => {
        const object = { a: 1, b: 2, c: 3 };
        (0, omit_1.omit)(object, ['a', 'b']);
        expect(hasOwn(object, 'a')).toBe(false);
        expect(hasOwn(object, 'b')).toBe(false);
    });
    test('can delete all own enumerable keys.', () => {
        const object = { a: 1, b: 2, c: 3 };
        (0, omit_1.omit)(object);
        expect(hasOwn(object, 'a')).toBe(false);
        expect(hasOwn(object, 'b')).toBe(false);
        expect(hasOwn(object, 'c')).toBe(false);
        expect(Object.keys(object).length).toBe(0);
    });
    test('should not delete inherited keys.', () => {
        const parent = { a: 1, b: 2, c: 3 };
        const object = Object.create(parent);
        (0, omit_1.omit)(object);
        expect(hasOwn(parent, 'a')).toBe(true);
        expect(hasOwn(parent, 'b')).toBe(true);
        expect(hasOwn(parent, 'c')).toBe(true);
        expect(object.a).toBe(1);
        expect(object.b).toBe(2);
        expect(object.c).toBe(3);
    });
});
