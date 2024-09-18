"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../../../test");
const EventBinder_1 = require("../EventBinder");
describe('EventBinder#bind()', () => {
    const div = document.createElement('div');
    test('can listen to native events.', () => {
        const { bind } = (0, EventBinder_1.EventBinder)();
        const callback1 = jest.fn();
        const callback2 = jest.fn();
        bind(window, 'resize', callback1);
        bind(div, 'click', callback2);
        (0, test_1.fire)(window, 'resize');
        (0, test_1.fire)(div, 'click');
        expect(callback1).toHaveBeenCalledTimes(1);
        expect(callback2).toHaveBeenCalledTimes(1);
    });
    test('can accept multiple events separated by spaces.', () => {
        const { bind } = (0, EventBinder_1.EventBinder)();
        const callback = jest.fn();
        bind(div, 'load resize click', callback);
        (0, test_1.fire)(div, 'resize');
        expect(callback).toHaveBeenCalledTimes(1);
        (0, test_1.fire)(div, 'click');
        expect(callback).toHaveBeenCalledTimes(2);
    });
    test('can accept multiple events as an array.', () => {
        const { bind } = (0, EventBinder_1.EventBinder)();
        const callback = jest.fn();
        bind(div, ['load', 'resize', 'click'], callback);
        (0, test_1.fire)(div, 'resize');
        expect(callback).toHaveBeenCalledTimes(1);
        (0, test_1.fire)(div, 'click');
        expect(callback).toHaveBeenCalledTimes(2);
    });
    test('can accept multiple events by spaces and an array.', () => {
        const { bind } = (0, EventBinder_1.EventBinder)();
        const callback = jest.fn();
        bind(div, ['load resize click', 'scroll', 'wheel'], callback);
        (0, test_1.fire)(div, 'resize');
        expect(callback).toHaveBeenCalledTimes(1);
        (0, test_1.fire)(div, 'click');
        expect(callback).toHaveBeenCalledTimes(2);
        (0, test_1.fire)(div, 'scroll');
        expect(callback).toHaveBeenCalledTimes(3);
    });
    test('can accept a namespace by a dot notation.', () => {
        const { bind } = (0, EventBinder_1.EventBinder)();
        const callback = jest.fn();
        bind(div, ['load.namespace', 'resize.namespace', 'click.namespace'], callback);
        (0, test_1.fire)(div, 'resize');
        expect(callback).toHaveBeenCalledTimes(1);
        (0, test_1.fire)(div, 'click');
        expect(callback).toHaveBeenCalledTimes(2);
    });
});
