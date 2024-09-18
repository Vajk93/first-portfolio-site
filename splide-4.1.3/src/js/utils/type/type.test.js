"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("./type");
describe('Type methods', () => {
    describe('isObject', () => {
        test('can return `true` if a subject is an object.', () => {
            [{}, { a: 1 }, new Date()].forEach(subject => {
                expect((0, type_1.isObject)(subject)).toBe(true);
            });
        });
        test('should return `false` for other subjects.', () => {
            [1, 'a', true, undefined, null, NaN].forEach(subject => {
                expect((0, type_1.isObject)(subject)).toBe(false);
            });
        });
    });
    describe('isArray', () => {
        test('can return `true` if a subject is an array.', () => {
            [[], [1], new Array(1)].forEach(subject => {
                expect((0, type_1.isArray)(subject)).toBe(true);
            });
        });
        test('should return `false` for other subjects.', () => {
            [1, 'a', true, undefined, null, { length: 1 }, { a: 1 }, NaN].forEach(subject => {
                expect((0, type_1.isArray)(subject)).toBe(false);
            });
        });
    });
    describe('isFunction', () => {
        test('can return `true` if a subject is a function.', () => {
            [() => 1, type_1.isString, Date].forEach(subject => {
                expect((0, type_1.isFunction)(subject)).toBe(true);
            });
        });
        test('should return `false` for other subjects.', () => {
            [1, 'a', true, undefined, null, [1], { a: 1 }, NaN].forEach(subject => {
                expect((0, type_1.isFunction)(subject)).toBe(false);
            });
        });
    });
    describe('isString', () => {
        test('can return `true` if a subject is a string.', () => {
            ['1', String(1)].forEach(subject => {
                expect((0, type_1.isString)(subject)).toBe(true);
            });
        });
        test('should return `false` for other subjects.', () => {
            [1, true, undefined, null, [1], { a: 1 }, NaN].forEach(subject => {
                expect((0, type_1.isString)(subject)).toBe(false);
            });
        });
    });
    describe('isUndefined', () => {
        test('can return `true` if a subject is `undefined`.', () => {
            expect((0, type_1.isUndefined)(undefined)).toBe(true);
        });
        test('should return `false` for other subjects.', () => {
            [1, true, '1', null, [1], { a: 1 }, NaN].forEach(subject => {
                expect((0, type_1.isUndefined)(subject)).toBe(false);
            });
        });
    });
    describe('isNull', () => {
        test('can return `true` if a subject is `null`.', () => {
            expect((0, type_1.isNull)(null)).toBe(true);
        });
        test('should return `false` for other subjects.', () => {
            [1, true, '1', undefined, [1], { a: 1 }, NaN].forEach(subject => {
                expect((0, type_1.isNull)(subject)).toBe(false);
            });
        });
    });
});
describe('isHTMLElement', () => {
    const div = document.createElement('div');
    const text = document.createTextNode('test');
    document.body.innerHTML = '<iframe></iframe>';
    test('can return `true` if a subject is an HTMLElement.', () => {
        expect((0, type_1.isHTMLElement)(div)).toBe(true);
    });
    test('should return `false` for other subjects.', () => {
        [document, window, text, 1, true, undefined, '1', null, [1], { a: 1 }, NaN].forEach(subject => {
            expect((0, type_1.isHTMLElement)(subject)).toBe(false);
        });
    });
    test('should work for nodes coming from other realms.', () => {
        const iframe = document.querySelector('iframe');
        expect(iframe).toBeTruthy();
        const { contentDocument, contentWindow } = iframe;
        const iDiv = contentDocument.createElement('div');
        expect(contentWindow).not.toBe(window);
        // This should fail since `HTMLElement` is different with the iframe's.
        expect(iDiv instanceof HTMLElement).toBe(false);
        // But this method will work since checking owners.
        expect((0, type_1.isHTMLElement)(iDiv)).toBe(true);
    });
    test('should work for nodes that do not belong to a specific window.', () => {
        const div = new DOMParser().parseFromString('<div>', 'text/html').body.firstElementChild;
        expect(div).toBeTruthy();
        expect(div.ownerDocument.defaultView).toBeNull();
        expect((0, type_1.isHTMLElement)(div)).toBe(true);
    });
});
