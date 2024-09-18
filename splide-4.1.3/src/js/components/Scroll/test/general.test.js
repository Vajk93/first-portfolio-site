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
const constants_1 = require("../constants");
describe('Scroll', () => {
    test('can scroll the slider to the destination.', () => __awaiter(void 0, void 0, void 0, function* () {
        const splide = (0, test_1.init)();
        const duration = 100;
        // Waiting for the initial reposition. It will cancel scrolling.
        yield (0, test_1.wait)(100);
        splide.Components.Scroll.scroll(-100, duration);
        yield (0, test_1.wait)(duration + 50);
        expect(Math.round(splide.Components.Move.getPosition())).toBe(-100);
        splide.destroy();
    }));
    test('can scroll the slider to the destination in specified duration.', () => __awaiter(void 0, void 0, void 0, function* () {
        const splide = (0, test_1.init)();
        const duration = 200;
        const { getPosition } = splide.Components.Move;
        yield (0, test_1.wait)(100);
        splide.Components.Scroll.scroll(-100, duration);
        yield (0, test_1.wait)(duration / 2);
        expect(getPosition()).toBeGreaterThan(-100);
        yield (0, test_1.wait)(duration / 2 + 50);
        expect(Math.round(getPosition())).toBe(-100);
        splide.destroy();
    }));
    test('can constrain the position when the slider goes over the bounds.', () => __awaiter(void 0, void 0, void 0, function* () {
        const splide = (0, test_1.init)();
        const duration = 100;
        // Trying to run over the bounds by providing the positive number as the distance.
        splide.Components.Scroll.scroll(100, duration);
        yield (0, test_1.wait)(duration + constants_1.BOUNCE_DURATION + 100);
        expect(Math.round(splide.Components.Move.getPosition())).toBe(0);
        splide.destroy();
    }));
    test('can vary the duration according to the distance if the time is not provided.', () => __awaiter(void 0, void 0, void 0, function* () {
        const splide = (0, test_1.init)();
        const destination = -1000;
        const { getPosition } = splide.Components.Move;
        // Velocity: px/ms, t[ms] = x/v
        const expectedDuration = Math.abs(destination / constants_1.BASE_VELOCITY);
        splide.Components.Scroll.scroll(destination);
        yield (0, test_1.wait)(expectedDuration / 2);
        expect(getPosition()).toBeGreaterThan(destination);
        yield (0, test_1.wait)(expectedDuration / 2 + 100);
        expect(Math.round(getPosition())).toBe(destination);
        splide.destroy();
    }));
});
