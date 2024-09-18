"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../../../test");
const prevent_1 = require("./prevent");
describe('prevent', () => {
    test('can prevent the default browser action of an event.', done => {
        window.addEventListener('click', e => {
            (0, prevent_1.prevent)(e);
            expect(e.defaultPrevented).toBe(true);
            done();
        });
        (0, test_1.fire)(window, 'click', { timeStamp: 123 }, { cancelable: true });
    });
});
