"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../../../test");
const EventInterface_1 = require("../EventInterface");
describe('EventInterface', () => {
    const splide = (0, test_1.init)({ speed: 0 });
    test('can provide `on` to listen to internal events and lock listeners.', () => {
        const { on } = (0, EventInterface_1.EventInterface)(splide);
        const callback1 = jest.fn();
        const callback2 = jest.fn();
        on('mounted', callback1);
        on('moved', callback2);
        splide.emit('mounted');
        splide.emit('moved');
        expect(callback1).toHaveBeenCalledTimes(1);
        expect(callback2).toHaveBeenCalledTimes(1);
        // Handlers should not be removed by `off()`.
        splide.off('mounted');
        splide.off('moved');
        splide.emit('mounted');
        splide.emit('moved');
        expect(callback1).toHaveBeenCalledTimes(2);
        expect(callback2).toHaveBeenCalledTimes(2);
    });
    test('can receive arguments passed by `emit`.', () => {
        const { on } = (0, EventInterface_1.EventInterface)(splide);
        const callback1 = jest.fn();
        const callback2 = jest.fn();
        const array = [1, 2];
        const object = { a: 1, b: 2 };
        on('myEvent1', callback1);
        on('myEvent2', callback2);
        splide.emit('myEvent1', 1, 2, 3);
        splide.emit('myEvent2', array, object, Infinity);
        expect(callback1).toHaveBeenCalledWith(1, 2, 3);
        expect(callback2).toHaveBeenCalledWith(array, object, Infinity);
    });
    test('can provide `off` to remove locked listeners.', () => {
        const { on, off } = (0, EventInterface_1.EventInterface)(splide);
        const callback1 = jest.fn();
        const callback2 = jest.fn();
        on('mounted', callback1);
        on('moved', callback2);
        splide.emit('mounted');
        splide.emit('moved');
        expect(callback1).toHaveBeenCalledTimes(1);
        expect(callback2).toHaveBeenCalledTimes(1);
        // `off()` can remove handlers registered by `on()`.
        off('mounted');
        off('moved');
        splide.emit('mounted');
        splide.emit('moved');
        expect(callback1).toHaveBeenCalledTimes(1);
        expect(callback2).toHaveBeenCalledTimes(1);
    });
    test('can provide `bind` to listen to native events.', () => {
        const { bind } = (0, EventInterface_1.EventInterface)(splide);
        const div = document.createElement('div');
        const callback1 = jest.fn();
        const callback2 = jest.fn();
        bind(window, 'resize', callback1);
        bind(div, 'click', callback2);
        (0, test_1.fire)(window, 'resize');
        (0, test_1.fire)(div, 'click');
        expect(callback1).toHaveBeenCalledTimes(1);
        expect(callback2).toHaveBeenCalledTimes(1);
    });
    test('can provide `unbind` to remove listeners.', () => {
        const { bind, unbind } = (0, EventInterface_1.EventInterface)(splide);
        const div = document.createElement('div');
        const callback1 = jest.fn();
        const callback2 = jest.fn();
        bind(window, 'resize', callback1);
        bind(div, 'click', callback2);
        unbind(window, 'resize');
        unbind(div, 'click');
        (0, test_1.fire)(window, 'resize');
        (0, test_1.fire)(div, 'click');
        expect(callback1).not.toHaveBeenCalled();
        expect(callback2).not.toHaveBeenCalled();
    });
    test('can remove all listeners when the splide is destroyed.', () => {
        const { on, bind } = (0, EventInterface_1.EventInterface)(splide);
        const callback1 = jest.fn();
        const callback2 = jest.fn();
        bind(window, 'resize', callback1);
        on('moved', callback2);
        splide.destroy();
        (0, test_1.fire)(window, 'resize');
        splide.emit('moved');
        expect(callback1).not.toHaveBeenCalled();
        expect(callback2).not.toHaveBeenCalled();
    });
});
