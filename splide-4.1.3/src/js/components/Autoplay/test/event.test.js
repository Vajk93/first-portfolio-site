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
const events_1 = require("../../../constants/events");
const test_1 = require("../../../test");
describe('Autoplay', () => {
    test('can emit the event when autoplay begins.', () => {
        const interval = 1000;
        const splide = (0, test_1.init)({ autoplay: 'pause', interval });
        const callback = jest.fn();
        const { Autoplay } = splide.Components;
        splide.on(events_1.EVENT_AUTOPLAY_PLAY, callback);
        Autoplay.play();
        expect(callback).toHaveBeenCalledTimes(1);
        // The callback won't be called because autoplay has already starts.
        Autoplay.play();
        expect(callback).toHaveBeenCalledTimes(1);
        Autoplay.pause();
        Autoplay.play();
        expect(callback).toHaveBeenCalledTimes(2);
    });
    test('can emit the event when autoplay is paused.', () => {
        const interval = 1000;
        const splide = (0, test_1.init)({ autoplay: true, interval });
        const callback = jest.fn();
        const { Autoplay } = splide.Components;
        splide.on(events_1.EVENT_AUTOPLAY_PAUSE, callback);
        Autoplay.pause();
        expect(callback).toHaveBeenCalledTimes(1);
        // The callback won't be called because autoplay has been already paused.
        Autoplay.pause();
        expect(callback).toHaveBeenCalledTimes(1);
        Autoplay.play();
        Autoplay.pause();
        expect(callback).toHaveBeenCalledTimes(2);
    });
    test('can emit the playing event while the interval timer is ticking.', () => __awaiter(void 0, void 0, void 0, function* () {
        const splide = (0, test_1.init)({ autoplay: true, interval: 2000 });
        let progressRate;
        splide.on(events_1.EVENT_AUTOPLAY_PLAYING, rate => {
            progressRate = rate;
        });
        yield (0, test_1.wait)(1);
        expect(progressRate).toBeLessThan(0.1);
        // Around 1000ms
        yield (0, test_1.wait)(1000 + 50);
        expect(progressRate).toBeGreaterThanOrEqual(0.5);
        expect(progressRate).toBeLessThan(1);
        // Around 1600ms
        yield (0, test_1.wait)(600 + 50);
        expect(progressRate).toBeGreaterThanOrEqual(0.8);
        expect(progressRate).toBeLessThan(1);
        // Around 2000ms
        yield (0, test_1.wait)(400 + 50);
        expect(progressRate).toBeLessThan(0.15);
    }));
});
