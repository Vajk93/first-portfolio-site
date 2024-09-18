"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../../../constants/events");
const test_1 = require("../../../test");
const utils_1 = require("../../../utils");
describe('Drag', () => {
    test('can move the slider by drag.', () => {
        const splide = (0, test_1.init)();
        const track = splide.Components.Elements.track;
        fireWithCoord(track, 'mousedown', { x: 0, timeStamp: 1 });
        fireWithCoord(window, 'mousemove', { x: 1, timeStamp: 1 });
        fireWithCoord(window, 'mousemove', { x: -100, timeStamp: 2 });
        expect(splide.Components.Move.getPosition()).toBe(-100);
        fireWithCoord(window, 'mousemove', { x: -200, timeStamp: 3 });
        expect(splide.Components.Move.getPosition()).toBe(-200);
    });
    test('should not move the slider after dragging.', () => {
        const splide = (0, test_1.init)();
        const track = splide.Components.Elements.track;
        fireWithCoord(track, 'mousedown', { x: 0 });
        fireWithCoord(window, 'mousemove', { x: 1 });
        fireWithCoord(window, 'mouseup');
        expect(splide.Components.Move.getPosition()).toBe(0);
        fireWithCoord(window, 'mousemove', { x: -200 });
        fireWithCoord(window, 'mousemove', { x: -400 });
        expect(splide.Components.Move.getPosition()).toBe(0);
    });
    test('can change the slide index if the drag velocity is enough.', () => {
        const splide = (0, test_1.init)({ speed: 0, width: 600 });
        const track = splide.Components.Elements.track;
        fireWithCoord(track, 'mousedown', { x: 0, timeStamp: 1 });
        fireWithCoord(window, 'mousemove', { x: 1, timeStamp: 1 });
        fireWithCoord(window, 'mousemove', { x: -20, timeStamp: 21 }); // v = -1
        fireWithCoord(window, 'mouseup', { x: -20, timeStamp: 21 });
        // The destination will be flickPower * v + (-20) = -620
        expect(splide.index).toBe(1);
    });
    test('should not change the slide index if the drag velocity is not enough.', () => {
        const splide = (0, test_1.init)({ speed: 0, width: 600 });
        const track = splide.Components.Elements.track;
        fireWithCoord(track, 'mousedown', { x: 0, timeStamp: 1 });
        fireWithCoord(window, 'mousemove', { x: 1, timeStamp: 1 });
        fireWithCoord(window, 'mousemove', { x: -20, timeStamp: 100 });
        fireWithCoord(window, 'mouseup', { x: -20, timeStamp: 100 });
        expect(splide.index).toBe(0);
    });
    test('should start moving the slider immediately if the pointing device is a mouse.', () => {
        const splide = (0, test_1.init)();
        const onDrag = jest.fn();
        const track = splide.Components.Elements.track;
        splide.on(events_1.EVENT_DRAG, onDrag);
        (0, test_1.fire)(track, 'mousedown');
        fireWithCoord(window, 'mousemove');
        expect(onDrag).toHaveBeenCalledTimes(1);
    });
    test('should start moving the slider only when the drag distance becomes greater than the threshold.', () => {
        const splide = (0, test_1.init)({ dragMinThreshold: 20 });
        const onDragging = jest.fn();
        const track = splide.Components.Elements.track;
        splide.on(events_1.EVENT_DRAGGING, onDragging);
        fireWithCoord(track, 'touchstart', { x: 0 });
        fireWithCoord(track, 'touchmove', { x: -10 });
        expect(onDragging).not.toHaveBeenCalled();
        fireWithCoord(track, 'touchmove', { x: -30 }); // isDragging becomes true
        fireWithCoord(track, 'touchmove', { x: -31 });
        expect(onDragging).toHaveBeenCalled();
    });
});
function fireCancelable(elm, event, data = {}) {
    (0, test_1.fire)(elm, event, data, { cancelable: true });
}
function fireWithCoord(elm, event, data = {}) {
    const { x: pageX = 0, y: pageY = 0 } = data;
    fireCancelable(elm, event, (0, utils_1.assign)(data, {
        pageX,
        pageY,
        touches: [
            { pageX, pageY },
        ],
    }));
}
