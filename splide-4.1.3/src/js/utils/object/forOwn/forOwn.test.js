"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forOwn_1 = require("./forOwn");
describe('forOwn', () => {
    test('can iterate an object by own enumerable properties.', () => {
        const object = { a: 1, b: 2, c: 3 };
        let counter = 0;
        (0, forOwn_1.forOwn)(object, (value, key) => {
            counter++;
            expect(object[key]).toBe(value);
        });
        expect(counter).toBe(Object.keys(object).length);
    });
    test('can iterate an object from the end.', () => {
        const object = { a: 1, b: 2, c: 3 };
        const values = [];
        (0, forOwn_1.forOwn)(object, (value) => {
            values.push(value);
        }, true);
        expect(values).toEqual([3, 2, 1]);
    });
    test('should not handle inherited properties.', () => {
        class Constructor {
            constructor() {
                this.a = 1;
                this.b = 2;
            }
        }
        Constructor.prototype['c'] = 3;
        const object = {};
        (0, forOwn_1.forOwn)(new Constructor(), (value, key) => {
            object[key] = value;
        });
        expect(object).toStrictEqual({ a: 1, b: 2 });
    });
});
