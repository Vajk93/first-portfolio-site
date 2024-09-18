"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../../../test");
const timeOf_1 = require("./timeOf");
describe('timeOf', () => {
    test('can extract a timestamp from an event object.', done => {
        window.addEventListener('click', e => {
            expect((0, timeOf_1.timeOf)(e)).toBe(123);
            done();
        });
        (0, test_1.fire)(window, 'click', { timeStamp: 123 });
    });
});
