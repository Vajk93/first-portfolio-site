"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../../../test");
const utils_1 = require("../../../utils");
describe('Drag', () => {
    test('can rewind the slider if `rewind` and `rewindByDrag` are enabled.', () => {
        const splide = (0, test_1.init)({ speed: 0, rewind: true, rewindByDrag: true });
        const track = splide.Components.Elements.track;
        expect(splide.index).toBe(0);
        // On the first slide, drags backwards a bit.
        drag(track, true);
        expect(splide.index).toBe(splide.length - 1);
        // On the last slide, drags forwards a bit.
        drag(track, false); // Forwards
        expect(splide.index).toBe(0);
    });
    test('should not rewind the slider if `rewindByDrag` is disabled.', () => {
        const splide = (0, test_1.init)({ speed: 0, rewind: true, rewindByDrag: false });
        const track = splide.Components.Elements.track;
        expect(splide.index).toBe(0);
        drag(track, true);
        expect(splide.index).toBe(0);
    });
    test('should not rewind the slider if `rewind` is disabled.', () => {
        const splide = (0, test_1.init)({ speed: 0, rewind: false, rewindByDrag: true });
        const track = splide.Components.Elements.track;
        expect(splide.index).toBe(0);
        drag(track, true);
        expect(splide.index).toBe(0);
    });
    test('can rewind the fade slider if `rewind` and `rewindByDrag` are enabled.', () => __awaiter(void 0, void 0, void 0, function* () {
        const splide = (0, test_1.init)({ type: 'fade', speed: 0, rewind: true, rewindByDrag: true });
        const track = splide.Components.Elements.track;
        expect(splide.index).toBe(0);
        drag(track, true);
        expect(splide.index).toBe(splide.length - 1);
        yield (0, test_1.wait)(); // Wait `nextTick`.
        drag(track, false);
        expect(splide.index).toBe(0);
    }));
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
function drag(track, backwards) {
    const to = backwards ? 10 : -10;
    fireWithCoord(track, 'mousedown', { x: 0, timeStamp: 1 });
    fireWithCoord(window, 'mousemove', { x: 1, timeStamp: 1 });
    fireWithCoord(window, 'mousemove', { x: to, timeStamp: 20 });
    fireWithCoord(window, 'mouseup', { x: to, timeStamp: 20 });
}
