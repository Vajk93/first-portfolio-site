"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../../../test");
const EventBinder_1 = require("../EventBinder");
describe('EventBinder#destroy()', () => {
    const div = document.createElement('div');
    test('can remove all listeners.', () => {
        const { bind, destroy } = (0, EventBinder_1.EventBinder)();
        const callback1 = jest.fn();
        const callback2 = jest.fn();
        bind(window, 'resize', callback1);
        bind(div, 'click', callback2);
        destroy();
        (0, test_1.fire)(window, 'resize');
        (0, test_1.fire)(div, 'click');
        expect(callback1).not.toHaveBeenCalled();
        expect(callback2).not.toHaveBeenCalled();
    });
    test('should not remove listeners bound by other binders.', () => {
        const binder1 = (0, EventBinder_1.EventBinder)();
        const binder2 = (0, EventBinder_1.EventBinder)();
        const binder3 = (0, EventBinder_1.EventBinder)();
        const binder1Callback = jest.fn();
        const binder2Callback = jest.fn();
        const binder3Callback = jest.fn();
        binder1.bind(div, 'click', binder1Callback);
        binder2.bind(div, 'click', binder2Callback);
        binder3.bind(div, 'click', binder3Callback);
        binder2.destroy();
        (0, test_1.fire)(div, 'click');
        expect(binder1Callback).toHaveBeenCalled();
        expect(binder2Callback).not.toHaveBeenCalled();
        expect(binder3Callback).toHaveBeenCalled();
    });
});
